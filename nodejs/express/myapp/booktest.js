//加载express模块
const express = require("express");
//加载文件模块
var fs = require("fs");
var app = express();

var gData = null;
// app.use(express.static("BookStoreSystem"));

fs.readFile("bookdata/books.json","UTF-8",function(err,data){
	//数据读取成功！
	if (err) throw new Error("读取数据出错！");
	gData = data;
	app.listen(5000);
	console.log("服务已启动！");
})


app.get("/books",function(req,res){
	
		res.send(gData);

});

// 10.0.161.39:5000/books