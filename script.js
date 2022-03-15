                                                       //Declaring variables

//API Variables (used for reference purposes)
var cityAPIPath = "https://api.openweathermap.org/data/2.5/weather?q="
var myAPIKey = "&appid=a779700c959c351facd0defc1a67317d"
var MyAPIExampleSearch = "https://api.openweathermap.org/data/2.5/weather?q=Birmingham&appid=a779700c959c351facd0defc1a67317d"
var oneCallAPI = "https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=a779700c959c351facd0defc1a67317d"

//The Form and Container Parts
var searchInput = document.getElementById("city-input");
var submitBtn = document.getElementById("submit-btn");

//Current Data 
var currentIcon = document.getElementById("current-icon");
var temp = document.getElementById("current-temp");
var humidity = document.getElementById("current-humidity");
var windSpeed = document.getElementById("current-wind-speed");
var textColour = document.getElementById("text-colour");
var currentUvIndex = document.getElementById("current-uv-index");

//5-Day Data

//Day One
var dayOneDateEl = document.getElementById("day-one-date");
var dayOneIcon = document.getElementById("day-one-icon");
var dayOneTempEl = document.getElementById("day-one-temp");
var dayOneHumidEl = document.getElementById("day-one-humid");
var dayOneWindSpeedEl = document.getElementById("day-one-wind-speed");

//Day Two
var dayTwoDateEl = document.getElementById("day-two-date");
var dayTwoIcon = document.getElementById("day-two-icon");
var dayTwoTempEl = document.getElementById("day-two-temp");
var dayTwoHumidEl = document.getElementById("day-two-humid");
var dayTwoWindSpeedEl = document.getElementById("day-two-wind-speed");

//Day Three
var dayThreeDateEl = document.getElementById("day-three-date");
var dayThreeIcon = document.getElementById("day-three-icon")
var dayThreeTempEl = document.getElementById("day-three-temp");
var dayThreeHumidEl = document.getElementById("day-three-humid");
var dayThreeWindSpeedEl = document.getElementById("day-three-wind-speed");

//Day Four
var dayFourDateEl = document.getElementById("day-four-date");
var dayFourIcon = document.getElementById("day-four-icon")
var dayFourTempEl = document.getElementById("day-four-temp");
var dayFourHumidEl = document.getElementById("day-four-humid");
var dayFourWindSpeedEl = document.getElementById("day-four-wind-speed");

//Day Five
var dayFiveDateEl = document.getElementById("day-five-date");
var dayFiveIcon = document.getElementById("day-five-icon")
var dayFiveTempEl = document.getElementById("day-five-temp");
var dayFiveHumidEl = document.getElementById("day-five-humid");
var dayFiveWindSpeedEl = document.getElementById("day-five-wind-speed");

//Storage
var stored = document.getElementById("stored-searches");
var displayCityName = document.getElementById("city-name")
//Empty array for storage
var cities = [];


                                                //Functions Begin


//Get any local Storage first before making new searches
if (localStorage.getItem("searchedCity")) {
    cities = localStorage.getItem("searchedCity");

//Will add the user's history to the empty cities array above 
    var userHistory = [];
    userHistory = cities.split(",");
    cities = userHistory

// For each city searched, keep it stored on the page under the form column as a button
    for (var i = 0; i < userHistory.length; i++) {
        var keepCity = document.createElement("button");
        keepCity.classList = "list";
        keepCity.innerHTML = userHistory[i];
        stored.append(keepCity); 
    }
   
} 

//Will take the user's input and push it to the cities array
function pushCity () {
    var searchedCity = searchInput.value.trim()
    var addCityArray = cities
    addCityArray.push(searchedCity)
//Will save it in local storage
    localStorage.setItem("searchedCity", addCityArray);
}


                                                                           //Current Weather 
