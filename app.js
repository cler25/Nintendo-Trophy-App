const STORAGE_KEY = "nintendo_trophy_tracker";

let progress =
  JSON.parse(
    localStorage.getItem(STORAGE_KEY)
  ) || {};
let unlockedBadges =
  JSON.parse(
    localStorage.getItem(
      "nintendo_badges"
    )
  ) || [];

const gamesGrid = document.getElementById("gamesGrid");
const searchInput = document.getElementById("searchInput");
const modal = document.getElementById("gameModal");
const closeModal = document.getElementById("closeModal");
const gameTitle = document.getElementById("gameTitle");
const trophyContainer = document.getElementById("trophyContainer");

const totalTrophies = document.getElementById("totalTrophies");
const bronzeCount = document.getElementById("bronzeCount");
const silverCount = document.getElementById("silverCount");
const goldCount = document.getElementById("goldCount");
const platinumCount = document.getElementById("platinumCount");

const playerLevel = document.getElementById("playerLevel");
const xpFill = document.getElementById("xpFill");
const xpText = document.getElementById("xpText");
let selectedAvatar = "🍄";
let currentFilter = "all";
let unlockedAvatars = ["🍄"];

const globalProgressFill =
  document.getElementById("globalProgressFill");

const globalProgressText =
  document.getElementById("globalProgressText");

const badgesContainer =
  document.getElementById("badgesContainer");

const trophyPopup =
  document.getElementById(
    "trophyPopup"
  );

const popupTrophyName =
  document.getElementById(
    "popupTrophyName"
  );
const completedGames =
  document.getElementById(
    "completedGames"
  );

const profilePlatinum =
  document.getElementById(
    "profilePlatinum"
  );

const completionRate =
  document.getElementById(
    "completionRate"
  );

const playerRank =
  document.getElementById(
    "playerRank"
  );

const exportBtn =
  document.getElementById("exportBtn");

const importBtn =
  document.getElementById("importBtn");

const importFile =
  document.getElementById("importFile");

const trophySound =
  new Audio("assets/trophy.wav");

const showBadgesBtn =
  document.getElementById("showBadgesBtn");

const badgesModal =
  document.getElementById("badgesModal");

const closeBadgesModal =
  document.getElementById("closeBadgesModal");

const allBadgesContainer =
  document.getElementById("allBadgesContainer");
const showMuseumBtn =
  document.getElementById(
    "showMuseumBtn"
  );

const museumModal =
  document.getElementById(
    "museumModal"
  );

const closeMuseumModal =
  document.getElementById(
    "closeMuseumModal"
  );

const museumContainer =
  document.getElementById(
    "museumContainer"
  );

const museumProgress =
  document.getElementById(
    "museumProgress"
  );

