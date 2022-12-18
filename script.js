// root url and API key
// var weatherApiRootUrl = 'https://api.openweathermap.org';
// var APIKey = "11966b9c99b9aac332f04418ebd9ef84";
// var searchHistory = [];

var city="";
var citySearch = $("#city-search");
var searchBtn = $("#search-btn");
var clearHistoryBtn = $("#clear-history-btn");
var currentCity = $("#current-city");
var currentTemp = $("#temp");
var currentHumidty= $("#humidity");
var currentWind=$("#wind-speed");
var sCity=[];
// search city
function find(c){
    for (var i=0; i<sCity.length; i++){
        if(c.toUpperCase()===sCity[i]){
            return -1;
        }
    }
    return 1;
}

var APIKey="11966b9c99b9aac332f04418ebd9ef84";
// Curent and forecasted weather 
function displayWeather(event){
    event.preventDefault();
    if(citySearch.val().trim()!==""){
        city=citySearch.val().trim();
        currentWeather(city);
    }
}
// pull current city data
function currentWeather(city){
    const queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;
    $.ajax({
        url:queryURL,
        method:"GET",
    }).then(function(response){
        const weathericon= response.weather[0].icon;
        const iconurl="https://openweathermap.org/img/wn/"+weathericon +"@2x.png";
        const date=new Date(response.dt*1000).toLocaleDateString();
        $(currentCity).html(response.name +"("+date+")" + "<img src="+iconurl+">");
        const tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $(currentTemp).html((tempF).toFixed(2)+"&#8457");
        $(currentHumidty).html(response.main.humidity+"%");
        const ws=response.wind.speed;
        const windsmph=(ws*2.237).toFixed(1);
        $(currentWind).html(windsmph+"MPH");
        forecast(response.id);
        if(response.cod==200){
            sCity=JSON.parse(localStorage.getItem("cityname"));
            console.log(sCity);
            if (sCity==null){
                sCity=[];
                sCity.push(city.toUpperCase()
                );
                localStorage.setItem("cityname",JSON.stringify(sCity));
                addToList(city);
            }
            else {
                if(find(city)>0){
                    sCity.push(city.toUpperCase());
                    localStorage.setItem("cityname",JSON.stringify(sCity));
                    addToList(city);
                }
            }
        }

    });
}

function forecast(cityid){
    const dayover= false;
    const queryforcastURL="https://api.openweathermap.org/data/2.5/forecast?id="+cityid+"&appid="+APIKey;
    $.ajax({
        url:queryforcastURL,
        method:"GET"
    }).then(function(response){
        
        for (i=0;i<5;i++){
            const date= new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
            const iconcode= response.list[((i+1)*8)-1].weather[0].icon;
            const iconurl="https://openweathermap.org/img/wn/"+iconcode+".png";
            const tempK= response.list[((i+1)*8)-1].main.temp;
            const tempF=(((tempK-273.5)*1.80)+32).toFixed(2);
            const humidity= response.list[((i+1)*8)-1].main.humidity;
            const ws= response.list[((i+1)*8)-1].wind.speed;
            const windsmph=(ws*2.237).toFixed(1);
        
            $("#forecastDate"+i).html(date);
            $("#forecastImg"+i).html("<img src="+iconurl+">");
            $("#forecastTemp"+i).html(tempF+"&#8457");
            $("#forecastHumidity"+i).html(humidity+"%");
            $("#forecastWindsmph"+i).html(windsmph+"MPH");          
        }
        
    });
}

//add city on the search history
function addToList(c){
    const listEl= $("<li>"+c.toUpperCase()+"</li>");
    $(listEl).attr("class","list-group-item");
    $(listEl).attr("data-value",c.toUpperCase());
    $(".list-group").append(listEl);
}
// display past search 
function invokePastSearch(event){
    const liEl=event.target;
    if (event.target.matches("li")){
        city=liEl.textContent.trim();
        currentWeather(city);
    }

}

// render function
function loadlastCity(){
    $("ul").empty();
    const sCity = JSON.parse(localStorage.getItem("cityname"));
    if(sCity!==null){
        sCity=JSON.parse(localStorage.getItem("cityname"));
        for(i=0; i<sCity.length;i++){
            addToList(sCity[i]);
        }
        city=sCity[i-1];
        currentWeather(city);
    }

}
//Clear search history 
function clearHistory(event){
    event.preventDefault();
    sCity=[];
    localStorage.removeItem("cityname");
    document.location.reload();

}
//Click Handlers
$("#search-btn").on("click",displayWeather);
$(document).on("click",invokePastSearch);
$(window).on("load",loadlastCity);
$("#clear-history-btn").on("click",clearHistory);




