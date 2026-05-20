(function () {
  'use strict';

  var state = { challenges: [], filter: 'all', renderedByFallback: false };

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  function rootUrl(path) {
    var prefix = (window.init && init.urlRoot) ? String(init.urlRoot) : '';
    if (!path) return prefix || '/';
    if (prefix.endsWith('/') && path.charAt(0) === '/') return prefix.slice(0, -1) + path;
    if (!prefix.endsWith('/') && path.charAt(0) !== '/') return prefix + '/' + path;
    return prefix + path;
  }

  function headers(json) {
    var h = {};
    if (window.init && init.csrfNonce) h['CSRF-Token'] = init.csrfNonce;
    if (json) h['Content-Type'] = 'application/json';
    return h;
  }

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  function extract(resp) {
    if (!resp) return [];
    if (Array.isArray(resp)) return resp;
    if (Array.isArray(resp.data)) return resp.data;
    if (resp.data && Array.isArray(resp.data.challenges)) return resp.data.challenges;
    if (resp.data && Array.isArray(resp.data.results)) return resp.data.results;
    return [];
  }

  function solved(c) {
    return !!(c.solved_by_me || c.solved || c.account_solved || c.user_solved);
  }

  function icon(category) {
    var c = String(category || '').toLowerCase();
    if (c.indexOf('web') !== -1) return '🌐';
    if (c.indexOf('pwn') !== -1 || c.indexOf('binary') !== -1) return '💣';
    if (c.indexOf('crypto') !== -1) return '🔐';
    if (c.indexOf('forensic') !== -1) return '🔎';
    if (c.indexOf('reverse') !== -1 || c.indexOf('rev') !== -1) return '⚙️';
    if (c.indexOf('misc') !== -1) return '🧩';
    if (c.indexOf('osint') !== -1) return '🛰️';
    if (c.indexOf('asraf') !== -1) return '⚓';
    if (c.indexOf('ramdan') !== -1) return '🏴‍☠️';
    return '🏝️';
  }

  function filtered() {
    return state.challenges.filter(function (c) {
      if (state.filter === 'solved') return solved(c);
      if (state.filter === 'unsolved') return !solved(c);
      return true;
    });
  }

  function setStatus(html) {
    var status = document.getElementById('treasure-map-status');
    if (status) status.innerHTML = html;
  }

  function updateStatus() {
    var all = state.challenges.length;
    var done = state.challenges.filter(solved).length;
    var show = filtered().length;
    setStatus('<b>' + show + '</b> island tampil · <b>' + done + '</b> solved · <b>' + all + '</b> total challenge');
  }

  function grouped(list) {
    var out = {};
    list.forEach(function (c) {
      var cat = c.category || 'Uncharted Waters';
      if (!out[cat]) out[cat] = [];
      out[cat].push(c);
    });
    return out;
  }

  function renderFallback() {
    var board = document.getElementById('challenges-board');
    if (!board) return;
    state.renderedByFallback = true;
    updateStatus();

    if (!state.challenges.length) {
      board.innerHTML = '<div class="map-empty"><h3>Belum ada treasure island yang tampil.</h3><p>Challenge ada di Admin Panel, tapi API user belum mengirim data. Cek: challenge harus <b>visible</b>, CTF harus sudah aktif, user sudah login, dan endpoint <code>/api/v1/challenges</code> harus berisi data.</p></div>';
      return;
    }

    var list = filtered();
    if (!list.length) {
      board.innerHTML = '<div class="map-empty"><h3>Tidak ada island pada filter ini.</h3><p>Coba pilih route lain.</p></div>';
      return;
    }

    var groups = grouped(list);
    var cats = Object.keys(groups).sort(function (a, b) { return a.localeCompare(b); });
    var html = '<div class="route-line" aria-hidden="true"></div>';

    cats.forEach(function (cat) {
      html += '<section class="map-category">';
      html += '<div class="category-sign"><span>' + icon(cat) + '</span><b>' + esc(cat) + '</b><small>' + groups[cat].length + ' island</small></div>';
      html += '<div class="island-grid">';
      groups[cat].forEach(function (c, idx) {
        var ok = solved(c);
        html += '<button type="button" class="island-card ' + (ok ? 'is-solved' : 'is-unsolved') + '" data-challenge-id="' + esc(c.id) + '" style="--i:' + idx + '">';
        html += '<span class="island-topline"><span class="island-status">' + (ok ? '🏆' : '✕') + '</span><span class="island-value">' + esc(c.value || 0) + ' pts</span></span>';
        html += '<span class="island-icon">' + icon(cat) + '</span>';
        html += '<strong>' + esc(c.name || 'Unnamed Challenge') + '</strong>';
        html += '<small>' + esc(c.solves || 0) + ' solves · ' + esc(cat) + '</small>';
        html += '<span class="island-action">Open clue</span>';
        html += '</button>';
      });
      html += '</div></section>';
    });

    board.innerHTML = html;
    board.querySelectorAll('[data-challenge-id]').forEach(function (card) {
      card.addEventListener('click', function () { openChallenge(card.getAttribute('data-challenge-id')); });
    });
  }

  function setFilter(filter) {
    state.filter = filter || 'all';
    document.querySelectorAll('[data-map-filter]').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-map-filter') === state.filter);
    });
    if (state.renderedByFallback) renderFallback();
    else filterOfficialBoard();
  }

  function filterOfficialBoard() {
    var board = document.getElementById('challenges-board');
    if (!board) return;
    var cards = board.querySelectorAll('.challenge-button, [data-challenge-id], button[name="challenge"]');
    if (!cards.length) return;
    cards.forEach(function (card) {
      var text = card.textContent || '';
      var isSolved = card.classList.contains('solved-challenge') || card.classList.contains('challenge-solved') || text.indexOf('Solved') !== -1;
      var show = state.filter === 'all' || (state.filter === 'solved' && isSolved) || (state.filter === 'unsolved' && !isSolved);
      card.style.display = show ? '' : 'none';
    });
    setStatus('<b>Treasure map ready.</b> Gunakan filter untuk pilih rute challenge.');
  }

  function initToolbar() {
    document.querySelectorAll('[data-map-filter]').forEach(function (btn) {
      btn.addEventListener('click', function () { setFilter(btn.getAttribute('data-map-filter')); });
    });
    var random = document.querySelector('[data-map-random]');
    if (random) random.addEventListener('click', function () {
      if (state.renderedByFallback && state.challenges.length) {
        var pool = filtered();
        if (!pool.length) pool = state.challenges;
        var unsolved = pool.filter(function (c) { return !solved(c); });
        if (unsolved.length) pool = unsolved;
        var pick = pool[Math.floor(Math.random() * pool.length)];
        var card = document.querySelector('[data-challenge-id="' + String(pick.id).replace(/"/g, '\\"') + '"]');
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          card.classList.add('is-picked');
          setTimeout(function () { card.classList.remove('is-picked'); openChallenge(pick.id); }, 550);
        }
        return;
      }
      var official = document.querySelectorAll('#challenges-board .challenge-button, #challenges-board [data-challenge-id], #challenges-board button[name="challenge"]');
      if (official.length) {
        var item = official[Math.floor(Math.random() * official.length)];
        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
        item.classList.add('is-picked');
        setTimeout(function () { item.classList.remove('is-picked'); item.click(); }, 550);
      }
    });
  }

  function showModal(modal) {
    if (window.jQuery && jQuery.fn && jQuery.fn.modal) return jQuery(modal).modal('show');
    modal.style.display = 'block'; modal.classList.add('show'); document.body.classList.add('modal-open');
  }

  function hideModal(modal) {
    if (window.jQuery && jQuery.fn && jQuery.fn.modal) return jQuery(modal).modal('hide');
    modal.style.display = 'none'; modal.classList.remove('show'); document.body.classList.remove('modal-open');
  }

  function normalizeFile(file) {
    if (typeof file === 'string') return file;
    if (file && file.location) return file.location;
    if (file && file.url) return file.url;
    if (file && file.href) return file.href;
    return '';
  }

  function normalizeTag(tag) {
    if (typeof tag === 'string') return tag;
    if (tag && tag.value) return tag.value;
    if (tag && tag.name) return tag.name;
    return '';
  }

  function openChallenge(id) {
    var modal = document.getElementById('challenge-window');
    if (!modal) return;
    modal.innerHTML = '<div class="modal-dialog modal-lg" role="document"><div class="modal-content"><div class="modal-body text-center p-5"><i class="fas fa-circle-notch fa-spin fa-2x fa-fw spinner"></i><p class="mt-3"><b>Opening treasure clue...</b></p></div></div></div>';
    showModal(modal);

    fetch(rootUrl('/api/v1/challenges/' + encodeURIComponent(id)), { credentials: 'same-origin', headers: headers(false), cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (resp) { if (!resp || resp.success === false) throw new Error((resp && resp.message) || 'Cannot load challenge'); renderChallengeModal(modal, resp.data || {}, id); })
      .catch(function (err) {
        modal.innerHTML = '<div class="modal-dialog modal-lg" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Treasure clue failed</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close">&times;</button></div><div class="modal-body"><p>Challenge gagal dibuka.</p><code>' + esc(err.message) + '</code></div></div></div>';
        modal.querySelectorAll('[data-dismiss="modal"], .close').forEach(function (btn) { btn.addEventListener('click', function () { hideModal(modal); }); });
      });
  }

  function renderChallengeModal(modal, c, id) {
    var files = '';
    if (Array.isArray(c.files) && c.files.length) {
      files = '<div class="clue-block"><b>📜 Treasure scrolls</b><div class="file-list">' + c.files.map(function (f) {
        var href = normalizeFile(f);
        return href ? '<a class="btn btn-ghost btn-sm" target="_blank" rel="noopener" href="' + esc(rootUrl(href)) + '">Download file</a>' : '';
      }).join('') + '</div></div>';
    }

    var tags = '';
    if (Array.isArray(c.tags) && c.tags.length) {
      tags = '<div class="tag-list">' + c.tags.map(function (t) { t = normalizeTag(t); return t ? '<span class="badge">' + esc(t) + '</span>' : ''; }).join('') + '</div>';
    }
    var connection = c.connection_info ? '<div class="clue-block"><b>⚓ Connection</b><pre>' + esc(c.connection_info) + '</pre></div>' : '';
    var hintCount = Array.isArray(c.hints) ? c.hints.length : 0;
    var hints = hintCount ? '<div class="clue-block"><b>💡 Hints</b><p>' + hintCount + ' hint tersedia di challenge ini.</p></div>' : '';

    modal.innerHTML = '' +
      '<div class="modal-dialog modal-lg" role="document"><div class="modal-content treasure-clue-modal">' +
      '<div class="modal-header"><div><h5 class="modal-title">🗺️ ' + esc(c.name || 'Treasure Clue') + '</h5><span class="modal-meta">' + esc(c.category || 'Uncharted') + ' · ' + esc(c.value || 0) + ' pts</span></div><button type="button" class="close" data-dismiss="modal" aria-label="Close">&times;</button></div>' +
      '<div class="modal-body">' + tags + connection + '<div class="challenge-description clue-description">' + (c.description || '<p>No description.</p>') + '</div>' + files + hints +
      '<div id="treasure-submit-result"></div><label class="flag-label" for="treasure-flag-input">🚩 Submit Flag</label><div class="input-group flag-submit-group"><input id="treasure-flag-input" class="form-control" autocomplete="off" placeholder="Masukkan flag di sini"><div class="input-group-append"><button type="button" id="treasure-submit-btn" class="btn btn-treasure">Claim Treasure</button></div></div>' +
      '</div><div class="modal-footer"><button type="button" class="btn btn-ghost" data-dismiss="modal">Close Map</button></div></div></div>';

    modal.querySelectorAll('[data-dismiss="modal"], .close').forEach(function (btn) { btn.addEventListener('click', function () { hideModal(modal); }); });
    var submit = modal.querySelector('#treasure-submit-btn');
    var input = modal.querySelector('#treasure-flag-input');
    var result = modal.querySelector('#treasure-submit-result');
    submit.addEventListener('click', function () { submitFlag(id, input.value, result, submit); });
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') submitFlag(id, input.value, result, submit); });
    setTimeout(function () { input.focus(); }, 250);
  }

  function submitFlag(id, value, result, submit) {
    value = String(value || '').trim();
    if (!value) { result.innerHTML = '<div class="alert alert-danger">Flag masih kosong.</div>'; return; }
    submit.disabled = true; submit.textContent = 'Checking...';
    fetch(rootUrl('/api/v1/challenges/attempt'), {
      method: 'POST', credentials: 'same-origin', headers: headers(true),
      body: JSON.stringify({ challenge_id: Number(id), submission: value })
    })
      .then(function (r) { return r.json(); })
      .then(function (resp) {
        var data = resp.data || {};
        var status = String(data.status || resp.status || '').toLowerCase();
        var message = data.message || resp.message || 'Submission processed.';
        var good = status === 'correct' || status === 'success' || status === 'already_solved';
        result.innerHTML = '<div class="alert ' + (good ? 'alert-success' : 'alert-danger') + '">' + esc(message) + '</div>';
        if (good) {
          state.challenges.forEach(function (c) { if (String(c.id) === String(id)) c.solved_by_me = true; });
          renderFallback();
        }
      })
      .catch(function () { result.innerHTML = '<div class="alert alert-danger">Submit gagal. Coba lagi.</div>'; })
      .finally(function () { submit.disabled = false; submit.textContent = 'Claim Treasure'; });
  }

  function loadFallbackSoon() {
    var board = document.getElementById('challenges-board');
    if (!board) return;

    fetch(rootUrl('/api/v1/challenges'), { credentials: 'same-origin', headers: headers(false), cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (resp) {
        if (resp && resp.success === false) throw new Error(resp.message || 'API failed');
        state.challenges = extract(resp);
        // Always render custom map after API succeeds, because it is more stable across CTFd versions.
        renderFallback();
      })
      .catch(function (err) {
        // If official renderer worked, keep it. Otherwise show a useful error.
        var hasOfficial = board.querySelectorAll('.challenge-button, [data-challenge-id], button[name="challenge"]').length > 0;
        if (hasOfficial) {
          filterOfficialBoard();
        } else {
          setStatus('<b>Treasure Map gagal load.</b> API tidak terbaca.');
          board.innerHTML = '<div class="map-empty"><h3>Challenge belum bisa ditampilkan.</h3><p>Detail: <code>' + esc(err.message) + '</code></p><p>Coba buka <code>/api/v1/challenges</code> ketika sudah login. Kalau kosong, challenge belum visible untuk user.</p></div>';
        }
      });
  }

  ready(function () {
    initToolbar();
    setStatus('<b>Opening map...</b> Mengambil daftar challenge dari CTFd API.');
    // Give the official CTFd renderer a brief chance, then replace with our stable pirate map renderer.
    setTimeout(loadFallbackSoon, 650);
  });
})();
