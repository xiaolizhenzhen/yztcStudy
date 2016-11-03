var url = require("url"); //用来解请求地址
var href = "http://www.baidu.com:8080/shop/index.html?user=admin&pwd=12345&type=login#1";

//url.parse(地址字符串) 把地址字符串转换成对象
console.log(url.parse(href)); //解地址
console.log(url.parse(href,true)); 
//传入true 与不传入true差别在于是否将query解析成对象
//传true 时  query 解析结果是对象(键值)

var obj = url.parse(href,true);
console.log(obj.query);

//url.format() 将对象转换为字符串(请求地址)
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