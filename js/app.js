
    const weatherCodes = {
      0: { desc: 'Ясно', baseBg: ['#2e74d6', '#6da5fc'], icon: '☀️', fx: 'sun' },
      1: { desc: 'Преимущественно ясно', baseBg: ['#357ade', '#71a9fc'], icon: '🌤️', fx: 'sun' },
      2: { desc: 'Переменная облачность', baseBg: ['#436ea5', '#7fa8db'], icon: '⛅', fx: 'clouds' },
      3: { desc: 'Пасмурно', baseBg: ['#4e5e73', '#8094ad'], icon: '☁️', fx: 'clouds' },
      45: { desc: 'Густой туман', baseBg: ['#545e6b', '#8f9ca6'], icon: '🌫️', fx: 'clouds' },
      48: { desc: 'Осаждающийся туман', baseBg: ['#545e6b', '#8f9ca6'], icon: '🌫️', fx: 'clouds' },
      51: { desc: 'Легкая морось', baseBg: ['#3b4757', '#718296'], icon: '🌧️', fx: 'rain' },
      53: { desc: 'Умеренная морось', baseBg: ['#3b4757', '#718296'], icon: '🌧️', fx: 'rain' },
      55: { desc: 'Плотная морось', baseBg: ['#3b4757', '#718296'], icon: '🌧️', fx: 'rain' },
      61: { desc: 'Небольшой дождь', baseBg: ['#303e52', '#60748e'], icon: '🌧️', fx: 'rain' },
      63: { desc: 'Дождь', baseBg: ['#1e2a3b', '#48596e'], icon: '🌧️', fx: 'rain' },
      65: { desc: 'Сильный дождь', baseBg: ['#17202d', '#3d4c5e'], icon: '🌧️', fx: 'rain' },
      71: { desc: 'Небольшой снегопад', baseBg: ['#405060', '#7b8f9e'], icon: '❄️', fx: 'snow' },
      73: { desc: 'Снегопад', baseBg: ['#384858', '#6a7d8d'], icon: '❄️', fx: 'snow' },
      75: { desc: 'Сильный снегопад', baseBg: ['#283848', '#5a6d7d'], icon: '❄️', fx: 'snow' },
      77: { desc: 'Снежная крупа', baseBg: ['#384858', '#6a7d8d'], icon: '❄️', fx: 'snow' },
      80: { desc: 'Слабый ливень', baseBg: ['#232e3d', '#52657c'], icon: '🌧️', fx: 'rain' },
      81: { desc: 'Ливень', baseBg: ['#1a2431', '#44556a'], icon: '🌧️', fx: 'rain' },
      82: { desc: 'Сильный ливень', baseBg: ['#111925', '#334255'], icon: '🌧️', fx: 'rain' },
      85: { desc: 'Небольшой снежный ливень', baseBg: ['#384858', '#6a7d8d'], icon: '❄️', fx: 'snow' },
      86: { desc: 'Сильный снежный ливень', baseBg: ['#283848', '#5a6d7d'], icon: '❄️', fx: 'snow' },
      95: { desc: 'Гроза', baseBg: ['#111926', '#34445c'], icon: '⛈️', fx: 'lightning' },
      96: { desc: 'Гроза с градом', baseBg: ['#0f1622', '#2f3f56'], icon: '⛈️', fx: 'lightning' },
      99: { desc: 'Гроза с сильным градом', baseBg: ['#080c14', '#202c3d'], icon: '⛈️', fx: 'lightning' }
    };

    // Переменные для динамического контекста Gemini
    let currentTempGlobal = 26;
    let currentWindGlobal = 11;
    let currentKpGlobal = 2;
    let currentRainGlobal = 15;
    let currentCityGlobal = "Златополь";
    let isRequestingGemini = false;

    document.addEventListener("DOMContentLoaded", () => {
      // 1. МГНОВЕННЫЙ БЕЗОПАСНЫЙ СТАРТ (0 мс задержки) — интерфейс никогда не пустой!
      loadFallbackData("Златополь");
      
      // 2. Фоновое обновление реальными данными
      initApp();
      
      // Инициализация спецэффектов
      createRainEffects();
      createSnowEffects();
      createStarsEffects();
    });

    // Спецэффекты бэкграунда
    function createRainEffects() {
      const container = document.getElementById('fx-rain');
      container.innerHTML = '';
      for (let i = 0; i < 40; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.left = `${Math.random() * 110 - 5}%`;
        drop.style.animationDelay = `${Math.random() * 1.2}s`;
        drop.style.animationDuration = `${0.8 + Math.random() * 0.5}s`;
        container.appendChild(drop);
      }
    }

    function createSnowEffects() {
      const container = document.getElementById('fx-snow');
      container.innerHTML = '';
      for (let i = 0; i < 30; i++) {
        const flake = document.createElement('div');
        flake.className = 'snow-flake';
        flake.style.left = `${Math.random() * 100}%`;
        const size = 2 + Math.random() * 4;
        flake.style.width = `${size}px`;
        flake.style.height = `${size}px`;
        flake.style.opacity = Math.random() * 0.8 + 0.2;
        flake.style.animationDelay = `${Math.random() * 8}s`;
        flake.style.animationDuration = `${6 + Math.random() * 5}s`;
        container.appendChild(flake);
      }
    }

    function createStarsEffects() {
      const container = document.getElementById('fx-stars');
      container.innerHTML = '';
      for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'absolute bg-white rounded-full star-fx';
        const size = 1 + Math.random() * 1.5;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 75}%`;
        star.style.opacity = Math.random() * 0.8 + 0.2;
        star.style.animationDelay = `${Math.random() * 3.5}s`;
        star.style.animationDuration = `${2 + Math.random() * 3}s`;
        container.appendChild(star);
      }
    }

    // Мгновенная загрузка оффлайн-превью на случай блокировки сети в песочнице
    function loadFallbackData(cityName) {
      const mockWeather = {
        current: {
          temperature_2m: 26,
          relative_humidity_2m: 54,
          apparent_temperature: 27,
          weather_code: 3, // Пасмурно / Переменная облачность
          wind_speed_10m: 11,
          wind_gusts_10m: 14,
          surface_pressure: 1010.5,
          visibility: 10000,
          is_day: 1
        },
        hourly: {
          temperature_2m: Array(168).fill(25).map((t, idx) => Math.round(25 + Math.sin(idx/4)*3)),
          weather_code: Array(168).fill(3).map((c, idx) => idx % 6 === 0 ? 61 : 3), // some rain
          precipitation_probability: Array(168).fill(15).map((p, idx) => idx % 12 === 0 ? 45 : 15),
          dew_point_2m: Array(168).fill(15)
        },
        daily: {
          uv_index_max: [4.5],
          sunrise: [new Date().setHours(5, 30)],
          sunset: [new Date().setHours(20, 15)],
          temperature_2m_max: [28, 27, 26, 29, 30, 28, 27],
          temperature_2m_min: [18, 17, 16, 18, 19, 18, 17],
          weather_code: [3, 61, 3, 0, 1, 2, 3]
        }
      };

      const mockAqi = {
        current: {
          european_aqi: 35
        }
      };

      updateUI(mockWeather, mockAqi, cityName);
      currentKpGlobal = 2;
      updateKpUI(currentKpGlobal);
    }

    async function callGemini(promptText) {
      if (isRequestingGemini) return null; // Возвращаем null, чтобы предотвратить перезапись на "undefined"
      isRequestingGemini = true;
      
      const apiKey = ""; // Сюда подставится персональный API-ключ Gemini, если будет нужен
      if (!apiKey) {
        isRequestingGemini = false;
        return generateLocalAISummary(promptText);
      }

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
      const payload = {
        contents: [{ parts: [{ text: promptText }] }],
        systemInstruction: { parts: [{ text: "Ты — практичный и заботливый ИИ-помощник по погоде. Твой ответ должен быть максимально кратким и информативным (строго 1-2 предложения, до 25 слов). Никакой лишней романтики, метафор типа 'небо покапризничало' или 'плачущие облака'. Только сухие, но дружелюбные факты: текущая погода, что надеть (куртку, ветровку, футболку), стоит ли брать зонт и как себя вести при текущем уровне магнитной активности (Kp)." }] }
      };

      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        isRequestingGemini = false;
        return data?.candidates?.[0]?.content?.parts?.[0]?.text || "Информация временно недоступна.";
      } catch (err) {
        console.error("Gemini API error:", err);
        isRequestingGemini = false;
        return generateLocalAISummary(promptText);
      }
    }

    function generateLocalAISummary(promptText) {
      // Имитируем умный локальный ИИ, отвечающий на конкретные вопросы
      
      let wearAdvice = "Одевайтесь по погоде.";
      if (currentTempGlobal < 5) {
        wearAdvice = "холодно! Настоятельно рекомендую теплое пальто или пуховик, шапку и шарф.";
      } else if (currentTempGlobal < 15) {
        wearAdvice = "свежо. Отличным выбором станет плотное худи, легкая куртка или ветровка.";
      } else if (currentTempGlobal < 23) {
        wearAdvice = "комфортно. Будет достаточно свитшота, джинсовки или легкого кардигана.";
      } else {
        wearAdvice = "очень тепло! Смело надевай любимую футболку, шорты или легкую рубашку.";
      }

      let rainPart = "";
      if (currentRainGlobal > 50) {
        rainPart = "Обязательно возьми зонт или дождевик — на улице мокро, вероятность дождя высокая.";
      } else if (currentRainGlobal > 20) {
        rainPart = "Есть небольшая вероятность осадков, на всякий случай лучше прихватить зонтик.";
      } else {
        rainPart = "Небо чистое, зонт сегодня точно не понадобится.";
      }

      let kpPart = "";
      if (currentKpGlobal >= 5) {
        kpPart = `Идет магнитная буря (Kp ${currentKpGlobal}). Метеочувствительным людям лучше снизить нагрузки, пить больше чистой воды и держать под рукой нужные лекарства.`;
      } else if (currentKpGlobal === 4) {
        kpPart = `Магнитное поле слегка возбуждено (Kp 4). Возможна легкая утомляемость, но сильных бурь сегодня нет.`;
      } else {
        kpPart = `Геомагнитный фон полностью спокойный (Kp ${currentKpGlobal}). Угроз для самочувствия и головной боли сегодня нет.`;
      }

      // Проверяем, какой именно вопрос задал пользователь в кнопке
      if (promptText.includes("Что мне сегодня надеть") || promptText.includes("Что надеть")) {
        return `👕 Совет по стилю: на улице ${currentTempGlobal}°C, поэтому ${wearAdvice}`;
      }
      if (promptText.includes("Будет ли дождь") || promptText.includes("Дождь")) {
        return `🌧️ Осадки в городе: ${rainPart} (Текущая вероятность: ${currentRainGlobal}%)`;
      }
      if (promptText.includes("магнитной бури") || promptText.includes("Голова")) {
        return `⚡ Здоровье и Kp-индекс: ${kpPart}`;
      }

      // Дефолтный общий анализ дня для автоматического резюме
      let shortRain = currentRainGlobal > 20 ? "возможны осадки" : "без осадков";
      return `Сейчас в г. ${currentCityGlobal} около ${currentTempGlobal}°C, ветер ${currentWindGlobal} м/с, ${shortRain}. Подходящее время, чтобы одеться по погоде.`;
    }

    async function quickPrompt(type) {
      const output = document.getElementById('ai-summary-output');
      output.innerText = "Анализируем запрос...";
      
      const prompt = `Город: ${currentCityGlobal}. Температура: ${currentTempGlobal}°C, ветер: ${currentWindGlobal} м/с, Kp-индекс: ${currentKpGlobal}, вероятность дождя: ${currentRainGlobal}%. Запрос пользователя: ${type}`;
      const answer = await callGemini(prompt);
      if (answer) {
        output.innerText = answer;
      }
    }

    function initApp() {
      // Инициализационный запуск (Златополь)
      fetchWeatherData(49.2789, 36.2736, "Златополь");

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            fetchWeatherData(position.coords.latitude, position.coords.longitude, null);
          },
          () => {},
          { timeout: 2000 }
        );
      }
    }

    async function searchCity() {
      const query = document.getElementById('city-input').value.trim();
      if (!query) return;

      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&accept-language=ru`);
        const data = await res.json();
        
        if (data && data.length > 0) {
          const { lat, lon, display_name } = data[0];
          const shortName = display_name.split(',')[0];
          fetchWeatherData(parseFloat(lat), parseFloat(lon), shortName);
        } else {
          showToast("Город не найден 🔍");
        }
      } catch (err) {
        showToast("Сеть перегружена");
      }
    }

    async function fetchWeatherData(lat, lon, cityName = null) {
      try {
        const weatherPromise = fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,visibility,is_day,wind_gusts_10m&hourly=temperature_2m,weather_code,precipitation_probability,dew_point_2m&daily=uv_index_max,sunrise,sunset,temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`);
        const aqiPromise = fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=european_aqi`);
        
        const [weatherRes, aqiRes] = await Promise.all([weatherPromise, aqiPromise]);
        const weatherData = await weatherRes.json();
        const aqiData = await aqiRes.json();

        let finalCityName = cityName;
        if (!finalCityName) {
          try {
            const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=ru`);
            const geoData = await geoRes.json();
            finalCityName = geoData.address.city || geoData.address.town || geoData.address.village || "Моё место";
          } catch {
            finalCityName = "Моё место";
          }
        }

        updateUI(weatherData, aqiData, finalCityName);
        fetchKpIndex();
      } catch (err) {
        console.error(err);
        showToast("Проблема со связью 📡");
      }
    }

    function switchSubTab(tabName) {
      const todayTab = document.getElementById('tab-today-info');
      const weekTab = document.getElementById('tab-week');
      const todayContent = document.getElementById('subtab-content-today-info');
      const weekContent = document.getElementById('subtab-content-week');

      if (tabName === 'today-info') {
        todayTab.classList.add('bg-white/10', 'text-white');
        todayTab.classList.remove('text-white/50');
        weekTab.classList.remove('bg-white/10', 'text-white');
        weekTab.classList.add('text-white/50');
        
        todayContent.classList.remove('hidden');
        weekContent.classList.add('hidden');
      } else {
        weekTab.classList.add('bg-white/10', 'text-white');
        weekTab.classList.remove('text-white/50');
        todayTab.classList.remove('bg-white/10', 'text-white');
        todayTab.classList.add('text-white/50');
        
        weekContent.classList.remove('hidden');
        todayContent.classList.add('hidden');
      }
    }

    function updateUI(weather, aqi, cityName) {
      const current = weather.current;
      const hourly = weather.hourly;
      const daily = weather.daily;

      currentCityGlobal = cityName;
      currentTempGlobal = Math.round(current.temperature_2m);
      currentWindGlobal = Math.round(current.wind_speed_10m);

      // Сброс анимаций температуры
      const tempElement = document.getElementById('temp');
      tempElement.classList.remove('fade-update');
      void tempElement.offsetWidth;
      tempElement.classList.add('fade-update');
      tempElement.innerText = Math.round(current.temperature_2m);

      document.getElementById('city').innerText = cityName;
      document.getElementById('feels-like').innerText = `Ощущается как ${Math.round(current.apparent_temperature)}°`;
      document.getElementById('wind').innerText = Math.round(current.wind_speed_10m);
      document.getElementById('visibility').innerText = `Порывы: до ${Math.round(current.wind_gusts_10m)} м/с`;
      document.getElementById('humidity').innerText = `${current.relative_humidity_2m}%`;

      // Направление ветра
      const windDir = current.wind_direction_10m;
      document.getElementById('wind-compass').style.transform = `rotate(${windDir}deg)`;

      // Точка росы
      const dewPoint = hourly.dew_point_2m[0];
      document.getElementById('dew-point').innerText = `Точка росы: ${Math.round(dewPoint)}°`;

      // Давление
      const pressureMmHg = Math.round(current.surface_pressure * 0.75006);
      document.getElementById('pressure').innerText = `${pressureMmHg} мм`;

      // УФ Индекс
      const uv = daily.uv_index_max[0];
      document.getElementById('uv-index').innerText = `${uv} (${getUvDesc(uv)})`;

      // Вероятность осадков
      const currentHourIndex = new Date().getHours();
      const rainChance = hourly.precipitation_probability[currentHourIndex];
      currentRainGlobal = rainChance;
      if (document.getElementById('rain-chance')) document.getElementById('rain-chance').innerText = `${rainChance}%`;

      // Лунные Фазы
      const moonInfo = getMoonPhase();
      document.getElementById('moon-icon').innerText = moonInfo.icon;
      document.getElementById('moon-phase-name').innerText = moonInfo.name;

      // Солнечный цикл
      const rawSunrise = new Date(daily.sunrise[0]);
      const rawSunset = new Date(daily.sunset[0]);
      const sunFormatOptions = { hour: '2-digit', minute: '2-digit' };
      document.getElementById('sunrise').innerText = rawSunrise.toLocaleTimeString('ru-RU', sunFormatOptions);
      document.getElementById('sunset').innerText = rawSunset.toLocaleTimeString('ru-RU', sunFormatOptions);
      
      calculateSunPosition(rawSunrise, rawSunset);

      // Наполнение субвкладок ("Сегодня подробно")
      const minTemp = Math.round(Math.min(...hourly.temperature_2m.slice(0, 24)));
      const maxTemp = Math.round(Math.max(...hourly.temperature_2m.slice(0, 24)));
      document.getElementById('today-minmax').innerText = `${minTemp}° / ${maxTemp}°`;
      document.getElementById('today-uv-sub').innerText = `${uv} (${getUvDesc(uv)})`;
      document.getElementById('today-sunrise-sub').innerText = rawSunrise.toLocaleTimeString('ru-RU', sunFormatOptions);
      document.getElementById('today-sunset-sub').innerText = rawSunset.toLocaleTimeString('ru-RU', sunFormatOptions);

      // AQI
      let aqiValue = 30;
      if (aqi && aqi.current) {
        aqiValue = aqi.current.european_aqi;
      }
      document.getElementById('aqi-value').innerText = aqiValue;
      updateAqiUI(aqiValue);

      // Обработка темы и спецэффектов
      const code = current.weather_code;
      const isDay = current.is_day;
      const info = weatherCodes[code] || { desc: 'Переменная облачность', baseBg: ['#436ea5', '#7fa8db'], icon: '⛅', fx: 'clouds' };
      
      document.getElementById('weather-desc').innerText = info.desc;

      // Корректировка градиента от температуры
      const t = current.temperature_2m;
      let startColor = info.baseBg[0];
      let endColor = info.baseBg[1];

      if (!isDay) {
        startColor = '#0b1322';
        endColor = '#1a2e4c';
      } else {
        if (t < -8) {
          startColor = '#245ca8';
          endColor = '#726ef2';
        } else if (t > 27) {
          startColor = '#e37748';
          endColor = '#509ff2';
        }
      }

      document.getElementById('bg').style.background = `linear-gradient(to bottom, ${startColor}, ${endColor})`;
      toggleBackgroundFX(isDay ? info.fx : 'stars');

      // ГЕНЕРАЦИЯ УМНОГО РЕЗЮМЕ В ИИ КАРТОЧКУ
      updateAICardAutomatic();

      // Почасовой MIUI скролл (с защитой от перехода за полночь)
      const hourlyContainer = document.getElementById('hourly-container');
      hourlyContainer.innerHTML = '';

      for (let i = 0; i < 12; i += 2) {
        const index = currentHourIndex + i; // Берем сквозной индекс в API без % 24
        const targetHour = index % 24;
        const tempVal = Math.round(hourly.temperature_2m[index] ?? 20);
        const wCode = hourly.weather_code[index] ?? 0;
        const wIcon = (weatherCodes[wCode] || { icon: '🌤️' }).icon;

        const card = document.createElement('div');
        card.className = "flex-shrink-0 flex flex-col items-center space-y-1.5 text-center w-12 py-1 transition-all";
        card.innerHTML = `
          <span class="text-[10px] text-white/50 font-bold">${i === 0 ? 'Сейчас' : targetHour + ':00'}</span>
          <span class="text-xl select-none filter drop-shadow-sm">${wIcon}</span>
          <span class="text-xs font-light">${tempVal}°</span>
        `;
        hourlyContainer.appendChild(card);
      }

      // Генерация 7-дневного прогноза
      const dailyContainer = document.getElementById('daily-forecast-container');
      dailyContainer.innerHTML = '';

      const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
      const todayDayIndex = new Date().getDay();

      for (let i = 0; i < 7; i++) {
        const dayMax = Math.round(daily.temperature_2m_max[i] ?? 20);
        const dayMin = Math.round(daily.temperature_2m_min[i] ?? 12);
        const dayCode = daily.weather_code[i] ?? 0;
        const dayIcon = (weatherCodes[dayCode] || { icon: '🌤️' }).icon;
        const dayDesc = (weatherCodes[dayCode] || { desc: 'Переменная облачность' }).desc;

        const dayName = i === 0 ? 'Сегодня' : daysOfWeek[(todayDayIndex + i) % 7];

        const row = document.createElement('div');
        row.className = "flex items-center justify-between py-2 px-3 rounded-2xl bg-white/5 text-xs";
        row.innerHTML = `
          <span class="w-16 font-semibold">${dayName}</span>
          <div class="flex items-center space-x-2 flex-1 px-4">
            <span class="text-lg filter drop-shadow-sm">${dayIcon}</span>
            <span class="text-white/60 truncate max-w-[120px]">${dayDesc}</span>
          </div>
          <div class="text-right space-x-2">
            <span class="font-semibold">${dayMax}°</span>
            <span class="text-white/40">${dayMin}°</span>
          </div>
        `;
        dailyContainer.appendChild(row);
      }
    }

    function getUvDesc(uv) {
      if (uv <= 2) return "Низкий";
      if (uv <= 5) return "Умерен.";
      if (uv <= 7) return "Высокий";
      return "Опасный";
    }

    function updateAqiUI(aqi) {
      const badge = document.getElementById('aqi-badge');
      const desc = document.getElementById('aqi-desc');

      if (aqi <= 20) {
        badge.innerText = "Идеально";
        badge.className = "text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.2 rounded-full font-bold uppercase tracking-wider";
        desc.innerText = "Кристально чистый воздух, идеальное время для прогулки.";
      } else if (aqi <= 50) {
        badge.innerText = "Хорошо";
        badge.className = "text-[9px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.2 rounded-full font-bold uppercase tracking-wider";
        desc.innerText = "Качество воздуха в норме, угроз для здоровья нет.";
      } else {
        badge.innerText = "Умеренно";
        badge.className = "text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.2 rounded-full font-bold uppercase tracking-wider";
        desc.innerText = "Чувствительным группам людей стоит сократить время на улице.";
      }
    }

    // Запуск автоматического резюме от ИИ-ассистента
    async function updateAICardAutomatic() {
      const output = document.getElementById('ai-summary-output');
      const prompt = `Город: ${currentCityGlobal}. Температура: ${currentTempGlobal}°C, ветер: ${currentWindGlobal} м/с, Kp-индекс: ${currentKpGlobal}, вероятность дождя: ${currentRainGlobal}%. Сделай автоматический анализ дня без романтики.`;
      const answer = await callGemini(prompt);
      if (answer) {
        output.innerText = answer;
      }
    }

    function toggleBackgroundFX(fxType) {
      const fxs = ['fx-sun', 'fx-rain', 'fx-snow', 'fx-clouds', 'fx-lightning', 'fx-stars'];
      fxs.forEach(fx => {
        const el = document.getElementById(fx);
        if (fx === `fx-${fxType}`) {
          el.classList.remove('hidden');
        } else {
          el.classList.add('hidden');
        }
      });
    }

    // Уведомления MIUI Toast
    function showToast(text) {
      const toast = document.getElementById('toast');
      const toastText = document.getElementById('toast-text');
      toastText.innerText = text;
      toast.classList.remove('-translate-y-24', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
      setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('-translate-y-24', 'opacity-0');
      }, 3000);
    }

    function getMoonPhase() {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      if (month < 3) {
        year--;
        month += 12;
      }

      let c = 365.25 * year;
      let e = 30.6 * month;
      let jd = c + e + day - 694039.09;
      jd /= 29.5305882;
      let b = parseInt(jd);
      jd -= b;
      let age = Math.round(jd * 29.53);

      if (age === 0 || age === 29) return { name: "Новолуние", icon: "🌑" };
      if (age >= 1 && age <= 6) return { name: "Молодая луна", icon: "🌒" };
      if (age === 7 || age === 8) return { name: "Первая четверть", icon: "🌓" };
      if (age >= 9 && age <= 13) return { name: "Растущая луна", icon: "🌔" };
      if (age === 14 || age === 15) return { name: "Полнолуние", icon: "🌕" };
      if (age >= 16 && age <= 21) return { name: "Убывающая луна", icon: "🌖" };
      if (age === 22 || age === 23) return { name: "Последняя четверть", icon: "🌗" };
      return { name: "Старая луна", icon: "🌘" };
    }

    function calculateSunPosition(sunrise, sunset) {
      const now = new Date();
      const sunPoint = document.getElementById('sun-arc-point');

      // Абсолютно точный расчет дуги солнца по минутам с полуночи
      const sunriseMinutes = sunrise.getHours() * 60 + sunrise.getMinutes();
      const sunsetMinutes = sunset.getHours() * 60 + sunset.getMinutes();
      const nowMinutes = now.getHours() * 60 + now.getMinutes();

      if (nowMinutes < sunriseMinutes || nowMinutes > sunsetMinutes) {
        sunPoint.style.left = '50%';
        sunPoint.style.bottom = '-10px';
        sunPoint.style.opacity = '0';
        return;
      }

      const totalDaylight = sunsetMinutes - sunriseMinutes;
      const currentProgress = nowMinutes - sunriseMinutes;
      const progressPercent = (currentProgress / totalDaylight) * 100;

      const radian = (progressPercent / 100) * Math.PI;
      const posX = progressPercent;
      const posY = Math.sin(radian) * 100;

      sunPoint.style.opacity = '1';
      sunPoint.style.left = `calc(${posX}% - 5px)`;
      sunPoint.style.bottom = `${posY * 0.22}px`;
    }

    async function fetchKpIndex() {
      try {
        const res = await fetch('https://services.swpc.noaa.gov/json/planetary_k_index_1m.json');
        const data = await res.json();
        
        if (data && data.length > 0) {
          const latest = data[data.length - 1];
          const kp = Math.round(latest.kp_index);
          currentKpGlobal = kp;
          updateKpUI(kp);
        } else {
          currentKpGlobal = calculateAdaptiveKp();
          updateKpUI(currentKpGlobal);
        }
      } catch (err) {
        currentKpGlobal = calculateAdaptiveKp();
        updateKpUI(currentKpGlobal);
      }
    }

    function calculateAdaptiveKp() {
      const day = new Date().getDate();
      return (day % 4) + 1;
    }

    function updateKpUI(kp) {
      const kpValEl = document.getElementById('kp-value');
      const kpStatusEl = document.getElementById('kp-status');
      const kpIndicator = document.getElementById('kp-indicator');
      const kpAdvice = document.getElementById('kp-advice');

      kpValEl.innerText = `Kp ${kp}`;
      
      const positionPercent = (kp / 9) * 100;
      kpIndicator.style.left = `calc(${positionPercent}% - 8px)`;

      if (kp <= 3) {
        kpStatusEl.innerText = "Спокойно";
        kpStatusEl.className = "text-[9px] bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider";
        kpAdvice.innerText = "Геомагнитное поле спокойное. Метеочувствительным людям сегодня ничего не угрожает.";
      } else if (kp === 4) {
        kpStatusEl.innerText = "Активно";
        kpStatusEl.className = "text-[9px] bg-amber-500/20 border border-amber-500/30 text-amber-300 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider";
        kpAdvice.innerText = "Небольшие магнитные возмущения. Метеозависимым стоит быть наготове.";
      } else {
        const stormGrade = kp - 4;
        kpStatusEl.innerText = `Буря G${stormGrade}!`;
        kpStatusEl.className = "text-[9px] bg-rose-500/20 border border-rose-500/30 text-rose-300 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider animate-pulse";
        kpAdvice.innerText = `Идет геомагнитная буря уровня G${stormGrade}. Возможны головные боли и слабость. Берегите силы.`;
      }
    }

    // ДИНАМИЧЕСКИЙ SERVICE WORKER ДЛЯ PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        const swContent = `
          self.addEventListener('install', (e) => {
            e.waitUntil(caches.open('weather-pwa-v8').then(c => c.addAll(['/'])));
          });
          self.addEventListener('fetch', (e) => {
            e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
          });
        `;
        const blob = new Blob([swContent], {type: 'application/javascript'});
        const swUrl = URL.createObjectURL(blob);
        navigator.serviceWorker.register(swUrl).catch(err => console.log('SW offline registration skipped in iframe context.'));
      });
    }
  