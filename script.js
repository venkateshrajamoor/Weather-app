async function fetchWeather() {
    const city = document.getElementById("cityInput").value;
    const apiKey = "d2345dfcc9c27747f7c830ea8b3c7af4";  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            document.getElementById("weatherDetails").innerHTML = `<p>${data.message}</p>`;
            return;
        }

        // Extracting necessary data
        const weatherHTML = `
            <h2>Weather in ${data.name}, ${data.sys.country}</h2>
            <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
            <p><strong>Feels Like:</strong> ${data.main.feels_like}°C</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Pressure:</strong> ${data.main.pressure} hPa</p>
            <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
            <p><strong>Wind Direction:</strong> ${data.wind.deg}°</p>
            <p><strong>Clouds:</strong> ${data.clouds.all}%</p>
            <p><strong>Weather Condition:</strong> ${data.weather[0].main} - ${data.weather[0].description}</p>
            <p><strong>Sunrise:</strong> ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p><strong>Sunset:</strong> ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
        `;

        document.getElementById("weatherDetails").innerHTML = weatherHTML;

    } catch (error) {
        document.getElementById("weatherDetails").innerHTML = `<p>Error fetching data</p>`;
    }
}
