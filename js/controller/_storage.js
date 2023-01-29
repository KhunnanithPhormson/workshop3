//VARIABLE FOR MODULE
//NAVIGATION
var arrow_prev = $(".arrow--prev");
var arrow_next = $(".arrow--next");

var header = $("#header");
var footer = $("#footer");
var arrowDown = $("#arrow-down");

// MENU CONTROLs
var partAmount = 7;
var currentPart = 1;
var finishPart = [false, false, false, false, false, false];
var first_visit = false;

// SPECIFIC DEVICES
var isIOS =
  /iPad|iPhone|iPod/.test(navigator.platform) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
var isMobile =
  /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
    navigator.userAgent
  );
var isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(
  navigator.userAgent
);
var isIE =
  window.navigator.userAgent.indexOf("MSIE ") > 0 ||
  !!navigator.userAgent.match(/Trident.*rv\:11\./);

var cookieLanguage;

// var sounds = {
//   background_music_1: new Audio("sounds/Sound_The_Yulong.m4a"),
//   background_music_2: new Audio("sounds/Sound_Pivoine_Suzhou.m4a"),
//   background_music_3: new Audio("sounds/Sound_Vetiver_D_Hiver.m4a"),
//   background_music_4: new Audio("sounds/Sound_Bois_D_Encens.m4a"),
//   background_music_5: new Audio("sounds/Sound_Rouge_Malachite.m4a"),
//   background_music_6: new Audio("sounds/Sound_Vert_Malachite.m4a"),
//   background_music_7: new Audio("sounds/Sound_Rose_D_Arabie.m4a"),
//   background_music_8: new Audio("sounds/Sound_Oud_Royal.m4a"),
// };

// sounds["background_music_1"].volume = 0.0;
// sounds["background_music_2"].volume = 0.0;
// sounds["background_music_3"].volume = 0.0;
// sounds["background_music_4"].volume = 0.0;
// sounds["background_music_5"].volume = 0.0;
// sounds["background_music_6"].volume = 0.0;

var onPlaying = false;

// TIMEOUTS
var timeouts = [],
  lockpage = [];
var intervals = [];

var yourScore = 0;
var quizResult = [];
var part6Keyword = "";
var part6result = false;
var lifePoints = 3;

// PAGES
var welcomeStep = 1;

// main-page
var enter1 = true;
var enter2 = false;
var enter3 = false;
var enter4 = false;
var enter5 = false;
var enter6 = false;
var mainPageSwiperIndex = 0;

// var discoveryBtn1 = "DISCOVER";
// var discoveryBtn2 = "DISCOVER";
// var discoveryBtn3 = "DISCOVER";
// var discoveryBtn4 = "DISCOVER";
// var discoveryBtn5 = "DISCOVER";
// var discoveryBtn6 = "DISCOVER";

// part1-content2

for (var i = 1; i < 5; i++) {
  var popupCheck = [];
  popupCheck[i] = false;
}

// part2-content2
var part2Content2Finished = [false, false, false];
var part2Content2Part = 1;
var part2Content2Enter1 = true;
var part2Content2Enter2 = false;
var part2Content2Enter3 = false;
var part2Content2SwiperIndex = 0;
// var part2Content2Discovery1 = "DISCOVER";
// var part2Content2Discovery2 = "DISCOVER";
// var part2Content2Discovery3 = "DISCOVER";
var part3Content2Enter1 = false;
// part4-content2
var part4Content2Enter1 = true;
var part4Content2Enter2 = false;

// part5-content2
var part5Content2Enter1 = true;
var part5Content2Enter2 = false;

isSkipPart1Content1Video = false;
