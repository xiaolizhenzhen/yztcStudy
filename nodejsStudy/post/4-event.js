/*
	在日常使用中 并不会为event对象添加一些事件
	而事件的使用应该是在实际的代码对象中
	可以使自己的代码去继承events事件

*/
	var util = require("util");//util 内置模块 提供一些常用工具
	var events  = require("events");

/*
	//将对象转换为字符串
	var obj = {
		a : 1,
		b : 2,
		c : {
			d : 1,
			e : 2,
			f : {
				g : 1,
				h : 2,
				i : [1,2,3,4,5],
				j : {
					k : 1
				}
			}

		}
	}
    //inspect(obj[,options]) 将对象转换为字符串   
    //默认深度截两级
	console.log(util.inspect(obj)); //解析深度默认为2层
	//console.log(util.inspect(obj,null)); //第二个参数为 是否显示更多信息
	console.log("=================");
	console.log(util.inspect(obj,null,5)); //第三个参数为查询深度
	console.log("-------------------");
	console.log(util.inspect(obj,null,1));

	//最新版本写法
	console.log(util.inspect(obj,{showHidden : false,depth : 1}));

	console.log(typeof util.inspect(obj));//string

*/

/*
	function Person(name){
		this.name = name;
		this.walk = function(){
			console.log("散步");
		}
	}

	Person.prototype.say = function(){
		console.log("你好,"+this.name);
	}

	function Sub(name){
		this.name = name;
		//原型继承
		//Person.apply(this,arguments);
	}

	//原型继承
	//Sub.prototype = Person.prototype;
	
	//inherits(sub,parent)  Node.js的继承方法
	//sub 子类
	//parent 父类构造函数
	util.inherits(Sub,Person);


	var sub = new Sub("小李");
	sub.say();
	//sub.walk();报错 不能继承父类的私有方法

*/

	function Girl(){
		this.name = "女神";
	}

	util.inherits(Girl,events.EventEmitter); //继承事件发射器的构造函数


	//事件回调函数

	function _go(name,eve){
		console.log(name + "去"+eve);
	}

	//产生构造实例
	var girl = new Girl();

	//添加事件
	girl.on('备胎', _go);

	//触发事件
	girl.emit("备胎","备胎1","买个包");
	girl.emit("备胎","备胎2","买个表");
	girl.emit("备胎","备胎3","买个房");
	girl.emit("备胎","备胎4","买个车");
	girl.emit("备胎","备胎5","死");


