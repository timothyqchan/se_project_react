import { baseUrl } from "../utils/api";
import { defaultHeaders } from "./constants.js";
import processServerResponse from "./processServerResponse.js";

export const registration = (email, password, name, avatar) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ name, avatar, email, password }),
  })
    .then(processServerResponse)
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export const authorize = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ email, password }),
  })
    .then(processServerResponse)
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then(processServerResponse)
    .catch((err) => {
      console.log(err);
      throw err;
    });
};
