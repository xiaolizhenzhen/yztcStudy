//alert("我是test.js");

//类似休眠的脚本  写个死循环

var time1 = 5000; //5s
var n1 = new Date().getTime();
while(true){
	//console.log("67890-789");
	if (new Date().getTime() - n1 > time1) {
		break;
	} 
}
alert("我是test1.js");
