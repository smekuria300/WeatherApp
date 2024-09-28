//Declearation of variables
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const placeContainerEl = document.getElementById('place-container');

const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');
const searchBarEl = document.getElementById("search-bar");
const searchBtnEl = document.getElementById("search-btn");
const geoBtnEl = document.getElementById("geo-btn");

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

//The purpose of this function is to provide the current time and date
setInterval(() => {
    const d = new Date();
    const month = d.getMonth();
    const date = d.getDate();
    const day = d.getDay();
    const year = d.getFullYear();

    dateEl.innerHTML = days[day] + ', ' + months[month] + ' ' + date + ' ' + year;
}, 1000);

//The purpose of this function is to provide data of the current location that the user is located in
function getLocationData() {
    //Create Navigator to get geolocation data
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const city = `${latitude}+${longitude}`;
            getWeatherData(latitude, longitude);
            searchLocation(city);
        });
        (error) => {
            // Handle errors, e.g. user denied location sharing permissions
            console.error("Error getting user location:", error);
        }
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}
// This function is called when the user clicks the geolocation button
geoBtnEl.addEventListener("click", () => {
    getLocationData();
});

//This function is called when the user enters the address
async function searchLocation(city) {;
    const ACCESS_KEY = "[Enter remote access key for opencagedata API]";
    let address = city;

    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${ACCESS_KEY}&pretty=1`)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                console.log(data.results[0]);
                let userTimezone = data.results[0].annotations.timezone.name;
                let { country, state } = data.results[0].components;
                let { lat, lng } = data.results[0].geometry;

                placeContainerEl.innerHTML =
                    `<div class="time-zone" id="time-zone">${state}/${country}</div>
                        <div id="country" class="country">${country}</div>
                        <div class="latitude">Latitude: (${lat})</div>
                        <div class="longitude">Latitude: (${lng})</div>`;

                getWeatherData(lat, lng);
                getTime(userTimezone);
            }
            else {
                console.log("Could not find location.");
            }
        })
        .catch(error => {
            console.error(error);
        })

    //The purpose of this function is to use the timezone geolocation to provide accurate time
    function getTime(timezone) {
        const time = new Date().toLocaleTimeString('en-US', { timeZone: timezone, hour: '2-digit', minute: '2-digit'});
        var timeSplit = time.split(' ');
        timeSplit[1] = '<span id="pm">' + timeSplit[1] + '</span>'
        timeEl.innerHTML = timeSplit[0] + " " + timeSplit[1];        
    }
}

//This function is called when the user clicks on the search button
searchBtnEl.addEventListener("click", () => {
    searchLocation(searchBarEl.value);
})

//This funciton uses the location to make a request for the weather data information
async function getWeatherData(latitude, longitude) {
    const API_KEY = "[Enter API Key here for tommrow API]";
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${latitude},${longitude}&timesteps=1d&apikey=${API_KEY}&units=imperial`, options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            showWeatherData(data);

            let weatherCodeMax = data.timelines.daily[0].values.weatherCodeMax;
            window.onload = updateBackground(weatherCodeMax);
        })
}

getLocationData();

//This function is used to dynamically change the weather background to match the current weather
function updateBackground(weatherCondition) {
    if (weatherCondition == 1000) {
        document.body.style.backgroundImage = "url('/img/clear_sky_" + (Math.floor(Math.random() * (5 - 1) + 1)) + ".jpg')";
    } else if (weatherCondition == 1101) {
        document.body.style.backgroundImage = "url('/img/partly_cloudy_" + (Math.floor(Math.random() * (5 - 1) + 1)) + ".jpg)";
    } else if (weatherCondition == 1001) {
        document.body.style.backgroundImage = "url('/img/heavy_cloud_" + (Math.floor(Math.random() * (5 - 1) + 1)) + ".jpg')";
    } else if (weatherCondition == 2000) {
        document.body.style.backgroundImage = "url('/img/fog_" + (Math.floor(Math.random() * (5 - 1) + 1)) + ".jpg')";
    } else if (weatherCondition == 4200) {
        document.body.style.backgroundImage = "url('/img/light_rain_" + (Math.floor(Math.random() * (5 - 1) + 1)) + ".jpg')";
    } else if (weatherCondition == 4201) {
        document.body.style.backgroundImage = "url('/img/heavy_rain_" + (Math.floor(Math.random() * (5 - 1) + 1)) + ".jpg')";
    } else if (weatherCondition == 5000) {
        document.body.style.backgroundImage = "url('/img/snow_1.jpg')";
    } else if (weatherCondition == 8000) {
        document.body.style.backgroundImage = "url('/img/thunder.jpg')";
    } else {
        document.body.style.backgroundImage = "url('/img/default.jpg')";
    }

}

