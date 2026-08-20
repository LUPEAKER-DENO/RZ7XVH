/* =========================================================
   TVAxKVA LIVE
   MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   CONFIG
========================================================= */

const CONFIG = {

  refreshTime: 30000,

  creators: [

    {
      id: "tva-gaming",

      name: "TVA Gaming",

      username: "@TVAGaming",

      platform: "youtube",

      game: "Gaming",

      title: "TVA Gaming Live 🔴",

      viewers: 1240,

      live: true,

      url: "https://www.youtube.com/"
    },

    {
      id: "kva-gaming",

      name: "KVA Gaming",

      username: "@KVAGaming",

      platform: "kick",

      game: "Gaming",

      title: "KVA Gaming Live 🟢",

      viewers: 870,

      live: true,

      url: "https://kick.com/"
    },

    {
      id: "eagle-gaming",

      name: "Eagle Gaming",

      username: "@EagleGaming",

      platform: "youtube",

      game: "Free Fire",

      title: "Rank Push Live 🔥",

      viewers: 540,

      live: true,

      url: "https://www.youtube.com/"
    },

    {
      id: "gaming-creator",

      name: "Gaming Creator",

      username: "@GamingCreator",

      platform: "kick",

      game: "GTA V",

      title: "GTA V Malayalam Live",

      viewers: 320,

      live: true,

      url: "https://kick.com/"
    },

    {
      id: "minecraft-player",

      name: "Minecraft Player",

      username: "@MinecraftPlayer",

      platform: "youtube",

      game: "Minecraft",

      title: "Minecraft Survival",

      viewers: 185,

      live: false,

      url: "https://www.youtube.com/"
    },

    {
      id: "pro-player",

      name: "Pro Gaming",

      username: "@ProGaming",

      platform: "kick",

      game: "Valorant",

      title: "Competitive Gaming",

      viewers: 0,

      live: false,

      url: "https://kick.com/"
    }

  ]

};


/* =========================================================
   STATE
========================================================= */

const state = {

  page: "home",

  search: "",

  filter: "all",

  selectedCreator: null

};


/* =========================================================
   DOM
========================================================= */

const page = document.getElementById("page");

const splash = document.getElementById("splash");

const scrollTop =
  document.getElementById("scrollTop");


/* =========================================================
   HELPERS
========================================================= */

