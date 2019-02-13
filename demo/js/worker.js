// 写法一
/*onmessage=function(e){

    var data=e.data;

    for(i=0;i<data;i++){

        console.log('worker.js')
        //我们需要的代码

    }
    postMessage(data)
}*/

// 写法二
this.addEventListener('message', function (e) {
	let data = e.data?e.data:{},
		_this = this;
	var Ajax={
	  get: function(url, fn) {
	    // XMLHttpRequest对象用于在后台与服务器交换数据   
	    var xhr = new XMLHttpRequest(); 
	    console.log('url',url,data);
	    xhr.open('GET', url, true);
	    xhr.onreadystatechange = function() {
	      // readyState == 4说明请求已完成
	      if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) { 
	        // 从服务器获得数据 
	    	console.log(xhr);
	        fn.call(this, xhr.response);  
	      }
	    };
	    xhr.send();
	  },
	  // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
	  post: function (url, data, fn) {
	    var xhr = new XMLHttpRequest();
	    console.log('url',url,data);
	    xhr.open("POST", url, true);
	    // 添加http头，发送信息至服务器时内容编码类型
	    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
	    xhr.onreadystatechange = function() {
	      if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
	        fn.call(this, xhr.response);
	      }
	    };
	    xhr.send(data);
	  }
	}
  /*this.postMessage('You said: ' + e.data);*/
  if(data.methodType ==  "GET") {
  	Ajax.get(data.url,function(res) {
  		console.log('res',res)
  		_this.postMessage(res);
  		
  	})
  } else {
  	Ajax.post(data.url,data,function(res){
  		
  		_this.postMessage(res);
  	})
  }
}, false);

// 写法三
/*addEventListener('message', function (e) {
  postMessage('You said: ' + e.data);
}, false);*/

//面向领域的写法