var fs = require("fs");

/*
	function copy(src, dist){

		fs.writeFileSync(dist,fs.readFileSync(src));
	}
	copy("text.js","back.js");

	//易引起内存爆仓的问题

*/
/*
	//流写入  读取一段写一段
	function copy(src,dist){

		var rs = fs.createReadStream(src); //创建一个读取流
		var ws  = fs.createWriteStream(dist);//创建写入流

		//数据读入监听
		rs.on('data', function(chunk) {
			ws.write(chunk.toString(),function(){
				console.log("写入数据完成");
			});
			//console.log(chunk.toString());
		});
		//数据读取结束监听
		rs.on('end',function() {
			console.log("读取结束");
		});
	}
		copy("text.js","back1.js");

*/
	
	//管道 pipe();

	fs.createReadStream("text.js").pipe(fs.createWriteStream("back2.js"));