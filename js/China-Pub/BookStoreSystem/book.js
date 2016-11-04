//加载express模块
const express = require("express");
var bodyParser = require("body-parser");//加载参数的模块
//加载文件模块
var fs = require("fs");
var app = express();

var gData = null;
app.use(express.static("public"));
app.use(bodyParser.json()); //json格式的参数
app.use(bodyParser.urlencoded({ extended: true }));

fs.readFile("bookdata/users.json","UTF-8",function(err,data){
	//数据读取成功！
	if (err) throw new Error("读取数据出错！");
	gData = data;
	app.listen(9999);
	console.log("服务已启动！");
})

app.get("/login",function(req,res){
	res.sendFile(__dirname + "/public/BookStoreSystem.html");
})

app.get("/getUsers",function(req,res){
 		res.setHeader("Content-Type","application/json;charset=utf-8");
		res.send(gData);
});
app.post("/logout",function(req,res){
	var name = req.body.name;
	console.log(name);
	if (name == "admin") {
		res.send("注销成功！");
	} 
})

app.get("/books",function(req,res){
 		fs.readFile("bookdata/books.json",function(err,chunk){
			chunk = JSON.parse(chunk.toString());
			res.send(chunk);
		});
});

app.post("/addbooks",function(req,res){
	var obj = req.body;
	console.log(obj);
	//把新增数据写入json,
	fs.writeFile("bookdata/addbooks.json",obj,cb);
	function cb(err){
		if (err) throw new Error("复制失败！");
		console.log("文件复制完毕");
	}
	res.send(obj);
});

app.delete("/delbooks",function(req,res){
	var bookObj = req.body;
	console.log("删除成功！");
	res.send(bookObj);
});

app.put("/modbooks",function(req,res){
	var bookObj = req.body;
	console.log("修改成功！");
	res.send(bookObj);
});

// 10.0.161.39:9999/login