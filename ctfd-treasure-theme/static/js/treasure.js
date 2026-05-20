(function () {
  'use strict';
  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }
  function setActiveNav() {
    var path = window.location.pathname.replace(/\/$/, '') || '/';
    document.querySelectorAll('.tm-nav-links a').forEach(function (a) {
      var href = (a.getAttribute('href') || '').replace(/\/$/, '') || '/';
      if (href !== '/' && path.indexOf(href) === 0) a.classList.add('active');
      if (href === '/' && path === '/') a.classList.add('active');
    });
  }
  function initNav() {
    var toggle = document.querySelector('.tm-nav-toggle');
    var links = document.querySelector('.tm-nav-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  ready(function () {
    document.documentElement.classList.add('treasure-ready');
    setActiveNav();
    initNav();
  });
})();