const museumRooms = [

{
  room:"🍄 Sala Super Mario",

  secretCard:{
    title:"👑 Mario Re",
image:"personaggi",
    rarity:"legendary"
  },

  cards:[

    {
      title:"🍄 Mario",
image:"mario",
      unlockedAt:50,
      rarity:"common"
    },

    {
      title:"🟢 Luigi",
image:"luigi",
      unlockedAt:100,
      rarity:"common"
    },

    {
      title:"👑 Peach",
image:"peach",
      unlockedAt:150,
      rarity:"rare"
    },

    {
      title:"🐢 Bowser",
image:"bowser",
      unlockedAt:200,
      rarity:"rare"
    },

    {
      title:"🦖 Yoshi",
image:"yoshi",
      unlockedAt:250,
      rarity:"rare"
    },

    {
      title:"🍄 Toad",
image:"toad",
      unlockedAt:300,
      rarity:"rare"
    },

    {
      title:"🌟 Rosalina",
image:"rosalinda",
      unlockedAt:400,
      rarity:"epic"
    },

    {
      title:"💰 Wario",
image:"wario",
      unlockedAt:500,
      rarity:"epic"
    },

    {
      title:"🟣 Waluigi",
image:"waluigi",
      unlockedAt:750,
      rarity:"epic"
    },

    {
      title:"🦍 Donkey Kong",
image:"dk",
      unlockedAt:1000,
      rarity:"legendary"
    }

  ]
},

{
  room:"⚔️ Sala Zelda",

secretCard:{
  title:"🗡️ Triforza Suprema",
image:"panorama",
  rarity:"legendary"
},

  cards:[

    {
      title:"⚔️ Link",
      requirementType:"platinum",
image:"link",
     requirementValue:2,
      rarity:"common"
    },

    {
      title:"👑 Zelda",
      requirementType:"platinum",
image:"zelda",
      requirementValue:4,
      rarity:"common"
    },

    {
      title:"😈 Ganondorf",
      requirementType:"platinum",
image:"ganon",
      requirementValue:6,
      rarity:"rare"
    },

    {
      title:"🌙 Midna",
      requirementType:"platinum",
image:"midna",
      requirementValue:8,
      rarity:"rare"
    },

    {
      title:"🛡️ Impa",
      requirementType:"platinum",
image:"inpa",
      requirementValue:10,
      rarity:"rare"
    },

    {
      title:"🥷 Sheik",
      requirementType:"platinum",
image:"sheik",
      requirementValue:12,
      rarity:"rare"
    },

    {
      title:"🦅 Revali",
      requirementType:"platinum",
image:"revali",
      requirementValue:14,
      rarity:"epic"
    },

    {
      title:"💧 Mipha",
      requirementType:"platinum",
image:"mipha",
      requirementValue:16,
      rarity:"epic"
    },

    {
      title:"🪨 Daruk",
      requirementType:"platinum",
image:"daruk",
      requirementValue:18,
      rarity:"epic"
    },

    {
      title:"⚡ Urbosa",
      requirementType:"platinum",
image:"urbosa",
      requirementValue:20,
      rarity:"legendary"
    }

  ]
},
{
  room:"⚡ Sala Pokémon",

secretCard:{
  title:"🌈 Arceus",
image:"poke",
  rarity:"legendary"
},
  cards:[

    {
      title:"⚡ Pikachu",
      requirementType:"badges",
image:"pika",
      requirementValue:1,
      rarity:"common"
    },

    {
      title:"🔥 Charizard",
      requirementType:"badges",
image:"chari",
      requirementValue:2,
      rarity:"common"
    },

    {
      title:"🧠 Mewtwo",
      requirementType:"badges",
image:"mew",
      requirementValue:3,
      rarity:"rare"
    },

    {
      title:"🌱 Bulbasaur",
      requirementType:"badges",
image:"bulba",
      requirementValue:4,
      rarity:"rare"
    },

    {
      title:"💧 Squirtle",
      requirementType:"badges",
image:"squi",
      requirementValue:5,
      rarity:"rare"
    },

    {
      title:"✨ Eevee",
      requirementType:"badges",
image:"eve",
      requirementValue:6,
      rarity:"rare"
    },

    {
      title:"😴 Snorlax",
      requirementType:"badges",
image:"sno",
      requirementValue:7,
      rarity:"epic"
    },

    {
      title:"🐺 Lucario",
      requirementType:"badges",
image:"luca",
      requirementValue:8,
      rarity:"epic"
    },

    {
      title:"👻 Gengar",
      requirementType:"badges",
image:"geng",
      requirementValue:9,
      rarity:"epic"
    },

    {
      title:"🐉 Rayquaza",
      requirementType:"badges",
image:"ray",
      requirementValue:10,
      rarity:"legendary"
    }

  ]
},
{
  room:"🌌 Sala Metroid",
secretCard:{
  title:"🧬 Omega Metroid",
image:"secret",
  rarity:"legendary"
},

  cards:[

    {
      title:"🌌 Samus",
      requirementType:"level",
image:"samus",
      requirementValue:5,
      rarity:"common"
    },

    {
      title:"⚫ Dark Samus",
      requirementType:"level",
image:"darksamus",
      requirementValue:10,
      rarity:"common"
    },

    {
      title:"🐉 Ridley",
      requirementType:"level",
image:"ridley",
      requirementValue:15,
      rarity:"rare"
    },

    {
      title:"🧠 Mother Brain",
      requirementType:"level",
image:"brain",
      requirementValue:20,
      rarity:"rare"
    },

    {
      title:"🦖 Kraid",
      requirementType:"level",
image:"kraid",
      requirementValue:25,
      rarity:"rare"
    },

    {
      title:"⚔️ Sylux",
      requirementType:"level",
image:"sylux",
      requirementValue:30,
      rarity:"epic"
    },

    {
      title:"👑 Raven Beak",
      requirementType:"level",
image:"raven",
      requirementValue:35,
      rarity:"epic"
    },

    {
      title:"🤖 E.M.M.I.",
      requirementType:"level",
image:"emmi",
      requirementValue:40,
      rarity:"epic"
    },

    {
      title:"🪽 Chozo",
      requirementType:"level",
image:"chozo",
      requirementValue:45,
      rarity:"legendary"
    },

    {
      title:"🧬 Metroid",
      requirementType:"level",
image:"metroid",
      requirementValue:50,
      rarity:"legendary"
    }

  ]
},
{
  room:"🚀 Sala Nintendo Legends",
secretCard:{
  title:"⭐ Eroe Nintendo",
image:"legends",
  rarity:"legendary"
},

  cards:[

    {
      title:"🌸 Kirby",
      requirementType:"gold",
image:"kirby",
      requirementValue:5,
      rarity:"common"
    },

    {
      title:"🦊 Fox McCloud",
      requirementType:"gold",
image:"fox",
      requirementValue:10,
      rarity:"common"
    },

    {
      title:"🏎️ Captain Falcon",
      requirementType:"gold",
image:"falcon",
      requirementValue:15,
      rarity:"rare"
    },

    {
      title:"🧢 Ness",
      requirementType:"gold",
image:"ness",
      requirementValue:20,
      rarity:"rare"
    },

    {
      title:"🏹 Pit",
      requirementType:"gold",
image:"pit",
      requirementValue:25,
      rarity:"rare"
    },

    {
      title:"🚀 Olimar",
      requirementType:"gold",
image:"olimar",
      requirementValue:30,
      rarity:"epic"
    },

    {
      title:"🦑 Inkling",
      requirementType:"gold",
image:"ink",
      requirementValue:35,
      rarity:"epic"
    },

    {
      title:"🐶 Isabelle",
      requirementType:"gold",
image:"isa",
      requirementValue:50,
      rarity:"epic"
    },

    {
      title:"⚔️ Shulk",
      requirementType:"gold",
image:"shulk",
      requirementValue:75,
      rarity:"legendary"
    },

    {
      title:"🌌 Xenoblade Hero",
      requirementType:"gold",
image:"xeno",
      requirementValue:100,
      rarity:"legendary"
    }

  ]
},

];
function saveProgress() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(progress)
  );


  updateStats();
  renderGames(searchInput.value);
}

