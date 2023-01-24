$(function () {
  setNavigationButtonsClickListeners();
});

function setNavigationButtonsClickListeners() {
  $("#main-container").on("click", "#nextButton,.arrow--next", function () {
    if (
      !$("#nextButton").hasClass("clicked") &&
      !$("#previousButton").hasClass("clicked")
    ) {
      $("#nextButton").addClass("clicked");
      $("#previousButton").addClass("clicked");
      setTimeout(function () {
        $("#nextButton,#previousButton").removeClass("clicked");
      }, 1000);
      if (typeof onNextButtonClicked == "function") {
        if (!$(this).hasClass("locked")) {
          onNextButtonClicked();
        }
      }
    }
  });
  $("#main-container").on("click", "#previousButton,.arrow--prev", function () {
    if (
      !$("#nextButton").hasClass("clicked") &&
      !$("#previousButton").hasClass("clicked")
    ) {
      $("#nextButton").addClass("clicked");
      $("#previousButton").addClass("clicked");
      setTimeout(function () {
        $("#nextButton,#previousButton").removeClass("clicked");
      }, 1000);
      if (typeof onPreviousButtonClicked == "function") {
        if (!$(this).hasClass("locked")) {
          onPreviousButtonClicked();
        }
      }
    }
  });
}

function goto(page) {
  loadPage(
    "templates/" + page + ".html",
    "js/pages/" + page + ".js",
    page + ".json"
  );
}

/*  loadPage life cycle
 *  1. clear the time interval / clear arrow animation
 *  2. empty the content
 *  3. load new content according to page
 *  4. apply the header/footer
 *  5. apply the theme
 */
function loadPage(pagePath, script, json, callback) {
  console.log("load page");

  nextStop();
  clearAllTimeout();
  clearAllInterval();
  footer.fadeOut();
  arrowDown.fadeOut();

  $("#content").fadeOut(400, function () {
    $(this)
      .empty()
      .load(pagePath, function () {
        componentControl(function () {
          header.removeClass("absolute");
          $("body").attr("class", pagePath.slice(10, -5));
          $("#main-container").attr("class", pagePath.slice(10, -5));
          arrow_next.removeClass("locked");

          initLoadPage();
          if (typeof callback == "function") {
            callback();
          }
        });
      });
  });

  function initLoadPage() {
    loadLocalizableResources(
      "data/" + getCookie("lang") + "/" + json,
      function () {
        // LOAD JS
        $.getScript(script, function () {
          $("#main-container").fadeInByOpacity();
          $(".lds-ring").fadeOut();
          $("#content").fadeIn(500);
        });

        /*  APPY HEADER & FOOTER
         *  1. navMod(page)
         *  2. inArrayNavMod()
         *  ! do not use both, will get confuse
         */
        inArrayNavMod();
        // navMod(pagePath.slice(10, -5));

        // HANDLE SCROOL DOWN
        handleScrollDown();

        // ACTIVE CORRENT MENU AND UNLOCK PREVIOUS MENU
        unlockMenu();

        // PROGRESS
        setProgress({
          current: $(".page").data("current"),
          total: $(".page").data("step"),
        });
      }
    );
  }
}

