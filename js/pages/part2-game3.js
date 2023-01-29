function onNextButtonClicked() {}

function onPreviousButtonClicked() {}

$(function () {
  showNavigation(arrow_prev, arrow_next);
  animationHandle();
  gameHandle();
  subTitle();
  drop();
  showText();
});

function animationHandle() {
  new Swiper(".swiper", {
    speed: 400,
    removeSlide: 0,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    slidesPerView: "auto",

    allowTouchMove: false,
    
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
  });
  
  $('.box').on('click', function() {
    Swiper.removeSlide(slideIndex);
    console.log(slideIndex);
  });
}

let countBox = 0;
let active = "";
let slideIndex = 0;

function gameHandle() {
  $(".box").draggable({
    // cursor: "move",
    start: function (e, ui) {
      console.log(ui.helper.attr("id"));
      active = ui.helper.attr("id");
    },

    revert: function (dropped) {
      console.log(dropped);
      const dragAnswer = $(this).data("choice");
      const dropAnswer = $(dropped).data("choice");

      if (dragAnswer == dropAnswer) {
        console.log(dragAnswer, dropAnswer);
        $(this).fadeOut();
        $(dropped).text("dropped");

        countBox = countBox + 1;
        slideIndex = dragAnswer-1;
        console.log(slideIndex);
        console.log(active);
        $("#" + active).remove();
        // console.log(countBox)
      } else if (dragAnswer != dropAnswer) {
        $(".box").effect("shake");
        return true;
      }
      showText();
    },
  });
}

function drop() {
  $(".dropbox").droppable({});
}

function subTitle() {
  gsap.fromTo(
    $(".text--sub"),
    0.6,
    { opacity: 0, left: -50 },
    { opacity: 1, left: 0 }
  );
  // $.fn.pulse_twices;
  setTimeout(() => {
    gsap.fromTo(
      $(".text--sub"),
      0.4,
      { opacity: 0.5 },
      { opacity: 1, yoyo: true, repeat: 2 }
    );
  }, 500);
}

function showText() {
  if (countBox == 4) {
    $(".swiper").css({
      display: "none",
    });

    $(".container").css({
      display: "grid",
    });

    gsap.fromTo(
      $(".text--show"),
      0.4,
      { opacity: 0.4 },
      { opacity: 1, yoyo: true, repeat: 4 }
    );
  }
}

