// Elementos DOM
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const errorMessage = document.getElementById("errorMessage");

// Elementos de resultado
const cityName = document.getElementById("cityName");
const currentDate = document.getElementById("currentDate");
const temperature = document.getElementById("temperature");
const weatherCondition = document.getElementById("weatherCondition");
const weatherIcon = document.getElementById("weatherIcon");
const windSpeed = document.getElementById("windSpeed");
const humidity = document.getElementById("humidity");
const suggestion = document.getElementById("suggestion");
const forecast = document.getElementById("forecast");
const headerIcon = document.getElementById("headerIcon");
const shareBtn = document.getElementById("shareBtn");

// Função para formatar data
function formatDate(date) {
    const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    
    return `${dayName}, ${day} de ${month}`;
}

// Função para aplicar tema dinâmico baseado em condição climática e hora
function applyTheme(weatherCode, hour) {
    const body = document.body;
    const appCard = document.querySelector('.bg-opacity-90');
    
    // Determina se é noite
    const isNight = hour >= 18 || hour < 6;
    
    // Remove classes anteriores
    body.className = 'min-h-screen transition-all duration-500';
    appCard.className = 'w-full max-w-2xl bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 space-y-6 transition-all duration-500';
    
    // Aplica tema baseado na condição climática
    if (weatherCode < 3) {
        // Ensolarado
        if (isNight) {
            body.classList.add('bg-gradient-to-br', 'from-slate-900', 'via-purple-900', 'to-slate-900');
            appCard.classList.add('bg-slate-800');
        } else {
            body.classList.add('bg-gradient-to-br', 'from-blue-400', 'via-blue-300', 'to-yellow-200');
            appCard.classList.add('bg-white', 'text-gray-900');
        }
    } else if (weatherCode < 60) {
        // Nublado
        body.classList.add('bg-gradient-to-br', 'from-slate-700', 'via-slate-600', 'to-slate-700');
        appCard.classList.add('bg-slate-800');
    } else {
        // Chuvoso
        body.classList.add('bg-gradient-to-br', 'from-slate-800', 'via-blue-900', 'to-slate-800');
        appCard.classList.add('bg-slate-800');
    }
}

// Função para obter ícone climático SVG animado
function getWeatherIcon(code, isNight = false) {
    const icons = {
        // Céu limpo
        0: isNight ? `
            <svg class="w-full h-full animate-pulse-slow" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" opacity="0.8"/>
                <circle cx="8" cy="8" r="1.5" opacity="0.6"/>
                <circle cx="16" cy="6" r="1" opacity="0.5"/>
                <circle cx="6" cy="16" r="1" opacity="0.4"/>
                <circle cx="18" cy="18" r="1.5" opacity="0.6"/>
            </svg>
        ` : `
            <svg class="w-full h-full animate-rotate" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" fill="#FCD34D"/>
                <circle cx="12" cy="12" r="4" fill="#FBBF24"/>
            </svg>
        `,
        // Parcialmente nublado
        1: `
            <svg class="w-full h-full animate-float" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="4" opacity="0.3"/>
                <path d="M8 14a4 4 0 1 1 0-8 4 4 0 0 1 8 0 4 4 0 1 1 0 8z" opacity="0.5"/>
            </svg>
        `,
        // Nublado
        2: `
            <svg class="w-full h-full animate-float" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="9" cy="12" r="3" opacity="0.4"/>
                <circle cx="15" cy="12" r="3" opacity="0.4"/>
                <path d="M6 14a4 4 0 1 1 0-8 4 4 0 0 1 8 0 4 4 0 1 1 0 8z" opacity="0.5"/>
            </svg>
        `,
        // Chuva
        61: `
            <svg class="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="9" cy="12" r="3" opacity="0.4"/>
                <circle cx="15" cy="12" r="3" opacity="0.4"/>
                <path d="M6 14a4 4 0 1 1 0-8 4 4 0 0 1 8 0 4 4 0 1 1 0 8z" opacity="0.5"/>
                <line x1="8" y1="18" x2="8" y2="20" stroke="currentColor" stroke-width="2" opacity="0.7"/>
                <line x1="12" y1="18" x2="12" y2="20" stroke="currentColor" stroke-width="2" opacity="0.7"/>
                <line x1="16" y1="18" x2="16" y2="20" stroke="currentColor" stroke-width="2" opacity="0.7"/>
            </svg>
        `,
        // Chuva forte
        63: `
            <svg class="w-full h-full animate-pulse-slow" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="9" cy="12" r="3" opacity="0.4"/>
                <circle cx="15" cy="12" r="3" opacity="0.4"/>
                <path d="M6 14a4 4 0 1 1 0-8 4 4 0 0 1 8 0 4 4 0 1 1 0 8z" opacity="0.5"/>
                <line x1="7" y1="18" x2="7" y2="21" stroke="currentColor" stroke-width="2"/>
                <line x1="11" y1="18" x2="11" y2="21" stroke="currentColor" stroke-width="2"/>
                <line x1="15" y1="18" x2="15" y2="21" stroke="currentColor" stroke-width="2"/>
                <line x1="9" y1="19" x2="9" y2="22" stroke="currentColor" stroke-width="2"/>
                <line x1="13" y1="19" x2="13" y2="22" stroke="currentColor" stroke-width="2"/>
            </svg>
        `,
        // Neve
        71: `
            <svg class="w-full h-full animate-float" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="9" cy="12" r="3" opacity="0.4"/>
                <circle cx="15" cy="12" r="3" opacity="0.4"/>
                <path d="M6 14a4 4 0 1 1 0-8 4 4 0 0 1 8 0 4 4 0 1 1 0 8z" opacity="0.5"/>
                <circle cx="9" cy="18" r="1.5" fill="white"/>
                <circle cx="13" cy="19" r="1.5" fill="white"/>
                <circle cx="17" cy="18" r="1.5" fill="white"/>
            </svg>
        `
    };
    
    // Retorna ícone específico ou padrão
    if (code === 0) return icons[0];
    if (code === 1) return icons[1];
    if (code === 2 || (code >= 3 && code < 50)) return icons[2];
    if (code >= 61 && code < 66) return icons[61];
    if (code >= 66 && code < 70) return icons[63];
    if (code >= 71 && code < 80) return icons[71];
    
    return icons[2]; // Padrão: nublado
}

