/* ==========================================
   TVAxKVA LIVE
   Frontend Demo / Data Structure
========================================== */


/* ==========================================
   STREAMER DATA
   ഇവിടെയാണ് നിന്റെ real streamers add ചെയ്യേണ്ടത്
========================================== */

const streamers = [

  {
    id: 1,
    name: "TVA Gaming",
    game: "Grand Theft Auto V",
    platform: "youtube",
    live: true,
    viewers: 1240,
    avatar: "T",
    description: "Gaming, entertainment and live streams.",
    youtube: "https://youtube.com/",
    kick: "https://kick.com/"
  },

  {
    id: 2,
    name: "KVA Live",
    game: "Valorant",
    platform: "kick",
    live: true,
    viewers: 890,
    avatar: "K",
    description: "Competitive gaming and chill streams.",
    youtube: "https://youtube.com/",
    kick: "https://kick.com/"
  },

  {
    id: 3,
    name: "Eagle Gaming",
    game: "PUBG",
    platform: "youtube",
    live: true,
    viewers: 540,
    avatar: "E",
    description: "PUBG and multiplayer gaming.",
    youtube: "https://youtube.com/",
    kick: "https://kick.com/"
  },

  {
    id: 4,
    name: "ThakkuduVava",
    game: "Minecraft",
    platform: "kick",
    live: true,
    viewers: 720,
    avatar: "T",
    description: "Minecraft adventures and gaming.",
    youtube: "https://youtube.com/",
    kick: "https://kick.com/"
  },

  {
    id: 5,
    name: "Shadow Gamer",
    game: "Fortnite",
    platform: "youtube",
    live: false,
    viewers: 0,
    avatar: "S",
    description: "Fortnite gaming creator.",
    youtube: "https://youtube.com/",
    kick: "https://kick.com/"
  },

  {
    id: 6,
    name: "Night Wolf",
    game: "Call of Duty",
    platform: "kick",
    live: false,
    viewers: 0,
    avatar: "N",
    description: "FPS gaming streamer.",
    youtube: "https://youtube.com/",
    kick: "https://kick.com/"
  },

  {
    id: 7,
    name: "Pixel King",
    game: "Minecraft",
    platform: "youtube",
    live: false,
    viewers: 0,
    avatar: "P",
    description: "Minecraft creator and gamer.",
    youtube: "https://youtube.com/",
    kick: "https://kick.com/"
  },

  {
    id: 8,
    name: "Pro Player",
    game: "Valorant",
    platform: "kick",
    live: false,
    viewers: 0,
    avatar: "P",
    description: "Competitive Valorant streamer.",
    youtube: "https://youtube.com/",
    kick: "https://kick.com/"
  }

];


/* ==========================================
   STATE
========================================== */

let currentFilter = "all";
let currentSearch = "";


/* ==========================================
   SPLASH
========================================== */

window.addEventListener("load", () => {

  let dot = 0;

  const dots = setInterval(() => {

    dot++;

    if (dot > 3) {
      dot = 0;
    }

    document.getElementById("dots").textContent =
      ".".repeat(dot);

  }, 400);


  setTimeout(() => {

    clearInterval(dots);

    const splash = document.getElementById("splash");

    splash.style.opacity = "0";
    splash.style.transition = "opacity .5s ease";

    setTimeout(() => {
      splash.style.display = "none";
    }, 500);

  }, 1600);


  renderAll();
});


/* ==========================================
   RENDER ALL
========================================== */

function renderAll() {

  updateStats();

  renderYouTube();
  renderKick();
  renderAllStreamers();

}


/* ==========================================
   STATS
========================================== */

function updateStats() {

  const live = streamers.filter(s => s.live);

  const youtube = live.filter(
    s => s.platform === "youtube"
  );

  const kick = live.filter(
    s => s.platform === "kick"
  );

  document.getElementById("live-count").textContent =
    live.length;

  document.getElementById("total-count").textContent =
    streamers.length;

  document.getElementById("youtube-count").textContent =
    `${youtube.length} LIVE`;

  document.getElementById("kick-count").textContent =
    `${kick.length} LIVE`;

}


/* ==========================================
   YOUTUBE
========================================== */

function renderYouTube() {

  const container =
    document.getElementById("youtube-grid");

  const live = streamers.filter(
    s => s.live && s.platform === "youtube"
  );

  container.innerHTML =
    live.map(createCard).join("");

}


/* ==========================================
   KICK
========================================== */

function renderKick() {

  const container =
    document.getElementById("kick-grid");

  const live = streamers.filter(
    s => s.live && s.platform === "kick"
  );

  container.innerHTML =
    live.map(createCard).join("");

}


/* ==========================================
   ALL STREAMERS
========================================== */

function renderAllStreamers() {

  const container =
    document.getElementById("all-grid");

  let data = [...streamers];

  if (currentSearch) {

    const query =
      currentSearch.toLowerCase();

    data = data.filter(s =>
      s.name.toLowerCase().includes(query) ||
      s.game.toLowerCase().includes(query)
    );

  }

  if (currentFilter === "live") {

    data = data.filter(s => s.live);

  }

  if (currentFilter === "youtube") {

    data = data.filter(
      s => s.platform === "youtube"
    );

  }

  if (currentFilter === "kick") {

    data = data.filter(
      s => s.platform === "kick"
    );

  }

  if (currentFilter === "offline") {

    data = data.filter(s => !s.live);

  }


  container.innerHTML =
    data.map(createCard).join("");


  const noResults =
    document.getElementById("no-results");

  noResults.style.display =
    data.length === 0 ? "block" : "none";

}


