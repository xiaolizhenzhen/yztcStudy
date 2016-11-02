// 1、加载fs模块
var fs = require("fs");
//console.log(fs);

// 2、操作文件的读/写  
// 有两种读写文件的方法：同步和异步
	
	
	//异步读取文件中的内容readFile()
/*
	fs.readFile("data.txt",cb);
	function cb(err,data){
		if (err) {
			//console.log(err);//一串十六进制
			console.log(err.toString());
			//console.log("错误信息："+err);

		} 
		//console.log(data);//一串十六进制
		//console.log("正确数据："+data);
		//console.log(data.toString());
		console.log(data.toString() + "word!");
	}
*/
/*
	//ES6新写法
	fs.readFile("data.txt",(err,data) =>{
		if (err) { throw err} ;
		console.log(data.toString());
	});
	console.log("哈哈，这里打印早于data的输出打印");
*/
/*
	//同步读取文件中的内容readFileSync()
	//var data = fs.readFileSync("data.txt","utf-8");//第二个参数传字符串
	var data = fs.readFileSync("data.txt",{"encoding":"utf-8"});//第二个参数传对象
	console.log(data.toString());
*/


//3、怎么写入文件  同步/异步
	

	//先读取
	var data = fs.readFileSync("data.txt",{"encoding":"utf-8"});

	//异步写入 writeFile()
	// fs.writeFile("test.txt",data,cb);
	// function cb(err){
	// 	if (err) throw new Error("复制失败！");
	// 	console.log("文件复制完毕");
	// }

	//同步写入 writeFileSync()
	fs.writeFileSync("../test.txt",data,cb);
	function cb(err){
		if (err) throw new Error("复制失败！");
		console.log("文件复制完毕");
	}


