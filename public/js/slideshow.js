"use strict";
const photoReview = document.querySelector(".review-photo");
const busReviews = document.querySelector("bus-reviews");

const viewSeats = document.querySelector(".view-seat");
const busTileArr = document.querySelectorAll(".bus-content");
let slideIndex = 1;

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

// busPhotos.addEventListener("click", function () {
//   const html = `
//     <div class='review-photo.hidden'>
//       <div class='slideshow-container'>
//         <div class='mySlides fade'>
//           img(src='./img/bus/shivshahi-1.jpg')
//         </div>
//         <div class='mySlides fade'>
//           img(src='./img/bus/shivshahi-2.jpg')
//         </div>
//         <div class='mySlides fade'>
//           img(src='./img/bus/shivshahi-3.jpg')
//         </div>
//         <div class='mySlides fade'>
//           img(src='./img/bus/shivshahi-4.jpg')
//         </div>
//         <a class='prev'>&#x276E;</a>
//         <a class='next'>&#x276F;</a>
//       </div>
//     </div>

//   `;
//   busTileArr.forEach("click", function (e) {
//     console.log(e.target);
//   });
//   // photoReview.classList.toggle("hidden");
//   // viewSeats.classList.add("hidden");
// });
export const renderBusImages = function (busTileArr) {
  busTileArr.forEach((tile) => {
    tile.addEventListener("click", function (e) {
      const reviewPhotoArr = document.querySelectorAll(".review-photo");
      reviewPhotoArr.forEach((el) => {
        el.remove();
      });
      if (e.target.getAttribute("id") === "bus-photos") {
        const parentEl = e.target.parentElement.parentElement;
        const busName = parentEl.querySelector("#bus-name").textContent.toLowerCase();
        const html = `
            <div class='review-photo'>
              <div class='slideshow-container'>
                <div class='mySlides fade'>
                  <img src='/img/bus/${busName}-1.jpg'>
                </div>
                <div class='mySlides fade'>
                  <img src='/img/bus/${busName}-2.jpg'>
                </div>
                <div class='mySlides fade'>
                  <img src='/img/bus/${busName}-3.jpg'>
                </div>
                <div class='mySlides fade'>
                  <img src='/img/bus/${busName}-4.jpg'>
                </div>
                <a class='prev'>&#x276E;</a>
                <a class='next'>&#x276F;</a>
              </div>
            </div>
                  `;
        parentEl.insertAdjacentHTML("afterend", html);
        const prev = document.querySelector(".slideshow-container").querySelector(".prev");
        const next = document.querySelector(".slideshow-container").querySelector(".next");
        prev.addEventListener("click", function () {
          plusSlides(-1);
        });
        next.addEventListener("click", function () {
          plusSlides(1);
        });
        showSlides(slideIndex);
      }
    });
  });
};

renderBusImages(busTileArr);
