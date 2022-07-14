"use strict";
import "./slideshow.js";
import "./seat.js";
import { showAlerts } from "./showAlerts.js";
const busContent = document.querySelectorAll(".bus-content");

busContent.forEach(async (tile) => {
  const id = tile.dataset.busid;
  try {
    const seats = [];
    const busDepartureDate = document.querySelector("#busDate").textContent;
    const res = await axios({
      method: "post",
      url: `/api/v1/bus/getBookedSeats?busDepartureDate=${busDepartureDate}`,
      data: {
        busID: id,
      },
    });
    if (res.data.status === "success") {
      res.data.data.docs.forEach((bus) => {
        if (bus.seats.length > 1) {
          for (const seat of bus.seats) {
            seats.push(seat);
          }
        } else {
          seats.push(bus.seats.at(0));
        }
      });
      document.querySelector(`[data-busid= "${id}"]`).querySelector("#busSeats").textContent = 40 - seats.length;
    }
  } catch (err) {
    showAlerts("error", err);
  }
});
