var http = require("http"),
    url = require("url"),
    fs = require("fs");
  
http.createServer(function(req,res){

	//响应头
	res.writeHead(200,{
		"Content-text":"text/html;charset=utf-8"
	});
	var rurl = url.parse(req.url,true),
		pathname = rurl.pathname,
		query = pathname.query;

	if (pathname == "/") {

		fs.readFile("login.html","UTF-8",function(err,data){
			//console.log(data);
			res.write(data);
			res.end();
		});

	} else if (pathname == '/login') {
		var str = "";
		//通过req.query来获取查询参数(提交数据)时，
		//只能获取GET方式的请求而无法获取post请求传递过来的数据
		//Node.js认为post一般情况提交的数据量较大，而在处理请求体过程不需要去等待所有数据提交完成
		if (req.method == "GET") {
			//GET请求
			str = query.user;

		} else{

			//POST 请求   
			//node.js 处理post请求的方式：
			//为request添加data的数据监听 当有数据进入时会触发
			req.on('data', function(chunk) {
				//chunk即为post请求时  进入的数据块 buffer类型
				console.log(chunk.toString());
			});

			//为request对象添加end监听 ，当所有post数据接受完成后触发
			req.on('end', function() {
				console.log("数据接受完成");
			});

		};

		//localhost：8088/login 
		//console.log(query.user);
		//res.write("");
		res.end();
	} 

	// res.write("啦啦啦");//res 可以没有write() 但必须要有end  write()参数必须是字符串
	// res.end(); //end也可以输出内容 并结束响应
}).listen(8088);
console.log("服务已经启动，端口号是8088");