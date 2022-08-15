function GetInfo(){
    var newName=document.getElementById('cityInput');
    var cityName=document.getElementById('cityname');
    cityName.innerHTML = '--' + newName.value + "--"
}

fetch