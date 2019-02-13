$(function(){

        // validate signup form on keyup and submit
        var icon = "<i class='fa fa-times-circle'></i> ";
        $("#flowModelForm").on("submit",function(){
        	return false;
        })
        $("#flowModelForm").validate({
            rules: {
                name: {
                    required: true
                    
                },
                code: {
                    required: true
                   
                }
            },
            messages: {
            	name: {
                    required: icon + "请填写模型名称"
                   
                },
                code: {
                    required: icon + "请选择用途"
                  
                }
            },
            submitHandler:function(form){
            	var data = $(form).serializeObject()
            	data.category = $(form).find("select option:selected").html()
            	var url =form.action            	
            	loading = layer.load();
            	$.ajax({
                	url:url,
                	type:"post",
                	data:data,
                	success:function(data){
                		data = JSON.parse(data);                		
                		layer.close(loading);
                		if (!data.success) {
                			layer.alert(data.message ? data.message : '保存失败',{icon: 5});
                		} else {
                			goPage('list');
                		}
                	}
                })
            	//console.log($(form).serializeObject())
            	
            }     
        });
    });