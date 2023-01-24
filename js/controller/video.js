/* ==================================================
  video js (on going development)

  update:                 22/02/22
  mode:                   single service
  to use:                 just complie this file with your project
  support:                chrome, safari, edge, and also IE

  - basic html -
    <video class="video" src="videos/video1.mp4"></video>

  - short usage -
  var myVideo = new Video($(".video"))
  myVideo.play();
  myVideo.pause();

  - full use with event and parameter -
  var myVideo = new Video($(".video"), {
    pauseOnClose: true, // default
    preload: true, // default
    fullScreen: true, // default
    subtitle: "data/en-gb/file.vtt",
    muted: false, //default

    // user trigger play function
    onStart: function() {
      console.log("video has start")
    },

    // event call when video play
    onPlay: function() {
      console.log("video has start")
    },

    // video has end
    onEnd: function() {
      console.log("video has end")
    }
  })

  - parameter -
  myVideo.option.pauseOnClose = true;
  myVideo.option.fullScreen = true;
  myVideo.option.preload = true;
  myVideo.option.subtitle = "data/en-gb/file.vtt";
  myVideo.option.muted = false;

  - function -
  myVideo.play();
  myVideo.pause();
  myVideo.openFullScreen();
  myVideo.exitFullScreen();

  - callback function -
  myVideo.event.onStart = function() {}
  myVideo.event.onEnd = function() {}
  myVideo.event.onStart = function() {}
  myVideo.event.onExitFullScreen = function() {}
================================================== */

function Video(video, option = {}) {
  var vm = this;

  vm.video = typeof video == "string" ? $(video).get(0) : video.get(0);
  $(vm.video).off();

  // parameter
  vm.option = {
    pauseOnClose:
      typeof option.pauseOnClose !== "undefined" ? option.pauseOnClose : true,
    fullScreen:
      typeof option.fullScreen !== "undefined" ? option.fullScreen : true,
    subtitle: typeof option.subtitle !== "undefined" ? option.subtitle : null,
    preload: typeof option.preload !== "undefined" ? option.preload : true,
    muted: typeof option.muted !== "undefined" ? option.muted : vm.video.muted,
    loop: typeof option.loop !== "undefined" ? option.loop : vm.video.loop,
    autoplay:
      typeof option.autoplay !== "undefined"
        ? option.autoplay
        : vm.video.autoplay,
    controls:
      typeof option.controls !== "undefined"
        ? option.controls
        : vm.video.controls,
  };

  vm.video.muted = vm.option.muted;
  vm.video.loop = vm.option.loop;
  vm.video.autoplay = vm.option.autoplay;
  vm.video.controls = vm.option.controls;

  $(video).attr({
    preload: vm.option.preload,
  });

  // console.log(vm.video.autoplay);
  // event
  vm.event = {
    onStart: option.onStart || function () {},
    onPlay: option.onPlay || function () {},
    onPlaying: option.onPlaying || function () {},
    onSeek: option.onSeek || function () {},
    onSeeking: option.onSeeking || function () {},
    onUpdate: option.onUpdate || function () {},
    onPause: option.onPause || function () {},
    onEnd: option.onEnd || function () {},
    onExitFullScreen: option.onExitFullScreen || function () {},
  };

  vm.options = function (options, callback) {
    if (vm.event[options] && typeof callback == "function") {
      vm.event[options] = callback;
    }
  };

  if (vm.option.subtitle) {
    if (audioOrVideo.readyState > 0) {
      track = document.createElement("track");
      track.kind = "subtitles";
      track.label = getCookie("lang");
      track.srclang = getCookie("lang");
      track.src = vm.option.subtitle;
      track.default = "default";
      track.addEventListener("load", function () {
        this.mode = "showing";
        vm.video.textTracks[0].mode = "showing"; // thanks Firefox
      });
      vm.video.appendChild(track);
    } else {
      vm.video.addEventListener("loadedmetadata", function () {
        track = document.createElement("track");
        track.kind = "subtitles";
        track.label = getCookie("lang");
        track.srclang = getCookie("lang");
        track.src = vm.option.subtitle;
        track.default = "default";
        track.addEventListener("load", function () {
          this.mode = "showing";
          vm.video.textTracks[0].mode = "showing"; // thanks Firefox
        });
        this.appendChild(track);
      });
    }
  }

  vm.openFullscreen = function () {
    if (vm.video.requestFullscreen) {
      vm.video.requestFullscreen();
    } else if (vm.video.mozRequestFullScreen) {
      vm.video.mozRequestFullScreen();
    } else if (vm.video.webkitEnterFullscreen) {
      vm.video.webkitEnterFullscreen();
    } else if (vm.video.msRequestFullscreen) {
      vm.video.msRequestFullscreen();
    }
  };

  vm.exitFullscreen = function () {
    var isFullScreen =
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      vm.video.webkitDisplayingFullscreen ||
      document.msFullscreenElement;

    if (isFullScreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen(); // Standard
      } else if (vm.video.webkitExitFullscreen) {
        vm.video.webkitExitFullscreen(); // Blink
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen(); // Gecko
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen(); // Old IE
      }
    }
  };

  vm.play = function () {
    // work on IE without promise
    var isIE = /MSIE|Trident/.test(navigator.userAgent);
    if (isIE) {
      vm.video.play();
      vm.event.onStart();

      if (vm.option.fullScreen) {
        vm.openFullscreen();
      }
    }

    // any browser with promise base on sound/video policy
    else {
      var promise = vm.video.play();

      if (promise !== undefined) {
        promise
          .then(function (_) {
            // happy case, video can auto play and open full screen
            vm.event.onStart();

            if (vm.option.fullScreen) {
              vm.openFullscreen();
            }
          })
          .catch(function (error) {
            console.info(error);

            // user gesture case, video can't auto play and can't open full screen without mute
            $(".mute").show();
            // vm.video.muted = true;
            vm.video.play();
            vm.event.onStart();

            if (vm.option.fullScreen) {
              vm.openFullscreen();
            }
          });
      } else {
        $(".mute").show();

        vm.video.muted = true;
        vm.event.onStart();

        if (vm.option.fullScreen) {
          vm.openFullscreen();
        }
      }
    }
  };

  vm.pause = function () {
    vm.video.pause();
  };

  // work on IE both fullscreen and not full screen, and all browser that NOT in full screen mode
  $(window).on("resize", function () {
    var isIE = /MSIE|Trident/.test(navigator.userAgent);
    var isFullScreen = document.msFullscreenElement;
    if (isIE && !isFullScreen && vm.option.pauseOnClose) {
      vm.video.pause();
      vm.event.onExitFullScreen();
    }
  });

  // work on all browser except IE
  $(vm.video).on(
    "mozfullscreenchange webkitfullscreenchange fullscreenchange",
    function () {
      var isFullScreen =
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement;

      if (!isFullScreen && vm.option.pauseOnClose) {
        vm.video.pause();
        vm.event.onExitFullScreen();
      }
    }
  );

  // work on ios
  $(vm.video).on("webkitendfullscreen", function () {
    var isMobile =
      /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        navigator.userAgent
      );

    if (isMobile && vm.option.pauseOnClose) {
      vm.video.pause();
      vm.event.onExitFullScreen();
    }
  });

  // event trigger everytime video resume to play
  $(vm.video).on("play", function () {
    vm.event.onPlay();
  });

  $(vm.video).on("playing", function () {
    vm.event.onPlaying();
  });

  $(vm.video).on("seeking", function () {
    vm.event.onSeeking();
  });
  $(vm.video).on("seeked", function () {
    vm.event.onSeek();
  });
  $(vm.video).on("timeupdate", function () {
    vm.event.onUpdate();
  });

  $(vm.video).on("ended", function () {
    vm.exitFullscreen();
    vm.event.onEnd();
  });

  $(vm.video).on("pause", function () {
    vm.event.onPause();
  });
}