//This function is called when the unit button is clicked
$(document).ready(function () {
    $("#weather-toggle").change(function () {
        showWeatherData.updateWeatherForecast(this);
    });
});

//This function is to display the weather information from the tommrow api 
function showWeatherData(data) {
    let { humidityAvg, pressureSurfaceLevelAvg, sunriseTime, sunsetTime, windSpeedAvg } = data.timelines.daily[0].values;

    currentWeatherItemsEl.innerHTML =
    `<div class="weather-item">
        <div>Humidity</div>
        <div>${humidityAvg}</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressureSurfaceLevelAvg}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${windSpeedAvg}</div>
    </div>
    <div class="weather-item">
        <div>Sunrise</div>
        <div>${moment(sunriseTime).format('hh:mm')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${moment(sunsetTime).format('hh:mm')}</div>
    </div>`;

//The purpose of this function is to populate the weather
    function updateWeatherForecast(unit) {
        let otherDayForecast = '';
        data.timelines.daily.forEach((day, idx) => {
            if (idx == 0 && ($(unit).prop("checked") == true)) {
                currentTempEl.innerHTML = `
                <div class="today" id="current-temp">
                    <div class="day">${moment(day.time).format('dddd')}</div>
                    <img src="icons/${day.values.weatherCodeMax}.png" alt="weather icon" class="w-icon">
                    <br>
                <div class="other">
                    <div class="temp">Day -  ${Math.round((day.values.temperatureApparentMax - 32) / 1.8)}&#176; C </div>
                    <div class="temp">Night - ${Math.round((day.values.temperatureApparentMin - 32) / 1.8)}&#176; C </div>
                </div>
            `
            } else if ((idx == 0 && ($(unit).prop("checked") != true))) {
                currentTempEl.innerHTML = `
                    <div class="today" id="current-temp">
                    <div class="day">${moment(day.time).format('dddd')}</div>
                    <img src="icons/${day.values.weatherCodeMax}.png" alt="weather icon" class="w-icon">
                <div class="other">
                    <div class="temp">Day -  ${day.values.temperatureApparentMax}&#176; F </div>
                    <div class="temp">Night - ${day.values.temperatureApparentMin}&#176; F </div>
                </div>
                `
            }

            if ((idx != 0 && ($(unit).prop("checked") == true))) {
                otherDayForecast += `
            <div class="weather-forecast-item">
            <div class="day">${moment(day.time).format('dddd')}</div>
            <img src="icons/${day.values.weatherCodeMax}.png" alt="weather icon" class="w-icon">
            <div class="temp">Day - ${Math.round((day.values.temperatureApparentMax - 32) / 1.8)} &#176; C</div>
            <div class="temp">Night - ${Math.round((day.values.temperatureApparentMin - 32) / 1.8)}&#176; C</div>
            </div>`
            }
            else if ((idx != 0 && ($(unit).prop("checked") != true))) {
                otherDayForecast += `
            <div class="weather-forecast-item">
            <div class="day">${moment(day.time).format('dddd')}</div>
            <img src="icons/${day.values.weatherCodeMax}.png" alt="weather icon" class="w-icon">
                    <div class="temp">Day - ${day.values.temperatureApparentMax}&#176; F</div>
                    <div class="temp">Night - ${day.values.temperatureApparentMin}&#176; F</div>
                </div>`
            }
            weatherForecastEl.innerHTML = otherDayForecast
        })
    }
    showWeatherData.updateWeatherForecast = updateWeatherForecast;
}
