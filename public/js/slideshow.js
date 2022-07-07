"use strict";
const photoReview = document.querySelector(".review-photo");
const busPhotos = document.querySelector("#bus-photos");
const busReviews = document.querySelector("bus-reviews");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const viewSeats = document.querySelector(".view-seat");

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}

busPhotos.addEventListener("click", function () {
  photoReview.classList.toggle("hidden");
  viewSeats.classList.add("hidden");
});

prev.addEventListener("click", function () {
  plusSlides(-1);
});
next.addEventListener("click", function () {
  plusSlides(1);
});
