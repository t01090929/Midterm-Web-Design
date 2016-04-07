var imageToUpload;
var uploadedImageURL;
var deleteHash;
var myFirebaseRef = new Firebase("https://s60912frank.firebaseio.com/");
var main = function() {
  $('#submit').click(
    function(){
      var dataToSend = [$('#title').val(),$('#location').val(),$('#describe').val()];//因為上傳圖片需要時間，所以把要傳的東西在清空之前存起來
      uploadImage(imageToUpload, function(){sendData(dataToSend);}); //圖片上傳完成後才會呼叫sendData
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
  myFirebaseRef.child("lostFound").once("value",
    function(snapshot){
      $("#entries").find('tr').remove();
      snapshot.forEach(
        function(entry){
          addDataToTable(entry);
        }
      );
    });

    //這個在每次有資料增加時會執行
    myFirebaseRef.child("lostFound").on("child_added",
    function(snapshot){
        addDataToTable(snapshot);
    });
};

$(document).ready(main);

//開啟檔案並且在canvas縮圖並且畫在div上
var openFile = function(event) {
  var input = event.target;
  var reader = new FileReader();
  reader.onload = function(e){ //讀取完檔案時
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height); //清掉canvas
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = reader.result;
    img.onload = function(){
      var ratio = img.height / img.width;
      //縮圖
      if(img.width > 800 || img.width > 600){
        img.width = 800;
        img.height = img.width * ratio;
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
      console.log("GOOD TO GO!");
    }
  }
  reader.readAsDataURL(input.files[0]);
};

//上傳圖片到imgur
var uploadImage = function(imageData, callback){
  if(imageData != null){
    $.ajax({
      url: 'https://api.imgur.com/3/image',
      type: 'post',
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
  alert("資料傳輸成功!");
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
var getImageThumbnailElement = function(imageURL){
  var link = $('<a>');
  if(imageURL != null){
    console.log(imageURL);
    var fileType = imageURL.slice(imageURL.length - 4, imageURL.length);
    var thumbnailURL;
    if(fileType == ".png"){
      thumbnailURL = imageURL.replace(".png","m.png"); //縮圖的網只是在檔名後加m
    }
    else if(fileType == ".jpg"){
      thumbnailURL = imageURL.replace(".jpg","m.jpg");
    }
    else{
      thumbnailURL = "";
    }
    var element = $('<img>');
    link.append($('<img>').attr("src", thumbnailURL));
    link.attr("href", imageURL);
    return link;
  }
  else{
    link.text("<沒有圖片>");
    return link;
  }
}

var addDataToTable = function(data){ //把資料加到table中顯示
  var newTableRow = $('<tr>');
  newTableRow.append(getImageThumbnailElement(data.val().imageURL));
  newTableRow.append($('<td>').text(data.val().title));
  newTableRow.append($('<td>').text(data.val().location));
  newTableRow.append($('<td>').text(data.val().describe));
  newTableRow.append($('<td>').text(data.val().time));
  $('#entries').prepend(newTableRow);
}