// Função para obter condição climática em texto
function getCondition(code) {
    const conditions = {
        0: "Céu limpo",
        1: "Principalmente limpo",
        2: "Parcialmente nublado",
        3: "Nublado",
        45: "Nevoeiro",
        48: "Nevoeiro gelado",
        51: "Chuva leve",
        53: "Chuva moderada",
        55: "Chuva forte",
        56: "Chuva gelada leve",
        57: "Chuva gelada forte",
        61: "Chuva fraca",
        63: "Chuva moderada",
        65: "Chuva forte",
        66: "Chuva gelada",
        67: "Chuva gelada forte",
        71: "Neve leve",
        73: "Neve moderada",
        75: "Neve forte",
        77: "Grãos de neve",
        80: "Chuva leve",
        81: "Chuva moderada",
        82: "Chuva muito forte",
        85: "Neve leve",
        86: "Neve forte",
        95: "Trovoada",
        96: "Trovoada com granizo",
        99: "Trovoada com granizo forte"
    };
    
    return conditions[code] || "Condições desconhecidas";
}

// Função para obter sugestão inteligente
function getSuggestion(code, temp) {
    const suggestions = [];
    
    if (code === 0 || code === 1) {
        // Céu limpo
        if (temp > 25) {
            suggestions.push("Perfeito para um dia na praia! 🏖️");
            suggestions.push("Ideal para atividades ao ar livre! 🌞");
            suggestions.push("Ótimo dia para um piquenique! 🧺");
        } else if (temp > 15) {
            suggestions.push("Ideal para uma caminhada! 🚶");
            suggestions.push("Perfeito para atividades esportivas! ⚽");
            suggestions.push("Ótimo dia para explorar a cidade! 🏙️");
        } else {
            suggestions.push("Dia agradável, mas leve um casaco! 🧥");
            suggestions.push("Perfeito para uma caminhada matinal! 🌅");
        }
    } else if (code < 60) {
        // Nublado
        if (temp > 20) {
            suggestions.push("Dia perfeito para um café quente e um bom livro! ☕📖");
            suggestions.push("Ideal para atividades ao ar livre sem muito sol! 🌤️");
        } else {
            suggestions.push("Que tal um café e um bom livro? ☕📖");
            suggestions.push("Dia perfeito para atividades em ambientes fechados! 🏠");
        }
    } else if (code >= 61 && code < 70) {
        // Chuva
        suggestions.push("Leve um guarda-chuva! ☂️");
        suggestions.push("Perfeito para assistir um filme em casa! 🎬");
        suggestions.push("Dia ideal para ficar aconchegado! 🛋️");
        suggestions.push("Que tal uma xícara de chá quente? 🍵");
    } else if (code >= 71 && code < 80) {
        // Neve
        suggestions.push("Cuidado com o gelo nas ruas! ⚠️");
        suggestions.push("Perfeito para ficar em casa aconchegado! 🏠");
        suggestions.push("Dia ideal para atividades em ambientes fechados! ❄️");
    } else if (code >= 95) {
        // Trovoada
        suggestions.push("Evite atividades ao ar livre! ⚡");
        suggestions.push("Melhor ficar em casa seguro! 🏠");
    }
    
    return suggestions.length > 0 
        ? suggestions[Math.floor(Math.random() * suggestions.length)]
        : "Verifique as condições antes de sair!";
}

