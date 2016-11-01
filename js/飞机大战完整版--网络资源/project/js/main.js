
var map = document.getElementById('map');

var hero = document.getElementById('hero');

var gameOverPage = document.getElementById('gameOverPage');

var gameScore = document.getElementById('gameScore');

var panelScore = document.getElementById('panelScore');

var restartBtn = document.getElementById('restartBtn');

var startPage = document.getElementById('startPage');

var playBtn = document.getElementById('playBtn');

var bgm = document.getElementById('bgm');
var bomb = document.getElementById('bomb');

//console.log(bgm);
//bgm.play();

var mapw = map.offsetWidth;
var maph = map.offsetHeight;

//子弹数组
var Bullets = [];
//子弹飞行速度
var bulletSpeed = 20;

//敌机的数组
var Enemies = [];
//敌机的飞行速度
var enemySpeed = 5;

var EnemyBullets = [];
var enemyBulletSpeed = 8;

//分数
var SCORE = 0;

var BestScore = 0;

var GameState = 0;// 0：表示游戏未开始或者游戏结束 1：表示游戏开始

//开始游戏 
playBtn.onclick = function(){
	startPage.style.display = 'none';
	GameState = 1;
	
	//bgm.play();
}

//重新  开始
restartBtn.onclick =  function(){
	GameState = 1;
	gameOverPage.style.display = 'none';
	
	map.innerHTML = '';
	
	SCORE = 0;
	gameScore.innerHTML = SCORE;
	
	hero = document.createElement('img');
	hero.src = 'img/hero.png';
	map.appendChild(hero);
	hero.style.left = '240px'
	hero.style.top = '500px';
	hero.style.width = '80px';
	hero.style.height  = '60px';
	hero.style.position = 'absolute';
	
	fire =  setInterval(addBullet,300);
	updateTimer = setInterval(update,30);
	addEnemyTimer = setInterval(addEnemy,500);
}

map.onmousemove = function(e){
	
	var x = e.clientX;
	var y = e.clientY;
	
	//offsetWidth是指对象的可见宽度
	var w = hero.offsetWidth;
	var h = hero.offsetHeight;
	hero.style.left = x -w/2 + 'px';
	hero.style.top = y -h/2 + 'px';
	
	if(hero.offsetLeft < 0){
		hero.style.left = '0px';
	}
	if(hero.offsetLeft > (mapw - w)){
		hero.style.left = (mapw-w) + 'px';
	}
	if(hero.offsetTop < 0){
		hero.style.top = '0px';
	}
	if(hero.offsetTop > (maph -h)){
		hero.style.top =  (maph -h)+ 'px';
	}
}


/*  ----------添加子弹---------*/
var fire =  setInterval(addBullet,200);
function addBullet(){
	if(GameState == 1){
		var bullet = document.createElement('img');
		bullet.src = 'img/bullet1.png';
		bullet.style.position = 'absolute';
		bullet.style.width = '20px';
		
		var bx = hero.offsetLeft;
		var by = hero.offsetTop;
		
		bullet.style.left = (bx + hero.offsetWidth/2 -20)+ 'px';
		bullet.style.top = by -10 + 'px';
		map.appendChild(bullet);
		Bullets.push(bullet);
		
		
		var bullet2 = document.createElement('img');
		bullet2.src = 'img/bullet1.png';
		bullet2.style.position = 'absolute';
		bullet2.style.width = '20px';
		
		bullet2.style.left = (bx + hero.offsetWidth/2 +10)+ 'px';
		bullet2.style.top = by -10 + 'px';
		map.appendChild(bullet2);
		Bullets.push(bullet2);
		
	}
}

/* ----------添加敌机子弹-----------*/
var enemyFire = setInterval(addEnemyBullet,1000);
function addEnemyBullet(){
	
	for(var i = 0;i< Enemies.length;i++){
		var e = Enemies[i];
		var ex = e.offsetLeft;
		var ey = e.offsetTop;
		
		var bullet = document.createElement('img');
		bullet.src = 'img/bullet2.png';
		bullet.style.position = 'absolute';
		bullet.style.left = ex  + 35+ 'px';
		bullet.style.top = ey + 40 + 'px';
		bullet.style.width = '30px'
		
		EnemyBullets.push(bullet);
		map.appendChild(bullet);
	}
}


