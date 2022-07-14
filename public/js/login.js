"use strict";
import { showAlerts } from "./showAlerts.js";
export const login = async function (email, password) {
  try {
    const res = await axios({
      method: "post",
      url: "/api/v1/user/login",
      data: {
        email,
        password,
      },
    });
    if (res.data.status === "success") {
      showAlerts("success", "Logged In");
      setTimeout(() => location.assign("/"), 2000);
    }
  } catch (err) {
    console.log(err);
    showAlerts("error", err.response.data.message);
  }
};

export const signup = async function (name, email, password, confirmPassword, role) {
  try {
    const res = await axios({
      method: "post",
      url: "/api/v1/user/signup",
      data: {
        name,
        email,
        password,
        confirmPassword,
        role,
      },
    });
    if (res.data.status === "success") {
      showAlerts("success", "Please Verify your Email Address");
      setTimeout(() => location.assign("/"), 2000);
    }
  } catch (err) {
    showAlerts("error", err.response.data.message);
  }
};

export const logout = async function () {
  try {
    const res = await axios({
      method: "get",
      url: "/api/v1/user/logout",
    });
    if (res.data.status === "success") {
      showAlerts("success", "Logging Out...");
      setTimeout(() => location.assign("/"), 2000);
    }
  } catch (err) {
    console.log(err);
    showAlerts(err, "Unable to logout, Error Occurred!");
  }
};
