"use strict";
import { showAlerts } from "./showAlerts.js";

const viewSeatBtn = document.querySelector("#view-seatBtn");
const viewSeats = document.querySelector(".view-seat");
const photoReview = document.querySelector(".review-photo");
const bookingContent = document.querySelector(".booking-content");
const bookingPrice = document.querySelector("#booking-price");
const bookingTile = document.querySelector(".booking-tile");
const busTileArr = document.querySelectorAll(".bus-content");
const bookTourBtn = document.querySelector("#book-tourBtn");
let bookingtotalPrice = 0;
let bookedSeats = [];
const changeColor = function (el, color, bckColor, booking) {
  el.style.backgroundColor = bckColor;
  el.style.color = color;
  el.dataset.booking = booking;
  if (booking) {
    bookingtotalPrice += 500;
  } else {
    bookingtotalPrice -= 500;
  }
};

// checkout price rendered
const checkBusClicked = function (price, userSeats) {
  if (price <= 0) {
    bookingTile.classList.add("hidden");
    return;
  }
  bookedSeats = [];
  bookingTile.classList.remove("hidden");
  bookingContent.innerHTML = "";
  bookingPrice.textContent = 0;
  userSeats.forEach((seat) => {
    if (seat.dataset.booking == "true") {
      bookedSeats.push(seat.textContent);
      const html = `
      <div id="booking">
          <h4>1-${seat.textContent}</h4>
          <h4>&#8377 500</h4>
      </div>
      `;
      bookingContent.insertAdjacentHTML("afterbegin", html);
      bookingPrice.textContent = bookingtotalPrice;
    }
  });
};
const bookTour = async function (busID, busDepartureDate) {
  bookTourBtn.addEventListener("click", async function () {
    try {
      const res = await axios({
        method: "get",
        url: `/api/v1/booking/${busID}?seats=${bookedSeats}&busDepartureDate=${busDepartureDate}`,
      });
      if (res.data.status === "success") {
        location.assign(res.data.session.url);
      }
    } catch (err) {
      showAlerts("error", err.response.data.message);
    }
  });
};

