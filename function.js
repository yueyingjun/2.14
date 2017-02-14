/**
 * 兼容类名调用
 * @param  {string} classname  要选择的对象名
 * @param  {string} obj       要选择的对象的父类名，默认为document
 * @return {object}           对象
 */

function getClass(classname, obj) { //classname获取的类名obj传入的父类元素
  obj = obj || document; //初始化
  if (obj.getElementsByClassName) { //判断是否存在兼容问题
    return obj.getElementsByClassName(classname); //如果不存在执行的语句
  } else {
    // 存在执行的语句
    var arr = []; //存储取出元素
    var objs = obj.getElementsByTagName("*"); //获取所有标签元素
    for (var i = 0; i < obj.length; i++) { //遍历获取的元素
      if (Check(arr[i].className, classname)) { //寻找符合类名的标签元素
        arr.push(objs[i]); //添加符合条件的元素到数组
      }
    }
    return arr; //返回数组
  }
}
/** 防止一个元素有多个类名
 * @param  {string} str       要比较的类名
 * @param  {string} classname 要找到的类名
 * @return {boolean}
 */

function Check(str, classname) {
  var classNameString = str.split(" ");
  for (var i in classNameString) {
    if (classNameString[i] == classname) {
      return true; //返回真，函数结束
    }
  }
  return false; //返回假，函数结束
}
/**
 * [调试函数]
 * @param  {string} obj       要调试的对象
 * @return {string}           控制台的返回值
 */

function log(obj) {
  console.log(obj);
}
/**
 * [根据输入值做不同的操作，也可作为页面载入函数]
 * @param  {string} selecter  要选择的对象名
 * @param  {string} obj       要选择的对象的父类名
 * @return {object}           对象
 */

function $(selecter, obj) {
  if (typeof selecter === "string") { //传入选择器
    obj = obj || document; //判断是否传入obj，默认document;
    selecter = selecter.replace(/^\s*|\s*$/g, "") //清除空格
    if (selecter.charAt(0) == ".") { //判断是否为类样式
      return getClass(selecter.slice(1), obj); //slice去掉.
    } else if (selecter.charAt(0) == "#") { //判断是否为id样式
      return document.getElementById(selecter.slice(1)); //slice去掉#
    } else if (/^[a-z]+\d*$/g.test(selecter)) { //判断是否符合标签规范
      return obj.getElementsByTagName(selecter);
    }
  } else if (typeof selecter == "function") { //函数默认调用加载
    window.onload = function() {
      selecter();
    }
  }
}
/** 返回指定元素的样式
 * @param  {object} obj       要获取的类对象
 * @param  {string} attr      要获取的属性名
 * @return {string}           返回样式
 */

function getStyle(obj, attr) {
  if (obj.currentStyle) {
    return obj.currentStyle[attr];
  } else {
    return getComputedStyle(obj, null)[attr];
  }
}
/** 判断obj是否有此class
 * @param  {object} obj       要获取的类对象
 * @param  {string} cls       判断的类名
 * @return {string}           返回样式
 */

