var submitObj = $('#ipcForm').serializeObject(),
                data={};
            submitObj.productionLine = {id:submitObj.productionLine};
            console.log(submitObj);
            data = {
                    jsonStr: JSON.stringify(submitObj)
            };
            saves(data, 'ipc')
/***
     * 保存资源
     * @param params 传递参数
     * @param moduleName 模块名称
     */
    function saves(params, moduleName){
        var goName = moduleName.substring(0, 1).toUpperCase() + moduleName.substring(1);
        console.log(submitObj);
        loading = layer.load();
        $.ajax({
            url: moduleName + '/save' + goName,
            data: params,
            type: "post",
            success:function(data){
                layer.close(loading);
                if (!data.success){
                    layer.msg(data.message ? data.message : '保存失败！', {icon: 5});
                } else {
                    layer.msg('保存成功！', {icon: 6});
                    goPage('index');
                }
            }
        }); 
    }