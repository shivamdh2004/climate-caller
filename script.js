document.addEventListener('click',function(){
    const cityInput = document.getElementById("city-input")
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");
    
    const API_KEY = "fd64cadf6d80fbaacbb0fe2b74ee9d89";
    
    getWeatherBtn.addEventListener('click',async () => {
        const city = cityInput.value.trim()
        if(!city)return;
        try {
           const weatherData = await fetchWeatherData(city);
           displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }

    })
    cityInput.addEventListener('click',function(){
        weatherInfo.classList.add('hidden')
    })
     async function fetchWeatherData(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const responce = await fetch(url);
        //console.log(typeof responce);
        //console.log(responce);
        if(!responce.ok){
            throw new Error("city Not Found")
        }
        const data = await responce.json();
        return data;
        
    }
    function displayWeatherData(data){
        //console.log(data);
        const {name , main , weather} = data
        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `Temperature : ${main.temp} deg. celsius ` 
        descriptionDisplay.textContent = `Weather : ${weather[0].description}` 
        weatherInfo.classList.remove('hidden')
        errorMessage.classList.add('hidden')
    }
    function showError(){
        weatherInfo.classList.add('hidden')
        errorMessage.classList.remove('hidden')
    }

})