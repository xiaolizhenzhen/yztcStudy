	;(function (w) {
        var _cookie = window.Cookie = {
            /**
             * 设置cookie
             * @param {Object} name cookie名 必须
             * @param {Object} val cookie值 必须
             * @param {Object} expires 超时时间 可为空
             */
            setCookie: function (name, val, expires) {
                if (!name || !val) {
                    return;
                }
                var c = name + "=" + val;
                if (expires) {
                    var strsec = this._getTime(expires);
                    var exp = new Date();
                    exp.setTime(exp.getTime() + strsec * 1);
                    c += ";expires=" + exp.toUTCString()
                }
                document.cookie = c;
            },
            /**
             *
             * @param {Object} name 要获取的cookie名称 可为空
             * name为空时返回所有cookie形成的对象，如：
             * {
				 * 	name : 123,
				 * 	pwd : 123
				 * }
             * 匹配不到对应名称的cookie时 返回false
             */
            getCookie: function (name) {
                var cookie = document.cookie;
                var cookies = cookie.split(";");
                var obj = {};
                for (var i = 0; i < cookies.length; i++) {
                    var cookiess = cookies[i].split("=");
                    if (cookiess[0].trim() == name) {
                        return cookiess[1];
                    }
                    obj[cookiess[0].trim()] = cookiess[1];
                }
                if (!name) {
                    return obj;
                }
                return false;
            },
            /**
             * 根据传入的名字判断是否存在此cookie 返回true|false
             * @param {Object} name cookie名称 必须
             */
            has: function (name) {
                if (!name) {
                    return;
                }
                if (this.getCookie(name)) {
                    return true
                }
                ;
                return false;
            },
            /**
             * 移除cookie
             * @param {Object} name 可为空 为空时移除所有cookie
             */
            remove: function (name) {
                if (!name) {
//						var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
//						if (keys) {
//							for (var i = keys.length; i--;) {
//								this.setCookie(keys[i],".","s-1");
//							}
//						}
                    var cs = this.getCookie();
                    for (var key in cs) {
                        this.setCookie(key, ".", "s-1");
                    }
                    return;
                }
                ;
                this.setCookie(name, ".", "s-1");
            },
            /**
             * @private
             * @description 私有方法 根据超时时间字符串  转换为毫秒数
             * @param {Object} timeStr 时间字符串 接收s m d中的一个字符 + 时间值 如下：
             * s1 代表 1 秒
             * m1 代表 1 分钟
             * h1 代表 1 小时
             * d2 代表 2 天
             * s-1 代表-1
             */
            _getTime: function (timeStr) {
                var str1 = timeStr.substring(1, timeStr.length) * 1;
                var str2 = timeStr.substring(0, 1);
                if (str2 == "s") {
                    return str1 * 1000;
                } else if (str2 == "m") {
                    return str1 * 60 * 1000;
                } else if (str2 == "h") {
                    return str1 * 60 * 60 * 1000;
                } else if (str2 == "d") {
                    return str1 * 24 * 60 * 60 * 1000;
                }
            }
        }
    }(window));
    