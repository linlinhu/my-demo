// 获取指定的 element 元素 attr 属性的CSS值
function css (element, attr) {
	return element.currentStyle ? element.currentStyle[attr] : getComputedStyle(element, null)[attr];
}

// 将 getElementById、getElementsByTagName、getElementsByClassName 封装
// 实现根据 id、类名或标签名在指定的 element 元素后代查找
// #id
// .class
// div
function $(selector, element) {
	element = element || document; // 如果没有传递 element 元素对象，则使用 document 作为默认值

	if (selector.indexOf("#") === 0)  // 根据 id 查找元素
		return document.getElementById(selector.slice(1));
	if (selector.indexOf(".") === 0) // 根据 class 查找元素
		return getByClass(selector.slice(1), element);
	// 根据标签查找元素
	return element.getElementsByTagName(selector);
}

// 解决 getElementsByClassName 兼容问题
function getByClass(className, element) {
	element = element || document; // 如果没有传递 element 元素对象，则使用 document 作为默认值
	if (element.getElementsByClassName) // 支持 getElementsByClassName() 方法的使用
		return element.getElementsByClassName(className);

	/* 不支持 getElementsByClassName() 方法的使用 */
	var result = []; // 保存所有查找到满足类名条件的元素的数组
	var tags = element.getElementsByTagName("*"); // 找到 element 元素的所有后代元素
	// 循环遍历查找到的所有元素
	for (var i = 0, len = tags.length; i < len; i++) {
		// 获取当前遍历到元素的所有类名
		var classNames = tags[i].className.split(" ");
		// 遍历所有类名，查找是否存在指定的 className 的类名
		for (var j = 0, length = classNames.length; j < length; j++) {
			if (classNames[j] === className) { // 当前元素是满足条件的其中一个
				result.push(tags[i]);
				break;
			}
		}
	}
	// 返回查找到的元素数组
	return result;
}

// 注册事件监听器
// 以事件冒泡的方式处理事件时
// 解决 addEventListener 与 attachEvent 兼容问题
function registerEventListener(element, type, fn){
	if (element.addEventListener) { // 支持使用 addEventListener
		if (type.indexOf("on") === 0) // 事件类型以 “on” 开头
			type = type.slice(2);
		element.addEventListener(type, fn, false);
	} else {
		if (type.indexOf("on") !== 0) // 事件类型不以 “on” 开头
			type = "on" + type;
		element.attachEvent(type, fn);
	}
}

// 获取/设置指定的 element 元素在文档中的定位位置
// 返回定位位置的对象，对象属性有 {top:0, left:0}
// coordinate : 设置元素在文档中定位位置时的坐标 {top:0, left:0}
function offset(element, coordinate) {
	var _top = 0,
		_left = 0;
	if (typeof coordinate !== "object"){ // 获取文档中的坐标定位
		while(element.offsetParent) {
			_top += element.offsetTop + parseFloat(css(element.offsetParent, "borderTop"));
			_left += element.offsetLeft + parseFloat(css(element.offsetParent, "borderLeft"));
			element = element.offsetParent;
		}

		return { top : _top, left : _left };
	}

	/* 设置 element 元素在文档中的坐标定位为 coordinate 中的位置 */
	// 先计算出 element 有定位的祖先元素在文档中的坐标
	var currentElement = element.offsetParent;
	while(currentElement.offsetParent) {
		_top += currentElement.offsetTop + parseFloat(css(currentElement.offsetParent, "borderTop"));
		_left += currentElement.offsetLeft + parseFloat(css(currentElement.offsetParent, "borderLeft"));
		currentElement = currentElement.offsetParent;
	}
	// 运算出 element 元素在有定位的祖先元素内部坐标
	_top = coordinate.top - _top - parseFloat(css(element.offsetParent, "borderTop"));
	_left = coordinate.left - _left - parseFloat(css(element.offsetParent, "borderLeft"));
	// 设置 element 元素位置 
	element.style.top = _top + "px";
	element.style.left = _left + "px";
}

// 获取 element 元素在其有定位的最近的祖先元素中的绝对定位位置
function position(element) {
	return {
		top : element.offsetTop,
		left : element.offsetLeft
	}
}

// 获取元素内容的宽度
function width(element) {
	return parseFloat(css(element, "width"));
}

// 获取元素内容的高度
function height(element) {
	return parseFloat(css(element, "height"));
}

// 获取内容+padding宽度
function innerWidth(element) {
	return element.clientWidth;
}

// 获取内容+padding高度
function innerHeight(element) {
	return element.clientHeight;
}