function currentWeather (event) {
    event.preventDefault();

//Will pass into the stored cities
    var searchedCity = searchInput.value.trim();
    var savedCity = document.createElement("button");
    savedCity.className = "list";
    savedCity.innerHTML = searchInput.value;
    stored.appendChild(savedCity);

    //Current Weather API fetch request
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=metric&appid=a779700c959c351facd0defc1a67317d`
    console.log(apiUrl);
    fetch(apiUrl)
      .then(function (response) {
          if (response.ok) {
              console.log(response);
              response.json().then(function (data){
                  console.log(data);


                //Displays the Date and the City Name
                 var unixCode = data.dt
                 console.log(unixCode)
                 currentDate = new Date(unixCode * 1000).toLocaleDateString("en-UK")
                 displayCityName.innerHTML = searchedCity + " " + currentDate

                //Displays the Weather Icon
                 var currentIconCode = data.weather[0].icon
                 var currentIconUrl = `http://openweathermap.org/img/w/${currentIconCode}.png`
                  currentIcon.src = currentIconUrl

                //Displays Temp, Wind Speed and Humidity
                temp.innerHTML = "Temperature: " + data.main.temp + ' \u00B0 C';
                 humidity.innerHTML = "Humidity: " + data.main.humidity + "%"
                  windSpeed.innerHTML = "Wind Speed: " + data.wind.speed + " MPH";


                  //A  Onecall API is needed to determine the UV index as the first weather API call does not contain this data, and so, for that, we need to know the lat and lon data first.
                  var lat = data.coord.lat
                  var lon = data.coord.lon
                  var uVIndexUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=a779700c959c351facd0defc1a67317d`

                  //API fetch request for UV index
                  fetch(uVIndexUrl)
                    .then(function (response) {
                        if (response.ok) {
                            console.log(response);
                            response.json().then(function (data){
                                console.log(data);

                                //Displays UV index on the page
                                currentUvIndex.innerHTML = "UV Index: " + data.daily[0].uvi
                              
                                //if the UV is high, change the text colour to red
                                if (data.daily[0].uvi >= 5) {
                                    textColour.className = "danger"

                                //if the uv is low, change the text colour green
                                } else if (data.daily[0].uvi <= 2) {
                                    textColour.className = "good"

                                //if the uv is moderate, change the text colour to orange
                                } else if (data.daily[0].uvi <= 5) {
                                    textColour.className = "medium"
                                }
                            })
                        }
                    })
                
              })
          }
      })


                                                                       // Five-Day Forecast

    var fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&units=metric&appid=a779700c959c351facd0defc1a67317d`

  //Five-Day API fetch request
    fetch(fiveDayUrl)
      .then(function (response) {
          if (response.ok) {
              console.log(response);
              response.json().then(function (data){
                  console.log(data);


                  //Day One 
                  var dayOneCode = data.list[3].dt
                  dayOneDate = new Date(dayOneCode * 1000).toLocaleDateString("en-UK")
                  dayOneDateEl.innerHTML = dayOneDate
                  console.log(data.list[3].weather[0].icon)


                  var dayOneIconCode = data.list[3].weather[0].icon
                  var dayOneIconUrl = `http://openweathermap.org/img/w/${dayOneIconCode}.png`
                  dayOneIcon.src = dayOneIconUrl
                  dayOneTempEl.innerHTML = "Temp: " + data.list[3].main.temp + ' \u00B0 C';
                  dayOneWindSpeedEl.innerHTML = "Wind Speed: " +  data.list[3].wind.speed + " MPH";
                  dayOneHumidEl.innerHTML = "Humidity: " + data.list[3].main.humidity + "%";



                  //Day Two
                  var dayTwoCode = data.list[10].dt
                  dayTwoDate = new Date(dayTwoCode * 1000).toLocaleDateString("en-UK")
                  dayTwoDateEl.innerHTML = dayTwoDate
                  var dayTwoIconCode = data.list[10].weather[0].icon
                  var dayTwoIconUrl = `http://openweathermap.org/img/w/${dayTwoIconCode}.png`
                  dayTwoIcon.src = dayTwoIconUrl
                  dayTwoTempEl.innerHTML = "Temp: " + data.list[10].main.temp + ' \u00B0 C';
                  dayTwoWindSpeedEl.innerHTML = "Wind Speed: " +  data.list[10].wind.speed + " MPH";
                  dayTwoHumidEl.innerHTML = "Humidity: " + data.list[10].main.humidity + "%";



                  //Day Three
                  var dayThreeCode = data.list[19].dt
                  dayThreeDate = new Date(dayThreeCode * 1000).toLocaleDateString("en-UK")
                  dayThreeDateEl.innerHTML = dayThreeDate
                  var dayThreeIconCode = data.list[19].weather[0].icon
                  var dayThreeIconUrl = `http://openweathermap.org/img/w/${dayThreeIconCode}.png`
                  dayThreeIcon.src = dayThreeIconUrl
                  dayThreeTempEl.innerHTML = "Temp: " + data.list[19].main.temp + ' \u00B0 C';
                  dayThreeWindSpeedEl.innerHTML = "Wind Speed: " + data.list[19].wind.speed + " MPH";
                  dayThreeHumidEl.innerHTML = "Humidity: " + data.list[19].main.humidity + "%";


                  //Day Four
                  var dayFourCode = data.list[27].dt
                  dayFourDate = new Date(dayFourCode * 1000).toLocaleDateString("en-UK")
                  dayFourDateEl.innerHTML = dayFourDate
                  var dayFourIconCode = data.list[27].weather[0].icon
                  var dayFourIconUrl = `http://openweathermap.org/img/w/${dayFourIconCode}.png`
                  dayFourIcon.src = dayFourIconUrl
                  dayFourTempEl.innerHTML = "Temp: " + data.list[27].main.temp + ' \u00B0 C';
                  dayFourWindSpeedEl.innerHTML = "Wind Speed: " + data.list[27].wind.speed + " MPH";
                  dayFourHumidEl.innerHTML = "Humidity: " + data.list[27].main.humidity + "%";

                  //Day Five
                  var dayFiveCode = data.list[35].dt
                  dayFiveDate = new Date(dayFiveCode * 1000).toLocaleDateString("en-UK")
                  dayFiveDateEl.innerHTML = dayFiveDate
                  var dayFiveIconCode = data.list[35].weather[0].icon
                  var dayFiveIconUrl = `http://openweathermap.org/img/w/${dayFiveIconCode}.png`
                  dayFiveIcon.src = dayFiveIconUrl
                  dayFiveTempEl.innerHTML = "Temp: " + data.list[35].main.temp + ' \u00B0 C';
                  dayFiveWindSpeedEl.innerHTML = "Wind Speed: " + data.list[35].wind.speed + " MPH";
                  dayFiveHumidEl.innerHTML = "Humidity: " + data.list[35].main.temp + "%";
              })
          }
      })

    }


    //When the previous searched city is clicked, repeat the process displayed data
     var previousSearchedCity = document.querySelectorAll("button");
    for (var i = 0; i < previousSearchedCity.length; i++) {
        var returnSearch = previousSearchedCity[i];

        returnSearch.addEventListener('click', function(event) {
            event.preventDefault();

            var searchedCity = this.innerHTML
            console.log(searchedCity);


                                                    //THE ORIGINAL PROCESS IS TO BE REPEATED AGAIN


                                                             //Current Weather

            var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=metric&appid=a779700c959c351facd0defc1a67317d`

            fetch(apiUrl)
              .then(function (response) {
                  if (response.ok) {
                    console.log(response);
                    response.json().then(function (data) {
                        console.log(data);
                       
                        //Displays the Date and City Name
                        var unixCode = data.dt
                        currentDate = new Date(unixCode * 1000).toLocaleDateString("en-UK")
                        console.log(currentDate)
                        displayCityName.innerHTML = searchedCity + " " + currentDate

                        //Displays Icon
                        var currentIconCode = data.weather[0].icon
                        var currentIconUrl = `https://openweathermap.org/img/w/${currentIconCode}.png`
                        currentIcon.src = currentIconUrl

                        //Displays Temp, Wind Speed and Humidity
                        temp.innerHTML = "Temperature: " + data.main.temp + ' \u00B0 C';
                        humidity.innerHTML = "Humidity: " + data.main.humidity + "%"
                        windSpeed.innerHTML = "Wind Speed: " + data.wind.speed + " MPH";

                        //A Onecall API is needed to determine the UV index, for that, we need the lat and lon data.
                        lat = data.coord.lat
                        lon = data.coord.lon
                        var uVIndexUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=a779700c959c351facd0defc1a67317d`
                        fetch(uVIndexUrl)
                          .then(function (response) {
                              console.log(response);
                              response.json().then(function (data) {
                                  console.log(data);


                                  currentUvIndex.innerHTML = data.daily[0].uvi;
                                  if (data.daily[0].uvi >= 5.1) {
                                      textColour.className = "danger"
                                  } else if (data.daily[0].uvi <= 2) {
                                      textColour.className = "good"
                                  } else if (data.daily[0].uvi >= 2.1 <= 5) {
                                      textColour.className = "medium"
                                  }
                              })
                          })
                    })
                  }
              })

        var fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&units=imperial&appid=a779700c959c351facd0defc1a67317d`

        fetch(fiveDayUrl)
          .then(function (response) {
              if (response.ok) {
                  console.log(response);
                  response.json().then(function (data) {
                      console.log(data);
            

                //Day One
                var dayOneCode = data.list[3].dt
                 console.log(dayOneCode)
                dayOneDate = new Date(dayOneCode * 1000).toLocaleDateString("en-UK")
                console.log(dayOneDate)
                  dayOneDateEl.innerHTML = dayOneDate
                  var dayOneIconCode = data.list[3].weather[0].icon
                  var dayOneIconUrl = `http://openweathermap.org/img/w/${dayOneIconCode}.png`
                  dayOneIcon.src = dayOneIconUrl
                  dayOneTempEl.innerHTML = "Temp: " + data.list[3].main.temp + ' \u00B0 C';
                  dayOneHumidEl.innerHTML = "Humidity: " + data.list[3].main.humidity + "%";

                  //Day Two
                  var dayTwoCode = data.list[10].dt
                  dayTwoDate = new Date(dayTwoCode * 1000).toLocaleDateString("en-UK")
                  dayTwoDateEl.innerHTML = dayTwoDate
                  var dayTwoIconCode = data.list[10].weather[0].icon
                  var dayTwoIconUrl = `http://openweathermap.org/img/w/${dayTwoIconCode}.png`
                  dayTwoIcon.src = dayTwoIconUrl
                  dayTwoTempEl.innerHTML = "Temp: " + data.list[10].main.temp + ' \u00B0 C';
                  dayTwoHumidEl.innerHTML = "Humidity: " + data.list[10].main.humidity + "%";

                  //Day Three
                  var dayThreeCode = data.list[19].dt
                  dayThreeDate = new Date(dayThreeCode * 1000).toLocaleDateString("en-UK")
                  dayThreeDateEl.innerHTML = dayThreeDate
                  var dayThreeIconCode = data.list[19].weather[0].icon
                  var dayThreeIconUrl = `http://openweathermap.org/img/w/${dayThreeIconCode}.png`
                  dayThreeIcon.src = dayThreeIconUrl
                  dayThreeTempEl.innerHTML = "Temp: " + data.list[19].main.temp + ' \u00B0 C';
                  dayThreeHumidEl.innerHTML = "Humidity: " + data.list[19].main.humidity + "%";

                  //Day Four
                  var dayFourCode = data.list[27].dt
                  dayFourDate = new Date(dayFourCode * 1000).toLocaleDateString("en-UK")
                  dayFourDateEl.innerHTML = dayFourDate
                  var dayFourIconCode = data.list[27].weather[0].icon
                  var dayFourIconUrl = `http://openweathermap.org/img/w/${dayFourIconCode}.png`
                  dayFourIcon.src = dayFourIconUrl
                  dayFourTempEl.innerHTML = "Temp: " + data.list[27].main.temp + ' \u00B0 C';
                  dayFourHumidEl.innerHTML = "Humidity: " + data.list[27].main.humidity + "%";

                  //Day Five
                  var dayFiveCode = data.list[35].dt
                  dayFiveDate = new Date(dayFiveCode * 1000).toLocaleDateString("en-UK")
                  dayFiveDateEl.innerHTML = dayFiveDate
                  var dayFiveIconCode = data.list[35].weather[0].icon
                  var dayFiveIconUrl = `http://openweathermap.org/img/w/${dayFiveIconCode}.png`
                  dayFiveIcon.src = dayFiveIconUrl
                  dayFiveTempEl.innerHTML = "Temp: " + data.list[35].main.temp + ' \u00B0 C';
                  dayFiveHumidEl.innerHTML = "Humidity: " + data.list[35].main.temp + "%";
                  })
              }
          })


        })}


//Event listener for submit button
submitBtn.addEventListener("click", currentWeather)
submitBtn.addEventListener("click", pushCity)


