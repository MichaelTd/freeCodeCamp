var far;
var cel;

function loadWeather(location, woeid){
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'C',
    success: function(weather){
      cel = weather.temp + '&deg; C';
      far = weather.alt.temp + '&deg; F';
      $(".image").attr("src", weather.image);
      $(".location").html(weather.city);
      $(".temperature").html(cel);
      $(".windspeed").html(weather.wind.speed + '&nbsp;' + weather.units.speed);
      $(".humidity").html(weather.humidity+' %');
    },
    error: function(error){
      $(".error-title").html('<p>Weather API Error:</p>');
      $(".error").html('<p>' + error + '</p>');
      //console.log("LoadWeatherError", error)
    }
  });
}

function togglestyle(el){
  if ($(el).hasClass("C")) {
    $(".temperature").html(far);
    $(el).toggleClass("F C").attr("value", "Celsius");
  } else {
    $(".temperature").html(cel);
    $(el).toggleClass("F C").attr("value", "Fahrenheit");
  }
}

// The ip-api is dead Long live the ipinfo.io
//$.getJSON("http://ip-api.com/json",function(){})
//.done(function(data) {
//  loadWeather(data.lat + ',' + data.lon);
//})
//.fail(function(error){
//  $(".error-title").html('<p>jQuery Error:</p>');
//  $(".error").html('<p>' + error + '</p>');
//  //console.log("ip-api error", error)
//})

$.getJSON("https://ipinfo.io/json",function(){})
	.done(function(data) {
		var lat;
		var lon;
		sLoc = data.loc.split(',');
		lat = sLoc[0];
		lon = sLoc[1];
		loadWeather(lat + ',' + lon);
  })
  .fail(function(error){
    $(".error-title").html('<p>jQuery Error:</p>');
    $(".error").html('<p>' + error + '</p>');
    console.log("ipinfo.io error", error)
  })