var updateTimer = setInterval(update,30);
function update(){
	
//	console.log(bomb.currentTime);
	
	if(GameState == 1){
		for(var i=0;i< Bullets.length;i++){
		var b = Bullets[i];
		b.style.top = b.offsetTop  - bulletSpeed + 'px';
		
		if(b.offsetTop < 0){
			map.removeChild(b);
			Bullets.splice(i,1);
		}
		
		for(var j=0;j<Enemies.length;j++){
			var e = Enemies[j];
			var result = collision(b,e);
			if(result){
				
				e.src = 'img/bomb.png';
				//闭包
				(function(node){
					setTimeout(function(){
					map.removeChild(node);
				},200);
				})(e);
				
//				bomb.play();
				playEffect();
				
				map.removeChild(b);
				Bullets.splice(i,1);
				Enemies.splice(j,1);
				SCORE++;
				gameScore.innerHTML = SCORE;
			}	
		}
	}
	
	for(var i = 0;i< Enemies.length;i++){
		var e = Enemies[i];
		e.style.top = e.offsetTop + enemySpeed + 'px';
		
		if(e.offsetTop > 768-80){
			map.removeChild(e);
			Enemies.splice(i,1);
		}
		
		// 判断hero 是否碰撞到了敌机
		var result = collision(e,hero);
		if(result){
			Enemies.splice(i,1);
			map.removeChild(e);
			map.removeChild(hero);
			
			gameOver();
			
		}
		
	}
	
	// 遍历敌机子弹数组
	for(var i = 0;i < EnemyBullets.length;i++){
		var eb = EnemyBullets[i];
		//b.style.top = b.offsetTop  - bulletSpeed + 'px';
		eb.style.top = eb.offsetTop + enemyBulletSpeed + 'px';
		
		if(eb.offsetTop > 768){
			EnemyBullets.splice(i,1);
			map.removeChild(eb);
		}
		
		var result = collision(eb,hero);
		if(result){
			EnemyBullets.splice(i,1);
			map.removeChild(eb);
			map.removeChild(hero);
			gameOver();
		}
	}
	}
	
}

var addEnemyTimer = setInterval(addEnemy,500);
var EnemyTex = [
'img/enemy1.png',
'img/enemy2.png',
'img/enemy3.png',
'img/enemy4.png',
]

function addEnemy(){
	
	if(GameState == 1){
		var enemy = document.createElement('img');
		var index = Math.floor(Math.random()*4);
		var tex = EnemyTex[index];
		enemy.src = tex;
		enemy.style.position = 'absolute';
		enemy.style.width = '100px';
	
		var x = Math.random()*(mapw - 100);
		enemy.style.left = x + 'px';
		enemy.style.top = '0px';
	
		map.appendChild(enemy);
		Enemies.push(enemy);
	}
}

function collision(a,b){
	var ax = a.offsetLeft;
	var ay = a.offsetTop;
	var aw = a.offsetWidth;
	var ah = a.offsetHeight;
	
	var bx = b.offsetLeft;
	var by = b.offsetTop;
	var bw = b.offsetWidth;
	var bh = b.offsetHeight;
	
	if(bx+bw>ax && bx<ax+aw && by+bh>ay && by<ay+ah){
		return true;
	}else{
		return false;
	}	
}

function gameOver(){
	gameOverPage.style.display = 'block';
	
	clearInterval(addEnemyTimer);
	clearInterval(updateTimer);
	clearInterval(fire);
	
	if(localStorage['BestScore']){
		if(SCORE > localStorage['BestScore']){
			BestScore = SCORE;
			localStorage['BestScore'] = BestScore;
		}
	}else{
		BestScore = SCORE;
		localStorage['BestScore'] = BestScore;
	}
	// localStorage
	panelScore.innerHTML = '最高分：' + localStorage['BestScore'] +"<br>" + "分数：" + SCORE;
	
	GameState = 0;
}

//播放音效
function playEffect(){
	bomb.currentTime = 0;
	bomb.play();
	
}

//地图滚动
var scrollmap1 = document.getElementById('scrollmap1');
var scrollmap2 = document.getElementById('scrollmap2');
var scrollTimer = setInterval(function(){
	scrollmap1.style.top = scrollmap1.offsetTop + 1 + 'px';
	scrollmap2.style.top = scrollmap2.offsetTop + 1 + 'px';
	
	if(scrollmap1.offsetTop > 766){
		scrollmap1.style.top = '-768px';
	}
	if(scrollmap2.offsetTop > 766){
		scrollmap2.style.top = '-768px';
	}
},20)

/*
	1点击按钮开始按钮
	2.地图滚动
	3.飞机 target pos   src  className
	   子弹  div src pos speed timer  move  remove
	   敌机 src  move  remove  
	4.检测碰撞
 */