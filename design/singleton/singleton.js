/*
	单例模式:
		核心:单例的核心是确保只有一个实例，并提供全局访问
		例如：window

		实现单例模式：
			标准的单例模式并不复杂，用一个变量来标志当前是否已经为某个类创建过对象，如果是，则在下一次获得该类的实例时，直接返回之前创建的对象。

		透明的单例模式：
			用户从这个类中创建对象的时候，可以向使用其它任何普通对象类一样，即意识不到单例的存在

*/


//Singleton构造函数
var Singleton = function(name){
	this.name = name;
	this.instance = null;
}

Singleton.prototype.getName = function(){
	console.log(this.name);
}

//该方法就是创建Singleton构造函数对象的方法
Singleton.prototype.getInstance = function(name){
	if (!this.instance) {
		//没有创建对象，可以创建对象
		this.instance = new Singleton(name);
	} 
	return this.instance;
}

//一般实例化对象 a  b 是两个不同的对象
// var a = new Singleton("tom");
// var b = new Singleton("mark");

console.log(Singleton.prototype.getInstance);
var a = Singleton.prototype.getInstance("tom");  //执行new
var b = Singleton.prototype.getInstance("mark"); //不执行new直接返回,传参不起效
console.log(a == b); //true 
console.log(a === b); //true 

console.log(a.name); //tom
console.log(b.name); //tom  


