function fun(){
	var html = "<img src = \"../images/img_qrcode_logo.pn\" onerror= \"this.src='../images/pic.jpg'\" />"
	/*document.getElementById('box').innerHTML = html;*/
	$('#box').html(html);
}
		var status = ""
		if(window.applicationCache){
			//alert('支持离线缓存')
		}else{
			alert('不支持离线缓存')
		}
		var appCache = window.applicationCache; 
		switch (appCache.status) { 
		　　case appCache.UNCACHED: // UNCACHED == 0 
		　　　　status =  'UNCACHED'; 
				console.log('UNCACHED');
		　　　　break; 
		　　case appCache.IDLE: // IDLE == 1 
		　　　　status =  'IDLE'; 
				console.log('IDLE');
		　　　　break; 
		　　case appCache.CHECKING: // CHECKING == 2 
		　　　　status =  'CHECKING'; 
				console.log('CHECKING');
		　　　　break; 
		　　case appCache.DOWNLOADING: // DOWNLOADING == 3 
		　　　　status =  'DOWNLOADING'; 
				console.log('DOWNLOADING');
		　　　　break; 
		　　case appCache.UPDATEREADY: // UPDATEREADY == 4 
		　　　　status =  'UPDATEREADY'; 
				console.log('UPDATEREADY');
		　　　　break; 
		　　case appCache.OBSOLETE: // OBSOLETE == 5 
		　　　　status =  'OBSOLETE'; 
				console.log('UOBSOLETE');
		　　　　break; 
		　　default: 
		　　　　status =  'UKNOWN CACHE STATUS'; 
				console.log('UKNOWN CACHE STATUS');
		　　　　break; 
	　　};
	
	applicationCache.onupdateready= function(){  /*页面刷新*/
	  location.reload();  
	} 
	
	if (window.applicationCache.status == window.applicationCache.UPDATEREADY){
		 window.applicationCache.update();
		 location.reload();  
	}
	/*setInterval(function(){
            window.applicationCache.update();
            console.log(window.applicationCache.status,'uiwir235454')
    },10000);*/
   
// applicationCache.addEventListener("updateready",function(){
//	    alert("缓存更新完成");
//	},false);   
