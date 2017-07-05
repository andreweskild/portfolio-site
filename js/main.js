// determine browser as IE, use to disable what IE doesn't support
var isIE = /*@cc_on!@*/false || !!document.documentMode;
var isEdge = !isIE && !!window.StyleMedia;

function initPage() {
  var coverHeader = document.querySelector(".cover-header-main");
  var colorClasses = ['blue-font', 'red-font', 'yellow-font'];
  charming(coverHeader, {classPrefix: 'letter'});
  var letterCollection = coverHeader.querySelectorAll(".letter");
  for (var i = 0; i < letterCollection.length; ++i) {
    var currentValue = letterCollection[i];
    var fontColor = colorClasses[Math.floor(Math.random() * 3)];
    currentValue.classList.add(fontColor)
  }
  document.querySelector(".contact-button").onclick = showContactDropdown;



  var coverColorFade = anime({
    targets: letterCollection,
    duration: 300,
    delay: function(el, index) {
      return (index * 20) + 100;
    },
    autoplay: false,
    color: '#000000'
  });

  var coverAnimation = anime({
    targets: letterCollection,
    opacity: 1,
    duration: 300,
    delay: function(el, index) {
      return (index * 20);
    },
    autoplay: false,
    translateY: function(el, index) {
      return [(index * 10 + 20), 0];
    },
    complete: function() {
      coverTextInEffect.play();
    }
  });

  var loadingPage = document.querySelector(".loading-page");
  var loadingPageFade = createEffect(loadingPage, "fade", "out", 1000, function() {
    loadingPage.style.display = "none";
    coverAnimation.play();
  });
  loadingPageFade.play();
}



var controller = new ScrollMagic.Controller();

var coverScene = new ScrollMagic.Scene({
  triggerElement: "#cover-section",
  triggerHook: "onLeave",
  offset: 100
}).addTo(controller);

var aboutScene = new ScrollMagic.Scene({
  triggerElement: "#about-section",
  triggerHook: "onCenter",
  offset: -200
}).addTo(controller);

var skillsScene = new ScrollMagic.Scene({
  triggerElement: "#skills-section",
  triggerHook: "onCenter"
}).addTo(controller);

var workScene = new ScrollMagic.Scene({
  triggerElement: "#work-section",
  triggerHook: "onCenter",
  offset: -200
}).addTo(controller);

var finScene = new ScrollMagic.Scene({
  triggerElement: "#fin-section",
  triggerHook: "onEnter",
  offset: 250
}).addTo(controller);

coverScene.on("leave", function(event) {scrollArrowInEffect.play()});

aboutScene.on("enter", function(event) {
  scrollArrowOutEffect.play();
  aboutSectionInEffect.play();
});
aboutScene.on("leave", function(event) {
  aboutSectionOutEffect.play();
});

skillsScene.on("enter", function(event) {
  skillIconInEffect.play();
  skillTextInEffect.play();
});
skillsScene.on("leave", function(event) {
  skillIconOutEffect.play();
  skillTextOutEffect.play();
});

workScene.on("enter", function(event) {workSectionInEffect.play()});
workScene.on("leave", function(event) {workSectionOutEffect.play()});

finScene.on("enter", function(event) {finInEffect.play()});
finScene.on("leave", function(event) {finOutEffect.play()});



var scrollArrowInEffect = anime({
  targets: [".scroll-arrow-point", ".scroll-arrow-line"],
  strokeDashoffset: [18, 0],
  duration: 200,
  delay: function(el, index) {
    return (index * 200);
  },
  autoplay: false,
  easing: 'easeInOutSine'
});

var scrollArrowOutEffect = anime({
  targets: [".scroll-arrow-line", ".scroll-arrow-point"],
  strokeDashoffset: [0, 18],
  duration: 200,
  delay: function(el, index) {
    return (index * 200);
  },
  autoplay: false,
  easing: 'easeInOutSine'
});

var coverSection = document.querySelector("#cover-section");
var coverTextInEffect = createEffect(
  coverSection.querySelectorAll(".contact-button, .cover-subheader"),
  "slide",
  "in",
  500,
  function(){scrollArrowInEffect.play();}
);



