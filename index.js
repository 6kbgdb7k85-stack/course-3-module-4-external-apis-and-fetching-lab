// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area=";

const submitButton = document.querySelector("#fetch-alerts");
submitButton.addEventListener("click", (event) => {
  const stateInput = document.querySelector("#state-input");
  fetchWeatherAlerts(stateInput.value.toUpperCase());//toUpperCase ensures capital abbreviation regardless of user input
  stateInput.value = "";
});
// Your code here!

function displayWeatherAlerts(data, errorElement) {
  errorElement.classList.add("hidden");
  errorElement.textContent = "";
  const weatherContainer = document.querySelector("#alerts-display");
  const weatherTitle = document.createElement("h3");
  const weatherAlerts = document.createElement("ul");
  weatherTitle.textContent = `${data.title}: ${data.features.length}`;
  weatherContainer.append(weatherTitle, weatherAlerts);
  data.features.forEach((feature) => {
    console.log(feature);
    const weatherAlertItem = document.createElement("li");
    weatherAlertItem.textContent = feature.properties.headline;
    weatherAlerts.append(weatherAlertItem);
  });
}

function fetchWeatherAlerts(state) {
  const errorElement = document.querySelector("#error-message");

  fetch(weatherApi + state)
    .then((response) => response.json())
    .then((data) => displayWeatherAlerts(data, errorElement))
    .catch((error) => {
      errorElement.textContent = error;
      errorElement.classList.remove("hidden");
    });
}
