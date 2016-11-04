var url = require("url");//用来解请求地址

var href = "http://www.baidu.com:8080/shop/index.html?user=admin&pwd=12345&type=login#1";

console.log(url.parse(href));

//输出结果中：
//  query: 'user=admin&pwd=12345&type=login',//查询字符串 不含问号
//  pathname: '/shop/index.html',//请求路径 不含主机、查询字符串等

// console.log(url.parse(href,true));
//输出结果中：
//  query: {'user:'admin',pwd:'12345',type:'login'},//查询字符串 不含问号

//传入true 与不传的区别是是否将query解析成对象



//常用方法
var obj = url.parse(href,true);
console.log(obj.query); //解出参数对象

//format() 将对象转换为字符串(请求地址)
var hObj = {
    protocol: 'http:',//请求协议 http https ssl ftp ftps
    slashes: true,//是否包含双斜杠
    auth: null,//作者
    host: 'www.baidu.com:8080',//主机 含端口号
    port: '8080',//端口号
    hostname: 'www.baidu.com', //主机名 不含端口号
    hash: '#1',//锚点值 哈希
    search: '?user=admin&pwd=12345&type=login',//搜索字符串 含问号
    query: 'user=admin&pwd=12345&type=login',//查询字符串 不含问号
    pathname: '/shop/index.html',//请求路径 不含主机、查询字符串等
    path: '/shop/index.html?user=admin&pwd=12345&type=login',
    href: 'http://www.baidu.com:8080/shop/index.html?user=admin&pwd=12345&type=login#1'
}
console.log(url.format(hObj));


