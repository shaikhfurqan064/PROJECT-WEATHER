
const apiKEY = "c1bc69c76ff4d91a6054ab9f77d4cc2b";
let currentUnit = "metric";

function toggleUnit() {
    currentUnit = document.getElementById("unitToggle").checked ? "imperial" : "metric";
}

async function loadData() {
    const city = document.getElementById("city").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKEY}&units=${currentUnit}`;
    await fetchWeather(url);
}

async function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKEY}&units=${currentUnit}`;
            await fetchWeather(url);
        });
    } else {
        alert("Geolocation not supported");
    }
}

async function fetchWeather(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod !== 200) {
            document.getElementById("result").innerHTML = `<p>City not found</p>`;
            return;
        }
        const html = `
            <div>
                <h2>${data.name}</h2>
                <p><strong>Temperature:</strong> ${data.main.temp} ${currentUnit === "metric" ? "°C" : "°F"}</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${data.wind.speed} ${currentUnit === "metric" ? "m/s" : "mph"}</p>
            </div>
        `;
        document.getElementById("result").innerHTML = html;
    } catch (error) {
        document.getElementById("result").innerHTML = `<p>Error fetching weather data</p>`;
    }
}

   
    
