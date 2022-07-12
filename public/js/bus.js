"use strict";
const busTypeInputArr = document.querySelectorAll(".busTypeInput");
const busAmnetiesInputArr = document.querySelectorAll(".amn-tile");
const busDepartureInputArr = document.querySelectorAll(".busDepartureInput");
const tourContent = document.querySelector("#tour-content");
const globalInput = document.querySelectorAll(".globalInput");
let busTypeArr = [];
let busAmnetiesArr = [];
let busDepartureArr = [];
let busArrivalArr = [];
if (busTypeInputArr) {
  busTypeInputArr.forEach((inp) => {
    inp.addEventListener("click", async () => {
      busTypeArr = [];
      busTypeInputArr.forEach((el) => {
        if (el.checked) {
          const type = el.getAttribute("id").toLowerCase();
          busTypeArr.push(type);
        }
      });
    });
  });
}

if (busAmnetiesInputArr) {
  busAmnetiesInputArr.forEach((el) => {
    el.addEventListener("click", async () => {
      busAmnetiesArr = [];
      busAmnetiesInputArr.forEach((el) => {
        if (el.checked) {
          const type = el.getAttribute("id").toLowerCase();
          busAmnetiesArr.push(type);
        }
      });
    });
  });
}

if (busDepartureInputArr) {
  busDepartureInputArr.forEach((el) => {
    el.addEventListener("click", async () => {
      busDepartureArr = [];
      busDepartureInputArr.forEach((el) => {
        if (el.checked) {
          const type = el.getAttribute("id").toLowerCase().split("-").at(-1);
          busDepartureArr.push(type);
        }
      });
    });
  });
}

const addArrivalDate = function (buses, searchedDate) {
  const busesArr = buses.map((el) => {
    let userInputedDate = new Date(searchedDate);
    let arrivalTime = Number(el.busDepartureTime.split(":")[0]);
    for (let i = 1; i <= Math.round(el.busTravelDuration); i++) {
      if (arrivalTime >= 24) {
        userInputedDate.setDate(userInputedDate.getDate() + 1);
        arrivalTime = 0;
      }
      arrivalTime += 1;
    }
    el.busArrivalDate = userInputedDate;
    return el;
  });
  return busesArr;
};

export const renderAdminBuses = function (buses) {
  let html = `<div class="head-tile">
  <div id="bus"><span style="font-weight: bolder">Buses Found (${buses.length})</span></div>
  <div>Departure</div>
  <div>Duration</div>
  <div>Arrival</div>
  <div>Ratings</div>
  <div>Fare</div>
  <div>Total Seats</div>
  <div>Validity</div>
</div>`;
  for (const bus of buses) {
    const subContent = `
    <div class="bus-content">
    <div class="tour-tile">
      <div id="bus">
        <div class="column-details">
          <div style="font-weight: bolder">${bus.busName}</div>
          <div class="boarding" style="font-weight: bolder">${bus.busType}</div>
          <div class="icons">
            ${(function () {
              let str = "";
              for (const amn of bus.busAmneties) {
                if (amn === "wifi") {
                  str += '<i class="fa fa-solid fa-wifi"></i>';
                }
                if (amn === "charging-station") {
                  str += '<i class="fa fa-solid fa-charging-station"></i>';
                }
                if (amn === "bed") {
                  str += '<i class="fa fa-solid fa-video"></i>';
                }
                if (amn === "video") {
                  str += '<i class="fa fa-solid fa-bed"></i>';
                }
                if (amn === "restroom") {
                  str += '<i class="fa fa-solid fa-restroom"></i>';
                }
              }
              return str;
            })()}
          </div>
        </div>
      </div>
      <div>
        <div class="column-details">
          <div style="font-weight: bolder ;font-size: 25px;">${bus.busDepartureTime}</div>
          <div class="boarding">${bus.busBoardingLocation.toUpperCase()}</div>
        </div>
      </div>
      <div>${bus.busTravelDuration}Hrs</div>
      <div>
        <div class="column-details">
          <div style="font-weight: bolder; font-size: 25px;">${bus.busArrivalTime}</div>
          <div class="arrival">${bus.busDroppingLocation.toUpperCase()}</div>
        </div>
      </div>
      <div>
        <div style="background-color: green; color: white; width: 80px; padding: 5px 10px;"> <i
            class="fa fa-solid fa-star"></i> ${bus.busRatingsAverage ? bus.busRatingsAverage : "NA"}</div>
      </div>
      <div> &#x20B9 ${bus.busFare}</div>
      <div>
        <div class="column-details">
          <div>${bus.busSeatsAvailable}</div>
        </div>
      </div>
      <div style='font-weight:bold'>
      ${moment(bus.busValidFrom).format("LL").toUpperCase()} TO ${moment(bus.busValidTo).format("LL").toUpperCase()}
      </div>
    </div>
    <div class="bottom-bar">
      <div id="bus-photos">Bus Photos</div>
      <div id="bus-reviews">View Reviews</div>
      <div id="view-seatBtn" style="background-color:		#B87333;">VIEW SEATS</div>
    </div>
  </div>
    `;
    html += subContent;
  }

  return html;
};

