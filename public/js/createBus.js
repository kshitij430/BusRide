"use strict";
import { showAlerts } from "./showAlerts.js";
const profileForm = document.querySelector(".profile__form");
import { renderAdminBuses } from "./bus.js";

export const viewBuses = async function (busID) {
  try {
    const res = await axios({
      method: "post",
      url: "/api/v1/bus/operatorBus",
      data: { id: busID },
    });
    if (res.data.status === "success") {
      const buses = res.data.data.docs;
      const html = renderAdminBuses(buses);
      return html;
    }
  } catch (err) {
    console.log(err);
    showAlerts("error", err.response.data.message);
  }
};

export const createBus = async function (busBody) {
  busBody.busFare = Number(busBody.busFare);
  try {
    const res = await axios({
      method: "post",
      url: "/api/v1/bus/addBus",
      data: { ...busBody },
    });
    if (res.data.status === "success") {
      console.log("SUCCESS");
      showAlerts("success", "Bus Created");
    }
  } catch (err) {
    console.log(err);
    showAlerts("error", err.response.data.message);
  }
};

export const fetchBusData = function () {
  const radioBusType = document.querySelectorAll(".busType");
  const radioBusAmn = document.querySelectorAll(".busAmn");
  profileForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const busBody = {};
    const busAmnArr = [];
    let busType;
    const busName = document.getElementById("name").value;
    const busDepartureCity = document.getElementById("busDepCity").value;
    const busArrivalCity = document.getElementById("busArrvCity").value;
    const busBoardingLocation = document.getElementById("busBoardingLoc").value;
    const busDroppingLocation = document.getElementById("busDroppingLoc").value;
    const busDepartureTime = document.getElementById("busDepartTime").value;
    const busValidFrom = document.getElementById("fromDate").value;
    const busValidTo = document.getElementById("toDate").value;
    const busFare = document.getElementById("fare").value;
    const userID = document.querySelector("#user-name").dataset.operatorid;
    radioBusType.forEach((type) => {
      if (type.checked) {
        busType = type.value;
      }
    });
    radioBusAmn.forEach((amn) => {
      if (amn.checked) {
        busAmnArr.push(amn.value);
      }
    });
    busBody["busName"] = busName;
    busBody["busType"] = busType;
    busBody["busDepartureCity"] = busDepartureCity;
    busBody["busArrivalCity"] = busArrivalCity;
    busBody["busDepartureTime"] = busDepartureTime;
    busBody["busBoardingLocation"] = busBoardingLocation;
    busBody["busDroppingLocation"] = busDroppingLocation;
    busBody["busValidFrom"] = busValidFrom;
    busBody["busValidTo"] = busValidTo;
    busBody["busFare"] = busFare;
    busBody["busAmneties"] = busAmnArr;
    busBody["user"] = userID;
    createBus(busBody);
  });
};