function getCompletedCount(gameId) {

  if (!progress[gameId]) {
    return 0;
  }

  return progress[gameId].length;
}
function renderBadges(
  total,
  gold,
  platinum,
completedGamesCount
)
 {

 const badges = [

  {
    title: "🏆 Primo Trofeo",
    unlocked: total >= 1
  },

  {
    title: "🏆 10 Trofei",
    unlocked: total >= 10
  },

  {
    title: "🏆 50 Trofei",
    unlocked: total >= 50
  },

  {
    title: "🥇 Primo Oro",
    unlocked: gold >= 1
  },

  {
    title: "💎 Primo Platino",
    unlocked: platinum >= 1
  },

  {
    title: "🍄 Amico dei Funghi",
    unlocked: total >= 100
  },

  {
    title: "⭐ Super Stella",
    unlocked: total >= 250
  },

  {
    title: "🍌 Collezionista di Banane",
    unlocked: total >= 300
  },

  {
    title: "🌟 Cacciatore di Stelle",
    unlocked: gold >= 10
  },

  {
    title: "💎 Collezionista Platini",
    unlocked: platinum >= 5
  },

  {
    title: "💎 Signore dei Platini",
    unlocked: platinum >= 10
  },
{
  title:"🎮 Primo Gioco Completato",
  unlocked: completedGamesCount >= 1
},

{
  title:"🏆 Collezionista in Erba",
  unlocked: completedGamesCount >= 5
},

{
  title:"⭐ Avventuriero Nintendo",
  unlocked: completedGamesCount >= 10
},
{
  title:"⚔️ Eroe del Regno",
  unlocked: completedGamesCount >= 20
},

{
  title:"🏰 Conquistatore",
  unlocked: completedGamesCount >= 30
},

{
  title:"🌟 Maestro delle Avventure",
  unlocked: completedGamesCount >= 50
},
{
  title:"👑 Campione Nintendo",
  unlocked: completedGamesCount >= 75
},

{
  title:"💎 Collezionista Leggendario",
  unlocked: completedGamesCount >= 100
},

{
  title:"🌌 Dominatore delle Galassie",
  unlocked: completedGamesCount >= 125
},
{
  title:"🔥 Eroe Supremo",
  unlocked: completedGamesCount >= 150
},

{
  title:"🏆 Nintendo Master",
  unlocked: completedGamesCount >= 200
},

{
  title:"👑 Leggenda Vivente",
  unlocked: completedGamesCount >= 250
},

{
  title:"🔥 Collezionista Esperto",
  unlocked: total >= 500
},

{
  title:"⭐ Galassia Nintendo",
  unlocked: total >= 750
},

{
  title:"🌈 Arcobaleno di Trofei",
  unlocked: total >= 1000
},

{
  title:"🥇 Maestro dell'Oro",
  unlocked: gold >= 25
},

{
  title:"💎 Re dei Platini",
  unlocked: platinum >= 15
},

{
  title:"🍄 Campione del Regno",
  unlocked: total >= 1500
},

{
  title:"⚔️ Eroe di Hyrule",
  unlocked: total >= 2000
},

{
  title:"🛡️ Guardiano della Triforza",
  unlocked: platinum >= 20
},

{
  title:"🌟 Signore delle Stelle",
  unlocked: gold >= 50
},

{
  title:"🏰 Conquistatore dei Castelli",
  unlocked: platinum >= 25
},

{
  title:"👑 Imperatore Nintendo",
  unlocked: total >= 3000
},

{
  title:"💎 Tesoro Vivente",
  unlocked: platinum >= 30
},

{
  title:"🌌 Viaggiatore Galattico",
  unlocked: total >= 4000
},

{
  title:"🏆 Leggenda delle Leggende",
  unlocked: platinum >= 40
},

{
  title:"⚡ Fulmine di Hyrule",
  unlocked: gold >= 75
},

{
  title:"🐉 Distruttore di Bowser",
  unlocked: platinum >= 50
}
  ];

badges.forEach(badge => {

  if (
    badge.unlocked &&
    !unlockedBadges.includes(
      badge.title
    )
  ) {

    unlockedBadges.push(
      badge.title
    );

    localStorage.setItem(
      "nintendo_badges",
      JSON.stringify(
        unlockedBadges
      )
    );

    showBadgePopup(
      badge.title
    );

  }

});
  badgesContainer.innerHTML = "";

const recentBadges = badges
  .filter(badge => badge.unlocked)
  .slice(-4);

recentBadges.forEach(badge => {

       const div =
        document.createElement("div");

      div.className =
        "badge unlocked";

      div.textContent =
        badge.title;

      badgesContainer.appendChild(div);

    });

}