function escapeHTML(value) {

  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


function getCreator(id) {

  return CONFIG.creators.find(
    creator => creator.id === id
  );

}


function getInitials(name) {

  return name
    .split(" ")
    .map(word => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

}


function formatViewers(number) {

  if (number >= 1000000) {

    return (
      (number / 1000000)
        .toFixed(1)
        .replace(".0", "") +
      "M"
    );

  }


  if (number >= 1000) {

    return (
      (number / 1000)
        .toFixed(1)
        .replace(".0", "") +
      "K"
    );

  }


  return String(number);

}


/* =========================================================
   ROUTER
========================================================= */

function readRoute() {

  const hash =
    window.location.hash || "#home";


  if (hash.startsWith("#profile/")) {

    state.page = "profile";

    state.selectedCreator =
      hash.replace("#profile/", "");

    return;
  }


  if (hash === "#youtube") {

    state.page = "youtube";

    return;
  }


  if (hash === "#kick") {

    state.page = "kick";

    return;
  }


  state.page = "home";

}


window.addEventListener(
  "hashchange",
  () => {

    readRoute();

    state.search = "";

    render();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
);


/* =========================================================
   HEADER ACTIVE STATE
========================================================= */

function updateNavigation() {

  document
    .querySelectorAll("[data-nav]")
    .forEach(link => {

      const target =
        link.dataset.nav;

      link.classList.toggle(
        "active",
        target === state.page
      );

    });


  document
    .querySelectorAll("[data-mobile-nav]")
    .forEach(link => {

      const target =
        link.dataset.mobileNav;

      link.classList.toggle(
        "active",
        target === state.page
      );

    });

}


/* =========================================================
   FILTER DATA
========================================================= */

function getCreators() {

  let list = [...CONFIG.creators];


  if (state.page === "youtube") {

    list = list.filter(
      creator =>
        creator.platform === "youtube"
    );

  }


  if (state.page === "kick") {

    list = list.filter(
      creator =>
        creator.platform === "kick"
    );

  }


  if (state.filter === "live") {

    list = list.filter(
      creator => creator.live
    );

  }


  if (state.filter === "offline") {

    list = list.filter(
      creator => !creator.live
    );

  }


  if (state.search.trim()) {

    const query =
      state.search
        .trim()
        .toLowerCase();


    list = list.filter(creator => {

      return (

        creator.name
          .toLowerCase()
          .includes(query)

        ||

        creator.username
          .toLowerCase()
          .includes(query)

        ||

        creator.game
          .toLowerCase()
          .includes(query)

        ||

        creator.title
          .toLowerCase()
          .includes(query)

      );

    });

  }


  return list;

}


/* =========================================================
   STATS
========================================================= */

function renderStats() {

  const live =
    CONFIG.creators.filter(
      creator => creator.live
    ).length;


  const youtube =
    CONFIG.creators.filter(
      creator =>
        creator.live &&
        creator.platform === "youtube"
    ).length;


  const kick =
    CONFIG.creators.filter(
      creator =>
        creator.live &&
        creator.platform === "kick"
    ).length;


  return `

    <div class="stats">

      <div class="stat">

        <strong>${live}</strong>

        <span>
          Live Now
        </span>

      </div>


      <div class="stat">

        <strong>${youtube}</strong>

        <span>
          YouTube
        </span>

      </div>


      <div class="stat">

        <strong>${kick}</strong>

        <span>
          Kick
        </span>

      </div>

    </div>

  `;

}


/* =========================================================
   HERO
========================================================= */

function renderHero() {

  let title =
    "Live Gaming Creators";

  let description =
    "Discover gaming creators currently streaming on YouTube and Kick.";


  if (state.page === "youtube") {

    title =
      "YouTube Live";

    description =
      "Gaming creators currently streaming live on YouTube.";

  }


  if (state.page === "kick") {

    title =
      "Kick Live";

    description =
      "Gaming creators currently streaming live on Kick.";

  }


  return `

    <section class="hero">

      <div class="hero-logo">

        <span class="red">
          TVA
        </span>

        <span class="x">
          ×
        </span>

        <span class="green">
          KVA
        </span>

      </div>


      <h1>
        ${title}
      </h1>


      <p>
        ${description}
      </p>

    </section>

  `;

}


/* =========================================================
   SEARCH
========================================================= */

function renderSearch() {

  return `

    <div class="search-wrapper">

      <input

        id="search"

        class="search"

        type="search"

        autocomplete="off"

        placeholder="🔎 Search streamer or game..."

        value="${escapeHTML(state.search)}"

      >

    </div>

  `;

}


/* =========================================================
   FILTERS
========================================================= */

function renderFilters() {

  return `

    <div class="filters">

      <button

        class="filter ${
          state.filter === "all"
            ? "active"
            : ""
        }"

        data-filter="all"

      >
        All
      </button>


      <button

        class="filter ${
          state.filter === "live"
            ? "active"
            : ""
        }"

        data-filter="live"

      >
        🔴 Live
      </button>


      <button

        class="filter ${
          state.filter === "offline"
            ? "active"
            : ""
        }"

        data-filter="offline"

      >
        ⚫ Offline
      </button>

    </div>

  `;

}


/* =========================================================
   STREAMER CARD
========================================================= */

function renderCard(creator) {

  const isYoutube =
    creator.platform === "youtube";


  return `

    <article

      class="streamer-card ${
        creator.live
          ? ""
          : "offline-card"
      }"

    >

      <div class="card-banner">

        <div class="card-pattern"></div>


        <div class="live-badge">

          <span class="live-dot"></span>

          ${
            creator.live
              ? "LIVE"
              : "OFFLINE"
          }

        </div>

      </div>


      <div class="card-content">


        <div class="creator">

          <div class="avatar">

            ${getInitials(creator.name)}

          </div>


          <div>

            <div class="creator-name">

              ${escapeHTML(
                creator.name
              )}

            </div>


            <div class="creator-username">

              ${escapeHTML(
                creator.username
              )}

            </div>

          </div>

        </div>


        <div class="stream-title">

          ${escapeHTML(
            creator.title
          )}

        </div>


        <div class="card-info">

          <span
            class="${
              isYoutube
                ? "platform-youtube"
                : "platform-kick"
            }"
          >

            ${
              isYoutube
                ? "🔴 YouTube"
                : "🟢 Kick"
            }

          </span>


          <span>

            🎮
            ${escapeHTML(
              creator.game
            )}

          </span>


          ${
            creator.live
              ? `
                <span>
                  👁
                  ${formatViewers(
                    creator.viewers
                  )}
                </span>
              `
              : `
                <span>
                  Offline
                </span>
              `
          }

        </div>


        ${
          creator.live
            ? `
              <button

                class="watch-btn ${
                  isYoutube
                    ? "youtube"
                    : ""
                }"

                data-watch="${creator.id}"

              >
                Watch Live
              </button>
            `
            : `
              <button

                class="watch-btn ${
                  isYoutube
                    ? "youtube"
                    : ""
                }"

                data-profile="${creator.id}"

              >
                View Profile
              </button>
            `
        }


      </div>

    </article>

  `;

}


/* =========================================================
   GRID
========================================================= */

function renderGrid() {

  const creators =
    getCreators();


  if (!creators.length) {

    return `

      <div class="empty">

        <div class="empty-icon">
          📡
        </div>

        <h2>
          No creators found
        </h2>

        <p>
          Try another search or filter.
        </p>

      </div>

    `;

  }


  return creators
    .map(renderCard)
    .join("");

}


/* =========================================================
   HOME / PLATFORM PAGE
========================================================= */

function renderDashboard() {

  return `

    <div class="page">

      <div class="container">

        ${renderHero()}

        ${renderStats()}

        ${renderSearch()}

        ${renderFilters()}


        <section
          id="streamerGrid"
          class="streamer-grid"
        >

          ${renderGrid()}

        </section>


        <div
          style="
            text-align:center;
            margin-top:28px;
            color:#596579;
            font-size:11px;
          "
        >

          Auto refresh:
          30 seconds

        </div>

      </div>

    </div>

  `;

}


/* =========================================================
   PROFILE PAGE
========================================================= */

function renderProfile() {

  const creator =
    getCreator(
      state.selectedCreator
    );


  if (!creator) {

    return `

      <div class="page">

        <div class="container">

          <div class="empty">

            <div class="empty-icon">
              👤
            </div>

            <h2>
              Creator not found
            </h2>

            <p>
              This streamer does not exist.
            </p>

          </div>

        </div>

      </div>

    `;

  }


  const youtube =
    creator.platform === "youtube";


  return `

    <div class="page">

      <div class="container">

        <section class="profile">


          <button
            class="back-btn"
            id="backButton"
          >
            ← Back
          </button>


          <div class="profile-box">


            <div class="profile-banner"></div>


            <div class="profile-body">


              <div class="profile-head">

                <div class="profile-avatar">

                  ${getInitials(
                    creator.name
                  )}

                </div>


                <div>

                  <div class="profile-name">

                    ${escapeHTML(
                      creator.name
                    )}

                  </div>


                  <div class="profile-user">

                    ${escapeHTML(
                      creator.username
                    )}

                  </div>

                </div>

              </div>


              <div class="profile-status">

                <span class="live-dot"></span>

                ${
                  creator.live
                    ? "LIVE NOW"
                    : "OFFLINE"
                }

              </div>


              <div class="profile-title">

                ${escapeHTML(
                  creator.title
                )}

              </div>


              <div class="profile-meta">

                🎮
                ${escapeHTML(
                  creator.game
                )}

                &nbsp; · &nbsp;

                ${
                  creator.live
                    ? `
                      👁
                      ${formatViewers(
                        creator.viewers
                      )}
                      viewers
                    `
                    : "Currently offline"
                }

              </div>


              <a

                class="profile-link ${
                  youtube
                    ? "youtube"
                    : ""
                }"

                href="${escapeHTML(
                  creator.url
                )}"

                target="_blank"

                rel="noopener noreferrer"

              >

                ${
                  youtube
                    ? "🔴 Watch on YouTube"
                    : "🟢 Watch on Kick"
                }

              </a>


            </div>

          </div>

        </section>

      </div>

    </div>

  `;

}


/* =========================================================
   RENDER
========================================================= */

function render() {

  if (state.page === "profile") {

    page.innerHTML =
      renderProfile();

  } else {

    page.innerHTML =
      renderDashboard();

  }


  updateNavigation();

  attachEvents();

}


/* =========================================================
   EVENTS
========================================================= */

function attachEvents() {


  /* Search */

  const search =
    document.getElementById("search");


  if (search) {

    search.addEventListener(
      "input",
      event => {

        state.search =
          event.target.value;

        render();

        const newSearch =
          document.getElementById(
            "search"
          );


        if (newSearch) {

          newSearch.focus();

          newSearch.setSelectionRange(
            state.search.length,
            state.search.length
          );

        }

      }
    );

  }


  /* Filters */

  document
    .querySelectorAll("[data-filter]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          state.filter =
            button.dataset.filter;

          render();

        }
      );

    });


  /* Watch buttons */

  document
    .querySelectorAll("[data-watch]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const creator =
            getCreator(
              button.dataset.watch
            );


          if (!creator) {
            return;
          }


          window.open(
            creator.url,
            "_blank",
            "noopener,noreferrer"
          );

        }
      );

    });


  /* Profile */

  document
    .querySelectorAll("[data-profile]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          location.hash =
            "#profile/" +
            button.dataset.profile;

        }
      );

    });


  /* Back */

  const back =
    document.getElementById(
      "backButton"
    );


  if (back) {

    back.addEventListener(
      "click",
      () => {

        location.hash = "#home";

      }
    );

  }

}