// TODO:
const getBookedSeats = async function (busID) {
  try {
    const seats = [];
    const busDepartureDate = document.querySelector("#busDate").textContent;
    const res = await axios({
      method: "post",
      url: `/api/v1/bus/getBookedSeats?busDepartureDate=${busDepartureDate}`,
      data: {
        busID,
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
      //
      seats.forEach((seat) => {
        const seatEl = document.querySelector(`.${seat}`);
        seatEl.style.backgroundColor = "#bbb";
        seatEl.style.pointerEvents = "none";
      });
    }
  } catch (err) {
    showAlerts("error", err.response.data.message);
  }
};
export const renderBusSeatss = function (busTileArr) {
  busTileArr.forEach((tile) => {
    tile.addEventListener("click", function (e) {
      const reviewPhotoArr = document.querySelectorAll(".view-seat");
      bookingTile.classList.add("hidden");
      reviewPhotoArr.forEach((el) => {
        el.remove();
      });
      if (e.target.getAttribute("id") === "view-seatBtn") {
        const parentEl = e.target.parentElement.parentElement;
        const html = `
        <div class='view-seat'>    
          <div id='front'>FRONT</div> 
          <div class='view-seat-container'>
            <div class='left-sitting'>
                <h2>DOOR</h2> 
                <div class = 'pair-seat'>
                    <div id= 'user-seat' class= 'A1'>A1</div> 
                    <div id= 'user-seat' class= 'A2'>A2</div>
                </div> 
                <div class = 'pair-seat'>
                    <div id= 'user-seat' class= 'B1'>B1</div> 
                    <div id= 'user-seat' class= 'B2'>B2</div>
                </div> 
                <div class = 'pair-seat'>
                  <div id= 'user-seat' class= 'C1'>C1</div> 
                  <div id= 'user-seat' class= 'C2'>C2</div>
                 </div> 
                 <div class = 'pair-seat'>
                    <div id= 'user-seat' class= 'D1'>D1</div> 
                    <div id= 'user-seat' class= 'D2'>D2</div>
                </div> 
                <div class = 'pair-seat' > 
                  <div id= 'user-seat' class= 'E1'>E1</div> 
                  <div id= 'user-seat' class= 'E2'>E2</div>
                </div> 
                <div class = 'pair-seat'>
                  <div id= 'user-seat' class= 'F1'>F1</div> 
                  <div id= 'user-seat' class= 'F2'>F2</div>
                </div> 
                <div class = 'pair-seat'>
                  <div id= 'user-seat' class= 'G1'>G1</div> 
                  <div id= 'user-seat' class= 'G2'>G2</div>
                </div> 
                <div class = 'pair-seat'>
                  <div id= 'user-seat' class= 'H1'>H1</div> 
                  <div id= 'user-seat' class= 'H2'>H2</div>
                </div> 
                <div class = 'pair-seat'>
                  <div id= 'user-seat' class= 'I1'>I1</div> 
                  <div id= 'user-seat' class= 'I2'>I2</div>
                </div> 
                <div class = 'pair-seat'>
                  <div id= 'user-seat' class= 'J1'>J1</div> 
                  <div id= 'user-seat' class= 'J2'>J2</div>
                </div>
              </div> 
            <div class= 'right-sitting'>
                <div id='user-photo'> <i class ='fa fa-2x fa-solid fa-user'></i></div>
                <div class = 'pair-seat'>
                  <div id= 'user-seat' class= 'A3'>A3</div> 
                  <div id= 'user-seat' class= 'A4'>A4</div>
                </div>
                <div class = 'pair-seat'>
                  <div id= 'user-seat' class= 'B3'>B3</div> 
                  <div id= 'user-seat' class= 'B4'>B4</div>
                </div>
                <div class = 'pair-seat'>
                  <div id= 'user-seat' class= 'C3'>C3</div> 
                  <div id= 'user-seat' class= 'C4'>C4</div>
                </div>
                <div class = 'pair-seat'>
                  <div id= 'user-seat' class= 'D3'>D3</div> 
                  <div id= 'user-seat' class= 'D4'>D4</div>
                </div>
                <div class = 'pair-seat'>
                  <div id= 'user-seat' class= 'E3'>E3</div> 
                  <div id= 'user-seat' class= 'E4'>E4</div>
                </div>
                <div class = 'pair-seat'>
                  <div id= 'user-seat' class= 'F3'>F3</div> 
                  <div id= 'user-seat' class= 'F4'>F4</div>
                </div>
                <div class = 'pair-seat'>
                  <div id= 'user-seat' class= 'G3'>G3</div> 
                  <div id= 'user-seat' class= 'G4'>G4</div>
                </div>
                <div class = 'pair-seat'>
                  <div id= 'user-seat' class= 'H3'>H3</div> 
                  <div id= 'user-seat' class= 'H4'>H4</div>
                </div>
                <div class = 'pair-seat'>
                  <div id= 'user-seat' class= 'I3'>I3</div> 
                  <div id= 'user-seat' class= 'I4'>I4</div>
                </div>
                <div class = 'pair-seat'>
                  <div id= 'user-seat' class= 'J3'>J3</div> 
                  <div id= 'user-seat' class= 'J4'>J4</div>
                </div>
              </div>
            </div> 
        <div id='front'>REAR</div>
        </div>
                  `;
        parentEl.insertAdjacentHTML("afterend", html);

        getBookedSeats(parentEl.dataset.busid);
        // userseats color rendered
        const userSeats = document.querySelectorAll("#user-seat");

        userSeats.forEach((seat) => {
          seat.addEventListener("click", function () {
            if (seat.style.backgroundColor == "green") {
              changeColor(seat, "#404040", "#fff", false);
            } else {
              changeColor(seat, "#fff", "green", true);
            }
            checkBusClicked(bookingtotalPrice, userSeats);
          });
        });
        const busDepartureDate = document.querySelector("#busDate").textContent;
        bookTour(parentEl.dataset.busid, busDepartureDate);
      }
    });
  });
};

renderBusSeatss(busTileArr);