function updateStats() {

  let total = 0;
  let bronze = 0;
  let silver = 0;
  let gold = 0;
  let platinum = 0;
  let xp = 0;

  games.forEach(game => {

    if (!progress[game.id]) return;

    progress[game.id].forEach(index => {

      total++;

      const trophy =
        game.trophies[index];

      if (!trophy) return;

      switch (trophy.rarity) {

        case "bronze":
          bronze++;
          xp += 10;
          break;

        case "silver":
          silver++;
          xp += 25;
          break;

        case "gold":
          gold++;
          xp += 50;
          break;

        case "platinum":
          platinum++;
          xp += 100;
          break;

      }

    });

  });

  totalTrophies.textContent = total;
  bronzeCount.textContent = bronze;
  silverCount.textContent = silver;
  goldCount.textContent = gold;
  platinumCount.textContent = platinum;

let totalAvailable = 0;
let completedGamesCount = 0;

  games.forEach(game => {

  totalAvailable +=
    game.trophies.length;

  const done =
    getCompletedCount(game.id);

  if (
    done === game.trophies.length &&
    game.trophies.length > 0
  ) {
    completedGamesCount++;
  }

});

renderBadges(
  total,
  gold,
  platinum,
  completedGamesCount
);

window.badgeCount = 0;

if(total >= 1) badgeCount++;
if(total >= 10) badgeCount++;
if(total >= 50) badgeCount++;
if(gold >= 1) badgeCount++;
if(platinum >= 1) badgeCount++;
if(total >= 100) badgeCount++;
if(total >= 250) badgeCount++;
if(total >= 300) badgeCount++;
if(gold >= 10) badgeCount++;
if(platinum >= 5) badgeCount++;

  const collectionPercent =
    totalAvailable > 0
      ? (total / totalAvailable) * 100
      : 0;

  globalProgressFill.style.width =
    collectionPercent + "%";

  globalProgressText.textContent =
    total +
    " / " +
    totalAvailable +
    " trofei";

completedGames.textContent =
  completedGamesCount;

profilePlatinum.textContent =
  platinum;

completionRate.textContent =
  Math.round(collectionPercent) + "%";

  const level =
    Math.floor(xp / 500) + 1;


let rank = "Bronzo";

if (level >= 40) {

  rank = "👑 Master";

} else if (level >= 20) {

  rank = "💎 Platino";

} else if (level >= 10) {

  rank = "🥇 Oro";

} else if (level >= 5) {

  rank = "🥈 Argento";

} else {

  rank = "🥉 Bronzo";

}

  const currentXP =
    xp % 500;

  const percent =
    (currentXP / 500) * 100;

  playerLevel.textContent =
    level;

const playerAvatar =
  document.getElementById(
    "playerAvatar"
  );

playerAvatar.textContent =
  selectedAvatar;
if(level >= 50){

  playerRank.textContent =
    "👑 Leggenda Nintendo";

}
else if(level >= 40){

  playerRank.textContent =
    "🏆 Maestro Nintendo";

}
else if(level >= 30){

  playerRank.textContent =
    "⭐ Eroe Nintendo";

}
else if(level >= 20){

  playerRank.textContent =
    "⚔️ Avventuriero";

}
else if(level >= 10){

  playerRank.textContent =
    "🎮 Giocatore Esperto";

}
else{

  playerRank.textContent =
    "🌱 Recluta Nintendo";

}

xpFill.style.width =
  percent + "%";

xpText.innerHTML =

  "<span class='xp-current'>" +

  currentXP +

  "</span> / <span class='xp-max'>500</span> XP";

 

window.playerStats = {

  total,

  bronze,

  silver,

  gold,

  platinum,

  level

};

}
function renderMuseum() {

museumContainer.innerHTML = "";

const total =
Number(
totalTrophies.textContent
);

const stats =
  window.playerStats || {};

const gold =
  stats.gold || 0;

const platinum =
  stats.platinum || 0;

const level =
  stats.level || 1;

let unlocked = 0;
let totalCards = 0;

museumRooms.forEach(room => {

const roomBox =
document.createElement("div");

roomBox.className =
"museum-room";

const roomTitle =
document.createElement("h3");

roomTitle.className =
"museum-room-title";

roomTitle.textContent =
room.room;

const roomCards =
document.createElement("div");

roomCards.className =
"museum-room-cards";

const roomProgress =
  document.createElement("div");

roomProgress.className =
  "room-progress";

roomCards.style.display =
"none";

roomTitle.addEventListener(
"click",
() => {

roomCards.style.display =
  roomCards.style.display === "none"
    ? "flex"
    : "none";

}
);

roomBox.appendChild(
roomTitle
);

roomBox.appendChild(
  roomProgress
);

roomBox.appendChild(
roomCards
);

museumContainer.appendChild(
roomBox
);

let roomUnlocked = 0;

room.cards.forEach(card => {

  totalCards++;

  let isUnlocked = false;

if (card.requirementType === "platinum") {

  isUnlocked =
    platinum >=
    card.requirementValue;

}

else if (
  card.requirementType === "gold"
) {

  isUnlocked =
    gold >=
    card.requirementValue;

}

else if (
  card.requirementType === "level"
) {

  isUnlocked =
    level >=
    card.requirementValue;

}

else if (
  card.requirementType === "badges"
) {

  let unlockedBadges = 0;

  if(total >= 1) unlockedBadges++;
  if(total >= 10) unlockedBadges++;
  if(total >= 50) unlockedBadges++;
  if(gold >= 1) unlockedBadges++;
  if(platinum >= 1) unlockedBadges++;
  if(total >= 100) unlockedBadges++;
  if(total >= 250) unlockedBadges++;
  if(total >= 300) unlockedBadges++;
  if(gold >= 10) unlockedBadges++;
  if(platinum >= 5) unlockedBadges++;

  isUnlocked =
    unlockedBadges >=
    card.requirementValue;


}
else {

  isUnlocked =
    total >=
    card.unlockedAt;

}

  if (isUnlocked) {

  unlocked++;

  roomUnlocked++;

}
  const div =
    document.createElement("div");

  div.className =

"museum-card " +

(isUnlocked
  ? "unlocked "
  : "locked ")

+

card.rarity;
if (
  card.requirementType === "platinum"
) {

  requirementText =
    card.requirementValue +
    " Platini";

}

else if (
  card.requirementType === "level"
) {

  requirementText =
    "Livello " +
    card.requirementValue;

}

else if (
  card.requirementType === "gold"
) {

  requirementText =
    card.requirementValue +
    " Ori";

}

else if (
  card.requirementType === "badges"
) {

  requirementText =
    card.requirementValue +
    " Badge";

}

else {

  requirementText =
    card.unlockedAt +
    " Trofei";

}
 

div.innerHTML =

  "<img src='images/" +
card.image +
".png' class='museum-card-image'>" +

  "<strong><br>" +

  (isUnlocked
    ? "✅ "
    : "🔒 ")

  +

  card.title +

  "</strong><br>" +

  (isUnlocked
    ? "Carta ottenuta"
    : "Richiede " +
      requirementText);
  roomCards.appendChild(
div
);


});

const roomPercent =
  Math.round(
    (roomUnlocked /
    room.cards.length) * 100
  );

const secretDiv =
  document.createElement("div");

if (
  roomUnlocked ===
  room.cards.length
) {

  if(room.room === "Sala Super Mario"){

    if(!unlockedAvatars.includes("🍄")){

      unlockedAvatars.push("🍄");

    }

  }

  if(room.room === "Sala Pokémon"){

    if(!unlockedAvatars.includes("⚡")){

      unlockedAvatars.push("⚡");

    }

  }

  if(room.room === "Sala Zelda"){

    if(!unlockedAvatars.includes("⚔️")){

      unlockedAvatars.push("⚔️");

    }

  }

  if(room.room === "Sala Metroid"){

    if(!unlockedAvatars.includes("🚀")){

      unlockedAvatars.push("🚀");

    }

  }

  if(room.room === "Sala Nintendo Legends"){

    if(!unlockedAvatars.includes("👑")){

      unlockedAvatars.push("👑");

    }

  }

  const secretDiv =
    document.createElement("div");

  secretDiv.className =
    "museum-card legendary";

  secretDiv.innerHTML =
    "<strong>👑 CARTA SEGRETA</strong><br>" +
    room.secretCard.title;

  roomCards.appendChild(
    secretDiv
  );

}
else {

  const secretDiv =
    document.createElement("div");

  secretDiv.className =
    "museum-card locked";

  secretDiv.innerHTML =
    "<strong>🔒 CARTA SEGRETA</strong><br>" +
    "Completa la sala";

  roomCards.appendChild(
    secretDiv
  );

}
roomProgress.innerHTML =

  roomUnlocked +

  " / " +

  room.cards.length +

  " carte<br>" +

  "<div class='room-bar'>" +

  "<div class='room-fill' style='width:" +

  roomPercent +

  "%'></div></div>" +

  roomPercent +

  "%";

});

const percent =
Math.round(
(unlocked / totalCards) * 100
);

museumProgress.innerHTML =

"<strong>Completamento Totale</strong><br><br>" +

unlocked +

" / " +

totalCards +

" carte<br><br>" +

percent +

"%";

}

