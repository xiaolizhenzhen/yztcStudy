var express = require('express');
var router = express.Router();

router.get("/:u/:p",function(req,res,next){

	var username = "admin";
	var password = "123abc";
	//处理用户传递过来的数据 
	//用户传递过来的数据在req里面
	// res.send(req.params.username);
	console.log(req.params.u);
	console.log(req.params.p);

	//跨域头设置
	//跨域访问里的cross方法  老版本浏览器不支持
	//如果设置静态页面的web服务 则不会再存在跨域的问题了
	//http://cnodejs.org/topic/51dccb43d44cbfa3042752c8
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	
    //设置返回数据的类型
	res.header("Content-type","application/json");
	var obj = {};

	if (username == req.params.u && password == req.params.p) {
		//res.send(" 成功辣！");
		obj.msg = "成功辣o~";
		obj.statusCode = "yes";

		//送回json文件需设置请求头

	} else{

		//res.send(" 用户名或者密码错误！");
		obj.msg = "用户名或者密码错误o~";
		obj.statusCode = "no";
	};

	res.send(JSON.stringify(obj));
})

router.post("/",function(req,res,next){

	var username = "admin";
	var password = "123abc";
	var name;
	var pd;
	for(p in req.body){
		// console.log(typeof p);
		var o = JSON.parse(p);
		// console.log(o["uesrname"]);
		// console.log(o["pwd"]);
		console.log(o.uesrname);
		console.log(o.pwd);
		name = o.uesrname;
		pd = o.pwd;
	}
	
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

	var obj = {};
	if (username == name && password == pd) {
		//res.send(" 成功辣！");
		obj.msg = "post成功辣o~";
		obj.statusCode = "yes";

		//送回json文件需设置请求头

	} else{

		//res.send(" 用户名或者密码错误！");
		obj.msg = "post用户名或者密码错误o~";
		obj.statusCode = "no";
	};
 	 // res.json(obj);
 	console.log(obj);
	res.send(obj);
})

module.exports = router;
