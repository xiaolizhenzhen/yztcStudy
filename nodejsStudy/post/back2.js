//alert("我是test.js");

//类似休眠的脚本  写个死循环

var time = 10000; //10s
var n = new Date().getTime();
while(true){
	//console.log("67890-789");
	if (new Date().getTime() - n > time) {
		break;
	} 
}
alert("我是test.js");
