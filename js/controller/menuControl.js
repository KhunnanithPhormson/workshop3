// ==================================================
// MENU CONTROL
// ==================================================
//MENU
var navMenu = $("#menu");
var navExit = $("#exit");
var menuClose = $("#menu-close");
var menuList = $(".menu li");
var menuUnlock = [false, false, false, false, false, false];

function menuControl() {
  navMenu.on("click", function () {
    openMenu();

    unlockMenu();
  });

  menuClose.on("click", function () {
    closeMenu();
  });

  menuList.on("click", function () {
    var pageName = $(this).data("goto");

    closeMenu();
    goto(pageName);
  });

  navExit.on("click", function () {
    goto("select-lang");

    navExit.offClick();
    setTimeout(function () {
      navExit.onClick();
    }, 600);
  });
}

function openMenu() {
  $(".menu-overlay").fadeIn("fast");
  gsap.fromTo(
    ".menu",
    0.5,
    { x: -50 },
    {
      x: 0,
      onComplete: function () {
        $(".menu").clear_anim();
      },
    }
  );
}

function closeMenu() {
  $(".menu-overlay").offClick();

  gsap.to(".menu", 0.5, {
    x: 50,
    onComplete: function () {
      $(".menu").clear_anim();
      $(".menu-overlay").onClick();
    },
  });
  $(".menu-overlay").fadeOut();
}

function unlockMenu() {
  var dataMenu = $(".page").data("menu");

  // unlock menu
  menuList.each(function (index) {
    if (index <= dataMenu) {
      $(this).removeClass("locked");
      menuUnlock[index] = true;
    }
  });

  // active current menu
  $(".menu.active").removeClass("active");
  $(".menu[data-menu=" + dataMenu + "]").addClass("active");
}