/* =========================================================
   SCROLL TOP
========================================================= */

window.addEventListener(
  "scroll",
  () => {

    if (
      window.scrollY > 450
    ) {

      scrollTop.classList.add(
        "show"
      );

    } else {

      scrollTop.classList.remove(
        "show"
      );

    }

  },
  { passive: true }
);


scrollTop.addEventListener(
  "click",
  () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
);


/* =========================================================
   LIVE DATA REFRESH
========================================================= */

/*
  This is a frontend demo data layer.

  Later you can replace this function
  with your real YouTube/Kick API request.
*/

function refreshLiveData() {

  CONFIG.creators.forEach(
    creator => {

      if (!creator.live) {
        return;
      }


      const change =
        Math.floor(
          Math.random() * 80
        ) - 30;


      creator.viewers =
        Math.max(
          1,
          creator.viewers + change
        );

    }
  );


  if (
    state.page !== "profile"
  ) {

    render();

  }

}


/* =========================================================
   AUTO REFRESH
========================================================= */

setInterval(
  refreshLiveData,
  CONFIG.refreshTime
);


/* =========================================================
   SPLASH
========================================================= */

window.addEventListener(
  "load",
  () => {

    setTimeout(
      () => {

        splash.classList.add(
          "hide"
        );

      },
      1200
    );

  }
);


/* =========================================================
   START
========================================================= */

readRoute();

render();
