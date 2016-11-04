var fs = require("fs");

/*

	//构建复制文件的方法  1
	//参数1 ： 源文件
	//参数2 ： 新文件

	function copy(src, dist){

		//读源文件  写到指定文件
		fs.writeFileSync(dist,fs.readFileSync(src));
	}
	copy("回顾.txt","bak.txt");

	//上面的复制方法在处理小文件时，没有什么问题，
	//但如果文件容量较大或特大
	//那么会非常容易引起内存爆仓的问题
	//同步读取的文件会被暂时放到内存区中，
	//如果要读取的文件超过内存大小 则会出现问题

*/
	
/*
	//构建复制文件的方法  2
	//为了解决同步读取可能会造成的问题，
	//可以使用流读取 写入的方式
	//读取一段写一段，保证内存正常

	//流 ： Stream
	function copy(src, dist){

		var rs = fs.createReadStream(src);//创建一个读取流
		var ws = fs.createWriteStream(dist);//创建一个写入流

		//为读取流添加数据进入监听
		rs.on('data', function(chunk) {
			//chunk是buffer类型
			console.log(chunk.toString());
			ws.write(chunk.toString(),function(){
				console.log("写入完成");
			})
		});

		//为读取流添加读取结束监听
		rs.on('end', function() {
			console.log("读取完成");
		});

		//
	}

	copy("回顾.txt","bak1.txt");

	//上面的写法解决了内存爆仓问题，但是会出现读写不一致的问题
	解决方法：管道 pipe()  如下

*/

	//构建复制文件的方法  3

	//管道 pipe()
	//上一个节点的输出是下一个节点的输入
	fs.createReadStream("回顾.txt").pipe(fs.createWriteStream("bak2.txt"));


	//gulp  前段自动化工具
	//http 客户端 绝对没有跨域
	//node 文件上传
	//node 事件
	//express 
	//使用node+express 改造 购物车
