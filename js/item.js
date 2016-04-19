$(document).ready(
  function(){
    var vars = getUrlVars();
    $.ajax({
      url: "http://lostfound-gmin.rhcloud.com/db/qureydataid",
      type: "POST",
      data: {
        "id": vars["id"]
      },
      dataType: 'json',
      success: function(resp) {
        var data = resp.data;
        var list = $("<ul>").prependTo($("#lostArea"));
        $('.imgContainer a').attr("href",data.imageURL);
        $('.imgContainer img').attr("src",data.imageURL);
        $('#title').text(data.title);
        $('#location').text(data.location);
        $('#time').text(data.time);
        $('#who').text(data.who);
        $('#describe').text(data.describe);
        loadingComplete(vars["type"]);
      }
    });

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

function getUrlVars()
{
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for(var i = 0; i < hashes.length; i++)
  {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
  }
  return vars;
}

var loadingComplete = function(type){
  if(type == "lost"){
    $("#who_f_or_l").text("遺失人");
  }
  else if(type == "found"){
    $("#who_f_or_l").text("拾獲人");
  }
  else {
    $("#who_f_or_l").text("錯誤!!!!!");
  }
  $(".loading").fadeOut(300);
}
