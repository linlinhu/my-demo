function lunboMove(){
	var _left=-nextIndex*imgWidth,
		liType = lis[nextIndex].getAttribute('type');
		liTime = lis[nextIndex].getAttribute('time')*1000;
		video = $(".videoYX",lis[nextIndex])[0];
	console.log(nextIndex,liType)
	
	for(var i=0;i<len-2;i++){
		circles[i].style.background="rgba(93,160,119,0.2)";
	}
	var currIndex=0;
	if(nextIndex===0){
		currIndex=len-3
	}else if(nextIndex===len-1){
		currIndex=0
	}else{
		currIndex=nextIndex-1
	}
	circles[currIndex].style.background="rgba(93,160,119,0.6)";
	lunboAnimate(_ul,1000,{left:_left},function(){//调用函数实现轮播
		index=nextIndex;
		nextIndex++;
		if(nextIndex>=len){  
		//当循环到最后一张图片时，切换到第二张（相同图片，克隆产生）
			_ul.style.left=-imgWidth+"px";
			index=1;
			nextIndex=2;
		}
		if(nextIndex<=1){
			_ul.style.left=-(len-2)*imgWidth+"px";
			nextIndex=len-1;
			index=len-2;	
		}
	});
	if(liType == 'video'){
		/*clearInterval(timer);*/
		video.play();
		/*video.addEventListener('ended',videoEnd)
		if(video.error.code){//播放失败的处理，会显示默认图片
			console.log('播放失败',video.error.code)
			videoEnd()
		}*/
	}
	setTimeout(lunboMove,liTime)
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
function videoEnd(){
	console.log('视频播放结束')
	timer=setInterval(lunboMove,3000)
}