/*
  THIS BELOW CODE IS FOR OLD DEVELOPER WHO WANT TO USE ORIGINAL VIDEO CALL
  AND ITS NOT BELONG TO Video()
*/
function addVideo(
  parent,
  videoPath,
  videoSubId,
  videoWidth,
  videoHeight,
  vvid,
  autoplay,
  control,
  loop
) {
  var videoSub = $("<div>", {
    id: videoSubId,
    height: videoHeight,
  }).appendTo(parent);

  var video = $(
    '<video allow="autoplay" autobuffer="auto" preload ' +
      autoplay +
      " " +
      loop +
      "" +
      control +
      ' height="' +
      videoHeight +
      '" width="' +
      videoWidth +
      '" id="videoplay' +
      vvid +
      '">',
    {}
  )
    .css({
      display: "block",
      margin: "0 auto",
    })
    .appendTo(videoSub);
  $("<source>", {
    src: videoPath + ".mp4",
    type: "video/mp4",
  }).appendTo(video);
  $("<source>", {
    src: videoPath + ".webm",
    type: "video/webm",
  }).appendTo(video);
  $("<source>", {
    src: videoPath + ".ogv",
    type: "video/ogv",
  }).appendTo(video);
  $("<div>", {}).appendTo(videoSub).addClass("videoSubBar");
}

function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

function exitFullscreen(elem) {
  var state =
    document.fullScreen ||
    document.mozFullScreen ||
    document.webkitIsFullScreen ||
    document.msExitFullscreen;
  var ios = /iPad|iPhone|iPod/i.test(navigator.userAgent);
  if (state) {
    if (document.exitFullscreen) {
      document.exitFullscreen(); // Standard
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen(); // Blink
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen(); // Gecko
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen(); // Old IE
    }
  } else if (ios) {
    elem.webkitExitFullscreen();
  }
}
