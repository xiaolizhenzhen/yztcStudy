/*
	NodeJS 自带的文件模块
	fs 文件系统  filesystem

*/

	//加载文件模块
	var fs = require("fs");

/*
	//fs.readFile(path[,options],callback);  异步读取文件
	//path : 读取文件的路径
	//options ： 一般文件的编码方式
	//callback ： 读取成功的回调函数
	//		err ： 错误信息 读取发生错误会返回错误信息 成功会返回null
	//		data ： 读取到的数据
*/

/*
	//异步读取文件
	fs.readFile("data.txt","UTF-8",function(err,data){
		console.log("读取文件中。。。");
		console.log(data);
	});
	console.log("读取文件完成");
	
*/

/*
	//readFileSync(path,options)  同步读取文件 返回读取的数据
	//一般使用异步读取
	var data = fs.readFileSync("data.txt","UTF-8");//同步读取文件
	console.log("读取文件中。。。");
	console.log(data);
	console.log("读取文件完成");
*/

/*
	//writeFile(path,content,options,callback)   异步写入文件内容
	//content : 要写入的内容
	//其它参数与readFile保持一致
	fs.writeFile("data.txt","这是通过写入方式增加的内容","UTF-8",function(err){
		console.log("写入文件中");
		console.log(err);
	})
		console.log("写入完成");
*/
	
	//writeFileSync   同步写入，没有回调函数
	fs.writeFileSync("data.txt","这是同步写入的内容","UTF-8");