var selectACtive = false;

$(function () {
  animationHandle();
  gameHandle();
  customizeSelectsObject($(".languageSelect"));
  hideNavigation(arrow_prev, arrow_next);
});

function animationHandle() {
  $(".selectlang").pulse();
}

function gameHandle() {
  $(".languageSelect").on("change", function () {
    var getLang = $(this).val();
    if (!selectACtive) {
      selectACtive = true;
      $(".btn__inner").pulse();
    }

    $.get("data/" + getLang + "/select-lang.json", function () {
      setCookie("lang", getLang, 365);
      loadLocalizableResources("data/" + getLang + "/select-lang.json");
      loadLocalizableResources("data/" + getLang + "/base.json");
      loadLocalizableResources("data/" + getLang + "/menu.json");
    }).fail(function () {
      getLang = "en-gb";
      setCookie("lang", getLang, 365);
      loadLocalizableResources("data/en-gb/select-lang.json");
      loadLocalizableResources("data/en-gb/base.json");
      loadLocalizableResources("data/en-gb/menu.json");
    });

    if (getLang == "ar-ae") {
      $(
        "<style id='langAr' type='text/css'> *[lcz] {direction: rtl;unicode-bidi: embed;} </style>"
      ).appendTo("head");
    } else {
      $("#langAr").remove();
    }
  });

  $(".btn__inner").on("click", function () {
    if ($(".languageSelect").val() == null || $(".languageSelect").val() == "")
      return;
    $(this).clear_anim();
    $(this).offClick();
    goto("part2-game3");
  });
}

preloadImages("part2-game3");
