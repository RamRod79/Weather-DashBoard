var weatherApiRootUrl = 'https://api.openweathermap.org';
var APIKey = "11966b9c99b9aac332f04418ebd9ef84";

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

function GetInfo(){
    var newName=document.getElementById('cityInput');
    var cityName=document.getElementById('cityname');
    cityName.innerHTML = '--' + newName.value + "--"
}

fetch