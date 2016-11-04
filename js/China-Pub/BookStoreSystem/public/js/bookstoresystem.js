window.onload = function(){

	var baseUrl = "http://10.0.161.39:6500";
	var tbody = document.getElementsByTagName("tbody")[0];
	var username = $("username");
	var password = $("password");
	
	
	var infoArr=[]; 
	var objData;
	var morecheckArr = [];//定义一个全局空数组，用于存放多选的按钮

	//页面加载，登录页面显示
	var login = $("login");
	login.style.display = 'block';

	window.onkeydown = function(e){//回车键提交
		var e = e || window.event;
		if(e.keyCode == 13 ){
			Login();
		}
	}
			
	//点击登录进行验证
	$("loginbtn").onclick = Login; 
	//登录验证
	function  Login(){
		var userValue = username.value;
		var passValue = password.value;
		if (userValue == '' || passValue == '') {
			alert("请输入用户名和密码！");
		} else{
			//定义一个用户信息对象
			var userObj = {
				username:userValue,
				password:passValue
			};

			var xhr = createXHR();
			xhr.open("post",baseUrl+"/users/login",true);
			//如果是post请求需要加请求头
			xhr.setRequestHeader("content-type","application/json");
			//JSON.stringify(userObj)把对象转换成json字符串
			xhr.send(JSON.stringify(userObj));
			xhr.onreadystatechange = function() {
    			if (xhr.readyState == 4) {
    				if(xhr.status >=200 && xhr.status <300){
        				//JSON.parse()将json字符串转换成对象
        				//currentUserId = JSON.parse(xhr.responseText).uid;
        				//登录成功！
						//登录界面隐藏，显示加载数据页面
						login.style.display = 'none';
						$("content").style.display = "block";
						
        				//动态创建数据
        				loadBookInfo();

        				$("adminpic").onmouseenter = function(){
							$("admin").style.display = 'block';
							loadUserInfo(userValue);
							$("cancel").onclick = cancel;
						};
						$("adminpic").onmouseleave = function(){
							setInterval(function(){
								$("admin").style.display = 'none';
							},2000);
							
						};

        			}else{
        				alert("用户名或密码错误！");
        			}
    			}
    		}
    	}
	};

	//加载数据
	function loadBookInfo(){
		tbody.innerHTML = " ";
		var xhr = createXHR();
		xhr.open("get",baseUrl+"/books");
		xhr.send(null);
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if(xhr.status >=200 && xhr.status <300){
					infoArr = JSON.parse(xhr.responseText);
					showInfo(infoArr);
				}
			}
		}
	}

	//显示数据
	function showInfo(infoArr){
		tbody.innerHTML = '';
		if(infoArr.length == 0){
			//如果没有数据
			var tr = cj("tr");
			var td = cj("td");
			td.setAttribute("colspan",7);
			td.innerHTML = "没有数据资源";
			tr.appendChild(td);
			tbody.appendChild(tr);
		}else{
			//有数据
			//遍历数组获取每个对象
			for(var i = 0 ; i < infoArr.length; i++){
				var data = infoArr[i]; 
				showDataOnPage(data);
			}
			
		}
	}

	function showDataOnPage(data){
			var tr = cj("tr");
			tr.setAttribute("class","tbtr");

			//console.log(data);
			//创建第一列
			var td1 = cj("td");
			var checkbox = cj("input");
			checkbox.setAttribute("type","checkBox");
			checkbox.setAttribute("class","checkbtn");
			checkbox.onclick = morecheck;
			td1.appendChild(checkbox); 
			var A = cj("a");
			A.innerHTML = data.id;
			A.setAttribute("class","ID");
			td1.appendChild(A);
			tr.appendChild(td1);

			//创建第二列
			var td2 = cj("td");
			var img = cj("img");
			img.setAttribute("src",data.pic);
			img.setAttribute("class","imgTd");
			img.onmouseenter = showImg;
			img.onmouseleave = function(){
				//鼠标离开图片，大图效果隐藏
				$("imgBox").style.display = "none";
			};
			td2.appendChild(img);
			tr.appendChild(td2);

			//创建第三列
			var td3 = cj("td");
			var A1 = cj("a");
			A1.innerHTML = data.bookname;
			td3.appendChild(A1);
			tr.appendChild(td3);

			//创建第四列
			var td4 = cj("td");
			var A2 = cj("a");
			A2.innerHTML = data.author;
			td4.appendChild(A2);
			tr.appendChild(td4);

			//创建第五列
			var td5 = cj("td");
			td5.innerHTML = data.price;
			tr.appendChild(td5);

			//创建第六列
			var td6 = cj("td");
			td6.innerHTML = data.publisher;
			tr.appendChild(td6);

			//创建第七列
			var td7 = cj("td");
			var span1 = cj("span");
			span1.innerHTML = "删除";
			span1.setAttribute("class","delmsg");
			span1.onclick = deletbookInfo;
			td7.appendChild(span1);

			var span2 = cj("span");
			span2.innerHTML = "修改";
			span2.setAttribute("class","modmsg");
			span2.onclick = modifybookInfo;

			

			td7.appendChild(span2);
			tr.appendChild(td7);

			tbody.appendChild(tr);
	}

	//加载用户信息
	function loadUserInfo(userValue){
		$("admin").innerHTML = '';
		var li1 = cj("li");
		var h6 = cj("h6");
		h6.innerHTML = userValue;
		li1.appendChild(h6);
		$("admin").appendChild(li1);

		var li2 = cj("li");
		var A1 = cj("a");
		A1.innerHTML = "个人信息";
		li2.appendChild(A1);
		$("admin").appendChild(li2);

		var li3 = cj("li");
		var A2 = cj("a");
		A2.innerHTML = "修改信息";
		li3.appendChild(A2);
		$("admin").appendChild(li3);

		var li4 = cj("li");
		var A3 = cj("a");
		A3.innerHTML = "个人简介";
		li4.appendChild(A3);
		$("admin").appendChild(li4);

		var li5 = cj("li");
		var button = cj("button");
		button.setAttribute("id","cancel");
		button.innerHTML = "注销";
		li5.appendChild(button);
		$("admin").appendChild(li5);
	
	}


	//注销用户信息
	
	function cancel(){
		var xhr = createXHR();
		xhr.open("post",baseUrl+"/users/logout",true);
		//如果是post请求需要加请求头
		xhr.setRequestHeader("content-type","application/json");
		//JSON.stringify(userObj)把对象转换成json字符串
		xhr.send(null);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if(xhr.status >=200 && xhr.status <300){
    				$("content").style.display = 'none';
					$("main").style.display = "none";
					$("login").style.display = "none";
					$("logout").style.display = "block";
					$("admin").remove();

    			}
			}
		}
		
	}


	//添加书籍
	$("addBookBtn").onclick = function(){
		$("change").style.display = 'block';
		createAddModUl();
		$("changeTitle").innerHTML = "添加数据";
		$("addbook").innerHTML = "添加书籍";
		$("addBtn").innerHTML = "确定";
		$("addBtn").onclick = addbookInfo;
	
		/*
			$("bookname").value = "";
			$("fTitle").value = "";
			$("price").value = "";
			$("hyPrice").value = "";
			$("xyPrice").value = "";
			$("pf").value = "";
			$("author").value ="";
			$("publisher").value ="";
			$("isbn").value = "";
			$("sjDate").value = "";
			$("pubDate").value = "";
			$("kb").value = "";
			$("page").value = "";
			$("version").value = "";
			$("category").value = "";
			$("pic").value = "";

			$("changeTitle").innerHTML = "添加数据";
			$("addbook").innerHTML = "添加书籍";
			$("addBtn").innerHTML = "确定";

			$("addBtn").onclick = addInfo;
			$("minwin").onclick = minwin;

			$("close").onclick = function(){
				$("change").style.display = 'none';
			}
		*/

	}

	//刷新数据
	$("updateBookBtn").onclick = function(){
		loadBookInfo();
	}

	//最小化窗口
	$("minwin").onclick = minwin;
	function minwin(){
		$("change").style.display = 'none';
		$("addbook").style.display = "block";
		$("addbook").onclick = function(){
			$("addbook").style.display = "none";
			$("change").style.display = 'block';
		};

	}
	$("close").onclick = close;
	function close(){
		$("change").style.display = 'none';
	}

	//全选反选按钮
	$("checkAllBtn").onclick = function(){
		//先判断是否选中
		var checkbtn = document.getElementsByClassName("checkbtn");
		if (this.checked) {
			for(var k = 0; k < checkbtn.length; k++){
				checkbtn[k].checked = true;
				$("delcheck").style.display = "block";
				$("delcheck").onclick = function(){
					$("delcheck").style.display = "none";
					$("del").style.display = "block";
					$("yes").onclick = function(){
						for(var s = 0; s < infoArr.length; s++  ){
							$("del").style.display = "none";
							deletInfo(infoArr[s]);
						}
					};
					$("no").onclick = function(){
						$("del").style.display = "none";
						for(var z = 0; z < checkbtn.length; z++){
							checkbtn[z].checked = false;
							$("checkAllBtn").checked = false;
						}
					}
				}
			}
		} else{
			for(var k = 0; k < checkbtn.length; k++){
				$("delcheck").style.display = "none";
				$("del").style.display = "none";
				checkbtn[k].checked = false;
			}
		};
	}


	//多选事件
	function morecheck(){
		var moreDeleSel = document.getElementsByClassName("checkbtn");
		if (this.checked) {
			console.log(this);//input
			console.log(this.nextSibling.innerHTML);//id
			morecheckArr.push(this.nextSibling.innerHTML);
		} 
		if (morecheckArr.length > 1) {
			$("delcheck").style.display = "block";
			$("delcheck").onclick = function(){
				$("delcheck").style.display = "none";
				$("del").style.display = "block";
				$("yes").onclick = function(){
					$("del").style.display = "none";
					for(var j = 0; j < morecheckArr.length; j++){
						//console.log(morecheckArr[j]);//id
						var obj = checkInfo(morecheckArr[j])
						deletInfo(obj);
					}
				}
				$("no").onclick = function(){
					$("del").style.display = "none";
					$("delcheck").style.display = "none";
					for(var i = 0; i < moreDeleSel.length; i++){
						moreDeleSel[i].checked = false;
					}
				}
			}
		} 
	}


	//添加书籍信息		
	function addbookInfo(){
		var inputs = $("formUl").getElementsByTagName("input");
		var obj = {};
		for(var i = 0 ; i < inputs.length; i++){
			obj[inputs[i].getAttribute("name")] = inputs[i]["value"];
		}
		if (obj.bookname && obj.fTitle && obj.price && obj.hyPrice && obj.xyPrice && obj.pf && obj.author && obj.pubDate && obj.pic) {
			var xhr =  createXHR();
			xhr.open("post",baseUrl+"/books");
			xhr.setRequestHeader("Content-type","application/json");
			xhr.send(JSON.stringify(obj));
			xhr.onreadystatechange = function(){
				if (xhr.status == 200 || xhr.status ==304) {
					if (xhr.readyState == 4) {
						//console.log(xhr.responseText);
						$("change").style.display = 'none';
						//尽量不要刷新页面重新加载，那样效率会底下，而且加载数据需要浏览，需要时间，不好
						showDataOnPage(JSON.parse(xhr.responseText));
					}
				} 
			}
		} else{
			alert("请添加数据！");
		}
	}

	//动态创建添加修改弹出框
	function createAddModUl(){
		$("formUl").innerHTML="";
		for(var p in obj1){
			var mLi = document.createElement("li");
			var mSpan = document.createElement("span");
			var mInput = document.createElement("input");
			mSpan.innerHTML =obj1[p];
			mInput.setAttribute("name",p);
			mInput.setAttribute("type","text");
			mLi.appendChild(mSpan);
			mLi.appendChild(mInput);
			$("formUl").appendChild(mLi);
		}
	}

			
	//通过id查询数据，返回对象
	function checkInfo(id){
		for(var n = 0 ; n < infoArr.length; n++){
			if (infoArr[n].id == id) {
				return infoArr[n];
			} 
		}
	}	

	//删除页面数据 DOM操作
	function delPageData(thisId){
		var allID = document.getElementsByClassName("ID");
		for(var q = 0 ; q < allID.length; q++){
			var str = allID[q].innerHTML;
			if (str == thisId) {
				//console.log("+++++++++");
				//console.log(allID[q].parentNode.parentNode);
				tbody.removeChild(allID[q].parentNode.parentNode);
			} 
		}
	}

	//显示大图，放大镜
	function showImg(e){
		//找出图片所在的位置
		//console.log(this);
		$("imgBox").innerHTML = ' ';
		var x = this.offserLeft;
		var y = this.parentNode.offsetTop;
		var bigImg  = cj("img");
		//console.log(y);
		//console.log(this);
		bigImg.src = this.getAttribute("src");
		$("imgBox").style.display = "block";
		$("imgBox").style.left = $("tb").offsetLeft + 190 +"px";
		$("imgBox").style.top = y + 220 +"px";
		$("imgBox").appendChild(bigImg);
	}

	// function bookObj(){
	// 	//定义一个空对象，用于存放添加的书籍信息
	// 	var obj = {};
	// 	//添加属性和值
	// 	obj.bookname = $("bookname").value;
	// 	obj.fTitle = $("fTitle").value;
	// 	obj.price = $("price").value;
	// 	obj.hyPrice = $("hyPrice").value;
	// 	obj.xyPrice = $("xyPrice").value;
	// 	obj.pf = $("pf").value;
	// 	obj.author = $("author").value;
	// 	obj.publisher = $("publisher").value;
	// 	obj.isbn = $("isbn").value;
	// 	obj.sjDate  = $("sjDate").value;
	// 	obj.pubDate = $("pubDate").value;
	// 	obj.kb = $("kb").value;
	// 	obj.page = $("page").value;
	// 	obj.version = $("version").value;
	// 	obj.category = $("category").value;
	// 	obj.pic =$("pic").value;

	// 	return obj;
	// }

	//增加书籍信息
	function addInfo(){
		//bookObj();

		//定义一个空对象，用于存放添加的书籍信息
		var obj = {};
		//添加属性和值
		obj.bookname = $("bookname").value;
		obj.fTitle = $("fTitle").value;
		obj.price = $("price").value;
		obj.hyPrice = $("hyPrice").value;
		obj.xyPrice = $("xyPrice").value;
		obj.pf = $("pf").value;
		obj.author = $("author").value;
		obj.publisher = $("publisher").value;
		obj.isbn = $("isbn").value;
		obj.sjDate  = $("sjDate").value;
		obj.pubDate = $("pubDate").value;
		obj.kb = $("kb").value;
		obj.page = $("page").value;
		obj.version = $("version").value;
		obj.category = $("category").value;
		obj.pic =$("pic").value;
		//console.log(obj);

		//遍历添加的对象，看是否为空，为空不添加，不为空添加
			
		if (obj.bookname && obj.fTitle && obj.price && obj.hyPrice && obj.xyPrice && obj.pf && obj.author && obj.pubDate && obj.pic) {
			var xhr = createXHR();
			xhr.open("post",baseUrl+"/books",true);
			xhr.setRequestHeader("Content-Type","application/json");
			xhr.send(JSON.stringify(obj));
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status >=200 && xhr.status < 300 ){
						$("change").style.display = 'none';
						loadBookInfo();
					}
				}
			}
		} else{
			alert("请添加数据！");
		}

	}

	//删除信息 传参为一个对象
	function deletInfo(data){
		var xhr = new XMLHttpRequest();
		xhr.open("delete",baseUrl+"/books");
		xhr.setRequestHeader("content-type","application/json");
		xhr.send(JSON.stringify(data));
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if(xhr.status >=200 && xhr.status <300){
					loadBookInfo();
				}
			}
		}
	}

	//删除事件
	function deletbookInfo(){
		// //删除事件
		// var delmsg = document.getElementsByClassName("delmsg");
		// //console.log(delmsg);
		// for(var k = 0; k < delmsg.length; k++){
		// 	delmsg[k].onclick = function(){
				//console.log(this);

				//console.log(this);
				//console.log(this.parentNode.parentNode.firstChild.lastChild.innerHTML);

				var thisId = this.parentNode.parentNode.firstChild.lastChild.innerHTML;
				objData = checkInfo(thisId);
				this.parentNode.parentNode.firstChild.firstChild.setAttribute("checked","checked");
				$("del").style.display = "block";
				flag = true;
				$("yes").onclick = function(){
					$("del").style.display = 'none';
					deletInfo(objData);
					//console.log(objData);
				}
				$("no").onclick = function(){
					$("del").style.display = 'none';
				}
		// 	}
			
		// }
	}

	//修改信息
	function modifyInfo(thisId,obj){
		//console.log("哈哈："+thisId);
		var xhr = createXHR();
		xhr.open("put",baseUrl+"/books/"+thisId);
		xhr.setRequestHeader("content-type","application/json");
		xhr.send(JSON.stringify(obj));
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if(xhr.status >=200 && xhr.status < 300 ){
					obj.id = thisId;
					showDataOnPage(obj);
					//console.log(obj.id);
					//loadBookInfo();
				}
			}
		}
	}

	//修改事件
	function modifybookInfo(){
		//修改事件   之前的方法
		// var modmsg = document.getElementsByClassName("modmsg");
		// for(var t = 0; t < modmsg.length; t++){
		// 	modmsg[t].onclick = function(){
				var thisId = this.parentNode.parentNode.firstChild.lastChild.innerHTML;
				objData = checkInfo(thisId);
				$("change").style.display = "block";
				$("changeTitle").innerHTML = "修改数据";
				$("addbook").innerHTML = "修改书籍";
				$("addBtn").innerHTML = "确定修改";
				createAddModUl();

				//遍历input标签并为其赋值
				var inputs = $("formUl").getElementsByTagName("input");
				for(var i = 0 ; i < inputs.length; i++){
					inputs[i]["value"] = objData[inputs[i].getAttribute("name")];
				}

				$("addBtn").onclick = function(){
					$("change").style.display = "none";
					var obj = {};
					//添加属性和值
					for(var i = 0 ; i < inputs.length; i++){
						obj[inputs[i].getAttribute("name")]=inputs[i]["value"];
					}
					delPageData(thisId);
					modifyInfo(thisId,obj);
				}
				

			/*
					$("change").style.display = "block";
				
					$("bookname").value = objData.bookname;
					$("fTitle").value = objData.fTitle;
					$("price").value = objData.price;
					$("hyPrice").value = objData.hyPrice;
					$("xyPrice").value = objData.xyPrice;
					$("pf").value = objData.pf;
					$("author").value = objData.author;
					$("publisher").value = objData.publisher;
					$("isbn").value = objData.isbn;
					$("sjDate").value = objData.sjDate;
					$("pubDate").value = objData.pubDate;
					$("kb").value = objData.kb;
					$("page").value = objData.page;
					$("version").value = objData.version;
					$("category").value = objData.category;
					$("pic").value = objData.pic;

					$("changeTitle").innerHTML = "修改数据";
					$("addbook").innerHTML = "修改书籍";
					$("addBtn").innerHTML = "确定修改";


					$("addBtn").onclick = function(){
						$("change").style.display = "none";
						// 1、//先删除后增加  这种方法不好，id变了
						// deletInfo(objData);
						// addInfo();

						var obj = {};
						//添加属性和值
						obj.bookname = $("bookname").value;
						obj.fTitle = $("fTitle").value;
						obj.price = $("price").value;
						obj.hyPrice = $("hyPrice").value;
						obj.xyPrice = $("xyPrice").value;
						obj.pf = $("pf").value;
						obj.author = $("author").value;
						obj.publisher = $("publisher").value;
						obj.isbn = $("isbn").value;
						obj.sjDate  = $("sjDate").value;
						obj.pubDate = $("pubDate").value;
						obj.kb = $("kb").value;
						obj.page = $("page").value;
						obj.version = $("version").value;
						obj.category = $("category").value;
						obj.pic =$("pic").value;

						//bookObj();


						var xhr = createXHR();
						xhr.open("put",baseUrl+"/books/"+thisId);
						xhr.setRequestHeader("content-type","application/json");
						xhr.send(JSON.stringify(obj));
						xhr.onreadystatechange = function(){
							if(xhr.readyState == 4){
								if(xhr.status >=200 && xhr.status < 300 ){
									loadBookInfo();
								}
							}
						}
					}
			*/

		// 	}
		// }
	}

	//创建请求对象
	function createXHR(){
		//如果浏览器支持XMLHttpRequest，那么直接创建返回该对象
		if(typeof XMLHttpRequest != 'undefined'){
			return new XMLHttpRequest();
		}else if (typeof ActiveXObject != 'undefined'){
			if(typeof arguments.callee.activeXString != 'string'){
				var versions = ['MSXML2.XMLHttp.6.0','MSXML2.XMLHttp.3.0','MSXML2.XMLHttp'];
				for(var i = 0; i < versions.length; i++){
					try{
						new ActiveXObject(versions);
						//arguments对象数组
						//callee代表函数对象自己
						//activeXString代表对象的一个属性
						//添加属性并赋值
						arguments.callee.activeXString = versions[i];
					}catch(e){
						//可以不做异常处理
					}
				}
			}

			return  new ActiveXObject(arguments.callee.activeXString);
		}else{
			throw new Error("无法正常创建ajax对象");
		}
	}

	//通过id获取元素
	function $(id){
		return document.getElementById(id);
	}

	//创建元素
	function cj(TagName){
		return document.createElement(TagName);
	}

	

}
