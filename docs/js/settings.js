/*
 * Settings for the app.
 */

const SETTINGS = {
  // It's the price tag shown in /appartamenti.html close to every apt descripton (when
  //  isHidden: false).
  // Note: we can move this to a BE endpoint.
  priceTags: {
    maddalena: {
      isHidden: true,
      priceNumber: 999,
      priceText: "Canone mensile indicativo9",
    },
    caprera: {
      isHidden: true,
      priceNumber: 998,
      priceText: "Canone mensile indicativo8",
    },
    monterosso: {
      isHidden: true,
      priceNumber: 997,
      priceText: "Canone mensile indicativo7",
    },
    vernazza: {
      isHidden: true,
      priceNumber: 996,
      priceText: "Canone mensile indicativo6",
    },
  },

  // It's the price tag shown in /appartamenti.html close to every apt descripton (when
  //  its value is true).
  // Note: we can move this to a BE endpoint.
  occupiedTag: {
    maddalena: false,
    caprera: false,
    monterosso: false,
    vernazza: false,
  },

  email: "infovillasavi@gmail.com",
  phoneEnrico: "+393470619320",
  phoneEnricoVerbose: "+39 347 0619320",
};