// 获取内容+padding+border宽度
// containsMargin:是否包含包边距margin，
//	true:包含, false:不包含，默认为false
function outerWidth(element, containsMargin) {
	containsMargin = typeof containsMargin === "boolean" ? containsMargin : false;
	if (containsMargin) // 包含margin
		return element.offsetWidth 
				+ parseFloat(css(element, "marginLeft"))
				+ parseFloat(css(element, "marginRight"));
	return element.offsetWidth;
}

// 获取内容+padding+border高度
function outerHeight(element, containsMargin) {
	containsMargin = typeof containsMargin === "boolean" ? containsMargin : false;
	if (containsMargin)
		return element.offsetHeight
				+ parseFloat(css(element, "marginTop"))
				+ parseFloat(css(element, "marginBottom"));
	return element.offsetHeight;
}

// ajax
function ajax(options) {
	options = options || {}; // 如果没有传递 options，则为空对象

	if (typeof options.url === "undefined") // 没有连接的 url ，则结束函数调用
		return;

	var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"), // 核心对象
		method = options.type || "get", // 请求方式，没有传递，则使用默认的 get 请求
		async = typeof options.async === "boolean" ? options.async : true, // 有传递请求提交同步或异步的方式，则直接使用，否则默认为异步
		query = options.data ? genQueryString(options.data) : null, // 有向服务器提交的数据，构建查询字符串
		dataType = options.dataType || "text", // 预期服务器返回类型，默认为 text
		url; // 请求资源路径

	// 如果请求方式为 get并且有查询字符串存在，则将查询字符串串连到 url 后
	if (method === "get" && query) {
		url = options.url.indexOf("?") === -1
				? options.url + "?" + query 
				: options.url + "&" + query;
		query = null;
	} else {
		url = options.url;
	}

	if (dataType === "jsonp") { // jsonp 跨域请求
		jsonp(url, options.success);
		return;
	}

	// 建立连接
	xhr.open(method, url, async);
	// 设置请求头信息
	if (options.headers) {
		for (var attr in options.headers) {
			xhr.setRequestHeader(attr, options.headers[attr]);
		}
	}
	if (method === "post")
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	// 发送请求
	xhr.send(query);

	// 处理响应
	if (async){ // 异步
		xhr.onreadystatechange = function(){
			if (xhr.readyState === 4) { // 请求处理完毕，响应就绪
				handle(xhr, options);
			}
		}
	} else { // 同步
		handle(xhr, options);
	}
}

// GET 请求
function get(url, data, fn, dataType) {
	getOrPost(url, "get", data, fn, dataType);
}

// POST 请求
function post(url, data, fn, dataType) {
	getOrPost(url, "post", data, fn, dataType);
}

function getOrPost(url, type, data, fn, dataType) {
	if (typeof url === "undefined")
		return;
	if (typeof data === "function") {
		dataType = fn;
		fn = data;
		data = undefined;
	}
	ajax({
		url:url,
		type:type,
		data:data,
		dataType:dataType,
		success:fn
	});
}

// GET 请求，拿到 JSON 格式数据
// 兼容使用 jsonp 跨域
function getJSON(url, data, fn){
	if (typeof url === "undefined")
		return;
	if (typeof data === "function") {
		fn = data;
		data = undefined;
	}
	var dataType = "json";
	if (count(url, "?") > 1)
		dataType = "jsonp";

	ajax({
		url:url,
		type:"get",
		data:data,
		dataType:dataType,
		success:fn
	});
}

// 统计 src 源字符串中 sub 子字符串的个数
function count(src, sub) {
	var index = -1, count = 0;
	do {
		index = src.indexOf(sub, index+1);
		if (index !== -1)
			count++;
	} while (index != -1);

	return count;
}

// 生成查询字符串
function genQueryString(data) {
	var queryArray = [];
	for (var attr in data) {
		queryArray.push(attr + "=" + data[attr]);
	}
	return queryArray.join("&");
}

// 处理响应数据
function handle(xhr, options){
	// 如果有无论成功失败都执行的函数，则调用
	options.complete && options.complete(xhr);

	if (xhr.status === 200) { // 成功
		var data = xhr.responseText; // 获取响应的文本数据
		// 如果有成功执行的函数，则调用
		if (options.dataType === "json") // 预期返回的是 JSON 格式的数据
			data = JSON.parse(data);
		options.success && options.success(data);
	} else { // 失败
		options.error && options.error(xhr);
	}
}

