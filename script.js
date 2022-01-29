//API Variables 
var apiUrlGeneral = "https://api.openweathermap.org/data/2.5/weather?id=524901&appid=a779700c959c351facd0defc1a67317d"
var apiUrlCity = "https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=a779700c959c351facd0defc1a67317d"
var myKey = "appid=a779700c959c351facd0defc1a67317d"

//The Form and Container Parts
var searchFormEl = document.querySelector('#search-form');
var cityInput = document.querySelectorAll('#search-input');
var displayResults = document.querySelector ('#result-content')
var displayCityName = document.getElementById("city-name")

//Event Listener for submit button
var submitForm = document.querySelector('#submit-form') 
submitForm.addEventListener("submit", currentWeather)

//Current Weather
var currentUvIndex = document.getElementById("current-uv-index");
var currentIcon = document.getElementById("current-icon");
var currentTemp = document.getElementById("current-temp");
var currentHumidity = document.getElementById("current-humidity");
var currentWindSpeed = document.getElementById("current-wind-speed");

                                                          //5-Day Section Variables

//Day one
var dayOneDateEl = document.getElementById("day-one-date");
var dayOneIcon = document.getElementById("day-one-icon");
var dayOneTempEl = document.getElementById("day-one-temp");
var dayOneHumidEl = document.getElementById("day-one-humid");

//Day Two
var dayTwoDateEl = document.getElementById("day-two-date");
var dayTwoIcon = document.getElementById("day-two-icon");
var dayTwoTempEl = document.getElementById("day-two-temp");
var dayTwoHumidEl = document.getElementById("day-two-humid");


//Day Three
var dayThreeDateEl = document.getElementById("day-three-date");
var dayThreeIcon = document.getElementById("day-three-icon")
var dayThreeTempEl = document.getElementById("day-three-temp");
var dayThreeHumidEl = document.getElementById("day-three-humid");

//Day Four
var dayFourDateEl = document.getElementById("day-four-date");
var dayFourIcon = document.getElementById("day-four-icon")
var dayFourTempEl = document.getElementById("day-four-temp");
var dayFourHumidEl = document.getElementById("day-four-humid");

//Day five
var dayFiveDateEl = document.getElementById("day-five-date");
var dayFiveIcon = document.getElementById("day-five-icon")
var dayFiveTempEl = document.getElementById("day-five-temp");
var dayFiveHumidEl = document.getElementById("day-five-humid");

                                                          //LOCAL STORAGE VARIABLES ?
 var savedSearchesEl = document.getElementById("saved-searches");
 var searchHistory = document.getElementById("city-search-history");




