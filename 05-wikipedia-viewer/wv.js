$(document).ready(function(){
  $('#clear').click(function(){
    $("#contents").html(" ");
  });
  $('#random').click(function(){
    window.open('https://en.wikipedia.org/wiki/Special:Random','_blank');
  });
  $('#search').click(function(){
      if($('#input').val()==''){alert("Input a search term.");}
      else{$.ajax({ url:"https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search="+$('#input').val(),async:false,dataType:"jsonp",
        success:
          function(data){
            $("#contents").html(" ");
            for(var i=0;i<data[1].length;i++){
              $("#contents").append("<li class='list-group-item'><a target='_blank' href="+data[3][i]+"><h3 align='left'>"+data[1][i]+"</h3></a><p align='left'>"+data[2][i]+"</p></li>");
            }
          },
        error:
          function(errorMessage) {
            alert("Error");
          }});
      }});
  $("#input").keypress(function(keyPressed){
    if(keyPressed.which==13){
      $("#search").click();
  }});
});
