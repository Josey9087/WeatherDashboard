var WeatherDashboardAPIKey = "27127e631022b8f861292951b0145e8c";
var city="Denver"
call= "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + WeatherDashboardAPIKey;

lat="39.7392"
lon="-104.9847"
function getApi() {
    call= "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + WeatherDashboardAPIKey;
  fetch(call)
    .then(function (response) {
        console.log(response)
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      lat=data.coord.lat
      lon=data.coord.lon
    })
    }

  
function get5days(){
    call1="https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" +WeatherDashboardAPIKey;
    fetch(call1)
    .then(function(response){
        console.log(response)
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })}


getApi()
get5days()