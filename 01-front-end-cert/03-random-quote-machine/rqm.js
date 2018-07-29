$(document).ready(function() {
  var getQuote = function() {return $.getJSON('https://helloacm.com/api/fortune/' ,"","jsonp")};
  var setQuote = function(data) {
    var encodedQuote = encodeURIComponent(data);
    var tweetUrl = "https://twitter.com/intent/tweet?text=" + encodedQuote;
    $('.quote').text(data);
    $('.btn-tweet').attr('href', tweetUrl);
  };

  $('.btn-new').on('click', function() {
    var reloadBtn = $(this);
    reloadBtn.prop('disabled', true).children('i').addClass('fa-spin');
    getQuote().done(function(data) {
      setQuote(data);
      reloadBtn.prop('disabled', false).children('i').removeClass('fa-spin');
    });
  });
});
