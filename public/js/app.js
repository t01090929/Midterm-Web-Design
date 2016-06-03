var main = function() {
  var loc =  window.location.href.split("/");
  var option = loc[loc.length - 1].split(".")[0];
  var whee = option.slice(0,option.length - 4);
    $.ajax({
      url: "http://lostfound-gmin.rhcloud.com/db/qureydata",
      type: "POST",
      data: {
        "type": whee
      },
      dataType: 'json',
      success: function(resp) {
        for (var i = 0; i < resp.data.length; i++) {
          addDataToTable(resp.data[i]);
        }
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
};

$(document).ready(main);

//創造一個img元素放縮圖並且連結到原圖
var getImageThumbnailLink = function(data, option){
  var imageURL = data.imageURL;
  if(imageURL != ""){
    var getFileType = imageURL.split("/")[3].split(".")[1];
    return imageURL.replace("." + getFileType, option + "." + getFileType);
  }
  else{
    return "";
  }
}

var getItemInfoURL = function(data){
  var link = "./item.html?id=" + data._id + "&type=" + data.type;
  return link //取得該物品詳細資料連結元素
}

var addDataToTable = function(data){ //把資料加到table中顯示
  var newItem = $('#itemTemplate').clone().prependTo('#mainContainer');
  newItem.removeAttr("id");
  var imgThumbnail = newItem.find("img").first();
  imgThumbnail.attr("src", getImageThumbnailLink(data, "s"));
  imgThumbnail.hover(function(e) { itemHoverIn(getImageThumbnailLink(data, "m"), e); },itemHoverOut);
  newItem.find("a").attr("href", getItemInfoURL(data));
  newItem.find("h1").text(data.title);
  var conter = 0;
  var dataP = [data.location,
               data.time,
               data.who,
               data.describe];
  newItem.find("p").each(
    function(){
      $(this).text(dataP[conter]);
      conter++;
  });
  newItem.slideDown(1000);
}

var itemHoverIn = function(url, e){
  var div = $('#floatImageContainer');
  var img = div.children("img");
  img.attr("src", url);
  img.on("load", function(){
    div.css("left", e.clientX);
    if(e.clientY + div.height() + 100 > $(window).height()){
      div.css("top", e.clientY - div.height() - 50);
    }
    else{
      div.css("top", e.clientY + 100);
    }
    div.stop();
    div.fadeIn(100);
  });
}

var itemHoverOut = function(){
  $('#floatImageContainer').stop();
  $('#floatImageContainer').fadeOut(100);
}
