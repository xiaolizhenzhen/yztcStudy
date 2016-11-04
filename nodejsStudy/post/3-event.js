var events = require("events");//获取事件模块
var event = new events.EventEmitter();//调用事件发射器对象产生实例

/*

	//events的使用方法 
	//on(eventName,callback)
	//eventName ： 事件名称
	//callback ：事件被触发时执行的函数

	//添加事件
	event.on('事件1',function() {
		console.log("被触发");
	});

	//触发事件  其它常规的事件触发用trige
	event.emit("事件1");


	//添加事件
	event.on('事件2',function(val，val2) {
		console.log("被触发"+val+val2);
	});

	//触发事件时   传入参数   
	//传多个参数用，隔开，和call的调用方式一样
	event.emit("事件2","这是传进去的值","参数2");

*/

	function callback(val){
		console.log("执行："+val);
	}

	//node并不建议为同一个对象添加超过十个同样的事件
	//因为它有可能造成内存问题，如果必须要添加 
	//可以使用event.setMaxListeners(number)来设置最大添加数量
	event.setMaxListeners(15);

	event.on("动作",callback);
	event.on("动作",callback);
	event.on("动作",callback);
	event.on("动作",callback);
	event.on("动作",callback);

	event.on("动作",callback);
	event.on("动作",callback);
	event.on("动作",callback);
	event.on("动作",callback);
	event.on("动作",function(){
		console.log("这是动作10");
	});
	event.on("动作",function(){
		console.log("这是动作11");
	});


	event.emit("动作","跑");

	//移除单个监听事件
	//event.removeListener("动作",callback);
	//移除所有监听
	event.removeAllListeners();


	event.emit("动作","跑");
