/*
	NodeJS  模块化开发

	什么是模块化？
		强类型语言：
			如 ：JAVA， 声明语言  包的概念

		弱类型语言：
			如 ：JS    命名空间 变量定义 变量类型 松散
*/

/*
	//导出模块的方法 1
	module.exports = function(a){
		console.log("模块" + a);
	}

		//console.log(module);
		//console.log(module.exports());
*/

/*
	//导出模块的方法 3
	module.exports = {
		a : 1,
		b : function(){
			console.log("这里可以运行对象的a属性");
			console.log(this.a);

		}
	}
		//console.log(module);
*/

/*
	//导出模块的方法 2
	exports.my = function(a){   //exports:{my : [Function]}
		console.log(a);
	}
	exports.you = function(a){   //exports:{my : [Function],you : [Function]}
		console.log(a);
	}
	exports.his = "hi"; //exports:{my : [Function],you : [Function],his : 'hi'}
		//console.log(module);

	//var myModule = require("./3-module.js");
	//return module.exports;  即：
	//myModule = {my : [Function],you : [Function]}
	//调用方式
	// myModule.my();
	// myModule.you();
	// console.log(myModule.his);
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

/*
	//module 用于构造函数
	module.exports = function(name){
		this.name = name;
		this.age = 30;
		this.say = function(){
			console.log(this.name);
		}
	}
*/