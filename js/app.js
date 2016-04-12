var imageToUpload;
var uploadedImageURL;
var deleteHash;
var myFirebaseRef;
var main = function() {
  myFirebaseRef = new Firebase("https://s60912frank.firebaseio.com/");
  $('#openFile').on("change", openFile);

  $('#submit').click(
    function(){
      var dataToSend = [$('#title').val(),$('#location').val(),$('#describe').val()];//因為上傳圖片需要時間，所以把要傳的東西在清空之前存起來
      beginLoading();
      uploadImage(imageToUpload, function(){sendData(dataToSend);}); //圖片上傳完成後才會呼叫sendData
      //結束在sendData內
      $('#title').val("");
      $('#location').val("");
      $('#describe').val("");
      $('#submit').attr("disabled", true);
  });

  //三個欄位都不能為空
  $('#inputfield').keyup(
    function(){
      var titleLength = $('#title').val().length;
      var locationlength = $('#location').val().length;
      var describelength = $('#describe').val().length;
      if(titleLength > 0 && locationlength > 0 && describelength > 0){
        $('#submit').attr("disabled", false);
      }
      else{
        $('#submit').attr("disabled", true);
      }
    }
  );

  //這個會把firebase中的資料顯示在網頁上
  /*myFirebaseRef.child("lostFound").once("value",
    function(snapshot){
      snapshot.forEach(
        function(entry){
          addDataToTable(entry);
        }
      );
  });*/

    //這個在每次有資料增加時會執行
    myFirebaseRef.child("lostFound").on("child_added",
    function(snapshot){
        addDataToTable(snapshot);
        //console.log(snapshot.val().title);
    });
};

$(document).ready(main);

//開啟檔案並且在canvas縮圖並且畫在div上
var openFile = function(event) {
  var input = event.target;
  var reader = new FileReader();
  reader.onload = function(e){ //讀取完檔案時
    var canvas = document.createElement('canvas');
    var context = canvas.getContext("2d");
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = reader.result;
    img.onload = function(){
      var ratio = img.height / img.width;
      //縮圖
      if(img.width > 800 || img.height > 600){
        canvas.width = 800;
        canvas.height = canvas.width * ratio;
      }
      else{
        canvas.width = img.width;
        canvas.height = img.height;
      }
      //畫在canvas上
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
      //canvas轉成字串的圖片存起來
      var dataURL = canvas.toDataURL('image/png');
      imageToUpload = dataURL.replace("data:image/png;base64,","");

      //放在div上!
      var imgcontainer = $('#imageContainer');
      imgcontainer.children('img').attr("src", dataURL);
      imgcontainer.css("height", 300 * ratio);

    }
  }
  reader.readAsDataURL(input.files[0]);
};

//上傳圖片到imgur
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
          //alert(uploadedImageURL);
          console.log("Upload Successful!");
          callback(); //結束時呼叫某function
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

//傳送資料到firebase
var sendData = function(dataToSend){
  try{
    var now = getTimeData();
    myFirebaseRef.child('lostFound').push().set(
      {
        title: dataToSend[0],
        location: dataToSend[1],
        describe: dataToSend[2],
        time: now[0],
        timestamp: now[1],
        imageURL: getuploadedImageURL(),
        deleteHash: getDeleteHash()
      }
    );
    //alert("資料傳輸成功!");
    finishLoading(); //傳輸完成
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

//創造一個img元素放縮圖並且連結到原圖
var getImageThumbnailLink = function(data, option){
  var imageURL = data.val().imageURL;
  if(imageURL != null){
    var getFileType = imageURL.split("/")[3].split(".")[1];
    if(option == "m"){
      return imageURL.replace("." + getFileType, "m." + getFileType);
    }
    else if(option == "s"){
      return imageURL.replace("." + getFileType, "s." + getFileType);
    }
    return "";
  }
  else{
    return "";
  }
}

var getItemInfoURL = function(data){
  var link = "./item.html?id=" + data.key();
  return link //取得該物品詳細資料連結元素
}

var addDataToTable = function(data){ //把資料加到table中顯示
  var newItem = $('#itemTemplate').clone().prependTo('#mainContainer2');
  newItem.removeAttr("id");
  //newItem.hover(function(e) { itemHoverIn(getImageThumbnailLink(data), e); },itemHoverOut);
  newItem.show();
  /*newItem.children("a").attr("href", getItemInfoURL(data));
  var mainDiv = newItem.children('a').children('div');
  var imgLink = getImageThumbnailLink(data);
  if(imgLink != ""){
    mainDiv.children("div").children("img").attr("src", "./image/hasimage.png");
    mainDiv.children("div").children("img").hover(function(e) { itemHoverIn(imgLink, e); },itemHoverOut);
  }
  else{
    mainDiv.children("div").children("img").attr("src", "./image/nopic.png");
  }
  mainDiv.children("div").children("h1").text(data.val().title);
  mainDiv.children("div").children("h4").text(data.val().location);
  mainDiv.children("div").children("p").text(data.val().time);*/



  var imgThumbnail = newItem.find("img").first();
  imgThumbnail.attr("src", getImageThumbnailLink(data, "s"));
  imgThumbnail.hover(function(e) { itemHoverIn(getImageThumbnailLink(data, "m"), e); },itemHoverOut);
  newItem.find("h1").text(data.val().title);
  var conter = 0;
  var dataP = [data.val().location,
               data.val().time,
               "Gmin",
               data.val().describe];
  newItem.find("p").each(
    function(){
      $(this).text(dataP[conter]);
      conter++;
  });
  /*newItem.find("p").first().text("拾獲地點:" + data.val().location);
  newItem.find("p").first().next().text("拾獲時間:" + data.val().time);
  newItem.find("p").first().next().next().text("拾獲人:" + "Gmin");
  newItem.find("p").first().next().next().next().text("拾獲人:" + data.val().message);*/
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

//開始傳輸時叫出讀取畫面並把輸入區隱藏
var beginLoading = function(){
  var submitArea = $('#submit_area');
  var loadindDiv = $('#loading');
  loadindDiv.css("width", submitArea.css("height"));
  loadindDiv.css("height", submitArea.css("height"));
  submitArea.hide();
  loadindDiv.show();
}

//結束傳輸時隱藏讀取畫面並還原輸入區
var finishLoading = function(){
  $('#loading').hide();
  $('#submit_area').show();
}
