var WeatherDashboardAPIKey = "27127e631022b8f861292951b0145e8c";
CityNames = $('#city-input');
CurrentDay=$('#CurrentDay');
NextDays=$('#5Days')
CurrentTemp=$('#CurrentTemp')
CurrentWind=$('#CurrentWind')
CurrentHumidity=$('#CurrentHumidity')


$( "#Yes" ).click(function(event) {
    event.preventDefault()
    var city=$("#city-name").val()
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
      call1="https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" +WeatherDashboardAPIKey;
      get5days()
    })
    });

  
function get5days(){
    fetch(call1)
    .then(function(response){
        console.log(response)
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        $("#5Days").empty()
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
    var nameOfCity = $('<button>');
    nameOfCity.text($('#city-name').val());
    CityNames.append(nameOfCity);
})