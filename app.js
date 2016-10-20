function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
//        var s = today.getSeconds();
    m = checkTime(m);
//        s = checkTime(s);
    var pmam = h < 12 ? 'AM' : 'PM';
    document.getElementById('clock').innerHTML =
        h%12 + ":" + m + ' <span id="pmam">' + pmam + '</span>'; // + ":" + s
    var greeting = '';
    if(h < 12){
        greeting = 'Good Morning';
    }
    else if(h < 18){
        greeting = 'Good Afternoon';
    }
    else{
        greeting = 'Good Evening';
    }
    document.getElementById('greeting').innerHTML = greeting;
    var t = setTimeout(startTime, 1000);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i}  // add zero in front of numbers < 10
    return i;
}
startTime();
function getBackground(){
    document.getElementById('background').innerHTML = "<img src=\"img/"+Math.floor(Math.random()*11+1)+".jpg\">";
}
getBackground();

var weather = document.getElementById("weather");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    weather.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
}
getLocation();
function getWeather(position)
{
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var oReq = new XMLHttpRequest();
    oReq.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            showWeather(JSON.parse(this.response));
        }
    };
    var url = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&APPID=70e28cbfd09c43fb50059e727b9e0fa2";
    oReq.open("GET", url, true);
    oReq.send();
}
function showWeather(response){
    var tempFar = response.main.temp * 9/5 - 459.67;
    document.getElementById("weather").innerHTML = Math.round( tempFar * 10) / 10 + '&deg <span>' + response.weather[0].description + '</span>'; //[°F] = [K] × 9/5 − 459.67
}