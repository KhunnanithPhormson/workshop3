//Create Cookie
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}
//END Create Cookie

//get lageuage parameter frome URL
function GetURLParameter(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split("&");
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split("=");
    if (sParameterName[0] == sParam) {
      return sParameterName[1];
    }
  }
}
//END get lageuage parameter frome URL

//Hide Navigation
function hideNavigation(navigationPrev, navigationNext) {
  if (typeof navigationPrev != "undefined") {
    navigationPrev.fadeOut();
  }

  if (typeof navigationNext != "undefined") {
    navigationNext.fadeOut();
  }
}

//Show Navigation
function showNavigation(navigationPrev, navigationNext) {
  if (typeof navigationPrev != "undefined") {
    navigationPrev.fadeIn();
  }

  if (typeof navigationNext != "undefined") {
    navigationNext.fadeIn();
  }
}

function clearAllTimeout() {
  for (var i = 0; i < timeouts.length; i++) {
    clearTimeout(timeouts[i]);
  }

  timeouts = [];
}

function clearAllInterval() {
  for (var i = 0; i < intervals.length; i++) {
    clearInterval(intervals[i]);
  }
  intervals = [];
}

function setProgress(progress) {
  $(".progress__bar").empty();
  for (var i = 1; i <= progress.total; i++) {
    if (i <= progress.current) {
      $(".progress__bar").append('<div class="bar-inside active"></div>');
    } else {
      $(".progress__bar").append('<div class="bar-inside"></div>');
    }
  }
  $(".progress .progress__number").text(
    progress.current + "/" + progress.total
  );
}

function locknext() {
  if ($.inArray($(".page").attr("id"), lockpage) === -1) {
    arrow_next.addClass("locked");
    $(".arrow--next").addClass("locked");
  }
}

function unlocknext() {
  if ($.inArray($(".page").attr("id"), lockpage) === -1) {
    lockpage.push($(".page").attr("id"));
  }
  arrow_next.removeClass("locked");
  $(".arrow--next").removeClass("locked");
}

function nextPulse() {
  $(".arrow--next .arrow__inner").arrow_pulse();
}

function nextStop() {
  $(".arrow--next .arrow__inner").clear_anim();
  arrow_next.clear_anim();
  // $(".arrow--next").show();
}

$.fn.offClick = function () {
  $(this).css("pointerEvents", "none");
};

$.fn.onClick = function () {
  $(this).css({
    pointerEvents: "auto",
    cursor: "pointer",
  });
};

//-----------------------------------------------
//      Preload Imgage
//-----------------------------------------------
$.preloadImages = function () {
  for (var i = 0; i < arguments.length; i++) {
    $("<img />").attr("src", arguments[i]);
  }
};

function updateCurrent(check) {
  if (check_current[check - 1] == false) {
    check_current[check - 1] = true;
    current_menu++;
  }
}

function unlockPart(check) {
  if (check > currentPart) {
    currentPart = check;
  }

  if (currentPart >= 2) {
    for (var i = 1; i < currentPart; i++) {
      finishPart[i - 1] = true;
    }
  }
}

/**
 * @param  {Array<boolean>} data array boolean data
 * @param  {boolean} condition if true data return only true array data if false data return only false array data
 *
 * @return [boolean]
 */
function arrBoolean(data, condition) {
  if (typeof condition == "undefined") condition = true;
  return data.filter(function (e) {
    return e == condition;
  });
}

function setTheme() {
  if ($.inArray($(".page").attr("id"), $whiteDesktop) !== -1) {
    console.log("THEME");
    $("#main-container").removeClass("white-theme");
    $(".nav .main-logo img").attr("src", "images/general/logo-b.png");

    $("#main-container").addClass("white-theme");
    $(".nav .main-logo img").attr("src", "images/general/logo.png");
  }
}

