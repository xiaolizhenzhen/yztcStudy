//加载express模块
const express = require("express");
// console.log(typeof express);
var app = express();

//通过express创建get方法的服务
//第一个参数访问get方法的路径
//第二个参数回调函数
app.get("/",function(req,res){
	res.send("hi,我是get请求");
});
app.get("/buy",function(req,res){
	res.send("hello");
});
app.get("/sell",function(req,res){
	res.send("world");
});

// 网站首页接受 POST 请求
app.post('/', function (req, res) {
  res.send('Got a POST request');
});

// /user 节点接受 PUT 请求
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});

// /user 节点接受 DELETE 请求
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});

app.listen(3000);
