let place=document.getElementById("place");
let button=document.getElementById("weather");
let result=document.getElementById("result");

button.addEventListener("click",async function() {
    let city=place.value;
    if(city=="") {
        result.innerHTML="Please enter a place";
        return;
    }
    let location_response=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
    let location_data=await location_response.json();
    if(!location_data.results) {
        result.innerHTML="Please enter a valid place";
        return;
    }
    let latitude=location_data.results[0].latitude;
    let longitude=location_data.results[0].longitude;
    let country=location_data.results[0].country;
    let state=location_data.results[0].admin1;
    let district=location_data.results[0].admin2;
    
    let weather_response=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`);
    let weather_data=await weather_response.json();
    let temperature=weather_data.current.temperature_2m;
    let weatherCode=weather_data.current.weather_code;
    let weatherType;
    if (weatherCode == 0) {
    weatherType = "Clear sky";
    }
    else if (weatherCode == 1) {
        weatherType = "Mainly clear";
    }
    else if (weatherCode == 2) {
        weatherType = "Partly cloudy";
    }
    else if (weatherCode == 3) {
        weatherType = "Overcast";
    }
    else if (weatherCode == 61) {
        weatherType = "Rain";
    }
    else if (weatherCode == 95) {
        weatherType = "Thunderstorm";
    }
    else{
        weatherType="Unknown";
    }
    result.innerHTML=`
    <h1>${city}</h1>
    <p>Temperature: ${temperature} °C</p>
    <p>Weather: ${weatherType}</p>
    <p>District: ${district}</p>
    <p>State: ${state}</p>
    <p>Country: ${country}</p>
`;
    });