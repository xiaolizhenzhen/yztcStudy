
var http = require("http");
var url = require("url");
var fs = require("fs");

http.createServer(function(req,res){
	res.writeHead(200,{
		"Content-type":"text/html;charset=utf-8"
	});

	var pathname = url.parse(req.url,true).pathname;
	if (pathname == "/") {
		fs.readFile("login.html","UTF-8",function(err,data){
			if (err) {
				res.write("<h1>这个页面可能没了</h1>");
			} else{
				console.log(data);
				res.write(data);
			};
				res.end();
		})
	} else if (pathname == "/login" ){
		var user = url.parse(req.url,true).query.user;
		if (user == "admin") {
			fs.readFile("index.html","UTF-8",function(err,data){
				if (err) {
					res.write("<h1>首页去旅游了~</h1>");
				} else{
					res.write(data);
				};
					res.end();
			})
		}
	};

	
}).listen(8888);
console.log("服务已经启动，端口是8888");