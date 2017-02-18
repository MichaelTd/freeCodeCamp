$(document).ready(function(){
  getChannels("all");
  $("#btn-all-channels").on("click", function () {getChannels("all");});
  $("#btn-online-channels").on("click", function () {getChannels("online");});
  $("#btn-offline-channels").on("click", function () {getChannels("offline");});
});


function getChannels (status) {
  $("#twitch-list").empty();
  var fccURI = "https://api.twitch.tv/kraken/channels/freecodecamp/?client_id=yseyvfho795s23ubjenbwh07wraxra";
  fetch(fccURI, true, status);
  var featuredURI ="https://api.twitch.tv/kraken/streams/featured?client_id=yseyvfho795s23ubjenbwh07wraxra";
  fetch(featuredURI, false, status );
}

function fetch (apiURI, includeFCC, status) {
  $.ajax({type: 'GET',url: apiURI,
  success: function(data) {
    var json = "", twItem = "", twURI = "", twTitle = "", twText = "", twLogo = "", twStream = "";

    if (includeFCC == false) {
      json = data.featured;
      json.forEach(function(val){
        twTitle= val.title;
        twText = val.text;
        var fixedText = twText.substring(0, twText.indexOf("<a"));
        if (fixedText.length < 100) {return;}
        twURI = val.stream.channel.url;
        twLogo = val.stream.channel.logo;
        if (val.stream != "") {twStream = "ONLINE";} else {twStream = "OFFLINE";}
        twItem = "<a target='_blank' href='" + 
          twURI + "' class='list-group-item'> <span class='badge badger'>" + 
          twStream + "</span><img class='img-logo' src='" + 
          twLogo + "'></img><h3 class='list-group-item-heading'>" +
          twTitle + "</h3>" + "<p class='list-group-item-text'>" +
          fixedText +  "</p></a>";
        if (status === "all") {
          $("#twitch-list").append(twItem);
        } else if (status === "online" && twStream == "ONLINE") {
          $("#twitch-list").append(twItem);
        } else if (status === "offline" &&  twStream == "OFFLINE") {
          $("#twitch-list").append(twItem);
        }
      });
    } else {
      twTitle = data.name;
      twText = data.status + "<br/><br/><br/>";
      twURI = data.url;
      twLogo = data.logo;
      twStream = "OFFLINE";
      twItem = "<a target='_blank' href='" +
        twURI + "' class='list-group-item' > <span class='badge badger'>" +
        twStream + "</span><img class='img-logo img-circle' src='" +
        twLogo + "'></img><h3 class='list-group-item-heading'>" +
        twTitle + "</h3><p class='list-group-item-text'>" +
        twText +  "</p></a>";
      if (status === "all") {
        $("#twitch-list").append(twItem);
      } else if (status === "online" && twStream == "ONLINE") {
        $("#twitch-list").append(twItem);
      } else if (status === "offline" &&  twStream == "OFFLINE") {
        $("#twitch-list").append(twItem);
      }
    }
  }})
}