function showTrophyPopup(
trophyName
){

trophySound.currentTime = 0;
trophySound.play();

popupTrophyName.textContent =
trophyName;

trophyPopup.classList.remove(
"hidden"
);

trophyPopup.classList.add(
"show"
);

setTimeout(() => {

trophyPopup.classList.remove(
  "show"
);

setTimeout(() => {

  trophyPopup.classList.add(
    "hidden"
  );

}, 400);

}, 3000);

}


function showBadgePopup(
  badgeName
){

  alert(
    "🏅 NUOVO BADGE!\n\n" +
    badgeName
  );

}

function renderGames(search = "") {

  gamesGrid.innerHTML = "";

 const filtered =
  games.filter(game => {

    const matchesSearch =
      game.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    const completed =
      getCompletedCount(game.id);

    const platinumUnlocked =
      game.trophies.some(
        (t, i) =>
          t.rarity === "platinum" &&
          progress[game.id]?.includes(i)
      );

    const isCompleted =
      completed ===
      game.trophies.length;

    if(currentFilter === "todo"){

      return matchesSearch &&
             completed === 0;

    }

    if(currentFilter === "playing"){

      return matchesSearch &&
             completed > 0 &&
             !isCompleted;

    }

    if(currentFilter === "completed"){

      return matchesSearch &&
             isCompleted;

    }

    if(currentFilter === "platinum"){

      return matchesSearch &&
             platinumUnlocked;

    }

    return matchesSearch;

  });

  filtered.forEach(game => {

    const completed =
      getCompletedCount(game.id);

    const percent =
      Math.round(
        (completed / game.trophies.length) * 100
      );

    const card =
      document.createElement("div");

    card.className =
      "game-card";

const isCompleted =
  completed ===
  game.trophies.length;

const platinumUnlocked =
  game.trophies.some(
    (t, i) =>
      t.rarity === "platinum" &&
      progress[game.id]?.includes(i)
  );
    card.innerHTML = `
     <div class="cover">
  <img
    src="${game.cover}"
    alt="${game.title}"
    class="game-cover"
  >
</div>
      <div class="game-info">

        <div class="game-title">
  ${game.title}
</div>

${platinumUnlocked ? `
<div class="game-badge platinum">
  💎 PLATINATO
</div>
` : ""}

${isCompleted && !platinumUnlocked ? `
<div class="game-badge complete">
  ⭐ 100%
</div>
` : ""}
        <div class="progress-bar">
          <div
            class="progress-fill"
            style="width:${percent}%">
          </div>
        </div>

        <div class="progress-text">
          ${completed}/${game.trophies.length}
          trofei
        </div>

      </div>
    `;

    card.addEventListener(
      "click",
      () => openGame(game)
    );

    gamesGrid.appendChild(card);

  });

}