// Função para obter nome do dia da semana abreviado
function getDayName(date, index) {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const day = new Date(date);
    day.setDate(day.getDate() + index);
    return days[day.getDay()];
}

// Função para buscar dados meteorológicos
async function getWeather(city) {
    if (!city || city.trim() === '') {
        showError('Por favor, digite o nome de uma cidade.');
        return;
    }
    
    // Mostra loading e esconde resultados/erros
    loading.classList.remove('hidden');
    weatherResult.classList.add('hidden');
    error.classList.add('hidden');
    
    try {
        // Busca coordenadas geográficas
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pt`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();
        
        if (!geoData.results || geoData.results.length === 0) {
            showError('Cidade não encontrada! Tente novamente com outro nome.');
            return;
        }
        
        const { latitude, longitude, name, country } = geoData.results[0];
        
        // Busca dados meteorológicos
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto&hourly=relativehumidity_2m,windspeed_10m`;
        
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();
        
        if (!weatherData.current_weather) {
            showError('Erro ao obter dados meteorológicos. Tente novamente.');
            return;
        }
        
        // Exibe resultados
        showWeather(name, country, weatherData);
        
    } catch (err) {
        console.error('Erro:', err);
        showError('Erro ao conectar com o serviço. Verifique sua conexão e tente novamente.');
    } finally {
        loading.classList.add('hidden');
    }
}

// Função para exibir dados meteorológicos
function showWeather(city, country, data) {
    const current = data.current_weather;
    const hour = new Date().getHours();
    const isNight = hour >= 18 || hour < 6;
    
    // Aplica tema dinâmico
    applyTheme(current.weathercode, hour);
    
    // Atualiza cabeçalho
    cityName.textContent = `${city}, ${country}`;
    currentDate.textContent = formatDate(new Date());
    
    // Atualiza temperatura e condição
    temperature.textContent = Math.round(current.temperature);
    weatherCondition.textContent = getCondition(current.weathercode);
    
    // Atualiza ícone climático
    weatherIcon.innerHTML = getWeatherIcon(current.weathercode, isNight);
    
    // Atualiza detalhes (vento e umidade)
    windSpeed.textContent = `${current.windspeed} km/h`;
    
    // Busca umidade da hora atual
    const currentHourIndex = new Date().getHours();
    const humidityValue = data.hourly?.relativehumidity_2m?.[currentHourIndex] || 'N/A';
    humidity.textContent = humidityValue !== 'N/A' ? `${humidityValue}%` : 'N/A';
    
    // Atualiza sugestão inteligente
    suggestion.textContent = getSuggestion(current.weathercode, current.temperature);
    
    // Atualiza previsão para os próximos 3 dias
    forecast.innerHTML = '';
    for (let i = 1; i <= 3; i++) {
        const dayCode = data.daily.weathercode[i];
        const maxTemp = Math.round(data.daily.temperature_2m_max[i]);
        const minTemp = Math.round(data.daily.temperature_2m_min[i]);
        const dayName = getDayName(new Date(), i);
        
        const dayIcon = getWeatherIcon(dayCode, false);
        
        forecast.innerHTML += `
            <div class="bg-white bg-opacity-10 rounded-lg p-3 md:p-4 text-center transition-all hover:bg-opacity-20">
                <p class="text-xs md:text-sm font-medium mb-2 opacity-75">${dayName}</p>
                <div class="w-12 h-12 mx-auto mb-2">${dayIcon}</div>
                <p class="text-lg md:text-xl font-bold">${maxTemp}°</p>
                <p class="text-xs opacity-75">${minTemp}°</p>
            </div>
        `;
    }
    
    // Atualiza ícone do cabeçalho
    headerIcon.innerHTML = getWeatherIcon(current.weathercode, isNight);
    
    // Mostra resultados
    weatherResult.classList.remove('hidden');
    error.classList.add('hidden');
}

// Função para exibir erro
function showError(message) {
    errorMessage.textContent = message;
    error.classList.remove('hidden');
    weatherResult.classList.add('hidden');
    loading.classList.add('hidden');
}

// Event Listeners
searchBtn.addEventListener('click', () => {
    getWeather(cityInput.value.trim());
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather(cityInput.value.trim());
    }
});

// Inicialização: aplica tema inicial baseado na hora
applyTheme(2, new Date().getHours());
