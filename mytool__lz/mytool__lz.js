//定义一个IIFE，放到匿名函数中，避免变量的污染
(function(g){
	//我的工具类
	function MyUtil(info,baseUrl){
		this.info=info;
		this.baseUrl = baseUrl;
	}
	MyUtil.prototype.print=function(msg){
		console.log("打印："+this.handleDate()+msg);
	}
	MyUtil.prototype.handleDate=function(){
		var now=new Date();
		var result=now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
		return result;
	}
	MyUtil.prototype.isPrototype=function(obj,prop){
		return !obj.hasOwnProperty(prop)&&(prop in obj)
	}


	MyUtil.prototype.createXHR = createXHR;
	function createXHR(){
		//判断浏览器版本是否支持
		if(typeof XMLHttpRequest !='undefined'){
			return new XMLHttpRequest();
		}else if(typeof ActiveXObject !='undefined'){
			if(typeof arguments.callee.activeXString !='String'){
				var versions=['MSXML2.XMLHttp.6.0', 'MSXMLHttp.3.0', 'MSXML2.XMLHttp'];
				//遍历浏览器版本
				for(var i=0;i<versions.length;i++){
					try{
						new ActiveXObject(versions[i]);
						arguments.callee.activeXString=versions[i];
					}catch(e){

					}
					
				}
			}
			return new ActiveXObject(arguments.callee.activeXString);
		}else{
			throw new Error("没法正常的创建ajax对象");
		}
	}


	MyUtil.prototype.ajax = ajax;
	//封装，把参数封装到对象中
	function ajax(obj){
		//1.创建一个XMLHttpRequest对象
		var xhr = createXHR();
		//让浏览器认为每次请求的都是同个资源，不同地址
		obj.url = obj.url + "?rand=" + Math.random();
		//2.初始化
		if(obj.async == true){
			xhr.open(obj.method,obj.url);//异步请求
		}else{
			xhr.open(obj.method,obj.url,false);//同步请求
		}
		//3.发送
		//设置请求头
		if(obj.sendType == 'application/json'){

			xhr.setRequestHeader("Content-type","application/json");
			xhr.send(JSON.stringify(obj.data))

		}else if(obj.sendType == 'application/x-www-form-urlencoded'){

			xhr.setRequestHeader("Content-type","application/www-form-urlencoded");
			xhr.send(handleDate(obj.data));
			
		}else{
			throw new Error('其他的格式数据发送未支持');
		}

		//4.处理响应
		xhr.onreadystatechange = function(){
			if(xhr.status == 200 || xhr.status == 304){
				if(xhr.readyState == 4){
					callback();//回调函数
				}
			}
		}
		function callback(){
			obj.success(xhr.responseText);
		}
	}

	function handleDate(data){
		var ar = [];
		for(var p in data){
			ar.push(p+'='+data[p]);
		}
		return ar.join('&');
	}

	

	var mTool=new MyUtil("我的工具");

	g.tool=mTool;

})(window);