function hasClass(obj, cls) { //class位于单词边界
  return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
/** 给 obj添加class
 * @param  {object} obj       要获取的类对象
 * @param  {string} cls       添加的类名
 * @return {}                 无
 */

function addClass(obj, cls) {
  if (!this.hasClass(obj, cls)) {
    obj.className += cls;
  }
}
/** 移除对应的class
 * @param  {object} obj       要获取的类对象
 * @param  {string} cls       移除的类名
 * @return {}                 无
 */

function removeClass(obj, cls) {
  if (hasClass(obj, cls)) {
    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    obj.className = obj.className.replace(reg, '');
  }
}
/** 获取指定元素的指定子节点
 * @param  {object} obj       要获取的类对象
 * @param  {string} type      获取子节点的类型
 * @return {string}           子节点
 */

function getChild(obj, type) {
  var objs = obj.childNodes;
  var newArr = [];
  var type = type ? type : false;
  if (type == true) {
    for (var i = 0; i < objs.length; i++) {
      if (objs[i].nodeType == 1 || (objs[i].nodeType == 3 && !(/^\s+$/.text(objs[i].nodeValue)))) {
        newArr.push(objs[i])
      }
    }
  }
  if (type == false) {
    for (var i = 0; i < objs.length; i++) {
      if (objs[i].nodeType == 1) {
        newArr.push(objs[i])
      }
    }
  }
  return newArr;
}
/** 获取指定元素的下一个子节点
 * @param  {object} obj       要获取的类对象
 * @param  {string} type      获取子节点的类型
 * @return {string}           子节点
 */

function firstChild(obj, type) {
  return getChild(obj, type)[0];
}
/** 获取指定元素的最后一个子节点
 * @param  {object} obj       要获取的类对象
 * @param  {string} type      获取子节点的类型
 * @return {string}           子节点
 */

function lastChild(obj, type) {
  return getChild(obj, type)[(getChild(obj, type).length) - 1];
}
/** 获取指定元素的指定位置子节点
 * @param  {object} obj       要获取的类对象
 * @param  {string} type      获取子节点的类型
 * @return {string}           子节点
 */

function numChild(obj, type, num) {
  return getChild(obj, type)[num];
}
/** 获取当前节点的下一个节点
 * @param  {object} obj       当前节点
 * @param  {string} type      获取子节点的类型
 * @return {string}           子节点
 */

function getNext(obj, type) {
  var type = type ? type : false;
  if (type == 1) {
    var next = obj.nextSibling;
    if (next == null) {
      return false;
    }
    while (next.nodeType != 1) {
      next = next.nextSibling; //更新Next
      if (next == null) {
        return false;
      }
    }
    return next;
  }
  if (type == false) {
    var next = obj.nextSibling;
    if (next == null) {
      return false
    }
    while ((next.nodeType == 3 && /^\s+$/.test(next.nodeValue)) || next.nodeType == 8) {
      next = next.nextSibling;
      if (next == null) {
        return false
      }
    }
    return next;
  }
}
/** 获取当前节点的最后一个节点
 * @param  {object} obj       当前节点
 * @param  {string} type      获取子节点的类型
 * @return {string}           子节点
 */

function getLast(obj, type) {
  var type = type ? type : false;
  if (type == 1) {
    var next = obj.nextSibling;
    if (next == null) {
      return false;
    }
    while (next.nodeType != 1) {
      next = next.nextSibling; //更新Next
      if (next == null) {
        return false;
      }
    }
    return next;
  }
  if (type == false) {
    var next = obj.nextSibling;
    if (next == null) {
      return false
    }
    while ((next.nodeType == 3 && /^\s+$/.test(next.nodeValue)) || next.nodeType == 8) {
      next = next.nextSibling;
      if (next == null) {
        return false
      }
    }
    return next;
  }
}
/** 将一个元素插入到另一个元素的后面
 * @param  {object} oldobj    必需。需要插入的节点对象。
 * @param  {object} newobj    可选。在其之前插入新节点的子节点。如果未规定，则会在结尾插入 newnode。
 * @return {}                 无
 */

function insertAfter(oldobj, newobj) {
  var next = getNext(oldobj);
  var parent = next.parentNode;
  if (next) {
    parent.insertBefore(newobj, next)
  } else {
    parent.appendChild(newobj)
  }
}
/** 将一个元素插入到另一个元素的前面
 * @param  {object} oldobj    必需。需要插入的节点对象。
 * @param  {object} newobj    检测有无下一个子节点，如果存在添加在第一个子节点之前。不存在向节点最后添加一个子节点
 * @return {}                 无
 */

function appendBefore(obj, obj1) {
  var first = firstChild(obj1);
  if (first) {
    obj1.insertBefore(obj, first);
  } else {
    obj1.appendChild(obj);
  }
}
/** 兼容性的绑定事件的函数
 * @param  {object} obj         必需。需要插入活动的对象。
 * @param  {string} event       指定事件名,注意: 不要使用 "on" 前缀。 例如，使用 "click" ,而不是使用 "onclick"。
 * @param  {function} callback  指定要事件触发时执行的函数。
 * @return {}                   无
 */

function addEvent(obj, event, callback) {
  if (obj.addEventListener) {
    obj.addEventListener(event, callback, false)
  } else {
    obj.attachEvent("on" + event, callback)
  }
}
/** 兼容性的移除绑定事件的函数
 * @param  {object} obj         必需。需要插入活动的对象。
 * @param  {string} event       指定事件名,注意: 不要使用 "on" 前缀。 例如，使用 "click" ,而不是使用 "onclick"。
 * @param  {function} callback  指定要事件触发时执行的函数。
 * @return {}                   无
 */

function removeEvent(obj, event, callback) {
  if (obj.removeEventListener) {
    obj.removeEventListener(event, callback, false)
  } else {
    obj.detachEvent()
  }
}
/** 给某一个对象添加滚轮事件
 * @param  {object} obj         需要插入活动的对象。
 * @param  {function} upfun     滚轮向上的事件
 * @param  {function} downfun   滚轮向下的事件
 * @return {}                   无
 */

function mousewheel(obj, upfun, downfun) {
  if (obj.addEventListener) {
    obj.addEventListener("mousewheel", scrollfun, false)
    obj.addEventListener("DOMMouseScroll", scrollfun, false)
  } else {
    obj.attachEvent("onmousewheel", scrollfun)
  }

  function scrollfun(e) {
    var ev = e || window.event;
    var dir = ev.detail || ev.wheelDelta;
    if (ev.preventDefault) {
      ev.preventDefault()
    } else {
      ev.returnValue = false;
    }
    if (dir == -3 || dir == 120) {
      upfun.call(obj, ev);
    } else if (dir == 3 || dir == -120) {
      downfun.call(obj, ev);
    }
  }
}
/** 判断某个元素是否包含有另外一个元素
 * @param  {object}   parent    父元素
 * @param  {object}   child     子元素
 * @return {}                   无
 */

function contains(parent, child) {
  if (parent.contains) {
    return parent.contains(child) && parent != child;
  } else {
    return (parent.compareDocumentPosition(child) === 20);
  }
}
/** 判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
 * @param  {object}   e       自定名
 * @param  {object}   target  判断的对象
 * @return {}                 无
 */

function checkHover(e, target) {
  if (getEvent(e).type == "mouseover") {
    return !contains(target, getEvent(e).relatedTarget || getEvent(e).fromElement) && !((getEvent(e).relatedTarget || getEvent(e).fromElement) === target)
  } else {
    return !contains(target, getEvent(e).relatedTarget || getEvent(e).toElement) && !((getEvent(e).relatedTarget || getEvent(e).toElement) === target)
  }
}
/** 鼠标移入移出事件
 * @param  {object}     obj       要操作的对象
 * @param  {function}   overfun   鼠标移入需要处理的函数
 * @param  {function}   outfun    鼠标移出需要处理的函数
 * @return {}                     无
 */

function hover(obj, overfun, outfun) {
  if (overfun) {
    obj.onmouseover = function(e) {
      if (checkHover(e, obj)) {
        overfun.call(obj, [e]);
      }
    }
  }
  if (outfun) {
    obj.onmouseout = function(e) {
      if (checkHover(e, obj)) {
        outfun.call(obj, [e]);
      }
    }
  }
}
/** 获取活动事件兼容函数
 * @param  {string}      e         自定义名
 * @return {function}    event     活动事件
 */

function getEvent(e) {
  return e || window.event;
}
/**
 * setCookie 设置cookie
 * @param {string} key   cookie的key
 * @param {string} value cookie的value
 * @param {date} t       过期时间
 */

function setCookie(key, value, t) {
  var oDate = new Date();
  if (t) {
    oDate.setDate(oDate.getDate() + t);
    document.cookie = key + '=' + value + ';expires=' + oDate.toUTCString();
  } else {
    document.cookie = key + '=' + value;
  }
}
/**
 * getCookie 获取cookie
 * @param  {string} key cookie的key
 * @return {string}     cookie的value
 */

function getCookie(key) {
  var arr1 = document.cookie.split('; ');
  for (var i = 0; i < arr1.length; i++) {
    var arr2 = arr1[i].split('=');
    if (arr2[0] == key) {
      return arr2[1];
    }
  }
  return false;
}
/**
 * removeCookie 删除cookie
 * @param  {string} key cookie的key
 */

function removeCookie(key) {
  this.setCookie(key, '', -1);
}
/**
 * 兼容的获取可视窗口对象
 * @return {string}     cookie的value
 */

function getWindow() {
  document.documentElement.scrollTop = 1;
  if (document.documentElement.scrollTop == 1) {
    return document.documentElement;
  } else {
    return document.body;
  }
}
/**
 * 兼容的获取可视窗口对象滚动条的垂直位置
 * @return {string}     返回匹配元素的滚动条的垂直位置
 */

function getscrollTop() {
  var Top = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
  return Top;
}

/** 
 * 判断浏览器是否支持某一个CSS3属性
 * @param {String} 属性名称 eg:transition;
 * @return {Boolean} true/false
 */

function supportCss3(style) {
  var prefix = ['webkit', 'Moz', 'ms', 'o'],
    i, humpString = [],
    htmlStyle = document.documentElement.style,
    _toHumb = function(string) {
      return string.replace(/-(\w)/g, function($0, $1) {
        return $1.toUpperCase();
      });
    };
  for (i in prefix)
  humpString.push(_toHumb(prefix[i] + '-' + style));
  humpString.push(_toHumb(style));
  for (i in humpString)
  if (humpString[i] in htmlStyle) return true;
  return false;
}
/** 
 * 判断浏览器是否支持HTML5
 * @return {Boolean} true/false
 */

function checkhHtml5() {
  if (typeof(Worker) !== "undefined") {
    log("支持HTML5");
  } else {
    log("不支持HTML5");
  }
}