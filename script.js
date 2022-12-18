// root url and API key
var weatherApiRootUrl = 'https://api.openweathermap.org';
var APIKey = "11966b9c99b9aac332f04418ebd9ef84";

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

function GetInfo(){
    var newName=document.getElementById('cityInput');
    var cityName=document.getElementById('cityname');
    cityName.innerHTML = "--"+newName.value+"--"

fetch ("https://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&appid=11966b9c99b9aac332f04418ebd9ef84")
.then(response => response,json())
.then(data => {
    
    // min/max values for 5 days
    for (i=0;i<5;i++){
        document.getElementById("day" +(i+1)+"Min").innerHTML ="Min:" +Number(data.list[i].main.temp_min - 273.15).toFixed(1)+ "°";
    }
    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°";
    }

    //Getting Weather Icons
     for(i = 0; i<5; i++){
        document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
        data.list[i].weather[0].icon+".png";
    }
  })

.catch(err => alert("You did something wrong"))
}

//Days of the Week
const d = new Date();
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

//days array
function CheckDay(day){
    if(day + d.getDay() > 6){
        return day + d.getDay() - 7;
    }
    else{
        return day + d.getDay();
    }
}

    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
    }