"use strict";
import { login, signup, logout } from "./login.js";
import { substringMatcher, cities } from "./dropDown.js";
import { viewBuses, fetchBusData } from "./createBus.js";
import "./bus.js";
const loginForm = document.querySelector(".login--form");
const signupForm = document.querySelector(".signup--form");
const logoutBtn = document.querySelector("#logout");
const date = document.getElementById("date");
const typeAhead = document.querySelector(".typeahead");
const createBusBtn = document.querySelector("#create-bus");
const viewBusBtn = document.querySelector("#view-bus");
const sideBarForm = document.querySelector(".profile__sidebar--right");
const sideBarView = document.querySelector(".profile__sidebar--rightView");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    await login(email, password);
  });
}
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    await signup(name, email, password, confirmPassword);
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", async (e) => {
    await logout();
  });
}

if (date) {
  const today = new Date().toISOString().split("T")[0];
  date.setAttribute("min", today);
}

if (typeAhead) {
  $("#the-basics .typeahead").typeahead(
    {
      hint: true,
      highlight: true,
      minLength: 1,
    },
    {
      name: "cities",
      source: substringMatcher(cities),
    }
  );
}

if (createBusBtn || viewBusBtn) {
  createBusBtn.addEventListener("click", function () {
    viewBusBtn.classList.remove("clicked");
    createBusBtn.classList.add("clicked");
    sideBarForm.classList.remove("hidden");
    sideBarView.classList.add("hidden");
    fetchBusData();
  });
  viewBusBtn.addEventListener("click", async function () {
    createBusBtn.classList.remove("clicked");
    viewBusBtn.classList.add("clicked");
    sideBarForm.classList.add("hidden");
    sideBarView.classList.remove("hidden");
    const userID = document.querySelector("#user-name").dataset.operatorid;
    const html = await viewBuses(userID);
    sideBarView.innerHTML = html;
  });
}
