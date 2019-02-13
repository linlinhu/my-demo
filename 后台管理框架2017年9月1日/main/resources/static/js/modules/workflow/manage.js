$(".tdOperations a").click(function(){
	var id = $(this).attr("data-id")
	if($(this).hasClass("edit")){
		//编辑
		window.open("/workflow/modeler.html?modelId="+id)
	}
	else if($(this).hasClass("deploy")){
		//发布
		deploy(id)
	}
	else if($(this).hasClass("undeploy")){
		//取消发布
		undeploy(id)
	}
	else if($(this).hasClass("delete")){
		//删除
		removeModel(id)
	}
})
function undeploy(id){
	loading = layer.load();
	 $.ajax({
		 url:"/flow/"+id+"/undeploy",
		 type:'post',
		 dataType:"json",		
		 success:function(data){
			layer.close(loading);
	 		if (!data.success) {
	 			layer.alert(data.message ? data.message : '保存失败',{icon: 5});
	 		} else {
	 			goPage('list');
	 		}
			 
		 }
	 })
 }
 function deploy(id){
	 loading = layer.load();
     $.ajax({
         url:"/flow/"+id+"/deploy",
         type:'post',
         dataType:"json",         
         success:function(data){
        	 layer.close(loading);
     		if (!data.success) {
     			layer.alert(data.message ? data.message : '保存失败',{icon: 5});
     		} else {
     			goPage('list');
     		}
             
         }
     })
 }
 function removeModel(id){
	 loading = layer.load();
     $.ajax({
         url:"/flow/"+id+"/remove",
         type:'post',
         dataType:"json",        
         success:function(data){
        	 layer.close(loading);
     		if (!data.success) {
     			layer.alert(data.message ? data.message : '保存失败',{icon: 5});
     		} else {
     			goPage('list');
     		}
             
         }
     })
 }