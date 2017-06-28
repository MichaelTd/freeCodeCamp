$(document).ready(function(){
  
   fetchAll("all");
  
  $("#btn-all-channels").on("click", function () {
    fetchAll("all");
  });
  
  $("#btn-online-channels").on("click", function () {
    fetchAll("online");
  });
  
   $("#btn-offline-channels").on("click", function () {
    fetchAll("offline");
  });

});


function fetchAll (status) {
    $("#twitch-list").empty();
  
    var fccURI = "https://api.twitch.tv/kraken/channels/freecodecamp/?client_id=qzsmdq24e2j4upt48jj6jm68u00n2r4";
  fetch(fccURI, true, status);
  
  var featuredURI ="https://api.twitch.tv/kraken/streams/featured?client_id=qzsmdq24e2j4upt48jj6jm68u00n2r4";
   fetch(featuredURI, false, status );
}

function fetch (apiURI, includeFCC, status) {
    $.ajax({
    type: 'GET',
    url: apiURI,
    success: function(data) {
      var json = "";
      var twitchItem = "";
      var twitchURI = "";
      var twitchTitle = "";
      var twitchText = "";
      var twitchLogo = "";
      var twitchStreaming = "offline";
      
      if (includeFCC == false) {
        json = data.featured;

        json.forEach(function(val){
       

          
        twitchTitle= val.title;
        twitchText = val.text;
       var fixedText = twitchText.substring(0, twitchText.indexOf("<a"));
        if (fixedText.length < 100) {
          return;
        }
        twitchURI = val.stream.channel.url;
        twitchLogo =val.stream.channel.logo;
        
        if (val.stream != '') {
          twitchStreaming= "Online";
        } else {
          twitchStreaming = "Offline";
        }
          
        
        twitchItem = "<a href=\"" + twitchURI + "\" class=\"list-group-item\" > <span class=\"badge badger\">" + twitchStreaming + "</span><img class=\"img-logo img-circle\" src=\"" + twitchLogo + "\"></img><h3 class=\"list-group-item-heading\">" + twitchTitle + "</h3>" + "<p class=\"list-group-item-text\">" + fixedText +  "</p></a>";
            
          if (status === "all") {
              $("#twitch-list").append(twitchItem);
          } else if (status === "online" && twitchStreaming =="Online") {
              $("#twitch-list").append(twitchItem);
          } else if (status === "offline" &&  twitchStreaming == "Offline") {
              $("#twitch-list").append(twitchItem);
          }
      });
        
      } else {

          twitchTitle = data.name;
          twitchText = data.status + "<br/><br/><br/><br/><br/>";
          twitchURI = data.url;
          twitchLogo = data.logo;
          twitchStreaming = "Offline";
        
                twitchItem = "<a href=\"" + twitchURI + "\" class=\"list-group-item\" > <span class=\"badge badger\">" + twitchStreaming + "</span><img class=\"img-logo img-circle\" src=\"" + twitchLogo + "\"></img><h3 class=\"list-group-item-heading\">" + twitchTitle + "</h3>" + "<p class=\"list-group-item-text\">" + twitchText +  "</p></a>";
        
           if (status === "all") {
              $("#twitch-list").append(twitchItem);
          } else if (status === "online" && twitchStreaming =="Online") {
              $("#twitch-list").append(twitchItem);
          } else if (status === "offline" &&  twitchStreaming == "Offline") {
              $("#twitch-list").append(twitchItem);
          }
      }
      
      

    }
  })

}