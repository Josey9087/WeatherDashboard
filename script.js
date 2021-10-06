var WeatherDashboardAPIKey = "27127e631022b8f861292951b0145e8c";
var city="Denver"
call= api.openweathermap.org/data/2.5/weather?q={city}&appid:{WeatherDashboardAPIKey}
fetch(call)
