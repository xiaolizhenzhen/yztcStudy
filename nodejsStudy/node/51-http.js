//加载http模块
var http = require("http");
var url = require("url");
var fs = require("fs");  //处理文件  filesystem

//调用createServer方法 创建一个服务
http.createServer(function(req, res){

	  
	//第一个参数 请求请求状态
	//第二个参数 回调函数
	res.writeHead(200,{ //设置响应头
		"Content-type":"text/html;charset=utf-8"
	});

	
	console.log(req.url);//输出浏览器的请求地址   
	//输入http://localhost:8000  输出 /
	//输入http://localhost:8000/shop/index.html?user=admin&pwd=12345&type=login#1
	//输出/shop/index.html?user=admin&pwd=12345&type=login#1

	var href = req.url; //得到请求地址  即端口号之后的内容
	var  pathname = url.parse(href).pathname;  //解析请求地址 返回一个对象
	//console.log(url.parse(href).pathname);

	//console.log(req.method);// 得到请求方式        GET默认
	if (pathname == "/" || pathname == "/index" || pathname =="/index.html") {

		fs.readFile("index.html","UTF-8",function(err,data){
			console.log(data);
			res.write(data);
			res.end();

		});

		//直接在浏览器输入 localhost：8000 进入此判断
		//res.write("你在访问主页");
	} else{
		res.write("页面走丢了");
		res.end();

	}
/*
localhost:800	//解析请求地址
	var str = "/shop/index.html?user=admin&pwd=12345&type=login#1";
	str = str.split("?")[1];
	str = str.split("#")[0];
	str = str.split("&");
	for(var i= 0; i <str.length; i++){
		var a = str[i].split("=");
		console.log(a[0]+":"+a[1]);
	}

*/
	//res.write("UI开会开会开");  //write可以有多个
	//res.write("放假放假");  //write可以有多个

	//res.end("你好哦~~"); //结束响应  end只能有一个，代表结束响应
	//res.end();

}).listen(8000); //监听8000端口
console.log("服务已经启动，端口8000");
