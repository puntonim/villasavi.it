const onDocumentReadyLang = () => {
  initLang();
};
document.addEventListener("DOMContentLoaded", onDocumentReadyLang);

const initLang = () => {
  // Get the selected language from local storage, or set it to IT.
  let lang = localStorage.getItem("lang");
  if (lang != "IT" && lang != "EN") {
    lang = "IT";
    localStorage.setItem("lang", lang);
  }
  if (lang == "EN") switchTextTo(lang);

  // Attach the onlick event to the flag icons.
  const flagIt = document.querySelector(".flag-it");
  flagIt.onclick = () => {
    localStorage.setItem("lang", "IT");
    switchTextTo("IT");
  };
  const flagEn = document.querySelector(".flag-en");
  flagEn.onclick = () => {
    localStorage.setItem("lang", "EN");
    switchTextTo("EN");
  };
};

const switchTextTo = (lang) => {
  const itTexts = document.querySelectorAll(".lang-it");
  const enTexts = document.querySelectorAll(".lang-en");
  if (lang == "EN") {
    for (let itText of itTexts) itText.style.display = "none";
    for (let enText of enTexts) {
      let display = "block";
      if (enText.className.includes("inline")) display = "inline";
      enText.style.display = display;
    }
  } else {
    for (let itText of itTexts) {
      let display = "block";
      if (itText.className.includes("inline")) display = "inline";
      itText.style.display = display;
    }
    for (let enText of enTexts) enText.style.display = "none";
  }
};