// jsonp 跨域
function jsonp(url, fn) {
	// 以随机算法生成一个回调函数名
	var functionName = "fn" + Math.random().toString().slice(2);
	// 将回调函数挂载到 window 下
	window[functionName] = function(data){
		fn && fn(data);
		window[functionName] = null;
	};
	// 将 url 最后一个 ? 替换为回调函数名
	if (count(url, "?") > 1){
		var index = url.lastIndexOf("?");
		url = url.slice(0, index) + functionName + url.slice(index+1);
	}
	// 创建 script 元素
	var _script = document.createElement("script");
	// 设置 script 元素的 src 属性
	_script.src = url;
	// 将 script 元素添加到页面中
	document.getElementsByTagName("body")[0].appendChild(_script);
	document.getElementsByTagName("body")[0].removeChild(_script);
}

// 保存/获取 cookie
// key:cookie名称
// value:cookie值
// options:可选配置参数
//		{expires:7, path:"/", domain:"", secure:true}
// 如果调用 cookie 函数时，有传递 value 参数，则是保存 cookie
// 如果调用 cookie 函数时，没有传递 value 参数，则是查询 cookie
// 保存 cookie 没有返回值
// 查询 cookie，如果查找到，则返回 cookie 值，未查找到，返回 null
function cookie(key, value, options) {
	if (typeof value !== "undefined"){ // 保存 cookie
		options = options || {};
		// 基本的 key = value 结构
		var cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value);
		// 失效时间
		if (typeof options.expires !== "undefined") {
			if (typeof options.expires === "number") {
				var date = new Date();
				date.setDate(date.getDate() + options.expires);
				cookie += "; expires=" + date.toUTCString();
			} else {
				cookie += "; expires=" + options.expires.toUTCString();
			}
		}
		// 路径
		if (options.path)
			cookie += "; path=" + options.path;
		// 域名
		if (options.domain)
			cookie += "; domain=" + options.domain;
		// 安全链接
		if (options.secure)
			cookie += "; secure";

		// 保存 cookie
		document.cookie = cookie;
		return;
	}

	// 获取 cookie：根据 key 获取 value
	// 根据 cookie 名称获取对应的 cookie 值
	var cookies = document.cookie.split("; ");
	for (var i = 0, len = cookies.length; i < len; i++) {
		var cookie = cookies[i].split("=");
		if(decodeURIComponent(cookie.shift()) === key) {
			return decodeURIComponent(cookie.join("="));
		}
	}
	return null;
}

// 根据 cookie 名删除 cookie
function removeCookie(key, options) {
	options = options || {};
	options.expires = -1;
	cookie(key, "", options);
}


// element:待实现运动动画的元素
// speed: 控制运动时间，单位---毫秒
// options: 对象，保存运动目标终值的对象 {left:300, top:500, width:500, height:300, opacity:0.5}
// fn : 运动动画结束后，继续执行的函数
function animate(element, speed, options, fn) {
	// 先取消当前元素上之前的运动动画
	clearInterval(element.timer);
	// 保存各属性运动前的初始值
	var beforeMoved = {};
	// 保存各属性运动的范围
	var changeDistance = {};
	// 获取各运动初始的初始值
	for (var attr in options) {
		beforeMoved[attr] = parseFloat(css(element, attr)) || 0;
		changeDistance[attr] = options[attr] - beforeMoved[attr];
	}

	// 记录运动起始时间
	var startTime = +new Date();
	// 启动定时器，实现运动动画
	element.timer = setInterval(function(){
		// 计算已运动时间
		var elapsed = Math.min(+new Date() - startTime, speed);
		// 换算各属性当前次属性值
		for (var attr in options) {
			// 计算当前遍历到的 attr 属性值
			var value = elapsed * changeDistance[attr] / speed + beforeMoved[attr];
			// 设置 element 元素CSS属性值
			element.style[attr] = value + (attr === "opacity" ? "" : "px");
			// IE
			if (attr === "opacity") {
				element.style.filter = "alpha(opacity="+ (value * 100) +")";
			}
		}
		// 判断是否停止定时器
		if (elapsed === speed) {
			clearInterval(element.timer);
			// 判断，有要继续执行的函数，则调用
			fn && fn();
		}
	}, 30);
}

// 淡入
function fadeIn(element, speed, fn) {
	if (css(element, "display") === "none") {
		element.style.display = "block";
		element.style.opacity = 0;
	}
	animate(element, speed, {opacity:1}, fn);
}

// 淡出
function fadeOut(element, speed, fn) {
	animate(element, speed, {opacity:0}, function(){
		element.style.display = "none";
		fn && fn();
	});
}