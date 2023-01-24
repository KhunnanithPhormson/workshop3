function clear_arrow() {
  gsap.killTweensOf(arrow_down);
  gsap.set(arrow_down, {
    clearProps: "all",
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

$.fn.clear_anim = function (elem) {
  $(this).removeClass("animate");
  gsap.killTweensOf($(this));
  if (typeof elem == "undefined") {
    gsap.set($(this), {
      clearProps: "all",
    });
  } else {
    gsap.set($(this), {
      clearProps: elem,
    });
  }
};

$.fn.pulse_twices = function (delay, duration) {
  if (typeof delay == "undefined") delay = 0;
  if (typeof duration == "undefined") duration = 0.6;
  gsap.to($(this), {
    alpha: 0.3,
    yoyo: true,
    repeat: 3,
    ease: Linear,
    duration: duration,
    delay: delay,
  });
};

$.fn.pulse = function (obj) {
  if (typeof obj == "undefined") obj = {};
  if (typeof obj.delay == "undefined") obj.delay = 0.4;
  if (typeof obj.alpha == "undefined") obj.alpha = 0.5;
  $(this).clear_anim();
  gsap.to($(this), {
    alpha: obj.alpha,
    yoyo: true,
    repeat:
      typeof obj.repeat === "undefined"
        ? -1
        : obj.repeat % 2 == 0
        ? (obj.repeat += 1)
        : (obj.repeat += 2),
    ease: Power1.easeOut,
    delay: obj.delay,
  });
};

function autoScrollTop(obj) {
  if (typeof obj == "undefined") obj = {};
  $(".scroll-inner")
    .stop()
    .animate({ scrollTop: 0 }, obj.duration ? obj.duration : 1000);
}

$.fn.downPulse = function downPulse() {
  gsap.to($(this), 0.4, {
    y: "0.3rem",
    repeat: -1,
    yoyo: true,
  });
};

$.fn.fadeInByOpacity = function (delay, anim_time) {
  if (typeof delay == "undefined") delay = 0.1;
  if (typeof anim_time == "undefined") anim_time = 0.5;
  gsap.to($(this), anim_time, {
    opacity: 1,
    ease: Power0.easeNone,
    delay: delay,
  });
};

$.fn.fadeOutByOpacity = function (delay, anim_time) {
  if (typeof delay == "undefined") delay = 0.1;
  if (typeof anim_time == "undefined") anim_time = 0.5;
  gsap.to($(this), anim_time, {
    opacity: 0,
    ease: Power0.easeNone,
    delay: delay,
  });
};

$.fn.fadeInByFlex = function (times) {
  if (typeof times == "undefined") times = 400;
  times = times / 1000;
  gsap.fromTo(
    $(this),
    times,
    {
      display: "none",
      alpha: 0,
    },
    {
      display: "flex",
      alpha: 1,
    }
  );
};

$.fn.fadeOutByFlex = function (times) {
  if (typeof times == "undefined") times = 400;
  times = times / 1000;
  gsap.to($(this), times, {
    // position:"absolute",
    display: "none",
    // alpha: 0,
  });
};

$.fn.destroy_anim = function () {
  gsap.killTweensOf(this);
  gsap.set(this, {
    clearProps: "all",
  });
};

$.fn.ins = function (delay) {
  if (typeof delay === "undefined") delay = 0;
  var self = this;
  gsap.fromTo(
    $(this),
    0.4,
    {
      left: "-5rem",
      alpha: 0,
    },
    {
      left: 0,
      alpha: 1,
      delay: delay,
      ease: Power1.linear,
    }
  );

  gsap.to($(this), 0.25, {
    alpha: 0.3,
    yoyo: true,
    repeat: 3,
    ease: Power0.easeOut,
    delay: delay + 0.5,
  });
};
$.fn.ins_left = function (delay) {
  if (typeof delay === "undefined") delay = 0;
  let x = isMobile ? 150 : 360;
  var self = this;
  gsap.fromTo(
    $(this),
    0.4,
    {
      left: "-5rem",
      alpha: 0,
    },
    {
      left: x,
      alpha: 1,
      delay: delay,
      ease: Power1.linear,
    }
  );

  gsap.to($(this), 0.25, {
    alpha: 0.3,
    yoyo: true,
    repeat: 3,
    ease: Power0.easeOut,
    delay: delay + 0.5,
  });
};
$.fn.ins_item__1 = function (delay) {
  if (typeof delay === "undefined") delay = 0;
  let x = isMobile ? -55 : -80;
  var self = this;
  gsap.fromTo(
    $(this),
    0.4,
    {
      left: "-200rem",
      alpha: 0,
    },
    {
      left: x,
      alpha: 1,
      delay: delay,
      ease: Power1.linear,
    }
  );

  gsap.to($(this), 0.25, {
    alpha: 1,
    yoyo: true,
    // repeat: 1,
    ease: Power0.easeOut,
    delay: delay + 0.5,
  });
};
$.fn.ins_item__2 = function (delay) {
  if (typeof delay === "undefined") delay = 0;
  let x = isMobile ? -55 : -80;
  var self = this;
  gsap.fromTo(
    $(this),
    0.4,
    {
      right: "-200rem",
      alpha: 0,
    },
    {
      right: x,
      alpha: 1,
      delay: delay,
      ease: Power1.linear,
    }
  );

  gsap.to($(this), 0.25, {
    alpha: 1,
    yoyo: true,
    // repeat: 1,
    ease: Power0.easeOut,
    delay: delay + 0.5,
  });
};
$.fn.arrow_pulse = function (delay) {
  if (delay == "undefined") delay = 0;
  gsap.to($(this), 0.4, {
    pointerEvents: "auto",
    delay: delay,
  });
  gsap.to($(this), 0.4, {
    x: "0.3rem",
    repeat: -1,
    yoyo: true,
    delay: delay,
  });
};

/* Shake animation */
$.fn.shake = function (anim, callback) {
  if (typeof anim == "undefined" || anim == null) anim = "4";
  var self = this;
  gsap.fromTo(
    $(self),
    0.08,
    {
      x: "-" + anim,
    },
    {
      x: anim,
      yoyo: true,
      repeat: 7,
      ease: Power1.linear,
      onComplete: function () {
        // $(self).css('transform', 'none');
      },
    }
  );
};

$.fn.rotate = function () {
  var self = this;
  // $(self).clear_anim();
  gsap.to($(self), 2, {
    rotation: "360",
    repeat: -1,
    ease: Power0.linear,
  });
};

// SELECTED ANIMATION
function selectedAnim() {
  if ($(".move-1").length !== 0) {
    gsap.fromTo(
      $(".move-1"),
      0.5,
      {
        x: "-5rem",
        alpha: 0,
      },
      {
        x: "0",
        alpha: 1,
        delay: 0.5,
        ease: Power1.linear,
      }
    );
  }

  if ($(".move-2").length !== 0) {
    gsap.fromTo(
      $(".move-2"),
      0.5,
      {
        x: "5rem",
        alpha: 0,
      },
      {
        x: "0",
        alpha: 1,
        delay: 0.5,
        ease: Power1.linear,
      }
    );
  }

  if ($(".move-3").length !== 0) {
    gsap.fromTo(
      $(".move-3"),
      0.5,
      {
        y: "2rem",
        alpha: 0,
      },
      {
        y: "0",
        alpha: 1,
        delay: 0.5,
        ease: Power1.linear,
      }
    );
  }
}

$.fn.collapseItem = function (obj) {
  if ($(this).hasClass("collapsed")) {
    gsap.to($(this).find(".collapse__icon__line"), {
      rotate: 0,
      duration: 0.25,
    });
    $(this).removeClass("collapsed");
  } else {
    gsap.to($(this).find(".collapse__icon__line--1"), {
      rotate: 90,
      duration: 0.25,
    });
    gsap.to($(this).find(".collapse__icon__line--2"), {
      rotate: 180,
      duration: 0.25,
    });
    $(this).addClass("collapsed");
  }
  $(this).find(".collapse__content").slideToggle("fast");
};

function straggerAnim(obj) {
  if (typeof obj == "undefined") obj = {};
  if (typeof obj.delay == "undefined") obj.delay = 0.4;
  if (typeof obj.elem == "undefined")
    return console.log('Err : Send jQuery object "elem"');
  gsap.fromTo(
    obj.elem,
    {
      alpha: 0,
      delay: obj.delay,
      y: "-1rem",
      duration: 0.35,
    },
    {
      alpha: 1,
      stagger: 0.4,
      duration: 0.35,
      delay: obj.delay,
      y: "0",
    }
  );
}
