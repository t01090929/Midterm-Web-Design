var whichPageIn = "";
var uploadedImageURL;
var deleteHash;
var dataToSend;
var myFirebaseRef;
var main = function () {
  myFirebaseRef = new Firebase("https://s60912frank.firebaseio.com/");
  $('#openFile').on("change",
    function(e){
      var input = e.target;
      var reader = new FileReader();
      reader.onload = function(){
        $('.imgContainer').children('img').attr("src", reader.result);
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
      console.log("99999");
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
        dataToSend = [inputArea.find('#title').val(), inputArea.find('#location').val(), inputArea.find('#who').val(), $("#" + whichPageIn).find("#describe").val()];
        var dbloc;
        if(whichPageIn == "left_page"){
          dbloc = "lostFound/lost";
        }
        else if(whichPageIn == "right_page"){
          dbloc = "lostFound/found";
        }
        uploadImage($('.imgContainer').children('img').attr("src").replace("data:image/png;base64,",""), function(){ sendData(dbloc); });
      }
    }
  );
}

$(document).ready(main);

var uploadImage = function(imageData, callback){
  if(imageData != null){
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

var sendData = function(loc){
  try{
    var now = getTimeData();
    myFirebaseRef.child(loc).push().set(
      {
        title: dataToSend[0],
        location: dataToSend[1],
        who: dataToSend[2],
        describe: dataToSend[3],
        time: now[0],
        timestamp: now[1],
        imageURL: getuploadedImageURL(),
        deleteHash: getDeleteHash()
      }
    );
    //alert("資料傳輸成功!");
    //finishLoading(); //傳輸完成
  }
  catch(e){
    alert(e.message);
  }
}

//取得現在的時間資料
var getTimeData = function(){
  var current = new Date();
  //將時間格式化成好看的
  var timeString = current.getFullYear() + "/" +
                   formatZero((current.getMonth()+1)) + "/" +
                   formatZero(current.getDate()) + " " +
                   formatZero(current.getHours()) + ":" +
                   formatZero(current.getMinutes());
  //取得時間戳記，排序用
  var timestamp = current.getTime();
  return [timeString, timestamp];
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
