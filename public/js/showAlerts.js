"use strict";
const hideAlert = function () {
  const el = document.querySelector(".error");
  if (el) el.remove();
};

export const showAlerts = function (type, msg) {
  hideAlert();
  const markup = `<div class='error alert--${type}'>${msg}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  setTimeout(hideAlert, 5000);
};
