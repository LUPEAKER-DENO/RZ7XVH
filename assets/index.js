(() => {
  "use strict";

  const APP = document.getElementById("app");

  if (!APP) {
    console.error("TVAxKVA: #app not found");
    return;
  }

  const creators = [
    {
      id: "tva",
      name: "TVA Gaming",
      username: "@TVAGaming",
      platform: "YouTube",
      game: "Gaming",
      title: "TVA Gaming Live Stream",
      viewers: "1.2K",
      url: "https://www.youtube.com/"
    },
    {
      id: "kva",
      name: "KVA Gaming",
      username: "@KVAGaming",
      platform: "Kick",
      game: "Gaming",
      title: "KVA Gaming Live",
      viewers: "850",
      url: "https://kick.com/"
    }
  ];

  let currentPage = "home";
  let searchText = "";

  /* =========================
     BASIC STYLES
     ========================= */

  const style = document.createElement("style");

  style.textContent = `
    #app {
      min-height: 100vh;
      background: #05070f;
      color: #fff;
    }

    .tva-main {
      min-height: 100vh;
      background:
        radial-gradient(
          circle at 10% 0%,
          rgba(255,40,55,.10),
          transparent 30%
        ),
        radial-gradient(
          circle at 90% 0%,
          rgba(83,252,24,.08),
          transparent 30%
        );
    }

    .tva-header {
      position: sticky;
      top: 0;
      z-index: 999;
      width: 100%;
      background: rgba(3,5,12,.92);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border-bottom: 1px solid rgba(255,255,255,.08);
    }

    .tva-header-inner {
      max-width: 1400px;
      margin: auto;
      min-height: 72px;
      padding: 10px 18px;
      display: flex;
      align-items: center;
      gap: 18px;
    }

    .tva-logo-text {
      text-decoration: none;
      white-space: nowrap;
      font-size: 20px;
      font-weight: 900;
    }

    .tva-red {
      color: #ff4545;
      text-shadow: 0 0 12px rgba(255,55,55,.55);
    }

    .tva-green {
      color: #53fc18;
      text-shadow: 0 0 12px rgba(83,252,24,.45);
    }

    .tva-x {
      color: #9ba6b1;
      margin: 0 4px;
    }

    .tva-nav {
      margin-left: auto;
      display: flex;
      gap: 6px;
    }

    .tva-nav button {
      border: 1px solid transparent;
      background: transparent;
      color: #8d99aa;
      padding: 9px 13px;
      border-radius: 9px;
      cursor: pointer;
      font-weight: 800;
    }

    .tva-nav button:hover,
    .tva-nav button.active {
      color: #fff;
      background: rgba(83,252,24,.08);
      border-color: rgba(83,252,24,.2);
    }

    .tva-container {
      width: min(1400px, 100%);
      margin: auto;
      padding: 45px 18px 90px;
    }

    .tva-hero {
      text-align: center;
      padding: 20px 0 35px;
    }

    .tva-hero h1 {
      margin: 15px 0 10px;
      font-size: clamp(30px, 5vw, 52px);
      line-height: 1.05;
      font-weight: 950;
    }

    .tva-hero p {
      color: #8995a8;
      max-width: 650px;
      margin: auto;
      line-height: 1.6;
    }

    .tva-search {
      max-width: 650px;
      margin: 0 auto 22px;
    }

    .tva-search input {
      width: 100%;
      height: 48px;
      padding: 0 16px;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,.1);
      outline: none;
      background: rgba(255,255,255,.045);
      color: #fff;
      font-size: 14px;
    }

    .tva-search input:focus {
      border-color: rgba(83,252,24,.45);
      box-shadow: 0 0 0 3px rgba(83,252,24,.06);
    }

    .tva-filters {
      display: flex;
      justify-content: center;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 25px;
    }

    .tva-filter {
      border: 1px solid rgba(255,255,255,.1);
      background: rgba(255,255,255,.035);
      color: #8d99aa;
      border-radius: 999px;
      padding: 8px 16px;
      cursor: pointer;
      font-weight: 800;
    }

    .tva-filter.active {
      color: #53fc18;
      border-color: rgba(83,252,24,.35);
      background: rgba(83,252,24,.08);
    }

    .tva-grid {
      display: grid;
      grid-template-columns:
        repeat(auto-fit, minmax(260px, 1fr));
      gap: 18px;
    }

    .tva-card {
      border: 1px solid rgba(255,255,255,.09);
      background: rgba(255,255,255,.035);
      border-radius: 17px;
      padding: 20px;
      transition: .2s ease;
    }

    .tva-card:hover {
      transform: translateY(-4px);
      border-color: rgba(83,252,24,.25);
      background: rgba(255,255,255,.05);
    }

    .tva-card-top {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .tva-avatar {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      flex-shrink: 0;
      font-size: 18px;
      font-weight: 950;
      background:
        linear-gradient(
          135deg,
          #ff3030,
          #53fc18
        );
      color: #05070f;
    }

    .tva-name {
      color: #fff;
      font-weight: 900;
      font-size: 16px;
    }

    .tva-username {
      color: #718096;
      font-size: 12px;
      margin-top: 3px;
    }

    .tva-live {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-top: 18px;
      color: #ff4b4b;
      font-size: 11px;
      font-weight: 950;
      letter-spacing: .05em;
    }

    .tva-live-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #ff3030;
      box-shadow: 0 0 10px #ff3030;
    }

    .tva-title {
      color: #e6eaf0;
      font-weight: 750;
      margin-top: 10px;
      line-height: 1.45;
    }

    .tva-meta {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      margin-top: 18px;
      color: #738095;
      font-size: 12px;
      font-weight: 700;
    }

    .tva-platform-youtube {
      color: #ff4545;
    }

    .tva-platform-kick {
      color: #53fc18;
    }

    .tva-watch {
      width: 100%;
      margin-top: 18px;
      height: 40px;
      border: 0;
      border-radius: 9px;
      cursor: pointer;
      background: #53fc18;
      color: #05070f;
      font-weight: 950;
    }

    .tva-watch.youtube {
      background: #ff4545;
      color: #fff;
    }

    .tva-empty {
      grid-column: 1 / -1;
      padding: 70px 20px;
      text-align: center;
      border: 1px solid rgba(255,255,255,.08);
      border-radius: 17px;
      background: rgba(255,255,255,.025);
    }

    .tva-empty h2 {
      margin: 10px 0;
    }

    .tva-empty p {
      color: #718096;
    }

    .tva-footer {
      text-align: center;
      padding: 30px 18px;
      color: #566174;
      font-size: 12px;
    }

    @media(max-width: 767px) {
      .tva-header-inner {
        min-height: 62px;
        padding: 8px 13px;
      }

      .tva-logo-text {
        font-size: 17px;
      }

      .tva-nav button {
        padding: 7px 8px;
        font-size: 11px;
      }

      .tva-container {
        padding: 30px 13px 90px;
      }

      .tva-hero h1 {
        font-size: 32px;
      }

      .tva-grid {
        grid-template-columns: 1fr;
      }
    }
  `;

  document.head.appendChild(style);


  /* =========================
     HEADER
     ========================= */

  function header() {
    return `
      <header class="tva-header">

        <div class="tva-header-inner">

          <a
            href="#/"
            class="tva-logo-text"
          >
            <span class="tva-red">TVA</span>
            <span class="tva-x">×</span>
            <span class="tva-green">KVA</span>
          </a>

          <nav class="tva-nav">

            <button
              data-page="home"
              class="${currentPage === "home" ? "active" : ""}"
            >
              Home
            </button>

            <button
              data-page="youtube"
              class="${currentPage === "youtube" ? "active" : ""}"
            >
              YouTube
            </button>

            <button
              data-page="kick"
              class="${currentPage === "kick" ? "active" : ""}"
            >
              Kick
            </button>

          </nav>

        </div>

      </header>
    `;
  }


  /* =========================
     HERO
     ========================= */

  function hero() {
    return `
      <section class="tva-hero">

        <div class="tva-brand-title">
          <span class="tva-brand-tva">TVA</span>
          <span class="tva-brand-x">×</span>
          <span class="tva-brand-kva">KVA</span>
        </div>

        <h1>
          Live Gaming Creators
        </h1>

        <p>
          Find TVA × KVA creators streaming live
          on YouTube and Kick.
        </p>

      </section>
    `;
  }


  /* =========================
     SEARCH
     ========================= */

  function searchBox() {
    return `
      <div class="tva-search">

        <input
          id="tva-search-input"
          type="search"
          placeholder="Search streamers or games..."
          value="${escape(searchText)}"
        />

      </div>
    `;
  }


  /* =========================
     FILTERS
     ========================= */

  function filters() {
    return `
      <div class="tva-filters">

        <button
          class="tva-filter ${
            currentPage === "home" ? "active" : ""
          }"
          data-filter="all"
        >
          All
        </button>

        <button
          class="tva-filter ${
            currentPage === "youtube" ? "active" : ""
          }"
          data-filter="youtube"
        >
          YouTube
        </button>

        <button
          class="tva-filter ${
            currentPage === "kick" ? "active" : ""
          }"
          data-filter="kick"
        >
          Kick
        </button>

      </div>
    `;
  }


  /* =========================
     CARD
     ========================= */

  function card(creator) {

    const initials = creator.name
      .split(" ")
      .map(x => x[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const youtube =
      creator.platform.toLowerCase() === "youtube";

    return `
      <article class="tva-card">

        <div class="tva-card-top">

          <div class="tva-avatar">
            ${initials}
          </div>

          <div>

            <div class="tva-name">
              ${escape(creator.name)}
            </div>

            <div class="tva-username">
              ${escape(creator.username)}
            </div>

          </div>

        </div>

        <div class="tva-live">

          <span class="tva-live-dot"></span>

          LIVE NOW

        </div>

        <div class="tva-title">
          ${escape(creator.title)}
        </div>

        <div class="tva-meta">

          <span
            class="${
              youtube
                ? "tva-platform-youtube"
                : "tva-platform-kick"
            }"
          >
            ${creator.platform}
          </span>

          <span>
            ${escape(creator.game)}
          </span>

          <span>
            ${escape(creator.viewers)}
            viewers
          </span>

        </div>

        <button
          class="tva-watch ${
            youtube ? "youtube" : ""
          }"
          data-url="${escape(creator.url)}"
        >
          Watch Live
        </button>

      </article>
    `;
  }


  /* =========================
     FILTER DATA
     ========================= */

  function filteredCreators() {

    let list = creators;

    if (currentPage === "youtube") {
      list = list.filter(
        c => c.platform === "YouTube"
      );
    }

    if (currentPage === "kick") {
      list = list.filter(
        c => c.platform === "Kick"
      );
    }

    if (searchText.trim()) {

      const q =
        searchText.trim().toLowerCase();

      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.username.toLowerCase().includes(q) ||
        c.game.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q)
      );
    }

    return list;
  }


  /* =========================
     MAIN PAGE
     ========================= */

  function render() {

    const list = filteredCreators();

    APP.innerHTML = `
      <div class="tva-main">

        ${header()}

        <main class="tva-container">

          ${hero()}

          ${searchBox()}

          ${filters()}

          <section
            id="tva-grid"
            class="tva-grid"
          >

            ${
              list.length
                ? list.map(card).join("")
                : `
                  <div class="tva-empty">

                    <div style="font-size:42px">
                      📡
                    </div>

                    <h2>
                      No live creators found
                    </h2>

                    <p>
                      Try another search or platform.
                    </p>

                  </div>
                `
            }

          </section>

        </main>

        <footer class="tva-footer">
          TVAxKVA Live · Live Gaming Creators
        </footer>

      </div>
    `;

    events();
  }


  /* =========================
     EVENTS
     ========================= */

  function events() {

    document
      .querySelectorAll("[data-page]")
      .forEach(button => {

        button.addEventListener("click", () => {

          const page =
            button.dataset.page;

          if (page === "home") {
            location.hash = "#/";
          }

          if (page === "youtube") {
            location.hash = "#/youtube";
          }

          if (page === "kick") {
            location.hash = "#/kick";
          }

        });

      });


    document
      .querySelectorAll("[data-filter]")
      .forEach(button => {

        button.addEventListener("click", () => {

          const filter =
            button.dataset.filter;

          if (filter === "all") {
            location.hash = "#/";
          }

          if (filter === "youtube") {
            location.hash = "#/youtube";
          }

          if (filter === "kick") {
            location.hash = "#/kick";
          }

        });

      });


    const input =
      document.getElementById(
        "tva-search-input"
      );

    if (input) {

      input.addEventListener(
        "input",
        event => {

          searchText =
            event.target.value;

          render();

          const newInput =
            document.getElementById(
              "tva-search-input"
            );

          if (newInput) {

            newInput.focus();

            newInput.setSelectionRange(
              searchText.length,
              searchText.length
            );

          }

        }
      );

    }


    document
      .querySelectorAll(".tva-watch")
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            const url =
              button.dataset.url;

            if (url) {
              window.open(
                url,
                "_blank",
                "noopener,noreferrer"
              );
            }

          }
        );

      });
  }


  /* =========================
     HASH ROUTING
     ========================= */

  function route() {

    const hash =
      window.location.hash;

    if (hash === "#/youtube") {
      currentPage = "youtube";
    }

    else if (hash === "#/kick") {
      currentPage = "kick";
    }

    else {
      currentPage = "home";
    }

    render();
  }


  /* =========================
     ESCAPE
     ========================= */

  function escape(value) {

    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }


  /* =========================
     START
     ========================= */

  window.addEventListener(
    "hashchange",
    route
  );

  route();


  /*
    Remove original splash safely.
  */

  setTimeout(() => {

    const splash =
      document.getElementById(
        "tva-splash"
      );

    if (splash) {

      splash.style.opacity = "0";
      splash.style.transition =
        "opacity .35s ease";

      setTimeout(() => {

        splash.remove();

        document.body.classList.add(
          "tva-app-ready"
        );

        window.dispatchEvent(
          new CustomEvent(
            "tva-app-ready"
          )
        );

      }, 350);

    }

  }, 900);

})();
