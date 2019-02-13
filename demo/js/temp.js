	var adData = [
		{src:'mock/images/m3.jpg',type:'images'},
		{src:'mock/images/m1.jpg',type:'images'},
		{src:"mock/videos/mov_bbb.mp4",type:'video'},
		{src:'mock/images/m2.jpg',type:'images'},
		{src:"mock/videos/3theA.mp4",type:'video'}
		
	];
	var _box=$("#scrollAds"),
	_pages = $('#lunbopages'),
	_ul=$("ul",_box)[0],
	lunboLen='',
	video = '', 
	circles = '',
	lis = '',
	lunboindex=1,
	nextIndex=2,
	timer="";
	imgWidth=_box.width();
	
	var html = "";
	lunboLen = adData.length;
	_ul.innerHTML = "";
	_pages.css({width:lunboLen*30});
	for(var i=0;i<lunboLen;i++){
		if(adData[i].type =='1'){
			html+=' <li type="'+adData[i].type+'"><video class="videoYX" poster="mock/images/m4.jpg"  src="'+adData[i].url+'" onended = "timer=setInterval(lunboMove,3000)"></video></li>'
		}else{
			html+='<li type="'+adData[i].type+'"><img src="'+adData[i].url+'"></li>'
		}
	};
	_ul.innerHTML = html;
	var _div='';
 	for(var i=0;i<lunboLen;i++){
 		_div+='<div></div>';
 	}
 	_pages.html(_div);
 	circles=$("div",_pages); 
 	lis=$("li",_box);
 	var _first=lis[0].cloneNode(true),
 		_last=lis[lunboLen-1].cloneNode(true);
 	_ul.appendChild(_first);
 	_ul.insertBefore(_last,lis[0]);
 	lunboLen+=2;
 	lis=$("li",_box);
 	lunboindex=1;
 	nextIndex=2;
 	_ul.style.width=lunboLen*imgWidth+"px";
 	circles[0].style.background="rgba(93,160,119,0.6)";
 	_ul.style.left=-imgWidth+"px";
 	timer=setInterval(lunboMove,3000);

	function lunboMove(){
		var _left=-nextIndex*imgWidth,
			liType = lis[nextIndex].getAttribute('type');
			video = $(".videoYX",lis[nextIndex])[0];
		for(var i=0;i<lunboLen-2;i++){
			circles[i].style.background="rgba(93,160,119,0.2)";
		}
		var currIndex=0;
		if(nextIndex===0){
			currIndex=lunboLen-3
		}else if(nextIndex===lunboLen-1){
			currIndex=0
		}else{
			currIndex=nextIndex-1
		}
		circles[currIndex].style.background="rgba(93,160,119,0.6)";
		lunboAnimate(_ul,1000,{left:_left},function(){//调用函数实现轮播
			lunboindex=nextIndex;
			nextIndex++;
			if(nextIndex>=lunboLen){  
			//当循环到最后一张图片时，切换到第二张（相同图片，克隆产生）
				_ul.style.left=-imgWidth+"px";
				lunboindex=1;
				nextIndex=2;
			}
			if(nextIndex<=1){
				_ul.style.left=-(lunboLen-2)*imgWidth+"px";
				nextIndex=lunboLen-1;
				lunboindex=lunboLen-2;	
			}
		});
		if(liType == '1'){
			clearInterval(timer);
			setTimeout(function(){
				var e = document.createEvent("MouseEvents");
				e.initEvent("click", true, true);
				video.dispatchEvent(e);
			},500);
		}
	}
function lunboAnimate(element, speed, options, fn) {
	// 先取消当前元素上之前的运动动画
	clearInterval(element.timer);
	// 保存各属性运动前的初始值
	var beforeMoved = {};
	// 保存各属性运动的范围
	var changeDistance = {};
	// 获取各运动初始的初始值
	for (var attr in options) {
		beforeMoved[attr] = parseFloat(element.style.left) || 0;
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




//var _box=$("#scrollAds"),
//	_pages = $('#lunbopages'),
//	_ul=$("ul",_box)[0],
//	lunboLen='',
//	video = '', 
//	circles = '',
//	lis = '',
//	lunboindex=1,
//	nextIndex=2,
//	timer="";
//	imgWidth=_box.width();
function loadAds(){
/* plus.adv.getAwaitUrls(function(result){
		var r = JSON.parse(result[0]);*/
		 /* if(r.success){
			var adData = r.rows,
				html = "";
			lunboLen = adData.length;
			_ul.innerHTML = "";
			_pages.css({width:lunboLen*30});
			for(var i=0;i<lunboLen;i++){
				if(adData[i].type =='1'){
					html+=' <li type="'+adData[i].type+'"><video class="videoYX" poster="mock/images/m4.jpg"  src="'+adData[i].url+'" onended = "timer=setInterval(lunboMove,3000)"></video></li>'
				}else{
					html+='<li type="'+adData[i].type+'"><img src="'+adData[i].url+'"></li>'
				}
			};
			_ul.innerHTML = html;
			var _div='';
		 	for(var i=0;i<lunboLen;i++){
		 		_div+='<div></div>';
		 	}
		 	_pages.html(_div);
		 	circles=$("div",_pages); 
		 	lis=$("li",_box);
		 	var _first=lis[0].cloneNode(true),
		 		_last=lis[lunboLen-1].cloneNode(true);
		 	_ul.appendChild(_first);
		 	_ul.insertBefore(_last,lis[0]);
		 	lunboLen+=2;
		 	lis=$("li",_box);
		 	lunboindex=1;
		 	nextIndex=2;
		 	_ul.style.width=lunboLen*imgWidth+"px";
		 	circles[0].style.background="rgba(93,160,119,0.6)";
		 	_ul.style.left=-imgWidth+"px";
		 	timer=setInterval(lunboMove,3000);*/
		/*}*/
	/*},function(result){
		keyStatus=0;
		showAlert("获取广告数据失败");
	});*/
   
}