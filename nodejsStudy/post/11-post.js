var http = require("http"),
	url = require("url"),
	fs = require("fs");

http.createServer(function(req,res){

	res.writeHead(200,{
		"Content-type":"text/html;charset=utf-8"
	});

	var rurl = url.parse(req.url,true),
		pathname = rurl.pathname,
		query = rurl.query;

	if (pathname == '/') {
		fs.readFile("login.html","utf-8",function(err,data){
			res.write(data);
			res.end();
		});
	} else if (pathname == "/login") {

		var str = "";
		if (req.method == "GET") {
			//get方式
			str = query.user;
		} else{
			//post方式
			//node.js 处理post请求的方式
			//为request对象添加监听事件
			req.on('data',  function(chunk) {
				console.log(chunk.toString());
			});
			//结束监听事件
			req.on('end', function() {
				console.log("数据接受完成");
			});

		};
		res.write(query.user);
		res.end();
	} 
	// res.write("军刀卡");//write可以有多个，参数必须是字符串
	// res.end(); //end必须有
}).listen(3000);
console.log("启动");