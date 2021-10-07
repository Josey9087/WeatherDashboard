var WeatherDashboardAPIKey = "27127e631022b8f861292951b0145e8c";
var CityNames = $('#city-input');
var CurrentDay=$('#CurrentDay');
var NextDays=$('#5Days')
var CurrentTemp=$('#CurrentTemp')
var CurrentWind=$('#CurrentWind')
var CurrentHumidity=$('#CurrentHumidity')

$( "#Yes" ).click(function(event) {
    event.preventDefault()
    city=$("#city-name").val()
    call= "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + WeatherDashboardAPIKey;
  fetch(call)
    .then(function (response) {
        console.log(response)
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      unixTime=moment.unix(data.dt);
      CurrentDay.text(data.name + " (" + (unixTime.format("MM/DD/YYYY") + ") "))
      CurrentTemp.text("Temp: " + data.main.temp )
      CurrentWind.text("Wind: " + data.wind.speed)
      CurrentHumidity.text("Humidity: " + data.main.humidity)
      var iconcode = data.weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
      $('#wicon').attr('src', iconurl);
      lat=data.coord.lat
      lon=data.coord.lon
      var call1="https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" +WeatherDashboardAPIKey;
      get5days(call1)
    })
    });

  
function get5days(url){
    fetch(url)
    .then(function(response){
        console.log(response)
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        $('#CurrentUV').text("UV Index: " + data.daily[0].uvi)
        if(data.daily[0].uvi<2){
          $('#CurrentUV').addClass('bg-success')
        }
        if(data.daily[0].uvi<=3 && data.daily[0].uvi<=5){
          $('#CurrentUV').addClass('bg-warning')
        }
        if(data.daily[0].uvi>5){
          $('#CurrentUV').addClass('bg-danger')
        }
        $("#5Days").empty()
        $(".forecast").empty()
        title=$('<h2>')
        title.addClass('forecast')
        title.text("5 Day Forecast")
        title.insertBefore(NextDays)
      for (var i = 1; i < 6; i++) {
        new1 = $('<section>')
        $(new1).addClass('border')
        NextDays.append(new1)
        new2=$('<p>')
        unixTime=moment.unix(data.daily[i].dt);
        new2.text(unixTime.format("MM/DD/YYYY"))
        new1.append(new2)
        image1=$('<img>')
        source= "http://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png";
        image1.attr('src', source)
        new1.append(image1)
        new3=$('<p>')
        new3.text("Temp: "+ data.daily[i].temp.day)
        new1.append(new3)
        new4=$('<p>')
        new4.text("Wind: " + data.daily[i].wind_speed)
        new1.append(new4)
        new5=$('<p>')
        new5.text("Humidity: " + data.daily[i].humidity)
        new1.append(new5)
          }
    })}



$('#Yes').click(function(event){
    event.preventDefault();
    var city=$("#city-name").val()
    localStorage.setItem(city,city)
    var nameOfCity = $('<button>');
    nameOfCity.addClass('btn btn-custom bg-primary')
    nameOfCity.text($('#city-name').val());
    CityNames.append(nameOfCity);
})


$('#city-input').click(function(event){
      event.preventDefault();
      tar= event.target
      name1=tar.textContent
      add()

})


function add(){
call= "http://api.openweathermap.org/data/2.5/weather?q=" + name1 + "&units=imperial&appid=" + WeatherDashboardAPIKey;
fetch(call)
.then(function (response) {
    console.log(response)
  return response.json();
})
.then(function (data) {
  console.log(data);
  unixTime=moment.unix(data.dt);
  CurrentDay.text(data.name + " (" + (unixTime.format("MM/DD/YYYY") + ") "))
  CurrentTemp.text("Temp: " + data.main.temp )
  CurrentWind.text("Wind: " + data.wind.speed)
  CurrentHumidity.text("Humidity: " + data.main.humidity)
  var iconcode = data.weather[0].icon;
  var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
  $('#wicon').attr('src', iconurl);
  lat=data.coord.lat
  lon=data.coord.lon
  call1="https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" +WeatherDashboardAPIKey;
  get5days(call1)
})}