//查询字符串  querystring
/*
	querystring 内置模块 用来解析查询字符串

*/

//加载模块
var qs = require("querystring");


var str = "user=admin&pwd=123&type=login";
//var href = req.url;
//url.parse(href,true).query;
//parse()  将字符串转为对象
console.log(qs.parse(str));

var obj = {
	user : "admin",
	pwd : 123,
	type : "login"
}
//stringify将对象转换成字符串，字符串里多个参数将用 ‘&' 分隔，将用 ‘=' 赋值。
console.log(qs.stringify(obj)); //默认情况 & =  a=b&c=d
console.log(qs.stringify(obj,"#"));//两个参数 &被替换为指定值  a=b#c=d
console.log(qs.stringify(obj,"#","-"));//三个参数 &被第二个参数替换 =被第三个参数替换  a-b#c-d

var str = "user=admin&pwd=123&type=login";
var str1 = "user=admin*pwd=123*type=login";
var str2 = "user-admin#pwd-123#type-login";

console.log(qs.parse(str));
console.log(qs.parse(str1,"*"));
console.log(qs.parse(str2,"#","-"));


