var mongoClient = require('mongodb').MongoClient;
var connection_string = 'db:27017/YOUR_APP_NAME'; // bad
mongoClient.connect('mongodb://'+connection_string, function(err, db) {
  if(err) throw err;
  /** data indexes **/
db.getCollection("data").ensureIndex({
  "_id": NumberInt(1)
},[
  
]);

/** data records **/
db.getCollection("data").insert({
  "type": "found",
  "title": "3333",
  "location": "33333333",
  "who": "333333333",
  "time": "2016/04/18 23:56",
  "describe": "55555",
  "imageURL": "http://i.imgur.com/voXKPG2.png",
  "deleteHash": "m3Z3bnKy25h4POV",
  "_id": ObjectId("57150350320e4edef6551969")
});
db.getCollection("data").insert({
  "type": "lost",
  "title": "5555",
  "location": "5555",
  "who": "555",
  "time": "2016/04/19 00:00",
  "describe": "555",
  "imageURL": "http://i.imgur.com/uzyv8RJ.jpg",
  "deleteHash": "ih3DuvZjROcOyDb",
  "_id": ObjectId("57150442320e4edef655196a")
});
db.getCollection("data").insert({
  "type": "found",
  "title": "決鬥LA",
  "location": "home",
  "who": "gmin",
  "time": "2016/04/19 00:01",
  "describe": "666666666666666666666666",
  "imageURL": "http://i.imgur.com/nYozcqz.jpg",
  "deleteHash": "scm9UFS5CFkLfc0",
  "_id": ObjectId("57150482320e4edef655196b")
});
db.getCollection("data").insert({
  "type": "lost",
  "title": "手機測試",
  "location": "home",
  "who": "gmin",
  "time": "2016/04/19 00:04",
  "describe": "測試哦哦哦哦哦哦哦哦哦",
  "imageURL": "http://i.imgur.com/ICMw1tD.jpg",
  "deleteHash": "DoIgy5OJOP3HHbW",
  "_id": ObjectId("57150574761fd6e0e20735ca")
});
db.getCollection("data").insert({
  "type": "found",
  "title": "誰的男朋友掉了？？",
  "location": "四教",
  "who": "屁孩",
  "time": "2016/04/19 00:07",
  "describe": "電機暖男\n微宅微靦腆\n平常交通工具：火雞",
  "imageURL": "http://i.imgur.com/12A9JaE.jpg",
  "deleteHash": "nGQz4D6NL3bd3dh",
  "_id": ObjectId("57150651761fd6e0e20735cb")
});
db.getCollection("data").insert({
  "type": "found",
  "title": "宵夜",
  "location": "捷運善導寺站",
  "who": "屁孩",
  "time": "2016/04/19 00:12",
  "describe": "半夜發宵夜文\nㄙㄨㄤˇ辣\nWheeeeeeeeeeeeeeee",
  "imageURL": "http://i.imgur.com/ZoQ40q5.jpg",
  "deleteHash": "32dl7bFUNFER9uO",
  "_id": ObjectId("5715076d761fd6e0e20735cc")
});
db.getCollection("data").insert({
  "type": "lost",
  "title": "驚",
  "location": "!!!",
  "who": "!!!!!!!!",
  "time": "2016/04/19 10:55",
  "describe": "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
  "imageURL": "http://i.imgur.com/9kqojRS.png",
  "deleteHash": "LqIFtJscZKeJIID",
  "_id": ObjectId("57159df6761fd6e0e20735cd")
});
db.getCollection("data").insert({
  "type": "lost",
  "title": "test redirect",
  "location": "gmin",
  "who": "gmin",
  "time": "2016/04/19 11:00",
  "describe": "66666666666666666666666666666666666666666666666666666666666666666666666666666666",
  "imageURL": "http://i.imgur.com/yHWeY5X.jpg",
  "deleteHash": "X3a2PTWd35n7o1q",
  "_id": ObjectId("57159f14761fd6e0e20735ce")
});
db.getCollection("data").insert({
  "type": "found",
  "title": "testtesttest",
  "location": "666666666666666",
  "who": "6666666666666",
  "time": "2016/04/19 13:05",
  "describe": "666666666666666666666666666666666666666",
  "imageURL": "http://i.imgur.com/SW2u7DT.jpg",
  "deleteHash": "zviI7fbnonrvTsL",
  "_id": ObjectId("5715bc83a09d603511a42b8f")
});
db.getCollection("data").insert({
  "type": "found",
  "title": "宵夜",
  "location": "~",
  "who": "PHI",
  "time": "2016/04/19 20:48",
  "describe": "",
  "imageURL": "http://i.imgur.com/XrqKqEc.jpg",
  "deleteHash": "sP2dMjeOuE4ZFv4",
  "_id": ObjectId("571629374b6fed8a60006c9a")
});
db.getCollection("data").insert({
  "type": "found",
  "title": "Z5",
  "location": "Taipei",
  "who": "Phi",
  "time": "2016/04/19 21:48",
  "describe": "",
  "imageURL": "http://i.imgur.com/JMzp2Dz.jpg",
  "deleteHash": "pbVmCXWFtEpPJOk",
  "_id": ObjectId("57163728ea3bba65fa414b9f")
});
db.getCollection("data").insert({
  "type": "lost",
  "title": "黑色保溫杯",
  "location": "中正館",
  "who": "gmin",
  "time": "2016/04/19 23:30",
  "describe": "掉了嗚嗚嗚嗚嗚嗚嗚嗚嗚嗚嗚嗚",
  "imageURL": "http://i.imgur.com/9pGMxG9.jpg",
  "deleteHash": "dDgkwxJzp298N1f",
  "_id": ObjectId("57164f21ba300d11386f3686")
});
db.getCollection("data").insert({
  "type": "lost",
  "title": "666666666666666",
  "location": "6666666666666666666666",
  "who": "6666666666666",
  "time": "2016/04/20 15:30",
  "describe": "66666666666666",
  "imageURL": "",
  "deleteHash": "",
  "_id": ObjectId("5717302659fe489b26f0bfed")
});
db.getCollection("data").insert({
  "type": "lost",
  "title": "女朋友",
  "location": "心",
  "who": "咖褲",
  "time": "2016/04/20 15:30",
  "describe": "我的女友呢",
  "imageURL": "",
  "deleteHash": "",
  "_id": ObjectId("5717302c59fe489b26f0bfee")
});
db.getCollection("data").insert({
  "type": "lost",
  "title": "66666666666",
  "location": "66666666",
  "who": "6666666",
  "time": "2016/04/20 15:31",
  "describe": "6666666",
  "imageURL": "http://i.imgur.com/PpF8yHd.png",
  "deleteHash": "qbmXbOopwTZqE3x",
  "_id": ObjectId("5717305359fe489b26f0bfef")
});
db.getCollection("data").insert({
  "type": "lost",
  "title": "Did anyone see my boyfriend?",
  "location": "My heart",
  "who": "His girlfriend",
  "time": "2016/04/20 15:36",
  "describe": "He is God.",
  "imageURL": "http://i.imgur.com/iWlHpxa.jpg",
  "deleteHash": "TnQQ14FA7SmX76G",
  "_id": ObjectId("5717318959fe489b26f0bff0")
});
db.getCollection("data").insert({
  "type": "found",
  "title": "000000000000",
  "location": "0000000",
  "who": "0000000",
  "time": "2016/04/20 15:43",
  "describe": "000000000",
  "imageURL": "",
  "deleteHash": "",
  "_id": ObjectId("5717331c59fe489b26f0bff1")
});
db.getCollection("data").insert({
  "type": "found",
  "title": "666666",
  "location": "666666666",
  "who": "6666666666",
  "time": "2016/04/20 16:01",
  "describe": "666666666666",
  "imageURL": "http://i.imgur.com/fw49NEy.png",
  "deleteHash": "hozb68Uh1txvbHC",
  "_id": ObjectId("5717374661f8ae8c0a22288c")
});
db.getCollection("data").insert({
  "type": "found",
  "title": "0000000000000",
  "location": "000000000",
  "who": "0000000000",
  "time": "2016/04/25 13:18",
  "describe": "0000000000000",
  "imageURL": "http://i.imgur.com/sQlrNBT.jpg",
  "deleteHash": "Ct3hquUPLuouRc7",
  "_id": ObjectId("571db6a8015a95258111d6f2")
});
db.getCollection("data").insert({
  "type": "found",
  "title": "9999999999",
  "location": "99999999",
  "who": "999999",
  "time": "2016/04/28 14:30",
  "describe": "999999999999999999",
  "imageURL": "http://i.imgur.com/ByYk1zS.jpg",
  "deleteHash": "9VfHL8dpQTzriVm",
  "_id": ObjectId("5721ae05015a95258111d6f3")
});
db.getCollection("data").insert({
  "type": "lost",
  "title": "Hi is this still alive?",
  "location": "I think so",
  "who": "if you can really see this",
  "time": "2016/05/01 00:23",
  "describe": "",
  "imageURL": "http://i.imgur.com/cH4psQU.jpg",
  "deleteHash": "sWS3Q7aQUjRIx7g",
  "_id": ObjectId("5724dbee2eb2238a826b8f1a")
});
db.getCollection("data").insert({
  "type": "lost",
  "title": "自己一個人!",
  "location": "家",
  "who": "嗚嗚嗚嗚嗚",
  "time": "2016/05/12 23:38",
  "describe": "嗚嗚嗚嗚嗚嗚嗚嗚嗚嗚嗚嗚嗚嗚嗚嗚嗚嗚嗚嗚嗚嗚嗚嗚嗚嗚嗚嗚嗚嗚嗚嗚嗚嗚嗚邊緣",
  "imageURL": "http://i.imgur.com/1lykRGq.jpg",
  "deleteHash": "gS0Zdy585AxjNRw",
  "_id": ObjectId("5734a2f8044c451b2b9ff4d4")
});
db.getCollection("data").insert({
  "type": "lost",
  "title": "React Example 1 - A simple timer.",
  "location": "0",
  "who": "0",
  "time": "2016/05/14 11:52",
  "describe": "",
  "imageURL": "",
  "deleteHash": "",
  "_id": ObjectId("5736a0aa044c451b2b9ff4d5")
});

})