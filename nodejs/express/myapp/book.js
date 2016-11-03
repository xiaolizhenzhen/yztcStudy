//加载express模块
const express = require("express");
//加载文件模块
var fs = require("fs");
var app = express();

var gData = null;
app.use(express.static("BookStoreSystem"));

fs.readFile("bookdata/users.json","UTF-8",function(err,data){
	//数据读取成功！
	if (err) throw new Error("读取数据出错！");
	gData = data;
	app.listen(9000);
	console.log("服务已启动！");
})

app.get("/login",function(req,res){
	res.sendFile(__dirname + "/BookStoreSystem/BookStoreSystem.html");
})

app.get("/getUsers",function(req,res){
 		res.setHeader("Content-Type","application/json;charset=utf-8");
		res.send(gData);
});

app.get("/books",function(req,res){
 		fs.readFile("bookdata/books.json",function(err,chunk){
			chunk = JSON.parse(chunk.toString());
			res.send(chunk);
		});
});

app.post('/logout', function(req, res){
 	res.send(gData);
})


// 10.0.161.39:9000/login