function inArrayNavMod() {
  var pageName = $(".page").attr("id");
  var absoluteFooter = [
    "part2-game2",
    "part2-game-result",
    "part3-game-result",
    "part5-game-result",
    "part2-content2",
    "part2-content3",
    "part2-content6",
    "part2-content4",
    // "part2-content7",
    "part5-content7",
    "part2-content9",
    // "part2-content10",
    "part3-content2",
    "part3-content3",
    "part3-content4",
    "part4-content2",
    "part4-content3",
    "part4-content4",
    "part4-content6",
    "part4-content7",
    "part3-game2-result",
    "part4-game-result",
    "part4-game3-result",
    "part4-game5-result",
    "part5-content2",
    "part5-content4",
    // "part5-content7",
  ];
  var absoluteHeader = [
    "part1-content1",
    "main-page",
    "part2-content2",
    // "part2-content2",
    "part3-game2",
    "part4-content2",
    "part3-game2-result",
    "part4-game3",
    "part4-game3-result",
    "part4-game5-result",
    "welcome-page",
    "part5-content2",
    // "part4-game-result",
  ];

  // var absoluteBlack = ["part5-content7"];
  var themeWhite = ["welcome-page", "part5-content7"];
  var hidePageName = [
    "part2-content1",
    "part3-content1",
    "part4-content1",
    "part5-content1",
  ];
  var hideFooter = [
    "select-lang",
    "main-page",
    "part2-content1",
    "part3-content1",
    "part4-content1",
    "part5-content1",
    "result-page",
    "welcome-page",
  ]; /* An array of strings. */
  var hideHeader = ["select-lang"];
  var themeblack = [
    "part1-content2",
    "part2-game-result",
    "part3-game-result",
    "part4-game-result",
    "part5-game-result",
    "part2-content2",
    "part2-content4",
    "part2-content3",
    "part2-content6",
    "part2-content9",
    "part2-game2",
    "part2-game2-result",
    "part2-game4",
    "part2-game4-result",
    "part2-game6",
    "part2-game6-result",
    "part2-game5",
    "part2-game5-result",
    "part6-game1",
    "part6-game1-result",
    "part6-game2",
    "part6-game2-result",
    "part6-game3",
    "part6-game4",
    "part6-game5",
    "part6-game6",
    "part6-game7",
    "part6-game8",
    "part6-game8",
    "part6-game8-result",
    "result-page",
    "part2-content7",
    "part5-content7",
    "part2-content10",
  ];
  var themeLogo = ["main-page", "welcome-page"];
  // var showAllNavigation = ["welcome-page", "intro-page", "video-page"];

  // HIDE HEADER
  if (hideHeader.includes(pageName)) {
    header.hide();
  } else {
    header.fadeIn();
  }

  // if (absoluteHeader.includes(pageName)) {
  //   header.addClass("absolute");

  //   // $(".scroll-inner").on("scroll", function () {
  //   //   // if ($(this).scrollTop() > 0) {
  //   //   //   if (absoluteBar.includes(pageName)) {
  //   //   //     header.addClass("absolute--white");
  //   //   //   }
  //   //   // }
  //   // });

  //   // if (!absoluteBar.includes(pageName || !absoluteBar.includes(pageName))) {
  //   //   header.removeClass("absolute--black absolute--white");
  //   // }
  // } else {
  //   header.removeClass("absolte");
  // }

  // // HIDE HEADER
  if (absoluteHeader.includes(pageName)) {
    header.addClass("absolute");
  } else {
    header.removeClass("absolute");
  }

  // HIDE FOOTER
  if (hideFooter.includes(pageName)) {
    footer.hide();
  } else {
    footer.fadeInByFlex();
  }

  // HIDE PAGE NAME
  if (hidePageName.includes(pageName)) {
    $(".nav__title").hide();
  } else {
    $(".nav__title").show();
  }

  if (themeblack.includes(pageName) || themeLogo.includes(pageName)) {
    if (themeLogo.includes(pageName)) {
      $("#main-container").addClass("theme-logo");
    } else {
      $("#main-container").addClass("theme-black");
    }
  } else {
    // $("#main-container").removeClass("theme-black");
    $("#main-container").addClass("theme-white");
  }

  if (themeWhite.includes(pageName) || themeLogo.includes(pageName)) {
    if (themeLogo.includes(pageName)) {
      $("#main-container").addClass("theme-logo");
    } else {
      $("#main-container").addClass("theme-white");
    }
  } else {
    // $("#main-container").removeClass("theme-black");
    $("#main-container").addClass("theme-black");
  }

  // HIDE PAGE NAME
  if (absoluteFooter.includes(pageName)) {
    $(".progress-bar").addClass("absolute-footer");
  } else {
    $(".progress-bar").removeClass("absolute-footer");
  }

  // SHOW ALL NAVIGATION
  // if (showAllNavigation.includes(pageName)) {
  //   showNavigation(arrow_prev, arrow_next);
  // }

  // SPECIFIC PAGE NAME
  var getName = $(".page").data("menu");
  if (!$("#main-menu").is(":visible")) {
    // $(".nav__title").hide();
    $(".nav__page").hide();
    $(".nav__page.name" + getName).show();
  } else {
    $(".nav__page").hide();
    $(".nav__title").show();
  }
}

function navMod(obj) {
  // BASE

  switch (obj) {
    // MAIN MENU configuration
    case "select-lang":
      header.hide();
      footer.hide();
      break;

    default:
      showNavigation(arrow_prev, arrow_next, header);
      break;
  }
}

// CHECK SCROLL DOWN
function handleScrollDown() {
  var pageName = $(".page").attr("id");
  var hideArrowDown = ["main-page"];

  if (
    !hideArrowDown.includes(pageName) &&
    $(window).innerWidth() < $(window).innerHeight()
  ) {
    timeouts.push(
      setTimeout(function () {
        var mainScrollClass = $(".scroll-inner");
        var scrollHeight = mainScrollClass.prop("scrollHeight");
        var innerHeight = mainScrollClass.innerHeight();

        if (scrollHeight - innerHeight > 10) {
          arrowDown.fadeInByFlex();
          arrowDown.downPulse();
        }
      }, 500)
    );

    $(".scroll-inner").one("scroll", function () {
      arrowDown.fadeOut(function () {
        arrowDown.clear_anim();
      });
    });

    arrowDown.off("click");
    arrowDown.one("click", function () {
      autoScrollToBottom();
    });
  }
}
