/*
	http 模块
	http 是Node.js的一个内置模块
	http 可以建立服务器或客户端

	常见Content-type:
	text/plain  原样文本输出
	text/html   html标签输出
	application/json  JSON数据格式输出
*/

	//require请求加载
	var http = require("http");//加载http模块
	http.createServer(function(req,res){
		//req  请求体  参数
		//res  响应体  参数
		//console.log(req);
		console.log(req.url);   
		//输出结果：
			//第一个/ 后面是查询路径  
			//第二个：favicon.ico表示左上角图标
		//根据不同路径，得到不同响应  称为路由

		res.writeHead(200,{"Content-type":"text/plain;charset=utf-8"});
		res.write("<h1>你好，这是你的第一个node服务</h1>");
		res.end();
	}).listen(8088);//listen(8088)监听端口号
	console.log("服务已经启动，端口号8088");