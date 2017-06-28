$(document).ready(function(){

  var api = "https://api.apixu.com/v1/current.json?key=3eae0a0263dc442abbd113435171201&q=auto:ip";
  
  $.getJSON(api, function(data){

      var celcius = data.current.temp_c;
      var fahrenheit = data.current.temp_f;
      
      $("#one").html(data.location.name + "<br />" + data.location.region + ", " + data.location.country);
      $("#two").html(data.current.condition.text);
      $("#deg").html(celcius + " &deg;" + "C");
      $("#hum").html("Humidity" + "<br />" + data.current.humidity + " %");
      $("#speed").html("Wind Speed" + "<br />" + data.current.wind_mph + " mph");
            
      $("#cbtn").on("click", function(){
        $("#deg").html(celcius +  " &deg;" + "C");
        $(this).removeClass("btn-default");
        $(this).addClass("btn-primary");
        $("#fbtn").removeClass("btn-primary");
        $("#fbtn").addClass("btn-default");
      });
      
      $("#fbtn").on("click", function(){
        $("#deg").html(fahrenheit + " &deg;" + "F");
        $(this).removeClass("btn-default");
        $(this).addClass("btn-primary");
        $("#cbtn").removeClass("btn-primary");
        $("#cbtn").addClass("btn-default");
      }); 
      
    var code = data.current.condition.code;
    var weather = data.current.condition.text;
    var isDay = data.current.is_day;
    
      if (weather == "Sunny") {
       $("#bravo").addClass("clear");
      }
    else if (weather =="Clear") {
      $("#bravo").addClass("clear-night");
    }
     else if (weather.includes("rain")) {
       $("#bravo").addClass("rain");
     }
    else if (weather.includes("cloudy") || weather == "Overcast") {
      $("#bravo").addClass("clouds");
    }
    else if (weather.includes("snow") || weather.includes("sleet")) {
      $("#bravo").addClass("snow");
    }
    else if (weather == "mist" || weather == "Mist" || weather.includes("fog")) {
      $("#bravo").addClass("mist");
    }
    else if (weather.includes("drizzle")) {
      $("#bravo").addClass("drizzle");
    }
    
  });
});