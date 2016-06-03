var main = function () {
  var foundWithO = $('#found_o');
  var lostWithO = $('#lost_o');
  $('#foundButton').hover(
    function() {
      foundWithO.stop();
      foundWithO.fadeIn();
    },function () {
      foundWithO.stop();
      foundWithO.fadeOut();
  });

  $('#lostButton').hover(
    function() {
      lostWithO.stop();
      lostWithO.fadeOut();
    },function() {
      lostWithO.stop();
      lostWithO.fadeIn();
  });
}

$(document).ready(main);
