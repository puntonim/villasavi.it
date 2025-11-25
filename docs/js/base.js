const onDocumentReadyAll = () => {
  showEmail();
  showPhone();
};
document.addEventListener("DOMContentLoaded", onDocumentReadyAll);

const showEmail = () => {
  const emailSpans = document.querySelectorAll(".emailjs-nim");
  emailSpans.forEach((i) => {
    i.innerHTML = `<a href="mailto:${SETTINGS.email}" title="Email">${SETTINGS.email}</a>`;
  });
};

const showPhone = () => {
  const phoneSpans = document.querySelectorAll(".phonejs-nim");
  phoneSpans.forEach((i) => {
    i.innerHTML = `<a href="tel:${SETTINGS.phoneEnrico}" title="Telefono">${SETTINGS.phoneEnricoVerbose}</a>`;
  });
};

const sleep = async (msec) => {
  return new Promise((resolve) => setTimeout(resolve, msec));
};
