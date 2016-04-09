var myFirebaseRef = new Firebase("https://s60912frank.firebaseio.com/");
var authdata;
$(document).ready(
  function(){
    $('#login').click(
      function(){
        myFirebaseRef.authWithPassword({
          email    : $('#id').val(),
          password : $('#pw').val()
        }, function(error, authData) {
            if (error) {
              alert("登入失敗!");
              console.log(error);
            }
            else {
              alert("登入成功!");
              console.log(authData);
              authdata = authData;
              showTable();
            }
          }, {remember: "sessionOnly"});
    });

    $('.deleteBtn').on('click',
      function(){
        console.log("CLICK!");
        myFirebaseRef.child("lostFound/" + this.attr("id")).set(null);
      }
    );
});

var showTable = function(){
  myFirebaseRef.child("lostFound").on("value",
    function(snapshot){
      $("#entries").find('tr').remove();
      snapshot.forEach(
        function(entry){
          addDataToTable(entry);
        }
      );
  $('#dataTable').show();
});
}

var addDataToTable = function(data){ //把資料加到table中顯示
  var newTableRow = $('<tr>');
  newTableRow.append(getImageThumbnailElement(data));
  newTableRow.append($('<td>').text(data.val().title));
  newTableRow.append($('<td>').text(data.val().location));
  newTableRow.append($('<td>').text(data.val().time));
  newTableRow.append(getItemInfoURLElement(data));
  newTableRow.append(getDeleteBtnElement(data));
  $('#entries').prepend(newTableRow);
}

var getDeleteBtnElement = function(data){
  var newBtn = $('<Button>');
  //newBtn.attr("id", data.key());
  newBtn.text("刪除");
  newBtn.addClass('deleteBtn');
  newBtn.click(function(){ clickDeleteBtn(data); });
  return newBtn;
}

var clickDeleteBtn = function(data){
  //console.log("CLICK!");
  if(data.val().imageURL != null){
    $.ajax({
          url: 'https://api.imgur.com/3/image' + '/' + data.val().deleteHash,
          type: 'delete',
          headers: {
              Authorization: 'Client-ID 67c240c58b566fe'
          },
          dataType: 'json',
          success: function(response) {
              if(response.success) {
                console.log(response);
              }
              else{
                console.log(response);
              }
          }
      });
  }
  myFirebaseRef.child("lostFound/" + data.key()).set(null);
}

//創造一個img元素放縮圖並且連結到原圖
var getImageThumbnailElement = function(data){
  var imageURL = data.val().imageURL;
  if(imageURL != null){
    var getFileType = imageURL.split("/")[3].split(".")[1];
    var thumbnailURL = imageURL.replace("." + getFileType, "s." + getFileType); //在副檔名前加m以取得縮圖網址
    var element = $('<img>');
    element.attr("src", thumbnailURL);
    return element;
  }
  else{
    return $('<p>').text("<沒有圖片>");
  }
}

var getItemInfoURLElement = function(data){
  var link = $('<a>').text("詳細資訊")
  link.attr("href", "./item.html?id=" + data.key());
  return link; //取得該物品詳細資料連結元素
}
