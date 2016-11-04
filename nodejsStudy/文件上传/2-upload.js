/*
	node的文件上传

*/
	
	var http = require("http"),
		fs = require("fs"),
		url = require("url"),
		formidable = require("formidable");//处理文件表单的模块

	//安装node的formidable模块
	//终端切换到当前目录  输入 npm install formidable 

	http.createServer(function(req,res){

		res.writeHead(200,{
			"Content-type":"text/html;charset=utf-8"
		});

		var pathname  = url.parse(req.url).pathname;
		if (pathname == "/") {

			fs.createReadStream("index.html").pipe(res);
			
		} else if (pathname == "/upload") {
			//文件上传
			//IncomingForm()
			var form = new formidable.IncomingForm();
			//第二个参数是表单项 第三个参数是文件
			form.parse(req,function(err,fields,files){
				// console.log(fields); //得到普通表单项
				// console.log(files); //得到文件

				//重命名 rename(原始文件或目录，指定文件或目录)
				//fs.rename(files.file1.path,"upload/"+files.file1.name);

				fs.createReadStream(files.file1.path).pipe(fs.createWriteStream("upload/"+files.file1.name));
				fs.createReadStream(files.file2.path).pipe(fs.createWriteStream("upload/"+files.file2.name));
			}); 
		} 

	}).listen(8080);
