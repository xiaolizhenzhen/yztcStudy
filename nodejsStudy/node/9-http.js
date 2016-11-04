//加载模块
var http =  require("http");
var url = require("url");
var fs = require("fs");

//调用createServer方法 创建一个服务
http.createServer(function(req,res){

	//设置响应头
	res.writeHead(200,{
		"Content-type":"text/html;charset=utf-8"
	});

	var p = url.parse(req.url,true);
	var pathname = p.pathname; //取得访问路径
	console.log(pathname);
	if (pathname == "/" ) {
		fs.readFile("login.html","utf-8",function(err,data){
			if (err) {
				res.write("<h1>这个页面可能没了</h1>");
			} else{
				res.write(data);
			}
			res.end();
		});
	} else if (pathname == "/login"){
		var user = p.query.user;
		if (user == "admin") {
			fs.readFile("index.html","utf-8",function(err,data){
				if (err) {
					res.write("<h1>首页去旅游了~</h1>");
				} else{
					res.write(data);
				};
				res.end();
			})
		} 
	}

}).listen(8089);
console.log("服务启动");