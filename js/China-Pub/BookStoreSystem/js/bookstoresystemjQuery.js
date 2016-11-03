$(function(){

	var baseUrl = "http://10.0.161.39:6500";
	var tbody = $("tbody:first");
	var username = $("#username");
	var password = $("#password");
	
	
	var infoArr=[]; 
	var objData;
	var morecheckArr = [];//定义一个全局空数组，用于存放多选的按钮

	//页面加载，登录页面显示
	$("#login").css("display","block");
	$(window).keydown(function(e){//回车键提交
		var e = e || window.event;
		if(e.keyCode == 13 ){
			Login();
		}
	});
			
	//点击登录进行验证
	$("#loginbtn").click(function(){
		Login();
	}) 
	//登录验证
	function  Login(){
		var userValue = username.val();
		var passValue = password.val();
		if (userValue == '' || passValue == '') {
			alert("请输入用户名和密码！");
		} else{

			// //定义一个用户信息对象
			var userObj = {
				username:userValue,
				password:passValue
			};
			//console.log(userObj);
			$.ajax({
				url: baseUrl+"/users/login",
				// url: baseUrl+"/users/login",
				type: 'post',
				data: userObj
			})
			.done(function() {

				$("#login").css("display","none");
				$("#content").css("display","block");
				//动态创建数据
				loadBookInfo();

				$("#adminpic").on('mouseenter', function(event) {
					event.preventDefault();
					$("#admin").css("display","block");
					loadUserInfo(userValue);
					$("#cancel").on('click', function(event) {
						event.preventDefault();
						cancel();
					});
				});
				
				$("#adminpic").on('mouseleave',  function(event) {
					event.preventDefault();
					setInterval(function(){
						$("#admin").css("display","none");
					},2000);
				});
			})
			.fail(function() {
				alert("用户名或密码错误！");
			})

    	}
	};

	//加载数据
	function loadBookInfo(){
		tbody.html(" ");
		$.ajax({
			url: baseUrl+"/books",
			type: 'GET',
		})
		.done(function(data) {
			infoArr = data;
			showInfo(infoArr);
		})
		
	}

	//显示数据
	function showInfo(infoArr){
		tbody.html(" ");
		if(infoArr.length == 0){
			//如果没有数据
			tbody.append(
				$("<tr></tr>").append(
					$("<td>没有数据资源</td>").attr("colspan",'7')
				)
			);
		}else{
			//有数据
			//遍历数组获取每个对象
			for(var i = 0 ; i < infoArr.length; i++){
				var data = infoArr[i]; 
				showDataOnPage(data);
			}
			
		}
	}

	//动态创建表格显示数据
	function showDataOnPage(data){
			tbody.append(
				$("<tr></tr>").addClass("tbtr").append(
					$("<td></td>").append(
						$("<input type='checkBox'/>").addClass('checkbtn').click(function(event) {
							morecheck();
						})
					).append(
						$("<a></a>").addClass('ID').html(data.id)
					)
				).append(
					$("<td></td>").append($("<img />").attr("src",data.pic).addClass("imgTd").mouseenter(function(){
							var that = $(this);
							showImg(that);
						}).mouseleave(function(){
							//鼠标离开图片，大图效果隐藏
							$("#imgBox").css("display","none");
						}))
				).append(
					$("<td></td>").append($("<a></a>").html(data.bookname))
				).append(
					$("<td></td>").append($("<a></a>").html(data.author))
				).append(
					$("<td></td>").html(data.price)
				).append(
				    $("<td></td>").html(data.publisher)
				).append(
					$("<td></td>").append(
					$("<span>删除</span>").addClass('delmsg').click(function(){
						var del = this;
						deletbookInfo(del);
					})).append(
						$("<span>修改</span>").addClass('modmsg').click(function(){
							var mod = this;
							modifybookInfo(mod);
						})
					)
				)
			)
	}

	//加载用户信息
	function loadUserInfo(userValue){
		$("#admin").html(" ")
		$("#admin").append(
			$("<li></li>").append(
				$("<h6></h6>").html(userValue)
			)
		).append(
			$("<li></li>").append(
				$("<a>个人信息</a>")
			)
		).append(
			$("<li></li>").append(
				$("<a>修改信息</a>")
			)
		).append(
			$("<li></li>").append(
				$("<a>个人简介</a>")
			)
		).append(
			$("<li></li>").append(
				$("<button>注销</button>").attr("id","cancel")
			)
		)
	}


	//注销用户信息
	function cancel(){
		$.ajax({
			url: baseUrl+"/users/logout",
			type: 'POST'
		})
		.done(function() {
			$("#content").css("display","none");
			$("#main").css("display","none");
			$("#login").css("display","none");
			$("#logout").css("display","block");
			$("#admin").remove();
		})
	}


	//添加书籍
	$("#addBookBtn").click(function(){
		$("#change").css("display",'block');
		createAddModUl();
		$("#changeTitle").html("添加数据");
		$("#addbook").html("添加书籍");
		$("#addBtn").html("确定");
		$("#addBtn").click(function(){
			addbookInfo();
		})
	});

	//刷新数据
	$("#updateBookBtn").click(function(){
		loadBookInfo();
	});

	//最小化窗口
	$("#minwin").click(function(){
		minwin();
	})
	function minwin(){
		$("#change").css("display","none");
		$("#addbook").css("display","block");
		$("#addbook").click(function(){
			$("#addbook").css("display","none");
			$("#change").css("display","block");
		});
	}
	$("#close").click(function(){
		close();
	})
	function close(){
		$("#change").css("display",'none');
	}



	//全选反选按钮
	$("#checkAllBtn").click(function(){
		//先判断是否选中
		var checkbtn = document.getElementsByClassName("checkbtn");
		if (this.checked) {
			for(var k = 0; k < checkbtn.length; k++){
				checkbtn[k].checked = true;
				$("#delcheck").css("display","block");
				$("#delcheck").click(function(){
					$("#delcheck").css("display",'none');
					$("#del").css("display","block");
					$("#yes").click(function(){
						for(var s = 0; s < infoArr.length; s++  ){
							$("#del").css("display",'none');
							deletInfo(infoArr[s]);
						}
					});
					$("#no").click(function(){
						$("#del").css("display",'none');
						for(var z = 0; z < checkbtn.length; z++){
							checkbtn[z].checked = false;
							$("#checkAllBtn").checked = false;
						}
					});
				})
			}
		} else{
			for(var k = 0; k < checkbtn.length; k++){
				$("#delcheck").css("display",'none');
				$("#del").css("display",'none');
				checkbtn[k].checked = false;
			}
		};
	});


	//多选事件
	function morecheck(){
		var moreDeleSel = $(".checkbtn");
		if (this.checked) {
			// console.log(this);//input
			console.log(this.nextSibling.innerHTML);//id
			morecheckArr.push(this.nextSibling.innerHTML);
		} 
		if (morecheckArr.length > 1) {
			$("#delcheck").css("display","block");
			$("#delcheck").click(function(){
				$("#delcheck").css("display",'none');
				$("#del").css("display","block");
				$("#yes").click(function(){
					$("#del").css("display",'none');
					for(var j = 0; j < morecheckArr.length; j++){
						//console.log(morecheckArr[j]);//id
						var obj = checkInfo(morecheckArr[j])
						deletInfo(obj);
					}
				})
				$("#no").click(function(){
					$("#del").css("display",'none');
					$("#delcheck").css("display",'none');
					for(var i = 0; i < moreDeleSel.length; i++){
						moreDeleSel[i].checked = false;
					}
				});
			});
		} 
	}


	//添加书籍信息		
	function addbookInfo(){
		var inputs = $("#formUl input");
		var obj = {};
		for(var i = 0 ; i < inputs.length; i++){
			// console.log(inputs[i]);
			// console.log(inputs[i].name);
			// console.log(inputs[i].value);
			obj[inputs[i].name] = inputs[i].value;
			// console.log(inputs[i].attr("name"))
			// console.log(obj[inputs[i].attr("name")]);
			// obj[inputs[i].attr("name")] = inputs[i]["value"];
		}
		//console.log(obj);
		if (obj.bookname && obj.fTitle && obj.price && obj.hyPrice && obj.xyPrice && obj.pf && obj.author && obj.pubDate && obj.pic) {

			$.ajax({
				url: baseUrl+"/books",
				type: 'POST',
				data: obj,
			})
			.done(function(data) {
				$("#change").css("display",'none');
				showDataOnPage(data);
			})
			
		} else{
			alert("请添加数据！");
		}
	}

	//动态创建添加修改弹出框
	function createAddModUl(){
		$("#formUl").html("");
		for(var p in obj1){
			$("#formUl").append(
				$("<li></li>").append(
					$("<span></span>").html(obj1[p])
				).append(
					$("<input type='text'/>").attr("name",p)
				)
			)
			// console.log(p);
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
		//console.log(thisId);
		var allID = $(".ID");
		for(var q = 0 ; q < allID.length; q++){
			var str = $(allID[q]).html();
			//console.log(str);
			if (str == thisId) {
				var tr = $(allID[q]).parent("td").parent("tr")[0];
				$("tbody")[0].removeChild(tr);
			} 
		}
	}

	//显示大图，放大镜
	function showImg(img){
		//找出图片所在的位置
		//console.log(this);//window
		
		$("#imgBox").html("");
		$("#imgBox").css({
				"display" : "block",
				left : ($("#tb").offset().left + 190)+"px",
				top : ($(img).parent("td").offset().top + 10)+"px"
			}).append(
			$("<img />").attr("src",$(img).attr("src"))
		);
	}


	//增加书籍信息
	// function addInfo(){
	// 	//bookObj();

	// 	//定义一个空对象，用于存放添加的书籍信息
	// 	var obj = {};
	// 	//添加属性和值
	// 	obj.bookname = $("#bookname").val();
	// 	obj.fTitle = $("#fTitle").val();
	// 	obj.price = $("#price").val();
	// 	obj.hyPrice = $("#hyPrice").val();
	// 	obj.xyPrice = $("#xyPrice").val();
	// 	obj.pf = $("#pf").val();
	// 	obj.author = $("#author").val();
	// 	obj.publisher = $("#publisher").val();
	// 	obj.isbn = $("#isbn").val();
	// 	obj.sjDate  = $("#sjDate").val();
	// 	obj.pubDate = $("#pubDate").val();
	// 	obj.kb = $("#kb").val();
	// 	obj.page = $("#page").val();
	// 	obj.version = $("#version").val();
	// 	obj.category = $("#category").val();
	// 	obj.pic =$("#pic").val();
	// 	//console.log(obj);

	// 	//遍历添加的对象，看是否为空，为空不添加，不为空添加
			
	// 	if (obj.bookname && obj.fTitle && obj.price && obj.hyPrice && obj.xyPrice && obj.pf && obj.author && obj.pubDate && obj.pic) {

	// 		$.ajax({
	// 			url: baseUrl+"/books",
	// 			type: 'POST',
	// 			data: obj,
	// 		})
	// 		.done(function() {
	// 			$("#change").css("display",'none');
	// 			loadBookInfo();
	// 		})

	// 	} else{
	// 		alert("请添加数据！");
	// 	}
	// }

	//删除信息 传参为一个对象
	function deletInfo(data){
		$.ajax({
			url: baseUrl+"/books",
			type: 'delete',
			data: data
		})
		.done(function(data) {
			//这里尽量去删除DOM而不要再去请求网络
			//因为网络加载需要网络请求与响应，
			//数据量太大了影响就越大
			// delPageData(data.id);
			//console.log(data);
			// console.log(data.id);
			//这里由于没有找到响应的id,
			//所有再次请求网络刷新页面
			//不建议这样做
			loadBookInfo();
		})
		
	}

	//删除事件
	function deletbookInfo(delsp){

		// console.log(delsp);
		var thisId = $(delsp).parent("td").parent("tr").children('td:first').children('a').html();
		//console.log(thisId);

		objData = checkInfo(thisId);
		$(delsp).parent("td").parent("tr").children('td:first').children('input').attr("checked","checked");
		$("#del").css("display","block");
		flag = true;
		$("#yes").click(function(){
			$("#del").css("display","none");
			deletInfo(objData);
			//console.log(objData);
		});
		$("#no").click(function(){
			$("#del").css("display","none");
		});

	}

	//修改信息
	function modifyInfo(thisId,obj){
		//console.log("哈哈："+thisId);
		$.ajax({
			url: baseUrl+"/books/"+thisId,
			type: 'put',
			data: obj
		})
		.done(function() {
			obj.id = thisId;
			showDataOnPage(obj);
		});
		
		// var xhr = createXHR();
		// xhr.open("put",baseUrl+"/books/"+thisId);
		// xhr.setRequestHeader("content-type","application/json");
		// xhr.send(JSON.stringify(obj));
		// xhr.onreadystatechange = function(){
		// 	if(xhr.readyState == 4){
		// 		if(xhr.status >=200 && xhr.status < 300 ){
		// 			obj.id = thisId;
		// 			showDataOnPage(obj);
		// 			//console.log(obj.id);
		// 			//loadBookInfo();
		// 		}
		// 	}
		// }
	}

	//修改事件
	function modifybookInfo(modsp){
		//修改事件   之前的方法
		
		var thisId = $(modsp).parent("td").parent("tr").children('td:first').children('a').html();
		objData = checkInfo(thisId);
		$("#change").css("display","block");
		$("#changeTitle").html("修改数据");
		$("#addbook").html("修改书籍");
		$("#addBtn").html("确定修改");
		createAddModUl();

		//遍历input标签并为其赋值
		var inputs = $("#formUl input");
		for(var i = 0 ; i < inputs.length; i++){
			inputs[i].value = objData[inputs[i].name];
		}

		$("#addBtn").click(function(){
			$("#change").css("display","none");
			var obj = {};
			//添加属性和值
			for(var i = 0 ; i < inputs.length; i++){
				obj[inputs[i].name] = inputs[i].value;
			}
			delPageData(thisId);
			modifyInfo(thisId,obj);
		});
	}

})