 //页面加载时首先判断用户是否登录，若没登录，先登录
	$(function(){

        var user = Cookie.getCookie("user");
        
		//点击按钮，跳转到购物车界面
		$("#shop").click(function(){
			window.open("ShopCar.html");
		})
		
	    if(!Cookie.has("user")){ //判断当前用户是否已经登录
	    	//没有登录
	        $("#login").show();
	        $("#log").click(function(){
	        	var username = $('#username').val();
	        	var pwd = $('#pwd').val();
	        	console.log($('#username').val());
	        	$.ajax({
	        		url : "php/user.php",
	        		data : {
	        			type : "login",
	        			username : username,
	        			password : pwd
	        		},
	        		success : function(res){
	        			//console.log("+++++");
	        			//console.log(res);
	        			res = $.parseJSON(res);
	        			if (res.status == 0) {
	        				$("#login").hide();
	        				$("#box").show();
	        				$("#shop").show();
	        				showItems();
	        				Cookie.setCookie("user", username);

	        			} 
	        		}
	        	})
	        })
	       
	    }else{
	        $("#box").show();
	        $("#shop").show();
	    	//已经登录  直接显示所有商品
	    	showItems();
	    }


	    //按销量排序
	    $("#sall").click(function(){
	    	$.ajax({
			url : "php/items.php",
			data : {
				currentPage : 1,//当前页数
				pageSize : 20,//每页条数
				orderType : "desc",//升序asc 降序desc
				orderBy : "saled",//排序规则
				searchKey : "all"//搜索关键字
			},
			success : function(res){
	        	//console.log("------");
				//console.log(res);
				res = $.parseJSON(res);
				getRes(res);
			}

			})
	    })

	    //按评价排序
	    $("#judge").click(function(){
	    	$.ajax({
			url : "php/items.php",
			data : {
				currentPage : 1,//当前页数
				pageSize : 20,//每页条数
				orderType : "desc",//升序asc 降序desc
				orderBy : "better",//排序规则
				searchKey : "all"//搜索关键字
			},
			success : function(res){
	        	//console.log("------");
				//console.log(res);
				res = $.parseJSON(res);
				getRes(res);
			}

			})
	    })

	    //按价格排序
	    $("#prices").click(function(){
	    	$.ajax({
			url : "php/items.php",
			data : {
				currentPage : 1,//当前页数
				pageSize : 20,//每页条数
				orderType : "asc",//升序asc 降序desc
				orderBy : "price",//排序规则
				searchKey : "all"//搜索关键字
			},
			success : function(res){
	        	//console.log("------");
				//console.log(res);
				res = $.parseJSON(res);
				getRes(res);
			}

			})
	    })

	    //按关键字排序
	    
	})

	//显示商品
	var currentPage = 1;
	var pageSize = 20;
	function showItems(){
		$.ajax({
			url : "php/items.php",
			data : {
				currentPage : currentPage,//当前页数
				pageSize : pageSize,//每页条数
				orderType : "all",//升序降序
				orderBy : "all",//排序规则
				searchKey : "all"//搜索关键字
			},
			success : function(res){
	        	//console.log("------");
				//console.log(res);
				res = $.parseJSON(res);
				getRes(res);
			}

		})
	}

	//创建商品的DOM结构
	function createItemDom(obj){
		// <dl>
		// 	<dt><img src="img/4.jpg" alt=""></dt>
		// 	<dd><b>￥ 150.00</b><span>1200人付款</span></dd>
		// 	<dd><a href="#">李宁男子远动鞋男鞋远动生活2016新款复古经典透气休闲鞋AKJ001</a></dd>
		// 	<dd><p>好评：200</p><p>差评：5</p><p>库存：300</p></dd>
		// 	<dd><button>-</button><input type="text" value="0" readonly="readonly"><button>+</button></dd>
		// 	<dd><button>加入购物车</button></dd>
		// </dl>

		//取得当前商品的ID
		//方法2
		var dl = $("<dl />").attr("itemID",obj.id);
		//var dl = $("<dl />");
		var reduce = $("<button/>").html("-").attr({"disabled":"disabled"});
		var add = $("<button/>").html("+");
		var btn = $("<button/>").html("加入购物车").attr({"disabled":"disabled"});
		dl.append(
			$("<dt><img src='img/4.jpg' /></dt>")
		).append(
			$("<dd/>").append(
				$("<b/>").html("￥"+obj.price)
			).append(
				$("<span/>").html("销量"+obj.saled)
			)
		).append(
			$("<dd/>").append(
				$("<a href='#' />").html(obj.name)
			)
		).append(
			$("<dd/>").append(
				$("<p/>").html("好评"+ obj.better)
			).append(
				$("<p/>").html("差评"+ obj.bad)
			).append(
				$("<p/>").html("库存"+obj.stock)
			)
		).append(
			$("<dd/>").append(
				reduce
			).append(
				$("<input value='0' />")
			).append(
				add
			)
		).append(
			$("<dd />").append(
				btn
			)
		)
		//console.log(dl);
		$(".product").append(dl);
	
		//数量减少操作
		reduce.click(function(){
			//console.log($(this).next("input").val());
			var num = parseInt($(this).next("input").val());
			if ( num == 1) {
				num = 0;
				$(this).css("background","gray").attr({"disabled":"disabled"});
				$(this).parents("dd").next("dd").children("button").css("background","gray").attr({"disabled":"disabled"});

			} else{
				num -=1 ;
			}
			return $(this).next("input").val(num);
		})

		add.click(function(){
			//console.log($(this).prev("input").val());
			var num = parseInt($(this).prev("input").val());
			num += 1;
			$(this).prev("input").prev("button").css("background","blue").removeAttr("disabled");
			$(this).parents("dd").next("dd").children("button").css("background","blue").removeAttr("disabled");
			return $(this).prev("input").val(num);
		})
	
			
		btn.click(function(obj){
			var count = $(this).parent("dd").prev("dd").children('input').val();//得到当前点击按钮所在商品的选择数量
			//console.log(count);

			//取得当前商品的ID
			//方法1
			// var itemID = obj.id; 

			//方法2
			//var itemID = $(this).parent().parent().attr("itemid");
			var itemID = $(this).parent().parent().attr("itemID");
			//console.log(itemID);
			console.log(count, itemID);
			bindItemAndUser(itemID,count);
			 //当点击添加到购物车按钮时 将这些商品ID与数量和用户ID进行绑定
			console.log(typeof count);


	
			var shopNum = parseInt($("#shopNum").html());
			console.log(typeof shopNum); 
			shopNum += parseInt(count);
			return $("#shopNum").html(shopNum);


			
		})
	}


	//创建分页
	function createPageDom(total){

		//使用总条数/每页条数 得到分页数


		// var pageNum = Math.ceil(total/pageSize);
		// for(var i = 0; i < pageNum; i++){
		// 	var a = $("<a href='#'/>").html(i+1);
		// }
		// $(".fenye").append(a);
		//问题遗留 后面覆盖前面的值

		var ul = $("<ul/>");
		var prevLi = $("<li/>").html("上一页").appendTo(ul);
		var nextLi = $("<li/>").html("下一页");
		var pageNum = Math.ceil(total/pageSize);
		for(var i = 0; i < pageNum; i++){
			var li = $("<li />").html(i+1);
			li.click(function() {
				currentPage = $(this).html();
				showItems();
				$(this).addClass('now').siblings('li').removeClass('now');
			});
			ul.append(li);
		}
		ul.append(nextLi);
		$(".fenye").append(ul);

		//on(事件名,添加事件的子元素,事件处理函数)
		ul.on("click","li",function(){
			console.log($(this).index());//0 1 2 3 4 5

			if ($(this).index() == 0) { //“上一页” 的按钮
				if (currentPage == 1) {
					currentPage =1;
				}else{
					currentPage -=1;
				}
				//showItems();
				//$(".fenye ul li").eq(currentPage).addClass('now').siblings('li').removeClass('now');
			} else if ($(this).index() == pageNum + 1) {//“下一页” 的按钮
				if (currentPage == pageNum) {
					currentPage =pageNum;
				} else{
					currentPage +=1;
				}
				//showItems();
				//$(".fenye ul li").eq(currentPage).addClass('now').siblings('li').removeClass('now');
			} else{
				currentPage = $(this).html();
				//showItems();
				//$(this).addClass('now').siblings('li').removeClass('now');
			};

			showItems();
			$(".fenye ul li").eq(currentPage).addClass('now').siblings('li').removeClass('now');
		})

		$(".fenye ul li:nth-of-type(2)").addClass('now');

	}

	//绑定商品ID 与 数量 和 用户ID
	function bindItemAndUser(itemID,count){
		var userID = Cookie.getCookie("user");
		$.ajax({
			url : "php/car.php",
			data : {
				type : "add",
				itemID : itemID,
				count : count,
				userID : userID
			},
			success : function(res){
				res = $.parseJSON(res);
				//console.log(res);
			}

		})
	}


	//通用的返回成功创建页面和分页
	function  getRes(res){
		var total = res.total;//获取返回结果中的总数 用于分页
		var data = res.data;//获取返回结果
		if (data.length > 0) {
			$(".product").empty();//用于点击指定页面，清空之前页面数据
			for(var i = 0; i < data.length; i++){
				//取得结果的值
				var obj = data[i];
				createItemDom(obj);	
			}

			//用于清空点击指定页面时之前的分页
			//方法1
			//$(".fenye").empty(); //注意性能优化，此方法不够好

			//方法2 
			if ($(".fenye").children().length == 0) {
				//调用创建分页按钮的方法
				createPageDom(total);
			} 
			
		} 
	} 