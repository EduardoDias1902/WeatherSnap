

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const weatherCondition = document.getElementById("weatherCondition");
const suggestion = document.getElementById("suggestion");
const forecast = document.getElementById("forecast")

function applyTheme(){
    const hour = new Date().getHours();
    const isNight = hour >= 18 || hour < 6;

    document.body.classList.toggle("dark", isNight);
}

function getSuggestion(code){
    if (code < 3) return "Ideal para uma caminhada!";
    if (code <60) return "Que tal um café e um bom livro?"
    return "leve um guarda-chuva!"
}

function getCondition(code){
    if (code < 3) return "Ensolarado"
    if (code <60) return "Nublado";
    return "Chuvoso";
}


searchBtn.addEventListener("click",() => {
    getWeather (cityInput.value);
});

cityInput.addEventListener("keypress",(e) => {
    if (e.key === "Enter"){
        getWeather(cityInput.values);
    }
});

async function getWeather(city) {
    if (!city) return alert("Digite uma cidade");
    const geoUrl = 'https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1';

    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();

    if (!geoData.results){
        alert("Cidade não encontrada!")
        return;
    }
    const { latitude, longitude, name} = geoData.results[0];

    const weatherUrl = `
    https://api.open-meteo.com/v1/forecast
    ?latitude=${latitude}
    &longitude=${longitude}
    &current_weather=true
    &daily=temperature_2m_max
    &timezone=auto
  `;

  const weatherResponse = await fetch(weatherUrl);
  const weatherData = await weatherResponse.json();

  showWeather(name, weatherData);
}

function showWeather (city, data){
    weatherResult.classList.remove("hidden");

    cityName.textContent=city;
    temperature.textContent= data.current_weather.temperature;
    weatherCondition.textContent= getCondition(data.current_weather.weathercode);

    suggestion.textContent = getSuggestion(data.current_weather.weathercode);

    forecast.innerHTML="";
    for (let i = 0; i < 3; i++){
        forecast.innerHTML +=`
        <div class="bg-slate-700 rounded p-2">
          <p>Dia ${i + 1}</p>
          <p>${data.daily.temperature_2m_max[i]}°C</p>
        </div>
      `;
    }
    applyTheme();

    
}