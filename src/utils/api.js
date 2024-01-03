import { defaultHeaders, baseUrl } from "./constants.js";

export function checkServerResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
}

export function fetchAllClothing() {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: defaultHeaders,
  }).then(checkServerResponse);
}

export function addNewItem(item) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({
      name: item.name,
      imageUrl: item.imageUrl,
      weather: item.weather,
    }).then(checkServerResponse),
  });
}

export function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: defaultHeaders,
  }).then(checkServerResponse);
}
