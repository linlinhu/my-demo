$('.qrcode1').qrcode({
	render : "canvas",
	width: 200,
	height: 200,
	text: "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=%E6%B7%98%E5%AE%9D&oq=%25E6%25B7%2598%25E5%25AE%259D&rsv_pq=e4971d2b0000d78f&rsv_t=b9379l1Rbb%2BBhBNRkxTxfVgjZTzKDFp4ER9HFfBlGAtGtLgptVebejklLTY&rqlang=cn&rsv_enter=0",
	src: '../images/img_qrcode_logo.png' ,//logo地址
	imgWidth:30,//logo的宽高
	imgHeight:30
});
function changeColor(){
	//全局
	$(".bg").css({background:"#DAD9DE"});
	$(".wrap").css({color:"#333333"});
	$(".blue-bg").css({color:"white"});
	$(".yellow-bg").css({color:"white"});
	$("i.close").css({"background-image":"url(img/close-gray.png)","border-color":"#B7B7BB"});
	$(".ab-page-title").css({color:"#51362D"});
	//index-moudle
	$(".index .left-icon").css({height:"350px","margin-top":"-20px"});
	$(".index-qrcode div").css({color:"#666666"});
	$(".index-qrcode .qrcode").css({"background-image":"url(img/qrcode-gray.png)",height:"130px",width:"130px"});
	$(".index-buy .buy").css({"background-image":"url(img/buy-gray.png)"});
	$(".index-service .service").css({"background-image":"url(img/service-gray.png)"});
	$(".index-service div").css({color:"#032541"});
	$(".index-wechat").css({"margin-top":"40px"});
	$(".index .ab-bot").css({"text-align":"left"});
	$(".index .ab-bot i").css({"background-image":"url(img/waiter-gray.png)"});
	$(".index .index-info").css({color:"#51362D"})
	$(".index .index-info .ab-set i").css({"background-image":"url(img/set-up-gray.png)"});
	$(".index .index-info .ab-set").css({position:"absolute","left":"106px","top":"230px","z-index":1});
	//win-list-moudle
	$(".win .mid").css({"border-color":"#CDCCD1"});
	$("#win-lst-moudle .pre").css({"background-image":"url(img/win-list-pre-default-gray.png)"});
	$("#win-lst-moudle .next").css({"background-image":"url(img/win-list-next-default-gray.png)"});
	$("#win-lst-moudle .next").hover(function(){
		$("#win-lst-moudle .next").css({"background-image":"url(img/win-list-next-hover-gray.png)"});
	},function(){
		$("#win-lst-moudle .next").css({"background-image":"url(img/win-list-next-default-gray.png)"});
	});
	
	$("#win-lst-moudle .pre").hover(function(){
		$("#win-lst-moudle .pre").css({"background-image":"url(img/win-list-pre-hover-gray.png)"});
	},function(){
		$("#win-lst-moudle .pre").css({"background-image":"url(img/win-list-pre-default-gray.png)"});
	})
	//service-lst-moudle
	$(".service-lst-table dt").css({color:"#333333"});
	$("#service-data-lst dd").css({color:"#666666"});
	//keybord
	$(".keybord-wrap").css({"background":"#FFFFFF"});
	$("#keybord-input").css({"background":"#EAEFF2"});
	$(".close-oper").removeClass("red-bg");
	$(".close-oper").addClass("coffee-bg");
	$(".close-oper .close").css({"background-image":"url(img/close.png)"});
	$("#keybord-confirm").removeClass("red-bg");
	$("#keybord-confirm").addClass("coffee-bg");
	//运维
	$(".maintain-list-moudle").css({background:"#DAD9DE"});
	$(".maintain-list-moudle .container").css({"border-color":"#DAD9DE",color:"#666666"});
	$(".maintain-list-moudle .right p").css({"border-color":"#51362D",color:"#333333"});
	$(".maintain-list-moudle  .right .yellow-bg").css({"background-color":"#51362D"});
	$(".maintain-list-moudle  .border-bottom").css({"color":"#666666"});
	// alert-form
	$(".alert .cover").addClass("hide");
	$(".alert .pu-bar").css({"background":"#DAD9DE"});
	$(".alert .pu-bar span").css({"color":"#333333"});
	$(".alert .tips").css({"background":"#FFFFFF","border-color":"#AEAEB2"});
	$(".alert .close").css({border:0});
	$(".alert-content").css({"color":"#666666"});
	//loading-wait
	$("#loading-wait .cover").addClass("hide");
	$("#loading-wait .pu-bar").css({"background":"#DAD9DE"});
	$("#loading-wait .pu-bar span").css({"color":"#333333"});
	$("#loading-wait .tips").css({"background":"#FFFFFF","border-color":"#AEAEB2"});
	//设置
	$(".set-up-info .stick").css({"background-color":"gray"});
	//支付
	$("#scanCounter-popUp .pu-wrap").css({background:"white"});
	$("#scanCounter-popUp .pu-bar").css({background:"#DAD9DE"});
	$("#scanCounter-popUp .pay-code").css({border:"2px solid #E5E5E5"});
	$("#scanCounter-popUp .scan-info").css({"border-color":"#999999"});
	$("#scanCounter-popUp .close").css({"border":"0"});
	$("#scanCounter-popUp .pu-tail").addClass("hide");
	//服务员登录
	$(".input-login .login-input").css({color:"#999999"})
};