function applyTheme() {
  if (window.innerWidth < window.innerHeight) {
    $("#main-container").removeClass("white-theme");
    $(".nav .main-logo img").attr("src", "images/general/logo-b.png");
  } else {
    // WHITE FOR DESKTOP
    setTheme();
  }
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function collapseActive(_this) {
  console.log("COL: " + _this.offset().top);
  console.log("SC: " + $(".scroll-inner").height());
  // SCROLL ANIM
  if (mobileDevice && !_this.hasClass("collapsed")) {
    if (_this.offset().top > $(".scroll-inner").height() / 2) {
      $(".scroll-inner").animate(
        {
          scrollTop:
            $(".scroll-inner").scrollTop() +
            $("#header").height() +
            _this.height() * 2,
        },
        800
      );
    }
  }

  _this.collapseItem();
  _this.addClass("opened");
  _this.find(".collapse__icon").clear_anim();
}

function initialGame6() {
  locknext();
  $(".ins").ins(0.5);
  part6Keyword = $("#keyword").text();
  $("input").first().focus();
  lifePoints = 3;
  part6result = false;
  $(".btn.btn--validate").on("click", function () {
    $("input").prop("disabled", true);
    let ans = "";
    $("input").each(function (index, elem) {
      ans = ans + $(elem).val().toLowerCase();
    });
    if (part6Keyword != ans) {
      lifePoints--;
      $(".try-agin").addClass("show");
      $(".ins").fadeOutByOpacity();
      $(".try-agin").addClass("show");
      $(".lifes_point.lifes_point-active")
        .first()
        .removeClass("lifes_point-active");
      if (0 == lifePoints) {
        part6result = false;
        unlocknext();
        onNextButtonClicked();
      } else {
        timeouts.push(
          setTimeout(() => {
            $("input").prop("disabled", false);
            $(".try-agin").removeClass("show");
            $(".ins").ins(0.5);
          }, 2500)
        );
      }
    } else {
      part6result = true;
      yourScore++;
      unlocknext();
      onNextButtonClicked();
    }
  });
}

function part6Type(event) {
  let targetNo = parseInt(event.target.id),
    target = $(`input#${targetNo}`);
  // console.log("which", event.which, "keyCode", event.keyCode, $(target).val());
  if (event.ctrlKey && event.key == "v") {
    console.log("ctrl-v");
  } else if (event.keyCode == 16) {
    // Shift
    console.log("shift");
  } else if (event.keyCode == 8) {
    // Backspace
    event.stopPropagation();
    event.preventDefault();
    if (event.target.value == "") {
      // Field empty
      gotoInput(targetNo - 1);
    } else {
      event.target.value = "";
    }
  } else if (event.key == "ArrowLeft" || event.key == "ArrowRight") {
    // Arrow
    if (event.key == "ArrowLeft") {
      gotoInput(targetNo - 1);
    } else if (event.key == "ArrowRight") {
      gotoInput(targetNo + 1);
    }
  } else {
    gotoInput(targetNo + 1);
    // if (part6Keyword.charAt(targetNo - 1) == $(target).val().toLowerCase()) {
    //   $(target).prop("disabled", true);
    //   if ($("input").length == targetNo) {
    //     part6result = true;
    //     yourScore++;
    //     unlocknext();
    //     onNextButtonClicked();
    //   } else {
    //     gotoInput(targetNo + 1);
    //   }
    // } else {
    //   lifePoints--;
    //   $("input").prop("disabled", true);
    //   target.blur();
    //   $(".try-agin").addClass("show");
    //   $(".ins").fadeOutByOpacity();
    //   $(".lifes_point.lifes_point-active")
    //     .first()
    //     .removeClass("lifes_point-active");
    //   if (0 == lifePoints) {
    //     part6result = false;
    //     unlocknext();
    //     onNextButtonClicked();
    //   } else {
    //     timeouts.push(
    //       setTimeout(() => {
    //         $("input").prop("disabled", false);
    //         $(".try-agin").removeClass("show");
    //         $(".ins").ins(0.5);
    //         event.target.value = "";
    //         target.focus();
    //       }, 2500)
    //     );
    //   }
    // }
  }
  // if (part6Keyword.charAt(target - 1) == event.keyCode)
  function gotoInput(no) {
    $(`input#${no}`).focus();
  }
}
