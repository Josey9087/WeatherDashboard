// Below are global variables that will be used throughout the code including the API Key.
var WeatherDashboardAPIKey = "27127e631022b8f861292951b0145e8c";
var CityNames = $('#city-input');
var CurrentDay = $('#CurrentDay');
var NextDays = $('#5Days')
var CurrentTemp = $('#CurrentTemp')
var CurrentWind = $('#CurrentWind')
var CurrentHumidity = $('#CurrentHumidity')

// Below is a function that begins on the click event attached to the html element with the 'Yes' id.
// The event default is prevented and a variable named city is set to the val of the input in the search bar.
// The API is called using the city that was input as well as the API key.
// The response is put into json format and then given the name data as a variable.
// A function is then used in order to grab the unix value of the day and give it to moment in order to convert it to time.
// Values from the API call are set to the text of elements within the html.
// The icon code is grabbed and input into a src for an image that wil display the icon of that corresponding weather.
// Lat and Lon are set as varibale in order to call the next api that will forecast the next 5 days.
// The get5days function is called while giving it the call1 variable to be used inside of it. 
$("#Yes").click(function (event) {
  event.preventDefault()
  city = $("#city-name").val()
  call = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + WeatherDashboardAPIKey;
  fetch(call)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      unixTime = moment.unix(data.dt);
      CurrentDay.text(data.name + " (" + (unixTime.format("MM/DD/YYYY") + ") "))
      CurrentTemp.text("Temp: " + data.main.temp)
      CurrentWind.text("Wind: " + data.wind.speed)
      CurrentHumidity.text("Humidity: " + data.main.humidity)
      var iconcode = data.weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
      $('#wicon').attr('src', iconurl);
      var lat = data.coord.lat
      var lon = data.coord.lon
      var call1 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + WeatherDashboardAPIKey;
      get5days(call1)
    })
});

// Below is the get5days function which will display the next 5 days being forecasted.
// The function uses fetch with the url as an input, the url will be given to the function when called.
// The response is then put into json format and returned in order to set the return to the variable data.
// A function starts that sets the UV index of the element with the CurrentUV id to the value of the current day.
// An if statment sets a class to color the element with the UV displayed based on the number of the UV.
// An emtpy() is used in order to ensure nothing is inside of the element with the 5Days id as well as the element with the forecastclass.
// A header is created and the text inside is set to '5 Day Forecast', the header is then inserted into the html before the NextDays variable.
// A for loop begins for each number starting at 1 and up to 5.
// In this for loop a new section element is created and given the class border. It is appened into the NextDays variable.
// A new p tag is made and given ghe value of the date which is converted from unix time using moment, this is also appended into NextDays.
// A new img tag is made and its src is made to be the display of the icon for the current weather date, it is appended into NextDays.
// Three new p tags are created and each given a different text, one being the value of the temperature of the current day.
// Another being the wind speed, and the last being the humidity level. All three tags are appended into the NextDays variable
function get5days(url) {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      $('#CurrentUV').text("UV Index: " + data.daily[0].uvi)
      if (data.daily[0].uvi < 2) {
        $('#CurrentUV').addClass('bg-success')
      }
      if (data.daily[0].uvi <= 3 && data.daily[0].uvi <= 5) {
        $('#CurrentUV').addClass('bg-warning')
      }
      if (data.daily[0].uvi > 5) {
        $('#CurrentUV').addClass('bg-danger')
      }
      $("#5Days").empty()
      $(".forecast").empty()
      title = $('<h2>')
      title.addClass('forecast')
      title.text("5 Day Forecast")
      title.insertBefore(NextDays)
      for (var i = 1; i < 6; i++) {
        new1 = $('<section>')
        $(new1).addClass('border')
        NextDays.append(new1)
        new2 = $('<p>')
        unixTime = moment.unix(data.daily[i].dt);
        new2.text(unixTime.format("MM/DD/YYYY"))
        new1.append(new2)
        image1 = $('<img>')
        source = "http://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png";
        image1.attr('src', source)
        new1.append(image1)
        new3 = $('<p>')
        new3.text("Temp: " + data.daily[i].temp.day)
        new1.append(new3)
        new4 = $('<p>')
        new4.text("Wind: " + data.daily[i].wind_speed)
        new1.append(new4)
        new5 = $('<p>')
        new5.text("Humidity: " + data.daily[i].humidity)
        new1.append(new5)
      }
    })
}


// This function is called on the click event of the search bar, it prevents the default action as well as sets a variable named city.
// This varaible has the value of the input from the search bar.
// The value is stored inside of of local storage.
// A button is then created inside of the section below the search bar. the text of the button is set to the value that was just input.
// The button is appended into the section.
$('#Yes').click(function (event) {
  event.preventDefault();
  var city = $("#city-name").val()
  localStorage.setItem(city, city)
  var nameOfCity = $('<button>');
  nameOfCity.addClass('btn btn-custom bg-primary')
  nameOfCity.text($('#city-name').val());
  CityNames.append(nameOfCity);
})

// This function is called when one of the buttons that make up the search history is called.
// The event default is prevented, the specific target of the section is located and the textContent is set to a variable named 'name1'
// The function add is called and given the name1 variable
$('#city-input').click(function (event) {
  event.preventDefault();
  tar = event.target
  name1 = tar.textContent
  add(name1)

})

// This is the same function as the first one in the file that is activated by an event click only this one is a stand alone function.
function add(city) {
  call = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + WeatherDashboardAPIKey;
  fetch(call)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      unixTime = moment.unix(data.dt);
      CurrentDay.text(data.name + " (" + (unixTime.format("MM/DD/YYYY") + ") "))
      CurrentTemp.text("Temp: " + data.main.temp)
      CurrentWind.text("Wind: " + data.wind.speed)
      CurrentHumidity.text("Humidity: " + data.main.humidity)
      var iconcode = data.weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
      $('#wicon').attr('src', iconurl);
      lat = data.coord.lat
      lon = data.coord.lon
      call1 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + WeatherDashboardAPIKey;
      get5days(call1)
    })
}