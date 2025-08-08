const onDocumentReadyAppartamenti = () => {
  initCollapsable();
  initRoomSlider();
  onRichiediOnlineMouseOver();
  showOccupiedAndPriceTags();
};
document.addEventListener("DOMContentLoaded", onDocumentReadyAppartamenti);

const onRichiediOnlineMouseOver = () => {
  // Dinamically change class when the mouse is over a div.
  // I suck at CSS so I do it in JS.
  const buttons = document.querySelectorAll(".button-richiedi-jshover-nim");
  for (let button of buttons) {
    const pencil = button.querySelector(".pencil-nim");
    button.onmouseenter = () => {
      pencil.classList.remove("pencil-nim");
      pencil.classList.add("pencil-nim-orange");
    };
    button.onmouseleave = () => {
      pencil.classList.remove("pencil-nim-orange");
      pencil.classList.add("pencil-nim");
    };
  }
};

const initCollapsable = () => {
  $toggleroom = $(".room-title");
  if ($toggleroom.length)
    $toggleroom.click(function () {
      var $this = $(this);
      $this.next().stop().slideToggle("slow");
      $("html, body").animate(
        {
          scrollTop: $(this).offset().top - 190,
        },
        500
      );
      if ($this.find(".icon").hasClass("icon-schliessen") === true) {
        $this.find(".icon").removeClass("icon-schliessen");
        $this.find(".icon").addClass("icon-more");
      } else {
        $this.find(".icon").addClass("icon-schliessen");
        $this.find(".icon").removeClass("icon-more");
      }
      setTimeout(function () {
        $.stellar("refresh");
      }, 500);
    });
  Mfpopup(".mfp-room");
};

const initRoomSlider = () => {
  Slickslider(".room-slider");
  // var timesRun = 0
  //   , interval = setInterval(function() {
  //     timesRun += 1;
  //     if (timesRun === 10)
  //         clearInterval(interval);
  //     $('.room-slider.slick-initialized').slick('setPosition')
  // }, 500)
};

const showOccupiedAndPriceTags = () => {
  // Read the settings and then, in case, show prices and occupied tags.
  // Note: we can move the settings to a BE endpoint.
  for (aptName in SETTINGS.priceTags) {
    if (!SETTINGS.priceTags[aptName].isHidden) {
      _showPriceTag(
        aptName,
        SETTINGS.priceTags[aptName].priceNumber,
        SETTINGS.priceTags[aptName].priceText
      );
    }
  }
  for (aptName in SETTINGS.occupiedTag) {
    if (SETTINGS.occupiedTag[aptName]) {
      _showOccupiedTag(aptName);
    }
  }
};

const _showPriceTag = (aptName, priceNumber, priceText) => {
  const priceContainer = document.querySelector(
    `.${aptName} .price-container-nim`
  );
  priceContainer.querySelector(".price-number").innerHTML = priceNumber;
  priceContainer.querySelector(".price-text").innerHTML = priceText;
  priceContainer.classList.remove("display-none");
};

const _showOccupiedTag = (aptName) => {
  const occupiedContainers = document.querySelectorAll(
    `.${aptName} .occupied-container-nim`
  );
  for (let occupiedContainer of occupiedContainers) {
    occupiedContainer.classList.remove("display-none");
  }
};
