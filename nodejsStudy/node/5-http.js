//加载http模块
var http = require("http");
var url = require("url");
var fs = require("fs");//filesystem 模块 处理文件

//调用createServer方法 创建一个服务
http.createServer(function(req, res){

	//res响应
	res.writeHead(200,{ //设置响应头

		"Content-type": "text/html;charset=utf-8"
	});

	//req请求
	// console.log(req.url); //得到请求地址 端口号 后面所有的内容
	// console.log(req.method);//得到请求方式 如get，post

	var href = req.url;
	// console.log(url.parse(href));  //解析地址
	// console.log(req.method);
	var pathname = url.parse(href).pathname;//取得访问路径

	if (pathname == "/" || pathname == "/index" || pathname == "/index.html") {

		//地址 编码
		fs.readFile("index.html","UTF-8",function(err,data){
			console.log(data);
			res.write(data);
			res.end();
		})

		//直接在浏览器输入 localhost：8088  进入这里执行代码
		//res.write("你在访问主页");
	} else{
		res.write("页面走丢了");
		res.end();
	}
			

/*
//  /shop/index.html?user=admin&pwd=12345&type=login#1
	// var str = "/shop/index.html?user=admin&pwd=12345&type=login#1";
	// str = str.split("?")[1];
	// str = str.split("#")[0];
	// str = str.split("&");
	// for(var i=0;i<str.length;i++){
	// 	var a = str[i].split("=");
	// 	console.log(a[0],a[1]);
	// }

	//上面的代码可以用parse方法解决
*/
	//res.write("你好吗？？？");
	//res.write("我不好！"); //结束 发送响应   write可以有多个
	//res.end("你好~");//结束响应 发送响应   end只能有一个

}).listen(8088);//监听8088端口
console.log("服务已经启动，端口8088");