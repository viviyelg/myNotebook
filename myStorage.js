/*
 * 用以解决sessionStorage和localStorage在safari,chrome,UC浏览器无痕浏览模式下报错的问题
 */
(function (window, undefined) {
  var myStorage = {
    /*
     * 封装setItem
     * @method
     * @param {string} type 存储数据的类型,cookie,localStorage,sessionStorage
     * @param {string} name 存储数据的key值
     * @param {string} value 存储数据的value
     */
    setItem: function (name, value, type, exp, path) {
      if (type && getType(type) != 'cookie') {
        var storage = getType(type);
        if (myStorage.suportStorage(storage)) {
          storage.setItem(name, value);
        } else {
          myStorage.setCookie(name, value);
        }
      } else {
        myStorage.setCookie(name, value, exp, path);
      }
    },
    /**
     * 根据key获取value
     * @method
     * @param {string} name
     * @param {string} type
     * @return {string} value
     */
    getItem: function (name, type) {
      if (type && getType(type) != 'cookie') {
        var storage = getType(type);
        if (myStorage.suportStorage(storage)) {
          return storage.getItem(name);
        } else {
          return myStorage.getCookie(name);
        }
      } else {
        return myStorage.getCookie(name);
      }
    },
    /**
     * 检查是否支持storage
     * @method
     * @param {any} storageType
     * @return [boolean] false为不支持
     */
    suportStorage: function (storage) {
      var test = "text";
      try {
        // storage在隐私形式下setItem会报错
        storage.setItem(test, "test");
        storage.removeItem(test, "test");
        return true;
      } catch (err) {
        return false;
      }
    },
    /**
     * 设置cookie
     * @method
     * @param {string} name cookie的name
     * @param {string} value cookie的value
     * @param {string} exp 可选，设置过期时间
     * @param {string} path 可选，存储路径
     */
    setCookie: function (name, value, exp, path) {
      var cookieString = name + "=" + escape(value);
      //判断是否设置过期时间
      if (exp > 0) {
        var date = new Date();
        date.setTime(date.getTime() + exp * 3600 * 1000);
        cookieString = cookieString + "; expires=" + date.toGMTString();
      }
      cookieString += ";path=" + (path ? path : '/');
      document.cookie = cookieString;
    },
    /**
     * 获取cookie的value
     * @method
     * @param {any} name
     * @returns {string} value
     */
    getCookie: function (name) {
      var strCookie = document.cookie;
      var arrCookie = strCookie.split("; ");
      for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr[0] == name) {
          return arr[1];
        }
      }
      return "";
    }
  };
  window.myStorage = myStorage;
  /*
   * 判断想要存储的类型，主要做大小写处理，返回正确的类型
   * @method
   * @param {any} type 存储类型
   * @return {any} 
   */
  function getType(type) {
    var temp = type.toLowerCase();
    var typeName;
    if (temp == "localstorage") {
      return window.localStorage;
    } else if (temp == "sessionstorage") {
      return window.sessionStorage;
    } else {
      return 'cookie';
    }
  }
})(window, undefined);