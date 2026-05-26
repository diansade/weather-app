let searchButton = document.getElementById("searchButton");
let inputCity = document.getElementById("inputCity");
let message = document.getElementById("message");

let cityName = document.getElementById("city");
let icon = document.getElementById("icon");
let temp = document.getElementById("temp");
let condition = document.getElementById("condition");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");

const clearWeather = () => {
    icon.src="";
    icon.style.display = "none";
    cityName.innerHTML = "";
    temp.innerHTML = "";
    condition.innerHTML = "";
    humidity.innerHTML = "";
    wind.innerHTML = "";
}

const loading = () => {
    clearWeather();
    message.innerHTML = "⛅ Loading weather...";
    message.style.display = "block";
}

const search = async () => {
    if(inputCity.value.trim() != ""){
        try{
            loading();
            let city = inputCity.value.trim();
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=metric`;
            let response = await fetch(url);
            let data = await response.json();

            console.log(data);

            if(data.cod != 200){
                clearWeather();
                message.innerHTML = "City not found. Please try again.";
                message.style.display = "block";
                inputCity.focus();
                return;
            }

            message.style.display = "none";
            message.innerHTML = "";
            cityName.innerHTML = `City: ${data.name}`;

            icon.style.display = "block";
            icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

        
            temp.innerHTML = `Temperature : ${data.main.temp} °C`;

            
            condition.innerHTML = `Condition: ${data.weather[0].description}`;
            
            
            humidity.innerHTML = `Humidity: ${data.main.humidity}%`;

            
            wind.innerHTML = `Wind Speed: ${data.wind.speed} m/s`;

            inputCity.value = "";
            inputCity.focus();
        }
        catch(error){
            clearWeather();
            message.innerHTML = "Unable to fetch weather data. Please try again.";
            message.style.display = "block";
            inputCity.value = "";
            inputCity.focus();
        }
    }
}


 searchButton.addEventListener("click", () => {
   search();
 })

inputCity.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        search();
    }
})