/* ==========================================
   CREATE STREAMER CARD
========================================== */

function createCard(streamer) {

  const platformName =
    streamer.platform === "youtube"
      ? "▶ YouTube"
      : "🟢 Kick";

  const bannerClass =
    streamer.live
      ? `live-${streamer.platform}`
      : "";

  const status =
    streamer.live
      ? `<span class="status live">● LIVE</span>`
      : `<span class="status">OFFLINE</span>`;


  return `

    <article
      class="card"
      onclick="openProfile(${streamer.id})"
    >

      <div class="card-banner ${bannerClass}">

        ${status}

        <div class="avatar">
          ${streamer.avatar}
        </div>

      </div>

      <div class="card-body">

        <h3 class="card-name">
          ${escapeHTML(streamer.name)}
        </h3>

        <p class="card-game">
          🎮 ${escapeHTML(streamer.game)}
        </p>

        <div class="card-info">

          <span class="platform-badge">
            ${platformName}
          </span>

          ${
            streamer.live
              ? `<span class="platform-badge">
                   👁 ${formatViewers(streamer.viewers)}
                 </span>`
              : `<span class="platform-badge">
                   Offline
                 </span>`
          }

        </div>

      </div>

    </article>

  `;

}


/* ==========================================
   PROFILE
========================================== */

function openProfile(id) {

  const streamer =
    streamers.find(s => s.id === id);

  if (!streamer) return;


  const platformURL =
    streamer.platform === "youtube"
      ? streamer.youtube
      : streamer.kick;


  document.getElementById(
    "profile-content"
  ).innerHTML = `

    <div class="profile-card">

      <div class="profile-cover"></div>

      <div class="profile-main">

        <div class="profile-avatar">
          ${streamer.avatar}
        </div>

        <h1 class="profile-name">
          ${escapeHTML(streamer.name)}
        </h1>

        <p class="profile-description">
          ${escapeHTML(streamer.description)}
        </p>

        <p class="profile-description">
          🎮 ${escapeHTML(streamer.game)}
          &nbsp; • &nbsp;
          ${
            streamer.live
              ? "🔴 LIVE NOW"
              : "⚫ OFFLINE"
          }
        </p>

        <div class="profile-links">

          ${
            streamer.platform === "youtube"
              ? `
                <a
                  href="${streamer.youtube}"
                  target="_blank"
                  rel="noopener"
                >
                  ▶ Watch on YouTube
                </a>
              `
              : `
                <a
                  href="${streamer.kick}"
                  target="_blank"
                  rel="noopener"
                >
                  🟢 Watch on Kick
                </a>
              `
          }

          <a
            href="${platformURL}"
            target="_blank"
            rel="noopener"
          >
            🔗 Open Channel
          </a>

        </div>

      </div>

    </div>

  `;


  document.getElementById("home-page")
    .classList.remove("active");

  document.getElementById("profile-page")
    .classList.add("active");


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* ==========================================
   HOME
========================================== */

function showHome() {

  document.getElementById("profile-page")
    .classList.remove("active");

  document.getElementById("home-page")
    .classList.add("active");


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* ==========================================
   SEARCH
========================================== */

function filterStreamers() {

  currentSearch =
    document.getElementById("search").value.trim();

  renderAllStreamers();

}


/* ==========================================
   FILTER
========================================== */

function setFilter(filter, button) {

  currentFilter = filter;

  document
    .querySelectorAll(".filter")
    .forEach(btn =>
      btn.classList.remove("active")
    );

  if (button) {
    button.classList.add("active");
  }

  renderAllStreamers();

}


/* ==========================================
   MOBILE NAV FILTER
========================================== */

function setFilterFromNav(filter) {

  showHome();

  currentFilter = filter;

  renderAllStreamers();

  document.querySelectorAll(".mobile-nav-item")
    .forEach(item =>
      item.classList.remove("active")
    );

  const navItems =
    document.querySelectorAll(".mobile-nav-item");

  if (filter === "live") {
    navItems[1].classList.add("active");
  }

  if (filter === "youtube") {
    navItems[2].classList.add("active");
  }

  if (filter === "kick") {
    navItems[3].classList.add("active");
  }

  document.querySelector(".search-area")
    .scrollIntoView({
      behavior: "smooth"
    });

}


/* ==========================================
   REFRESH
========================================== */

function refreshData() {

  const button =
    document.querySelector(".refresh-btn");

  button.style.transform =
    "rotate(360deg)";

  setTimeout(() => {

    button.style.transform =
      "rotate(0deg)";

  }, 500);


  /*
    FUTURE API LOCATION

    Example:

    fetch("/api/streamers")
      .then(response => response.json())
      .then(data => {
        streamers = data;
        renderAll();
      });

  */

  renderAll();

}


/* ==========================================
   SCROLL TOP
========================================== */

window.addEventListener("scroll", () => {

  const button =
    document.getElementById("scroll-top");

  if (window.scrollY > 400) {

    button.style.display = "block";

  } else {

    button.style.display = "none";

  }

});


function scrollToTop() {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* ==========================================
   HELPERS
========================================== */

function formatViewers(number) {

  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  }

  if (number >= 1000) {
    return (number / 1000).toFixed(1) + "K";
  }

  return number;

}


function escapeHTML(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}