function openGame(game) {

  gameTitle.textContent =
    game.title;

  trophyContainer.innerHTML = "";

  if (!progress[game.id]) {
    progress[game.id] = [];
  }

  game.trophies.forEach(
    (trophy, index) => {

      const wrapper =
        document.createElement("div");

      wrapper.className =
        "trophy " + trophy.rarity;

      const checked =
        progress[game.id]
          .includes(index);

      wrapper.innerHTML = `
        <input
          type="checkbox"
          ${checked ? "checked" : ""}
        >

        <div>

          <div class="trophy-title">
            ${trophy.title}
          </div>

          <div class="trophy-desc">
            ${trophy.description}
          </div>

        </div>
      `;

      const checkbox =
        wrapper.querySelector("input");

      checkbox.addEventListener(
        "change",
        function () {

          if (this.checked) {

  if (!progress[game.id].includes(index)) {

    progress[game.id].push(index);

    showTrophyPopup(
      trophy.title
    );

const nonPlatinumCount =
  game.trophies.filter(
    t => t.rarity !== "platinum"
  ).length;

const unlockedNonPlatinum =
  progress[game.id]
    .filter(i =>
      game.trophies[i] &&
      game.trophies[i].rarity !== "platinum"
    ).length;

if (
  unlockedNonPlatinum ===
  nonPlatinumCount
) {

  const platinumIndex =
    game.trophies.findIndex(
      t => t.rarity === "platinum"
    );

  if (
    platinumIndex !== -1 &&
    !progress[game.id]
      .includes(platinumIndex)
  ) {

    progress[game.id]
      .push(platinumIndex);

    showTrophyPopup(
      "💎 " +
      game.trophies[
        platinumIndex
      ].title
    );

  }

}

  }

} else {

  progress[game.id] =
    progress[game.id].filter(
      i => i !== index
    );

}
          saveProgress();

        }
      );

      trophyContainer.appendChild(
        wrapper
      );

    }
  );

  modal.classList.remove(
    "hidden"
  );
}

