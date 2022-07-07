"use strict";
const viewSeatBtn = document.querySelector("#view-seatBtn");
const viewSeats = document.querySelector(".view-seat");
const photoReview = document.querySelector(".review-photo");
const userSeats = document.querySelectorAll("#user-seat");
const bookingContent = document.querySelector(".booking-content");
const bookingPrice = document.querySelector("#booking-price");
const bookingTile = document.querySelector(".booking-tile");
let bookingtotalPrice = 0;

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
const checkBusClicked = function (price) {
  if (price <= 0) {
    bookingTile.classList.add("hidden");
    return;
  }
  bookingTile.classList.remove("hidden");
  bookingContent.innerHTML = "";
  bookingPrice.textContent = 0;
  userSeats.forEach((seat) => {
    if (seat.dataset.booking == "true") {
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

// hide or show seats
viewSeatBtn.addEventListener("click", function () {
  viewSeats.classList.toggle("hidden");
  photoReview.classList.add("hidden");
  viewSeatBtn.textContent == "HIDE SEATS"
    ? (viewSeatBtn.textContent = "VIEW SEATS")
    : (viewSeatBtn.textContent = "HIDE SEATS");
});

// userseats color rendered
userSeats.forEach((seat) => {
  seat.addEventListener("click", function () {
    if (seat.style.backgroundColor == "green") {
      changeColor(seat, "#404040", "#fff", false);
    } else {
      changeColor(seat, "#fff", "green", true);
    }
    checkBusClicked(bookingtotalPrice);
  });
});
