"use strict";

let cityInput = document.getElementById("cityInput");
let addInput = document.getElementById("add");
let cityOutput = document.getElementById("cityoutput");
let descOutput = document.getElementById("description");
let tempOutput = document.getElementById("temp");
let windOutput = document.getElementById("wind");

const apiKey = "9058f262b285e769617b1001c0425115";

function convertToCel(value) {
  return (value - 273.15).toFixed(2);
}

async function getWeather() {
  try {
    if (!cityInput.value) {
      alert("Please enter a city name.");
      return;
    }

    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let weatherResult = await response.json();

    if (!weatherResult.weather || !weatherResult.main) {
      throw new Error("Weather data is missing in the response.");
    }

    setInfo(weatherResult);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert(
      "An error occurred while fetching the weather data. Please try again."
    );
  }
}

function setInfo(data) {
  let cityName = data["name"];
  let description = data["weather"][0]["description"];
  let temp = convertToCel(data["main"]["temp"]);
  let wind = data["wind"]["speed"];

  cityOutput.textContent = `City: ${cityName}`;
  descOutput.textContent = `Description: ${description}`;
  tempOutput.textContent = `Temperature: ${temp}°C`;
  windOutput.textContent = `Wind Speed: ${wind} km/h`;
}

addInput.addEventListener("click", getWeather);
