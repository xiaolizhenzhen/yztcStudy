var myModule = require("./3-module.js");//require请求加载
//console.log(myModule);


//导出模块的方法 1 的调用方式
//myModule("随便啦~");

/*
	//导出模块的方法 3 的调用方式
	
	console.log(myModule.a);
	myModule.b();//返回的是一个函数
*/



/*
	//导出模块的方法 2 的调用方式
	myModule.my("随便啦~");
	myModule.you("你你你随便啦~");
	console.log(myModule.his);
	console.log(myModule);//返回的是一个对象
*/



/*
	require通过一系列寻找过程，找到3-module.js

	1、原生模块 如：http querystring fs util url path等
	   遇到这些原生模块时，会直接去原生模块缓存区判断此模块是否被加载过
	   如果加载过 直接返回此模块  否则去加载原生模块 并缓存 并返回

	2、文件模块 通俗来讲就是我们自己写的模块，
	   它以文件路径方式被require()加载,加载方式与原生相似

	3、如果遇到文件模块与原生模块同名，Node会优先加载原生模块并忽略文件模块

	4、文件模块可以省略文件扩展名 如:require("./a.js")与require("./a");

*/

    /*
		决定使用哪种方法  要看你返回的是一种什么类型
		比如：
			你返回的只是一个对象 那可以使用
				module.exports = { a : 1, b : function(){} }
				var my = require();
				my.a; //输出1
				my.b();  //执行函数

			你返回一个函数 且可以直接调用 可以使用
				module.exports = function(){}
				var my = require();
				my();  //即可调用函数

			其它一律使用 
				exports.a = function(){};
				exports.b = "XXX";
				var my = require();
				my.a();//调用方法
				console.log(my.b);//获取属性

	*/