var dropdown = document.querySelector(".contact-dropdown");
var dropdownInEffect = createEffect(
                                dropdown,
                                "slide",
                                "in",
                                500
);
var dropdownOutEffect = createEffect(
                                dropdown,
                                "slide",
                                "out",
                                500,
                                function() {
                                  dropdown.style.display = "none";
                                }
);


function showContactDropdown() {
  toggleButton("off");
  dropdown.style.display = "flex";
  dropdownInEffect.play();
}

function hideContactDropdown() {
  toggleButton("on")
  dropdownOutEffect.play();
}

function toggleButton(onOff) {
  var btnSvg = document.getElementById("contact-button").contentDocument;
  var topLayer = btnSvg.getElementById("top-layer");
  var buttonSurface = btnSvg.getElementById("button-surface");
  anime({
    targets: buttonSurface,
    duration: 300,
    autoplay: true,
    opacity: function() {
          if(!isIE && !isEdge) {
            opacity = onOff === "off" ? .5 : 1
            return opacity;
          }
    }
  });
  anime({
    targets: topLayer,
    duration: 300,
    autoplay: true,
    translateY: onOff === "off" ? ["0px", "16px"] : ["16px", "0px"]
  });
}


var aboutSection = document.querySelector("#about-section .section-wrapper");
var aboutSectionInEffect = createEffect(aboutSection, "slide", "in", 500);
var aboutSectionOutEffect = createEffect(aboutSection, "slide", "out", 500);

var skillSection = document.querySelector("#skills-section");
var skillIconInEffect = createEffect(
  skillSection.querySelectorAll(".skill-icon"),
  "zoom",
  "in",
  500
);
var skillTextInEffect = createEffect(
                              skillSection.querySelectorAll(".skill-text"),
                              "slide",
                              "in",
                              500
);
var skillIconOutEffect = createEffect(
                              skillSection.querySelectorAll(".skill-icon"),
                              "zoom",
                              "out",
                              500
);
var skillTextOutEffect = createEffect(
                              skillSection.querySelectorAll(".skill-text"),
                              "slide",
                              "out",
                              500
);


var workSection = document.querySelector("#work-section .section-wrapper");
var workSectionInEffect = createEffect(workSection, "slide", "in", 500);
var workSectionOutEffect = createEffect(workSection, "slide", "out", 500);

var finInEffect = createEffect(
                              document.querySelector(".fin-header"),
                              "slide",
                              "in",
                              500
);
var finOutEffect = createEffect(
                              document.querySelector(".fin-header"),
                              "slide",
                              "out",
                              500
);

function createEffect(targetElement, effectType, effectPlayDirection,
  effectDuration, callback) {
  var animeObject;
  effectDuration = effectDuration === undefined ? 300 : effectDuration;
  effectPlayDirection = effectPlayDirection === undefined ? "out" : effectPlayDirection;
  switch (effectType) {
    case "fade":
      animeObject = anime({
        targets: targetElement,
        duration: effectDuration === undefined ? 300 : effectDuration,
        autoplay: false,
        opacity: effectPlayDirection == "out" ? [1, 0] : [0, 1],
        complete: callback
      });
      break;
    case "slide":
      animeObject = anime({
        targets: targetElement,
        duration: effectDuration === undefined ? 300 : effectDuration,
        opacity: effectPlayDirection == "out" ? [1, 0] : [0, 1],
        delay: function(el, index) {
          return index * (effectDuration/3);
        },
        autoplay: false,
        translateY: effectPlayDirection == "out" ? ["0%", "100%"] : ["200%", "0%"],
        complete: callback
      });
      break;
    case "zoom":
      animeObject = anime({
        targets: targetElement,
        duration: effectDuration === undefined ? 300 : effectDuration,
        delay: function(el, index) {
          return index * (effectDuration/3);
        },
        opacity: effectPlayDirection == "out" ? [1, 0] : [0, 1],
        autoplay: false,
        width: function() {
          if(!isIE && !isEdge) {
            width = effectPlayDirection == "out" ? ["100%", "0%"] : ["0%", "100%"]
            return width;
          }
        },
        complete: callback
      });
      break;
    default:
      animeObject = anime({
        targets: targetElement,
        duration: 4000,
        opacity: effectPlayDirection == "out" ? [1, 0] : [0, 1],
        complete: callback
      });
      break;
  }
  return animeObject;
}