closeModal.addEventListener(
  "click",
  () => {
    modal.classList.add("hidden");
  }
);

modal.addEventListener(
  "click",
  function (e) {

    if (e.target === modal) {
      modal.classList.add("hidden");
    }

  }
);

searchInput.addEventListener(
  "input",
  function () {
    renderGames(this.value);
  }
);
function exportSave() {

  const data = {
    progress: progress
  };

  const blob = new Blob(
    [JSON.stringify(data)],
    { type: "application/json" }
  );

  const url =
    URL.createObjectURL(blob);

  const a =
    document.createElement("a");

  a.href = url;
  a.download =
    "nintendo-trophy-save.json";

  a.click();

  URL.revokeObjectURL(url);

}

function importSave(file) {

  const reader =
    new FileReader();

  reader.onload = e => {

    try {

      const data =
        JSON.parse(
          e.target.result
        );

      if (data.progress) {

        Object.assign(
          progress,
          data.progress
        );

        saveProgress();

        renderGames();

        updateStats();

        alert(
          "Salvataggio importato!"
        );

      }

    } catch {

      alert(
        "File non valido."
      );

    }

  };

  reader.readAsText(file);

}
exportBtn.addEventListener(
  "click",
  exportSave
);

importBtn.addEventListener(
  "click",
  () => importFile.click()
);

