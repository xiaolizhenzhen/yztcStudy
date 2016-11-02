//实现打印
function print(msg){
	var now = new Date();
	var result = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();
	console.log(msg);
	return result;
}

exports.print = print;