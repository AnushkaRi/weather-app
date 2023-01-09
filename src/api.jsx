export const WEATHER_API_KEY = ""; // enter your key from openweather API

export const geoApiOptions = {
  method: "GET",
  url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
  headers: {
    "X-RapidAPI-Key": "", // enter your key from Rapid API - Geo DB
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};
