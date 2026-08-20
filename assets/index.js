/* =========================================================
   TVAxKVA LIVE - FRONTEND JAVASCRIPT
   ========================================================= */

(() => {
  "use strict";

  /* =========================================================
     CONFIG
     ========================================================= */

  const CONFIG = {
    siteName: "TVAxKVA Live",

    links: {
      home: "#/",
      youtube: "#/youtube",
      kick: "#/kick"
    },

    refreshInterval: 30000,

    /* Demo streamer data */
    streamers: [
      {
        id: "tva-01",
        name: "TVA Gaming",
        username: "tvagaming",
        platform: "youtube",
        game: "Gaming",
        title: "LIVE Gaming Stream",
        viewers: 1240,
        thumbnail:
          "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
        live: true,
        url: "https://www.youtube.com/"
      },

      {
        id: "kva-01",
        name: "KVA Gaming",
        username: "kvagaming",
        platform: "kick",
        game: "Grand Theft Auto V",
        title: "GTA V Malayalam Live 🔥",
        viewers: 876,
        thumbnail:
          "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=900&q=80",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
        live: true,
        url: "https://kick.com/"
      },

      {
        id: "eagle-01",
        name: "Eagle Gaming",
        username: "eaglegaming",
        platform: "youtube",
        game: "Free Fire",
        title: "Rank Push Live 🔴",
        viewers: 532,
        thumbnail:
          "https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=900&q=80",
        avatar:
          "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
        live: true,
        url: "https://www.youtube.com/"
      },

      {
        id: "streamer-04",
        name: "Gaming Creator",
        username: "gamingcreator",
        platform: "kick",
        game: "Minecraft",
        title: "Minecraft Survival",
        viewers: 245,
        thumbnail:
          "https://images.unsplash.com/photo-1607513746994-51f730a44826?auto=format&fit=crop&w=900&q=80",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        live: true,
        url: "https://kick.com/"
      }
    ]
  };


  /* =========================================================
     STATE
     ========================================================= */

  const state = {
    route: getRoute(),
    search: "",
    platform: "all",
    selectedStreamer: null,
    lastUpdated: new Date()
  };


  /* =========================================================
     HELPERS
     ========================================================= */

  function getRoute() {
    const hash = window.location.hash || "#/";

    if (hash.startsWith("#/streamer/")) {
      return "streamer";
    }

    if (hash === "#/youtube") {
      return "youtube";
    }

    if (hash === "#/kick") {
      return "kick";
    }

    return "home";
  }


  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }


  function formatViewers(number) {
    if (number >= 1000000) {
      return `${(number / 1000000).toFixed(1)}M`;
    }

    if (number >= 1000) {
      return `${(number / 1000).toFixed(1)}K`;
    }

    return String(number);
  }


  function platformName(platform) {
    return platform === "youtube" ? "YouTube" : "Kick";
  }


  function platformColor(platform) {
    return platform === "youtube" ? "#ff3030" : "#53fc18";
  }


  function navigate(path) {
    window.location.hash = path;
  }


  /* =========================================================
     DATA FILTER
     ========================================================= */

  function getVisibleStreamers() {
    let data = CONFIG.streamers.filter((streamer) => streamer.live);

    if (state.platform !== "all") {
      data = data.filter(
        (streamer) => streamer.platform === state.platform
      );
    }

    if (state.search.trim()) {
      const search = state.search.toLowerCase();

      data = data.filter((streamer) => {
        return (
          streamer.name.toLowerCase().includes(search) ||
          streamer.username.toLowerCase().includes(search) ||
          streamer.game.toLowerCase().includes(search) ||
          streamer.title.toLowerCase().includes(search)
        );
      });
    }

    return data;
  }


  /* =========================================================
     LOGO
     ========================================================= */

  function logoPair(size = "header") {
    return `
      <div class="tva-brand-logo-pair tva-brand-logo-pair--${size}">
        <img
          class="tva-brand-logo tva-brand-logo--tva"
          src="/tva-logo.webp"
          alt="TVA"
          onerror="this.style.display='none'"
        />

        <img
          class="tva-brand-logo tva-brand-logo--kva"
          src="/kva-logo.webp"
          alt="KVA"
          onerror="this.style.display='none'"
        />
      </div>
    `;
  }


  /* =========================================================
     HEADER
     ========================================================= */

  function renderHeader() {
    return `
      <header
        style="
          position:sticky;
          top:0;
          z-index:50;
          width:100%;
          background:rgba(1,3,8,.92);
          backdrop-filter:blur(18px);
          border-bottom:1px solid rgba(255,255,255,.08);
        "
      >

        <div
          style="
            max-width:1400px;
            margin:auto;
            padding:12px 18px;
            display:flex;
            align-items:center;
            gap:18px;
          "
        >

          <a
            href="#/"
            style="
              display:flex;
              align-items:center;
              text-decoration:none;
            "
          >
            ${logoPair("header")}
          </a>

          <div
            class="tva-brand-title"
            style="
              font-size:1.15rem;
              font-weight:900;
            "
          >
            <span class="tva-brand-tva">TVA</span>
            <span class="tva-brand-x">×</span>
            <span class="tva-brand-kva">KVA</span>
          </div>

          <nav
            style="
              display:flex;
              align-items:center;
              gap:7px;
              margin-left:auto;
            "
          >

            ${navButton("#/", "Home", state.route === "home")}

            ${navButton(
              "#/youtube",
              "YouTube",
              state.route === "youtube"
            )}

            ${navButton(
              "#/kick",
              "Kick",
              state.route === "kick"
            )}

          </nav>

        </div>

      </header>
    `;
  }


  function navButton(url, text, active) {
    return `
      <a
        href="${url}"
        style="
          padding:9px 13px;
          border-radius:10px;
          text-decoration:none;
          font-weight:700;
          font-size:.88rem;
          color:${active ? "#fff" : "#8995a8"};
          background:${active ? "rgba(83,252,24,.10)" : "transparent"};
          border:1px solid ${
            active ? "rgba(83,252,24,.25)" : "transparent"
          };
          transition:.2s;
        "
      >
        ${text}
      </a>
    `;
  }


  /* =========================================================
     SEARCH
     ========================================================= */

  function renderSearch() {
    return `
      <div
        style="
          width:100%;
          max-width:650px;
          margin:0 auto 25px;
          position:relative;
        "
      >

        <input
          id="tva-search"
          type="search"
          value="${escapeHTML(state.search)}"
          placeholder="Search streamers, games..."
          autocomplete="off"
          style="
            width:100%;
            padding:14px 18px;
            border-radius:14px;
            border:1px solid rgba(255,255,255,.12);
            outline:none;
            background:rgba(255,255,255,.045);
            color:#fff;
            font-size:15px;
          "
        />

      </div>
    `;
  }


  /* =========================================================
     FILTER BUTTONS
     ========================================================= */

  function renderFilters() {
    const filters = [
      ["all", "All"],
      ["youtube", "YouTube"],
      ["kick", "Kick"]
    ];

    return `
      <div
        style="
          display:flex;
          justify-content:center;
          gap:8px;
          flex-wrap:wrap;
          margin-bottom:25px;
        "
      >

        ${filters
          .map(([value, label]) => {
            const active = state.platform === value;

            return `
              <button
                class="tva-filter"
                data-platform="${value}"
                style="
                  cursor:pointer;
                  border:1px solid ${
                    active
                      ? "rgba(83,252,24,.45)"
                      : "rgba(255,255,255,.10)"
                  };
                  background:${
                    active
                      ? "rgba(83,252,24,.10)"
                      : "rgba(255,255,255,.035)"
                  };
                  color:${active ? "#70ff3b" : "#9ca7b8"};
                  border-radius:999px;
                  padding:9px 17px;
                  font-weight:700;
                "
              >
                ${label}
              </button>
            `;
          })
          .join("")}

      </div>
    `;
  }


  /* =========================================================
     STREAMER CARD
     ========================================================= */

  function streamerCard(streamer) {
    const color = platformColor(streamer.platform);

    return `
      <article
        class="tva-streamer-card"
        data-id="${streamer.id}"
        style="
          overflow:hidden;
          border-radius:17px;
          background:rgba(255,255,255,.035);
          border:1px solid rgba(255,255,255,.09);
          transition:transform .2s ease,border-color .2s ease;
        "
      >

        <div
          style="
            position:relative;
            aspect-ratio:16/9;
            overflow:hidden;
            background:#080b12;
          "
        >

          <img
            src="${streamer.thumbnail}"
            alt="${escapeHTML(streamer.title)}"
            loading="lazy"
            style="
              width:100%;
              height:100%;
              object-fit:cover;
              display:block;
            "
          />

          <div
            style="
              position:absolute;
              top:10px;
              left:10px;
              display:flex;
              align-items:center;
              gap:6px;
              padding:5px 9px;
              border-radius:7px;
              background:rgba(0,0,0,.78);
              color:#fff;
              font-size:11px;
              font-weight:900;
            "
          >
            <span
              style="
                width:7px;
                height:7px;
                border-radius:50%;
                background:#ff3030;
                box-shadow:0 0 9px #ff3030;
              "
            ></span>

            LIVE
          </div>

          <div
            style="
              position:absolute;
              bottom:10px;
              right:10px;
              padding:5px 8px;
              border-radius:6px;
              background:rgba(0,0,0,.82);
              color:#fff;
              font-size:11px;
              font-weight:700;
            "
          >
            ${formatViewers(streamer.viewers)} watching
          </div>

        </div>


        <div style="padding:14px;">

          <div
            style="
              display:flex;
              align-items:center;
              gap:10px;
            "
          >

            <img
              src="${streamer.avatar}"
              alt=""
              style="
                width:40px;
                height:40px;
                border-radius:50%;
                object-fit:cover;
              "
            />

            <div style="min-width:0;flex:1;">

              <div
                style="
                  font-weight:800;
                  color:#f5f7fa;
                  white-space:nowrap;
                  overflow:hidden;
                  text-overflow:ellipsis;
                "
              >
                ${escapeHTML(streamer.name)}
              </div>

              <div
                style="
                  font-size:12px;
                  color:#768398;
                  margin-top:2px;
                "
              >
                @${escapeHTML(streamer.username)}
              </div>

            </div>

          </div>


          <div
            style="
              margin-top:12px;
              font-size:14px;
              color:#dce2ea;
              font-weight:650;
              line-height:1.4;
            "
          >
            ${escapeHTML(streamer.title)}
          </div>


          <div
            style="
              display:flex;
              align-items:center;
              justify-content:space-between;
              gap:10px;
              margin-top:13px;
            "
          >

            <span
              style="
                color:${color};
                font-size:12px;
                font-weight:800;
              "
            >
              ${platformName(streamer.platform)}
            </span>

            <button
              class="tva-watch-button"
              data-id="${streamer.id}"
              style="
                cursor:pointer;
                border:0;
                padding:8px 13px;
                border-radius:8px;
                background:${color};
                color:#05070f;
                font-weight:900;
                font-size:12px;
              "
            >
              Watch Live
            </button>

          </div>

        </div>

      </article>
    `;
  }


  /* =========================================================
     EMPTY STATE
     ========================================================= */

  function emptyState() {
    return `
      <div
        class="home-no-live-empty"
        style="
          padding:70px 20px;
          text-align:center;
          border:1px solid rgba(255,255,255,.08);
          border-radius:18px;
          background:rgba(255,255,255,.025);
        "
      >

        <div
          style="
            font-size:42px;
            margin-bottom:12px;
          "
        >
          📡
        </div>

        <h2
          style="
            font-size:20px;
            font-weight:900;
            color:#fff;
            margin-bottom:7px;
          "
        >
          No live streamers found
        </h2>

        <p
          style="
            color:#778398;
            font-size:14px;
          "
        >
          Try another search or platform.
        </p>

      </div>
    `;
  }


  /* =========================================================
     HOME PAGE
     ========================================================= */

  function renderHome() {
    state.platform = "all";

    const streamers = getVisibleStreamers();

    return `
      ${renderHeader()}

      <main
        class="tva-dash tva-page-shell"
        style="
          min-height:100dvh;
          background:
            radial-gradient(
              circle at 10% 0%,
              rgba(255,40,60,.09),
              transparent 30%
            ),
            radial-gradient(
              circle at 90% 0%,
              rgba(83,252,24,.07),
              transparent 30%
            );
        "
      >

        <section
          style="
            max-width:1400px;
            width:100%;
            margin:auto;
            padding:45px 18px 100px;
          "
        >

          <div
            style="
              text-align:center;
              margin-bottom:32px;
            "
          >

            ${logoPair("md")}

            <h1
              style="
                margin-top:15px;
                font-size:clamp(28px,5vw,48px);
                line-height:1.05;
                font-weight:950;
                color:#fff;
              "
            >
              Live Gaming Creators
            </h1>

            <p
              style="
                margin:12px auto 0;
                max-width:600px;
                color:#8d99aa;
                font-size:15px;
              "
            >
              Find TVA × KVA creators streaming live on YouTube and Kick.
            </p>

          </div>


          ${renderSearch()}

          ${renderFilters()}


          <div
            id="tva-stream-grid"
            class="tva-offline-grid"
            style="
              display:grid;
              grid-template-columns:repeat(
                auto-fit,
                minmax(260px,1fr)
              );
              gap:18px;
            "
          >

            ${
              streamers.length
                ? streamers.map(streamerCard).join("")
                : emptyState()
            }

          </div>


          <div
            style="
              text-align:center;
              margin-top:30px;
              color:#647084;
              font-size:12px;
            "
          >
            Last updated:
            ${state.lastUpdated.toLocaleTimeString()}
          </div>

        </section>

      </main>

      ${renderMobileNav("home")}

      ${renderScrollTop()}
    `;
  }


  /* =========================================================
     PLATFORM PAGE
     ========================================================= */

  function renderPlatform(platform) {
    const streamers = getVisibleStreamers();

    return `
      ${renderHeader()}

      <main
        class="tva-dash tva-page-shell"
        style="
          min-height:100dvh;
          background:
            radial-gradient(
              circle at 50% 0%,
              ${
                platform === "kick"
                  ? "rgba(83,252,24,.09)"
                  : "rgba(255,30,45,.09)"
              },
              transparent 35%
            );
        "
      >

        <section
          style="
            max-width:1400px;
            width:100%;
            margin:auto;
            padding:40px 18px 100px;
          "
        >

          <div
            style="
              display:flex;
              justify-content:space-between;
              align-items:end;
              gap:15px;
              margin-bottom:25px;
            "
          >

            <div>

              <div
                style="
                  font-size:12px;
                  text-transform:uppercase;
                  letter-spacing:.12em;
                  color:${platformColor(platform)};
                  font-weight:900;
                  margin-bottom:6px;
                "
              >
                Live Platform
              </div>

              <h1
                style="
                  font-size:clamp(28px,5vw,42px);
                  color:#fff;
                  font-weight:950;
                "
              >
                ${platformName(platform)} Live
              </h1>

            </div>

            <div
              style="
                color:#728096;
                font-size:13px;
              "
            >
              ${streamers.length} live
            </div>

          </div>


          ${renderSearch()}


          <div
            id="tva-stream-grid"
            style="
              display:grid;
              grid-template-columns:repeat(
                auto-fit,
                minmax(260px,1fr)
              );
              gap:18px;
            "
          >

            ${
              streamers.length
                ? streamers.map(streamerCard).join("")
                : emptyState()
            }

          </div>

        </section>

      </main>

      ${renderMobileNav(platform)}

      ${renderScrollTop()}
    `;
  }


  /* =========================================================
     STREAMER PROFILE
     ========================================================= */

  function renderStreamer(id) {
    const streamer = CONFIG.streamers.find(
      (item) => item.id === id
    );

    if (!streamer) {
      return `
        ${renderHeader()}

        <main
          style="
            min-height:100dvh;
            display:grid;
            place-items:center;
            color:#fff;
            background:#05070f;
          "
        >
          <div style="text-align:center;">
            <h1>Streamer not found</h1>
            <button
              onclick="location.hash='#/'"
              style="
                margin-top:15px;
                padding:10px 16px;
                border-radius:8px;
                cursor:pointer;
              "
            >
              Go Home
            </button>
          </div>
        </main>
      `;
    }


    const color = platformColor(streamer.platform);

    return `
      <div
        class="streamer-profile-page"
        style="
          background:#05070f;
          min-height:100dvh;
          color:#fff;
        "
      >

        ${renderHeader()}

        <main
          class="streamer-profile-shell"
          style="
            max-width:1100px;
            width:100%;
            margin:auto;
            padding:30px 18px 100px;
          "
        >

          <button
            id="profile-back"
            style="
              cursor:pointer;
              border:1px solid rgba(255,255,255,.10);
              background:rgba(255,255,255,.04);
              color:#fff;
              border-radius:9px;
              padding:9px 14px;
              margin-bottom:20px;
            "
          >
            ← Back
          </button>


          <div
            style="
              border:1px solid rgba(255,255,255,.09);
              background:rgba(255,255,255,.035);
              border-radius:20px;
              overflow:hidden;
            "
          >

            <div
              style="
                aspect-ratio:16/7;
                min-height:220px;
                overflow:hidden;
              "
            >

              <img
                src="${streamer.thumbnail}"
                alt=""
                style="
                  width:100%;
                  height:100%;
                  object-fit:cover;
                "
              />

            </div>


            <div style="padding:25px;">

              <div
                style="
                  display:flex;
                  align-items:center;
                  gap:15px;
                "
              >

                <img
                  src="${streamer.avatar}"
                  alt=""
                  style="
                    width:70px;
                    height:70px;
                    border-radius:50%;
                    object-fit:cover;
                    border:2px solid ${color};
                  "
                />

                <div>

                  <h1
                    style="
                      font-size:25px;
                      font-weight:950;
                    "
                  >
                    ${escapeHTML(streamer.name)}
                  </h1>

                  <div
                    style="
                      color:#7d899b;
                      margin-top:3px;
                    "
                  >
                    @${escapeHTML(streamer.username)}
                  </div>

                </div>

              </div>


              <div
                style="
                  margin-top:25px;
                  padding:18px;
                  border-radius:14px;
                  background:rgba(255,255,255,.035);
                "
              >

                <div
                  style="
                    display:flex;
                    align-items:center;
                    gap:8px;
                    color:#ff4141;
                    font-weight:900;
                    font-size:13px;
                  "
                >

                  <span
                    style="
                      width:8px;
                      height:8px;
                      border-radius:50%;
                      background:#ff3030;
                    "
                  ></span>

                  LIVE NOW

                </div>

                <h2
                  style="
                    margin-top:10px;
                    font-size:20px;
                    font-weight:850;
                  "
                >
                  ${escapeHTML(streamer.title)}
                </h2>

                <p
                  style="
                    margin-top:7px;
                    color:#7f8b9e;
                  "
                >
                  ${escapeHTML(streamer.game)}
                  ·
                  ${formatViewers(streamer.viewers)} viewers
                </p>

              </div>


              <a
                href="${streamer.url}"
                target="_blank"
                rel="noopener noreferrer"
                style="
                  display:inline-flex;
                  margin-top:20px;
                  padding:12px 18px;
                  border-radius:10px;
                  background:${color};
                  color:#05070f;
                  font-weight:950;
                  text-decoration:none;
                "
              >
                Watch on ${platformName(streamer.platform)}
              </a>

            </div>

          </div>

        </main>

      </div>
    `;
  }


  /* =========================================================
     MOBILE NAV
     ========================================================= */

  function renderMobileNav(active) {
    return `
      <nav class="mobile-bottom-nav">

        <a
          href="#/"
          class="mobile-bottom-nav__item ${
            active === "home"
              ? "mobile-bottom-nav__item--active"
              : ""
          }"
        >
          <span class="mobile-bottom-nav__icon">⌂</span>
          <span class="mobile-bottom-nav__label">Home</span>
        </a>


        <a
          href="#/youtube"
          class="mobile-bottom-nav__item ${
            active === "youtube"
              ? "mobile-bottom-nav__item--active"
              : ""
          }"
        >
          <span class="mobile-bottom-nav__icon">▶</span>
          <span class="mobile-bottom-nav__label">YouTube</span>
        </a>


        <a
          href="#/kick"
          class="mobile-bottom-nav__item ${
            active === "kick"
              ? "mobile-bottom-nav__item--active"
              : ""
          }"
        >
          <span class="mobile-bottom-nav__icon">K</span>
          <span class="mobile-bottom-nav__label">Kick</span>
        </a>

      </nav>
    `;
  }


  /* =========================================================
     SCROLL TOP
     ========================================================= */

  function renderScrollTop() {
    return `
      <button
        id="tva-scroll-top"
        aria-label="Scroll to top"
        style="
          position:fixed;
          right:18px;
          bottom:18px;
          z-index:110;
          width:42px;
          height:42px;
          border-radius:50%;
          border:1px solid rgba(255,255,255,.12);
          background:rgba(5,7,15,.9);
          color:#fff;
          cursor:pointer;
          display:none;
          backdrop-filter:blur(10px);
        "
      >
        ↑
      </button>
    `;
  }


  /* =========================================================
     SPLASH
     ========================================================= */

  function finishSplash() {
    const splash = document.getElementById("tva-splash");

    if (!splash) return;

    splash.style.opacity = "0";
    splash.style.transition = "opacity .35s ease";

    setTimeout(() => {
      splash.remove();
      document.body.classList.add("tva-app-ready");

      window.dispatchEvent(
        new CustomEvent("tva-app-ready")
      );
    }, 350);
  }


  /* =========================================================
     RENDER APP
     ========================================================= */

  function render() {
    const app = document.getElementById("app");

    if (!app) return;

    state.route = getRoute();

    if (state.route === "streamer") {
      const id = window.location.hash
        .replace("#/streamer/", "")
        .split("?")[0];

      app.innerHTML = renderStreamer(id);
    }

    else if (state.route === "youtube") {
      state.platform = "youtube";
      app.innerHTML = renderPlatform("youtube");
    }

    else if (state.route === "kick") {
      state.platform = "kick";
      app.innerHTML = renderPlatform("kick");
    }

    else {
      app.innerHTML = renderHome();
    }

    attachEvents();
  }


  /* =========================================================
     EVENTS
     ========================================================= */

  function attachEvents() {

    /* Search */
    const search = document.getElementById("tva-search");

    if (search) {
      search.addEventListener("input", (event) => {
        state.search = event.target.value;
        render();
      });
    }


    /* Filters */
    document
      .querySelectorAll(".tva-filter")
      .forEach((button) => {

        button.addEventListener("click", () => {

          state.platform =
            button.dataset.platform || "all";

          render();
        });

      });


    /* Streamer cards */
    document
      .querySelectorAll(".tva-streamer-card")
      .forEach((card) => {

        card.addEventListener("click", (event) => {

          if (
            event.target.closest(".tva-watch-button")
          ) {
            return;
          }

          const id = card.dataset.id;

          if (id) {
            navigate(`#/streamer/${id}`);
          }

        });


        card.addEventListener("mouseenter", () => {
          card.style.transform = "translateY(-4px)";
          card.style.borderColor =
            "rgba(83,252,24,.25)";
        });


        card.addEventListener("mouseleave", () => {
          card.style.transform = "";
          card.style.borderColor =
            "rgba(255,255,255,.09)";
        });

      });


    /* Watch buttons */
    document
      .querySelectorAll(".tva-watch-button")
      .forEach((button) => {

        button.addEventListener("click", () => {

          const streamer = CONFIG.streamers.find(
            (item) =>
              item.id === button.dataset.id
          );

          if (!streamer) return;

          window.open(
            streamer.url,
            "_blank",
            "noopener,noreferrer"
          );

        });

      });


    /* Back */
    const back = document.getElementById(
      "profile-back"
    );

    if (back) {
      back.addEventListener("click", () => {
        navigate("#/");
      });
    }


    /* Scroll top */
    const scrollTop = document.getElementById(
      "tva-scroll-top"
    );

    if (scrollTop) {

      scrollTop.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      });

      updateScrollButton();
    }
  }


  function updateScrollButton() {
    const button =
      document.getElementById("tva-scroll-top");

    if (!button) return;

    button.style.display =
      window.scrollY > 400
        ? "block"
        : "none";
  }


  /* =========================================================
     REAL-TIME DEMO REFRESH
     ========================================================= */

  function refreshData() {

    /*
      Demo viewer-count update.

      Replace this function later with:
      - YouTube Data API
      - Kick API/backend
    */

    CONFIG.streamers.forEach((streamer) => {

      if (!streamer.live) return;

      const variation =
        Math.floor(Math.random() * 80) - 40;

      streamer.viewers = Math.max(
        1,
        streamer.viewers + variation
      );

    });

    state.lastUpdated = new Date();

    render();
  }


  /* =========================================================
     KEYBOARD SHORTCUTS
     ========================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "/" &&
        document.activeElement?.tagName !== "INPUT"
      ) {

        event.preventDefault();

        const input =
          document.getElementById("tva-search");

        if (input) {
          input.focus();
        }
      }


      if (event.key === "Escape") {

        const input =
          document.getElementById("tva-search");

        if (
          input &&
          document.activeElement === input
        ) {
          input.blur();
        }
      }

    }
  );


  /* =========================================================
     HASH ROUTING
     ========================================================= */

  window.addEventListener(
    "hashchange",
    () => {

      state.search = "";

      render();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );


  /* =========================================================
     SCROLL EVENT
     ========================================================= */

  window.addEventListener(
    "scroll",
    updateScrollButton,
    { passive: true }
  );


  /* =========================================================
     INITIALIZE
     ========================================================= */

  function init() {

    render();

    setTimeout(() => {
      finishSplash();
    }, 800);

    /*
      Demo refresh every 30 seconds.
    */
    setInterval(
      refreshData,
      CONFIG.refreshInterval
    );
  }


  if (
    document.readyState === "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      init,
      { once: true }
    );
  } else {
    init();
  }

})();
