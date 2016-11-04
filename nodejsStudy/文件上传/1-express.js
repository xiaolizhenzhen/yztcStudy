var express = require("express"),
	qs = require("querystring");
var app = new express();

//get处理  不接受参数 返回随意字符串
app.get("/user",function(req,res){
	res.send("这是get给你的返回内容 ");
})

//post处理 接受参数user=admin 返回随意字符串
app.post("/items",function(req,res){
	var chunks = "";
	req.on("data",function(chunk){
		chunks += chunk.toString();
	});
	req.on("end",function(chunk){
		// chunks += qs.parse(chunks);
		// console.log(chunks);
		res.send("这是post给你的返回内容" + chunks);
	})
})

app.listen(3000);