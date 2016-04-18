$(document).ready(
  function(){
    $("#sideBar").css(
      {
        height: $(window).height() - 85,
        width: $(window).width() * 0.8,
        top: 85,
        left: $(window).width()
      }
    );
    $('#menuIcon').click(
      function(){
        var bar = $("#sideBar");
        bar.stop();
        if(bar.is(':hidden')){
          bar.show();
          bar.animate(
            {
              left: $(window).width() * 0.2
            },300
          );
        }
        else {
          bar.animate(
            {
              left: $(window).width()
            },300,function(){bar.hide();}
          );
        }
      }
    );
  }
);
