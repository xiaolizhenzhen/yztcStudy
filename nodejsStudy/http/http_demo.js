// ES6定义常量 const
const http = require("http");//加载http模块
var url = require("url");//加载url模块
var fs = require("fs");//加载文件模块

//http.createServer();http模块的方法
//创建一个服务器对象
const server = http.createServer(function(req,res){
	//设置监听器函数    处理请求
	// console.log(req);
	// console.log("请求已经接收");
	// console.log(req.url);
	fs.readFile("index.html",(err,data) => {
		//设置响应头
		res.writeHead(200,{"Content-type": "text/html;charset=utf-8"})
		//输出响应数据
		res.write(data);
		//响应结束
		res.end("结束啦");
	})
});
server.listen(8088);//监听8088端口
console.log("服务已经启动，端口8088");