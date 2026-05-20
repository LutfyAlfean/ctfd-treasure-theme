# Content in Admin Pages route index

Login Admin Page -> Pages -> All Pages
```text
route = index
Format = HTML
```

Paste Code in Content
```bash
<style>
  html,
  body {
    min-height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    background:
      linear-gradient(rgba(0, 18, 28, 0.45), rgba(0, 16, 30, 0.88)),
      url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=90");
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    color: #ffffff;
    overflow-x: hidden;
  }

  .harbas-page {
    min-height: 90vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 70px 20px;
    font-family: "Segoe UI", Arial, sans-serif;
  }

  .harbas-card {
    width: 100%;
    max-width: 1180px;
    position: relative;
    overflow: hidden;
    border-radius: 34px;
    padding: 48px 34px;
    text-align: center;
    background: rgba(0, 31, 48, 0.76);
    border: 1px solid rgba(255, 255, 255, 0.22);
    box-shadow:
      0 30px 90px rgba(0, 0, 0, 0.55),
      inset 0 0 35px rgba(0, 255, 213, 0.08);
    backdrop-filter: blur(14px);
  }

  .harbas-card::before {
    content: "";
    position: absolute;
    inset: -3px;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(0, 255, 213, 0.45),
      rgba(255, 220, 92, 0.35),
      rgba(0, 167, 255, 0.45),
      transparent
    );
    animation: borderGlow 7s linear infinite;
    z-index: 0;
  }

  .harbas-card::after {
    content: "";
    position: absolute;
    inset: 3px;
    border-radius: 31px;
    background: rgba(0, 31, 48, 0.82);
    z-index: 1;
  }

  .harbas-content {
    position: relative;
    z-index: 2;
  }

  @keyframes borderGlow {
    0% {
      transform: translateX(-80%) rotate(0deg);
    }
    100% {
      transform: translateX(80%) rotate(0deg);
    }
  }

  .island-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 11px 22px;
    border-radius: 999px;
    margin-bottom: 24px;
    color: #fff8d6;
    font-weight: 800;
    letter-spacing: 1px;
    background: rgba(255, 255, 255, 0.13);
    border: 1px solid rgba(255, 255, 255, 0.24);
    box-shadow: 0 0 24px rgba(0, 255, 213, 0.2);
  }

  .main-heading {
    margin: 0 0 12px 0;
    font-size: clamp(2rem, 5vw, 4.5rem);
    font-weight: 950;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #fff8d6;
    text-shadow:
      0 0 15px rgba(255, 220, 92, 0.75),
      0 0 35px rgba(0, 255, 213, 0.45);
  }

  .main-subtitle {
    max-width: 820px;
    margin: 0 auto 35px auto;
    color: #dcfff9;
    font-size: 1.12rem;
    line-height: 1.8;
  }

  .middle-zone {
    display: grid;
    grid-template-columns: 260px minmax(260px, 1fr) 260px;
    gap: 26px;
    align-items: center;
    justify-content: center;
    margin: 35px auto;
  }

  .gif-box {
    width: 260px;
    height: 260px;
    margin: 0 auto;
    border-radius: 30px;
    padding: 10px;
    background: linear-gradient(145deg, #00ffd5, #fff06a, #00a7ff);
    box-shadow:
      0 0 22px rgba(0, 255, 213, 0.45),
      0 0 45px rgba(255, 220, 92, 0.22);
    animation: floatGif 4s ease-in-out infinite;
  }

  .gif-box.right {
    animation-delay: 1.1s;
  }

  .gif-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 22px;
    display: block;
    background: #001d2c;
  }

  @keyframes floatGif {
    0%,
    100% {
      transform: translateY(0) rotate(-1deg);
    }

    50% {
      transform: translateY(-15px) rotate(1.5deg);
    }
  }

  .harbas-title-wrap {
    position: relative;
    padding: 24px 12px;
  }

  .harbas-title-wrap::before {
    content: "";
    position: absolute;
    inset: 12px;
    border-radius: 30px;
    background:
      radial-gradient(circle at center, rgba(0, 255, 213, 0.22), transparent 60%),
      radial-gradient(circle at center, rgba(255, 220, 92, 0.2), transparent 65%);
    filter: blur(4px);
    z-index: -1;
  }

  .harbas-title {
    margin: 0;
    font-size: clamp(3.1rem, 7vw, 7rem);
    line-height: 1;
    font-weight: 1000;
    letter-spacing: 6px;
    text-transform: uppercase;
    background: linear-gradient(90deg, #ffdc5c, #ffffff, #00ffd5, #00a7ff, #ffdc5c);
    background-size: 350%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: harbasGradient 4s ease infinite, harbasFloat 3s ease-in-out infinite;
    filter: drop-shadow(0 0 18px rgba(0, 255, 213, 0.55));
  }

  .harbas-title span {
    display: block;
  }

  .harbas-title .small {
    font-size: 0.55em;
    letter-spacing: 12px;
  }

  @keyframes harbasGradient {
    0% {
      background-position: 0%;
    }

    50% {
      background-position: 100%;
    }

    100% {
      background-position: 0%;
    }
  }

  @keyframes harbasFloat {
    0%,
    100% {
      transform: translateY(0) scale(1);
    }

    50% {
      transform: translateY(-8px) scale(1.035);
    }
  }

  .description-box {
    max-width: 850px;
    margin: 35px auto 0 auto;
    padding: 22px 26px;
    border-radius: 24px;
    color: #ecfffb;
    font-size: 1.05rem;
    line-height: 1.8;
    background: rgba(255, 255, 255, 0.11);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }

  .button-group {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 34px;
  }

  .harbas-btn {
    display: inline-block;
    padding: 15px 30px;
    border-radius: 999px;
    font-weight: 900;
    letter-spacing: 0.5px;
    text-decoration: none !important;
    transition: 0.25s ease;
  }

  .btn-challenge {
    color: #002332 !important;
    background: linear-gradient(135deg, #00ffd5, #00a7ff);
    box-shadow: 0 0 26px rgba(0, 255, 213, 0.42);
  }

  .btn-scoreboard {
    color: #281700 !important;
    background: linear-gradient(135deg, #ffdc5c, #ff9f43);
    box-shadow: 0 0 26px rgba(255, 220, 92, 0.42);
  }

  .btn-login {
    color: #ffffff !important;
    background: rgba(255, 255, 255, 0.13);
    border: 1px solid rgba(255, 255, 255, 0.36);
  }

  .harbas-btn:hover {
    transform: translateY(-6px) scale(1.045);
    filter: brightness(1.09);
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(150px, 1fr));
    gap: 16px;
    margin-top: 36px;
  }

  .info-card {
    padding: 20px 14px;
    border-radius: 22px;
    background: rgba(255, 255, 255, 0.105);
    border: 1px solid rgba(255, 255, 255, 0.16);
    transition: 0.25s ease;
  }

  .info-card:hover {
    transform: translateY(-7px);
    background: rgba(255, 255, 255, 0.16);
  }

  .info-card h4 {
    margin: 0 0 8px 0;
    font-size: 1.65rem;
    font-weight: 950;
    color: #ffdc5c;
  }

  .info-card p {
    margin: 0;
    font-size: 0.93rem;
    color: #dffffa;
  }

  .admin-link {
    margin-top: 28px;
    font-size: 0.95rem;
    color: #dffffa;
  }

  .admin-link a {
    color: #ffdc5c;
    font-weight: 900;
    text-decoration: none;
  }

  .admin-link a:hover {
    text-decoration: underline;
  }

  .wave {
    position: fixed;
    left: 0;
    bottom: -55px;
    width: 200%;
    height: 150px;
    border-radius: 100% 100% 0 0;
    background: rgba(0, 255, 213, 0.14);
    animation: waveMove 9s linear infinite;
    z-index: -1;
  }

  .wave.wave-two {
    bottom: -30px;
    background: rgba(0, 167, 255, 0.12);
    animation-duration: 13s;
  }

  .wave.wave-three {
    bottom: -75px;
    background: rgba(255, 220, 92, 0.08);
    animation-duration: 17s;
  }

  @keyframes waveMove {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(-50%);
    }
  }

  .floating-icon {
    position: fixed;
    font-size: 2.2rem;
    opacity: 0.75;
    z-index: -1;
    animation: floatingIcon 6s ease-in-out infinite;
  }

  .icon-one {
    top: 18%;
    left: 7%;
  }

  .icon-two {
    top: 22%;
    right: 8%;
    animation-delay: 1.5s;
  }

  .icon-three {
    bottom: 18%;
    left: 10%;
    animation-delay: 2.4s;
  }

  .icon-four {
    bottom: 22%;
    right: 10%;
    animation-delay: 3.1s;
  }

  @keyframes floatingIcon {
    0%,
    100% {
      transform: translateY(0) rotate(-5deg);
    }

    50% {
      transform: translateY(-18px) rotate(7deg);
    }
  }

  @media (max-width: 1050px) {
    .middle-zone {
      grid-template-columns: 1fr;
    }

    .gif-box {
      width: 240px;
      height: 240px;
    }

    .harbas-title-wrap {
      order: -1;
    }

    .info-grid {
      grid-template-columns: repeat(2, minmax(150px, 1fr));
    }
  }

  @media (max-width: 650px) {
    .harbas-page {
      padding: 45px 14px;
    }

    .harbas-card {
      padding: 34px 18px;
      border-radius: 26px;
    }

    .main-heading {
      font-size: 2rem;
      letter-spacing: 2px;
    }

    .main-subtitle {
      font-size: 1rem;
    }

    .harbas-title {
      font-size: 3.4rem;
      letter-spacing: 3px;
    }

    .harbas-title .small {
      letter-spacing: 8px;
    }

    .gif-box {
      width: 210px;
      height: 210px;
    }

    .description-box {
      padding: 18px;
      font-size: 0.97rem;
    }

    .button-group {
      flex-direction: column;
      align-items: center;
    }

    .harbas-btn {
      width: 100%;
      max-width: 290px;
    }

    .info-grid {
      grid-template-columns: 1fr;
    }

    .floating-icon {
      display: none;
    }
  }
</style>

<div class="wave"></div>
<div class="wave wave-two"></div>
<div class="wave wave-three"></div>

<div class="floating-icon icon-one">🏝️</div>
<div class="floating-icon icon-two">🚩</div>
<div class="floating-icon icon-three">🌊</div>
<div class="floating-icon icon-four">🔥</div>

<section class="harbas-page">
  <div class="harbas-card">
    <div class="harbas-content">

      <div class="island-badge">
        🏝️ Welcome to The Island Arena
      </div>

      <h2 class="main-heading">
        Capture The Flag Competition
      </h2>

      <p class="main-subtitle">
        Masuki arena CTF bertema pulau. Pecahkan challenge, cari vulnerability,
        rebut flag tersembunyi, dan jadilah hunter terbaik di CTF Harbas.
      </p>

      <div class="middle-zone">

        <div class="gif-box left">
          <img
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjkwcGVnd2wwcXIxYTI5YTcyZWZqYjl3aXJocHBscWZubTJuYXd2MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hgsPEyU4B3wZ8nffCi/giphy.gif"
            alt="CTF Harbas Island GIF Left"
          >
        </div>

        <div class="harbas-title-wrap">
          <h1 class="harbas-title">
            <span class="small">CTF</span>
            <span>Harbas</span>
          </h1>
        </div>

        <div class="gif-box right">
          <img
            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExc282YTBqZmVkcnQ0ZW1kbmYzZ2w4dGRwNXZyaTExbHI1bmR3Z2FzZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/uQoRcPz7qNlmXhNRAq/giphy.gif"
            alt="CTF Harbas Island GIF Right"
          >
        </div>

      </div>

      <div class="description-box">
        <strong>CTF Harbas</strong> adalah tempat untuk menguji kemampuan cyber security
        melalui berbagai kategori challenge seperti Web Exploitation, Cryptography,
        Forensics, Reverse Engineering, Pwn, dan Misc. Kumpulkan point sebanyak mungkin
        dan naikkan namamu di scoreboard.
      </div>

      <div class="button-group">
        <a href="/challenges" class="harbas-btn btn-challenge">
          🚩 Mulai Challenge
        </a>

        <a href="/scoreboard" class="harbas-btn btn-scoreboard">
          🏆 Scoreboard
        </a>

        <a href="/login" class="harbas-btn btn-login">
          🔐 Login
        </a>
      </div>

      <div class="info-grid">
        <div class="info-card">
          <h4>Web</h4>
          <p>Eksploitasi celah aplikasi web.</p>
        </div>

        <div class="info-card">
          <h4>Crypto</h4>
          <p>Pecahkan pesan dan enkripsi.</p>
        </div>

        <div class="info-card">
          <h4>Forensic</h4>
          <p>Analisis file, log, dan jejak digital.</p>
        </div>

        <div class="info-card">
          <h4>Misc</h4>
          <p>Challenge unik dan teka-teki kreatif.</p>
        </div>
      </div>


    </div>
  </div>
</section>
```

klik Save
