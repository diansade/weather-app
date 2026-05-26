let KEY = "c5dc6dd8d87d606e1a56f09e674043cc";

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

const search = async () => {
    if(inputCity.value.trim() != ""){
        try{
            let city = inputCity.value.trim();
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=metric`;
            let response = await fetch(url);
            let data = await response.json();

            console.log(data);

            if(data.cod != 200){
                message.innerHTML = "City not found. Please try again.";
                clearWeather();
                message.style.display = "block";
                inputCity.focus();
                return;
            }

            message.innerHTML = "";
            message.style.display = "none";
            cityName.innerHTML = `City: ${data.name}`;

            icon.style.display = "block";
            icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

        
            temp.innerHTML = `Temperature : ${data.main.temp} °C`;

            
            condition.innerHTML = `Condition: ${data.weather[0].description}`;
            
            
            humidity.innerHTML = `Humidity: ${data.main.humidity}%`;

            
            wind.innerHTML = `Wind: Speed = ${data.wind.speed} m/s, Deg = ${data.wind.deg}`

            inputCity.value = "";
        }
        catch(error){
            message.innerHTML = "Something went wrong!!";
            clearWeather();
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