importFile.addEventListener(
  "change",
  e => {

    const file =
      e.target.files[0];

    if (file) {

      importSave(file);

    }

  }
);
updateStats();
renderGames();
showBadgesBtn.addEventListener(
  "click",
  () => {

    allBadgesContainer.innerHTML = "";

   const allBadges = [

  {
    title:"🏆 Primo Trofeo",
    unlocked: totalTrophies.textContent >= 1,
    desc:"Ottieni il primo trofeo"
  },

  {
    title:"🏆 10 Trofei",
    unlocked: totalTrophies.textContent >= 10,
    desc:"Ottieni 10 trofei"
  },

  {
    title:"🏆 50 Trofei",
    unlocked: totalTrophies.textContent >= 50,
    desc:"Ottieni 50 trofei"
  },

  {
    title:"🥇 Primo Oro",
    unlocked: goldCount.textContent >= 1,
    desc:"Ottieni il primo trofeo Oro"
  },

  {
    title:"💎 Primo Platino",
    unlocked: platinumCount.textContent >= 1,
    desc:"Ottieni il primo Platino"
  },

  {
    title:"🍄 Amico dei Funghi",
    unlocked: totalTrophies.textContent >= 100,
    desc:"Ottieni 100 trofei"
  },

  {
    title:"⭐ Super Stella",
    unlocked: totalTrophies.textContent >= 250,
    desc:"Ottieni 250 trofei"
  },

  {
    title:"🍌 Collezionista di Banane",
    unlocked: totalTrophies.textContent >= 300,
    desc:"Ottieni 300 trofei"
  },
{
  title:"🎮 Primo Gioco Completato",
  unlocked: completedGames.textContent >= 1,
  desc:"Completa il tuo primo gioco"
},

{
  title:"🏆 Collezionista in Erba",
  unlocked: completedGames.textContent >= 5,
  desc:"Completa 5 giochi"
},

{
  title:"⭐ Avventuriero Nintendo",
  unlocked: completedGames.textContent >= 10,
  desc:"Completa 10 giochi"
},

{
  title:"⚔️ Eroe del Regno",
  unlocked: completedGames.textContent >= 20,
  desc:"Completa 20 giochi"
},

{
  title:"🏰 Conquistatore",
  unlocked: completedGames.textContent >= 30,
  desc:"Completa 30 giochi"
},

{
  title:"🌟 Maestro delle Avventure",
  unlocked: completedGames.textContent >= 50,
  desc:"Completa 50 giochi"
},
{
  title:"👑 Leggenda Vivente",
  unlocked:Number(completedGames.textContent) >= 250,
  desc:"Completa 250 giochi"
},

{
  title:"🔥 Collezionista Esperto",
  unlocked:Number(totalTrophies.textContent) >= 500,
  desc:"Ottieni 500 trofei"
},

{
  title:"⭐ Galassia Nintendo",
  unlocked:Number(totalTrophies.textContent) >= 750,
  desc:"Ottieni 750 trofei"
},

{
  title:"🌈 Arcobaleno di Trofei",
  unlocked:Number(totalTrophies.textContent) >= 1000,
  desc:"Ottieni 1000 trofei"
},
{
  title:"🥇 Maestro dell'Oro",
  unlocked: Number(goldCount.textContent) >= 25,
  desc:"Ottieni 25 trofei Oro"
},

{
  title:"💎 Re dei Platini",
  unlocked: Number(platinumCount.textContent) >= 15,
  desc:"Ottieni 15 trofei Platino"
},

{
  title:"🍄 Campione del Regno",
  unlocked: Number(totalTrophies.textContent) >= 1500,
  desc:"Ottieni 1500 trofei"
},

{
  title:"⚔️ Eroe di Hyrule",
  unlocked: Number(totalTrophies.textContent) >= 2000,
  desc:"Ottieni 2000 trofei"
},

{
  title:"🛡️ Guardiano della Triforza",
  unlocked: Number(platinumCount.textContent) >= 20,
  desc:"Ottieni 20 trofei Platino"
},

{
  title:"🌟 Signore delle Stelle",
  unlocked: Number(goldCount.textContent) >= 50,
  desc:"Ottieni 50 trofei Oro"
},

{
  title:"🏰 Conquistatore dei Castelli",
  unlocked: Number(platinumCount.textContent) >= 25,
  desc:"Ottieni 25 trofei Platino"
},

{
  title:"👑 Imperatore Nintendo",
  unlocked: Number(totalTrophies.textContent) >= 3000,
  desc:"Ottieni 3000 trofei"
},

{
  title:"💎 Tesoro Vivente",
  unlocked: Number(profilePlatinum.textContent) >= 30,
  desc:"Ottieni 30 trofei Platino"
},

{
  title:"🌌 Viaggiatore Galattico",
  unlocked: Number(totalTrophies.textContent) >= 4000,
  desc:"Ottieni 4000 trofei"
},

{
  title:"🏆 Leggenda delle Leggende",
  unlocked: Number(profilePlatinum.textContent) >= 40,
  desc:"Ottieni 40 trofei Platino"
},

{
  title:"⚡ Fulmine di Hyrule",
  unlocked: Number(goldCount.textContent) >= 75,
  desc:"Ottieni 75 trofei Oro"
},

{
  title:"🐉 Distruttore di Bowser",
  unlocked: Number(profilePlatinum.textContent) >= 50,
  desc:"Ottieni 50 trofei Platino"
}
];
allBadges.forEach(badge => {

  const div =
    document.createElement("div");

  div.className =
    badge.unlocked
      ? "badge unlocked"
      : "badge locked";

  div.innerHTML = `

    <strong>
      ${badge.unlocked ? "✅" : "🔒"}
      ${badge.title}
    </strong>

    <div class="badge-desc">
      ${badge.desc}
    </div>

  `;

  allBadgesContainer.appendChild(
    div
  );

});

badgesModal.classList.remove(
  "hidden"
);

}
);
   closeBadgesModal.addEventListener(
  "click",
  () => {
    badgesModal.classList.add(
      "hidden"
    );
  }
);

showMuseumBtn.addEventListener(
  "click",
  () => {

    renderMuseum();

    museumModal.classList.remove(
      "hidden"
    );

  }
);

closeMuseumModal.addEventListener(
  "click",
  () => {

    museumModal.classList.add(
      "hidden"
    );

  }
);

document
.getElementById(
  "changeAvatarBtn"
)
.addEventListener(
  "click",
  () => {

    const scelta =
      prompt(
        "Avatar disponibili:\n\n" +
        unlockedAvatars.join(" ")
      );

    if(
      unlockedAvatars.includes(
        scelta
      )
    ){

      selectedAvatar =
        scelta;

      updateLevel();

    }

  }
);

document
.querySelectorAll(
  ".game-filters button"
)
.forEach(btn => {

  btn.addEventListener(
    "click",
    () => {

      currentFilter =
        btn.dataset.filter;

      renderGames();

    }
  );

});