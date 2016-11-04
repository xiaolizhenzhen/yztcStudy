/*
	使用  http模块  作为客户端(模拟一个浏览器的请求)
	使用后台做客户端的http请求  无需担心跨域问题
	跨域概念值存在与浏览器中

*/

	var http =	require("http");

/*
	//构建配置对象
	var option = {
		//url.parse(req.url)
		host : "localhost",    //请求的主机名
		port : "3000",  //端口号
		path : "/user", //请求路径
		method : "GET" //请求方式
	}
	
	//http.request(option,callback) 
	//构建请求对象
	var req = http.request(option,function(res){
		res.on('data',function(chunk) {  //监听响应的data事件  的到响应内容
			console.log(chunk.toString());
		});
	});

	//发送请求
	//req.write("");
	req.end();

*/

	//构建配置对象
	var option = {
		//url.parse(req.url)
		host : "localhost",    //请求的主机名
		port : "3000",  //端口号
		path : "/items", //请求路径
		method : "POST", //请求方式
		headers : { //设置请求格式为JSON
			"Content-type":"application/json"
		}

	}

	//http.request(option,callback) 
	//构建请求对象
	var req = http.request(option,function(res){
		res.on('data',function(chunk) {  //监听响应的data事件  的到响应内容
			console.log(chunk.toString());
		});
	});

	//发送请求
	//req.write("user=admin"); //发送标准的查询字符串
	req.write("{user:'admin'}"); //发送JSON查询

	req.end();