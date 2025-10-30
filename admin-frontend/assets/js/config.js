// assets/js/config.js
const BASE_URL = "https://backend.fusionstructengineering.com/api";
const TOKEN_KEY = "fusion_token";

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

function authHeader() {
  const token = getToken();
  return token ? { "Authorization": "Bearer " + token } : {};
}