export const renderBuses = function (buses) {
  let html = `<div class="head-tile">
  <div id="bus"><span style="font-weight: bolder">Buses Found (${buses.length})</span></div>
  <div>Departure</div>
  <div>Duration</div>
  <div>Arrival</div>
  <div>Ratings</div>
  <div>Fare</div>
  <div>Seats Available</div>
</div>`;
  for (const bus of buses) {
    const subContent = `
    <div class="bus-content">
    <div class="tour-tile">
      <div id="bus">
        <div class="column-details">
          <div style="font-weight: bolder">${bus.busName}</div>
          <div class="boarding" style="font-weight: bolder">${bus.busType}</div>
          <div class="icons">
            ${(function () {
              let str = "";
              for (const amn of bus.busAmneties) {
                if (amn === "wifi") {
                  str += '<i class="fa fa-solid fa-wifi"></i>';
                }
                if (amn === "charging-station") {
                  str += '<i class="fa fa-solid fa-charging-station"></i>';
                }
                if (amn === "bed") {
                  str += '<i class="fa fa-solid fa-video"></i>';
                }
                if (amn === "video") {
                  str += '<i class="fa fa-solid fa-bed"></i>';
                }
                if (amn === "restroom") {
                  str += '<i class="fa fa-solid fa-restroom"></i>';
                }
              }
              return str;
            })()}
          </div>
        </div>
      </div>
      <div>
        <div class="column-details">
          <div style="font-weight: bolder ;font-size: 25px;">${bus.busDepartureTime}</div>
          <div class="boarding">${bus.busBoardingLocation.toUpperCase()}</div>
        </div>
      </div>
      <div>${bus.busTravelDuration}Hrs</div>
      <div>
        <div class="column-details">
          <div style="font-weight: bolder; font-size: 25px;">${bus.busArrivalTime}</div>
          <div class="arrival-date" style="color:#DA2C43;">${moment(bus.busArrivalDate)
            .format("LL")
            .toUpperCase()}</div>
          <div class="arrival">${bus.busDroppingLocation.toUpperCase()}</div>
        </div>
      </div>
      <div>
        <div style="background-color: green; color: white; width: 80px; padding: 5px 10px;"> <i
            class="fa fa-solid fa-star"></i> ${bus.busRatingsAverage ? bus.busRatingsAverage : "NA"}</div>
      </div>
      <div> &#x20B9 ${bus.busFare}</div>
      <div>
        <div class="column-details">
          <div>${bus.busSeatsAvailable}</div>
        </div>
      </div>
    </div>
    <div class="bottom-bar">
      <div id="bus-photos">Bus Photos</div>
      <div id="bus-reviews">View Reviews</div>
      <div id="view-seatBtn" style="background-color:		#B87333;">VIEW SEATS</div>
    </div>
  </div>
    `;
    html += subContent;
  }

  return html;
};

const filterGetBuses = async function (
  busDepartureCity,
  busArrivalCity,
  date,
  busTypeArr,
  busAmnetiesArr,
  busDepartureArr
) {
  try {
    const res = await axios({
      method: "post",
      url: "/api/v1/bus/getCityBusAPI",
      data: {
        busDepartureCity,
        busArrivalCity,
        date,
        filter: {
          busTypeArr,
          busAmnetiesArr,
          busDepartureArr,
        },
      },
    });
    return res;
  } catch (err) {
    console.log(err);
    showAlerts("error", err.response.data.message);
  }
};

if (globalInput) {
  globalInput.forEach((el) => {
    el.addEventListener("click", async () => {
      const busDepartureCity = document.querySelector("#busDepartureCity").textContent.toLowerCase();
      const busArrivalCity = document.querySelector("#busArrivalCity").textContent.toLowerCase();
      let date = document.querySelector("#busDate").textContent;
      let buses = await filterGetBuses(
        busDepartureCity,
        busArrivalCity,
        date,
        busTypeArr,
        busAmnetiesArr,
        busDepartureArr
      );
      buses = addArrivalDate(buses.data.data.docs, date);
      tourContent.innerHTML = "";
      const html = renderBuses(buses);
      tourContent.insertAdjacentHTML("afterbegin", html);
    });
  });
}
