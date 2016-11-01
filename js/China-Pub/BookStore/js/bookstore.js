window.onload=function(){

			//console.log(data);
			var MainContent = document.getElementById("main-content");
			var ShopCarNum = document.getElementById("ShopCarNum");
			var ShopNum = document.getElementById("ShopNum");
			var shopCarGoods = document.getElementById("shopCarGoods");
			var shopTb = document.getElementById("shopTb");

			var num = 0;//购物车商品件数
			var booksArr= []//存放购物车商品
			var baseUrl = "http://10.0.161.39:6500";

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

			function showInfo(data){

				//遍历data.js 动态创建dl图书信息
				for(var i = 0; i < data.length; i++){
					data[i].id = i;//给每个对象添加一个ID
					//创建dl
					var dl = document.createElement("dl");
					//创建dt
					var dt = document.createElement("dt");
					var dtImg = document.createElement("img");
					dtImg.setAttribute("src",data[i].pic);
					dt.appendChild(dtImg);
					dl.appendChild(dt);
					//创建dd
					var dd = document.createElement("dd");
					//创建dd中第2个P
					var p1 = document.createElement("p");
					var A = document.createElement("a");
					var B = document.createElement("b");
					B.innerHTML = data[i].bookname;
					var p1span = document.createElement("span");
					p1span.innerHTML = "即时配发";
					A.appendChild(B);
					p1.appendChild(A);
					p1.appendChild(p1span);
					dd.appendChild(p1);

					//创建dd中第2个P
					var p2 = document.createElement("p");
					var p2A1 = document.createElement("a");
					p2A1.innerHTML = data[i].author;
					p2.appendChild(p2A1);

					var p2A2 = document.createElement("a");
					p2A2.innerHTML = data[i].publisher;
					p2.appendChild(p2A2);

					var p2A3 = document.createElement("a");
					p2A3.innerHTML = data[i].isbn;
					p2.appendChild(p2A3);

					var p2A4 = document.createElement("a");
					p2A4.innerHTML = data[i].sjDate;
					p2.appendChild(p2A4);

					var p2A5 = document.createElement("a");
					p2A5.innerHTML = data[i].page+"页";
					p2.appendChild(p2A5);

					dd.appendChild(p2);

					//创建dd中第3个P
					var p3 = document.createElement("p");
					for(var j = 0; j < data[i].pf; j++){
						var p3Img = document.createElement("img");
						p3Img.setAttribute("src","images/star_1.gif");
						p3.appendChild(p3Img);
					}
					for(var k = 0; k < (5-data[i].pf); k++){
						var p3Img0 = document.createElement("img");
						p3Img0.setAttribute("src","images/star_0.gif");
						p3.appendChild(p3Img0);
					}
					var p3b = document.createElement("b");
					p3b.innerHTML = "["+data[i].pf+"人评价]";
					p3.appendChild(p3b);

					dd.appendChild(p3);

					//创建dd中第4个P
					var p4 = document.createElement("p");
					var p4A = document.createElement("a");
					p4A.innerHTML = "VIP价：";
					p4.appendChild(p4A);

					var p4span1 = document.createElement("span");
					p4span1.innerHTML = data[i].hyPrice;
					p4.appendChild(p4span1);

					var p4span2 = document.createElement("span");
					p4span2.innerHTML = "￥"+data[i].hyPrice+"("+data[i].xyPrice+")";
					p4.appendChild(p4span2);

					var p4em = document.createElement("em");
					p4em.innerHTML = "￥"+data[i].price +".00";
					p4.appendChild(p4em);

					dd.appendChild(p4);

					//创建按钮
					var btnDiv = document.createElement("div");
					btnDiv.setAttribute("class","btn");
					var btn1 = document.createElement("button");
					btn1.innerHTML = "购买";
					btnDiv.appendChild(btn1);

					var btn2 = document.createElement("button");
					btn2.innerHTML = "团购";
					btnDiv.appendChild(btn2);

					var btn3 = document.createElement("button");
					btn3.innerHTML = "收藏";
					btnDiv.appendChild(btn3);
					
					dd.appendChild(btnDiv);

					dl.appendChild(dd);

					MainContent.appendChild(dl);

					//给按钮添加监听事件
					(function(){
						var t = i;
						var cnt = 0 ;
						console.log(t);
						btn1.addEventListener("click",function(){
							cnt++;
							num++;
							ShopCarNum.innerHTML = num;
							//给该对象添加count属性，用于存储购物该商品数量
							data[t].count = cnt;
							
							//遍历数组，如果没有该元素信息，则添加
							if (booksArr.length == 0) {
								booksArr.push(data[t]);
							} else{
								//定义一个变量，判断当前元素是否在数组中存在
								var ret = booksArr.indexOf(data[t]);
								if (ret == -1) {
									booksArr.push(data[t]);
								} 

								// for(var n = 0; n < booksArr.length; n++){
								// 	 //console.log(booksArr[n].id);
								// 	if (data[t].id != booksArr[n].id) {
								// 		booksArr.push(data[t]);
								// 	}
								// }
							}
							
						},false);
					})();

				}
			}

			//给购物车按钮添加点击悬浮事件
			ShopNum.onmouseenter = function(){

				//先判断是否有商品添加到购物车
				if (booksArr.length>0) {
					shopCarGoods.style.display = "block";
					//动态创建购物车信息
					for(var t = 0; t < booksArr.length; t++){
						var tr = document.createElement("tr");
						var td1 = document.createElement("td");
						var tdImg = document.createElement("img");
						tdImg.setAttribute("src",booksArr[t].pic);
						td1.appendChild(tdImg);
						tr.appendChild(td1);

						var td2 = document.createElement("td");
						td2.innerHTML = booksArr[t].bookname;
						tr.appendChild(td2);

						var td3 = document.createElement("td");
						td3.innerHTML = booksArr[t].price+"*"+booksArr[t].count;
						tr.appendChild(td3);

						shopTb.appendChild(tr);
					}
				} 

			}
			//鼠标离开事件
			ShopNum.onmouseleave = function(){
				setInterval(function(){
					shopCarGoods.style.display = "none";
					shopTb.innerHTML =  null;
				},3000);
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

}