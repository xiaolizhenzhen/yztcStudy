1、cookie
登录成功：添加一条cookie
Cookie.setCookie("user","admin");
user = admin;
Cookie.setCookie("items","{}");

每当点击商品页的 添加到购物车 按钮时
将所选商品的ID与数量 添加到cookie中去
添加过程：
当点击 添加到购物车 时 会得到当前所选择商品的ID 与 数量
首先取出cookie中的items，Cookie.getCookie("items");
 使用parseJSON() 转化为JSON对象
 var obj ={};
判断当前选择商品是否存在于itmes中 ，

如果存在，则取出原来的数量 加 新选择的数量
不存在 则新增
新增的格式：
key : value //key 为商品ID value为选择数量




