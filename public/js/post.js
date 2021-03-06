var whichPageIn = "";
var uploadedImageURL;
var deleteHash;
var dataToSend;
var main = function () {
  $('#openFile').on("change",
    function(e){
      var input = e.target;
      var reader = new FileReader();
      reader.onload = function(){
        $('.imgContainer').children('img').attr("src", reader.result);
        $('.imgContainer').children('img').css("margin-top", "0px");
        $('.imgContainer').children('p').hide();
      }
      reader.readAsDataURL(input.files[0]);
    }
  );

  $('#lostButton').click(function() {
    whichPageIn = "left_page";
    $('#left_page').show();
    $('#left_page').animate(
      {
        left: "0px"
      }, 200, function(){$("#button_container").hide();})
  });

  $('#exit_left').click(function () {
    $('#left_page').animate(
      {
        left: "-100%"
      }, 200,  function(){ $(this).hide(); });
    $("#button_container").show();
  });

  $('#foundButton').click(function () {
    whichPageIn = "right_page";
    $('#right_page').show();
      $('#right_page').animate({
          left: "0px"
      }, 200, function(){$("#button_container").hide();});
  });

  $('#exit_right').click(function () {
      $('#right_page').animate({
          left: "100%"
      }, 200, function(){ $(this).hide(); });
      $("#button_container").show();
  });

  $('.imgContainer').click(
    function(e){
      e.stopPropagation();
      $("#openFile").trigger('click');
  });

  $("#submitContainer div").click(
    function(){
      var inputArea = $("#" + whichPageIn).find(".inputArea");
      var titleLength = inputArea.find('#title').val().length;
      var locLength = inputArea.find('#location').val().length;
      var whoLength = inputArea.find('#who').val().length;
      if(titleLength == 0 || locLength == 0 || whoLength == 0){
        alert("請填入完整資料!");
      }
      else{
        beginLoading();
        dataToSend = [inputArea.find('#title').val(), inputArea.find('#location').val(), inputArea.find('#who').val(), $("#" + whichPageIn).find("#describe").val()];
        var type;
        if(whichPageIn == "left_page"){
          type = "lost";
        }
        else if(whichPageIn == "right_page"){
          type = "found";
        }
        var dataURL = $('.imgContainer').children('img').attr("src");
        uploadImage(dataURL.substring(dataURL.indexOf(',')+1), function(){ sendData(type); });
      }
    }
  );

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

$(document).ready(main);

var uploadImage = function(imageData, callback){
  if(imageData.length > 1){
    $.ajax({
      url: 'https://api.imgur.com/3/image',
      type: 'POST',
      headers: {
        Authorization: 'Client-ID 67c240c58b566fe'
        },
      data: {
        image: imageData
        },
      dataType: 'json',
      success: function(response) {
        if(response.success) {
          uploadedImageURL = response.data.link;
          deleteHash = response.data.deletehash;
          console.log("Upload Successful!");
          callback();
        }
        else{
          alert("上傳失敗!");
        }
      }
    });
  }
  else{
    callback();
  }
}

var sendData = function(type){
  $.ajax({
    url: "db/insertdata",
    type: "POST",
    dataType: 'json',
    data: {
      "type": type,
      "title": dataToSend[0],
      "location": dataToSend[1],
      "who": dataToSend[2],
      "describe": dataToSend[3],
      "time": getTimeData(),
      "imageURL": getuploadedImageURL(),
      "deleteHash": getDeleteHash()
    },
    success: function(resp) {
      if(resp.err == null){
        alert("上傳成功!");
      }
      else{
        alert("上傳失敗!");
      }
      endLoading();
      window.location.replace("./" + type + "list.html");
    }
  });
}

//檢查是否有上傳圖片
var getuploadedImageURL = function(){
  if(uploadedImageURL != null){
    return uploadedImageURL;
  }
  else{
    return null;
  }
}

//檢查是否有deletehash
var getDeleteHash = function(){
  if(deleteHash != null){
    return deleteHash;
  }
  else{
    return null;
  }
}

var beginLoading = function(){
  $(".loading").fadeIn(300);
}

var endLoading = function(){
  $(".loading").fadeOut(300);
}

var getTimeData = function(){
  var current = new Date();
  //將時間格式化成好看的
  var timeString = current.getFullYear() + "/" +
                   formatZero((current.getMonth()+1)) + "/" +
                   formatZero(current.getDate()) + " " +
                   formatZero(current.getHours()) + ":" +
                   formatZero(current.getMinutes());
  return timeString;
}

//<10的數字前面補0
var formatZero = function(num){
  if(num < 10){
    return "0" + num;
  }
  else{
    return num;
  }
}
