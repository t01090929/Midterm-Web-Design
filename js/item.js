var myFirebaseRef = new Firebase("https://s60912frank.firebaseio.com/");
$(document).ready(
  function(){
    var vars = getUrlVars();

    myFirebaseRef.child("lostFound/" + vars["type"] + "/" + vars["id"]).on("value",
      function(snapshot){
        try{
          $('.imgContainer a').attr("href",snapshot.val().imageURL);
          $('.imgContainer img').attr("src",snapshot.val().imageURL);
          $('#title').text(snapshot.val().title);
          $('#location').text(snapshot.val().location);
          $('#time').text(snapshot.val().time);
          $('#who').text(snapshot.val().who);
          $('#describe').text(snapshot.val().describe);
          loadingComplete(vars["type"]);
        }
        catch(e) {
          loadingComplete(vars["type"]);
          alert("查無資料!");
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
