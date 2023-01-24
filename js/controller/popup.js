function create_popup(elem) {
  $(".group-popup#" + elem).empty();
  $(".group-popup#" + elem + "").load(
    "templates/" + elem + ".html",
    function () {
      loadLocalizableResources(
        "data/" + getCookie("lang") + "/" + elem + ".json"
        // function () {
        //   $.getScript("js/pages/" + elem + ".js");
        // }
      );
    }
  );
}
var popup = {
  init: function (elem) {
    this.guide(elem);
  },

  close: function (elem) {
    gsap.to($(".group-popup#" + elem), 0.5, {
      y: 100,
      alpha: 0,
      display: "none",
      ease: Power4.easeOut,
    });
    setTimeout(function () {
      $(".group-popup#" + elem).empty();
    }, 150);
  },

  leave: function (elem) {
    gsap.to($(".group-popup#" + elem), 0.5, {
      y: 100,
      alpha: 0,
      display: "none",
      ease: Power4.easeOut,
    });
  },

  open: function (elem) {
    if (!$("#" + elem).children().length) {
      return (
        create_popup(elem),
        gsap.fromTo(
          $(".group-popup#" + elem),
          0.5,
          {
            y: 100,
            alpha: 0,
            display: "none",
            ease: Power4.easeOut,
          },
          {
            y: 0,
            alpha: 1,
            display: "block",
            ease: Power4.easeOut,
            delay: 0.1,
          }
        )
      );
    } else {
      gsap.fromTo(
        $(".group-popup#" + elem),
        0.5,
        {
          y: 100,
          alpha: 0,
          display: "none",
          ease: Power4.easeOut,
        },
        {
          y: 0,
          alpha: 1,
          display: "block",
          ease: Power4.easeOut,
          delay: 0.1,
        }
      );
    }
  },
};

var content_popup = {
  open: function (elem) {
    gsap.fromTo(
      $(".content-popup#" + elem),
      0.5,
      {
        scale: 0,
        alpha: 0,
        display: "none",
        ease: Power4.easeOut,
      },
      {
        scale: 1,
        alpha: 1,
        display: "block",
        ease: Power4.easeOut,
        delay: 0.1,
      }
    );
  },
  close: function (elem) {
    gsap.fromTo(
      $(".content-popup#" + elem),
      0.5,
      {
        scale: 1,
        alpha: 1,
        display: "block",
        ease: Power4.easeOut,
      },
      {
        scale: 0,
        alpha: 0,
        display: "none",
        ease: Power4.easeOut,
        delay: 0.1,
      }
    );
  },
};

/* NOTE: This function for have one overlay but show hide each popup */
/* WARNING: use for show/hide popup */

/* function create_popup(elem) {
  $(`.popup-overlay#${elem}`).empty();
  $(`.popup-overlay#${elem}` + "").load("templates/" + elem + ".html", function () {
    loadLocalizableResources("data/" + getCookie("lang") + "/" + elem + ".json", function () {
      $.getScript("js/pages/" + elem + ".js");
    });
  });
}
var popup = {
  callback_close: function () {},
  callback_open: function () {},
  callback_init: function () {},
  callback_leave: function () {},
  init: function (elem) {
    $(window).off("click");
    $(window).on("click", function (e) {
      console.log(e.target);
      if ($(e.target).hasClass(`scroll-popup`)) {
        popup.close(elem);
      }
    });

    $(".popup .popup__close")
      .off()
      .on("click", function () {
        popup.close(elem);
      });

    $(".btn.btn--popup-close")
      .off()
      .on("click", function () {
        popup.close(elem);
      });

    this.callback_close = function () {};
    this.callback_leave = function () {};
    this.callback_open = function () {};
    this.callback_init();
  },

  leave: function (elem) {
    var vm = this;
    gsap.to($(`.popup-overlay#${elem} .popup`), 0.5, {
      scale: 0.85,
      ease: Power4.easeOut,
    });
    gsap.to($(`.popup-overlay#${elem}`), 0.5, {
      y: 100,
      alpha: 0,
      display: "none",
      ease: Power4.easeOut,
    });
    setTimeout(function () {
      $(`.popup-overlay#${elem}`).empty();
      vm.callback_leave();
    }, 150);
  },

  close: function (elem) {
    gsap.to($(`.popup-overlay#${elem} .popup`), 0.5, {
      scale: 0.85,
      ease: Power4.easeOut,
    });
    gsap.to($(`.popup-overlay#${elem}`), 0.5, {
      alpha: 0,
      display: "none",
      ease: Power4.easeOut,
    });
    this.callback_close();
  },

  open: function (elem) {
    if (!$("#" + elem).children().length) {
      create_popup(elem);
    }

    gsap.fromTo(
      $(`.popup-overlay#${elem} .popup`),
      0.5,
      {
        scale: 0.6,
        ease: Power4.easeOut,
      },
      {
        scale: 1,
        ease: Power4.easeOut,
        delay: 0.1,
      }
    );
    gsap.fromTo(
      $(`.popup-overlay#${elem}`),
      0.5,
      {
        alpha: 0,
        display: "none",
        ease: Power4.easeOut,
      },
      {
        alpha: 1,
        display: "block",
        ease: Power4.easeOut,
        delay: 0.1,
      }
    );

    this.callback_open();
  },

  option: function (attr, callback) {
    // var permission = ["close", "init", "leave", "open"];
    // if (permission.includes(attr)) return;
    if (typeof callback != "function") return;
    popup[`callback_${attr}`] = callback;
  },
}; */
