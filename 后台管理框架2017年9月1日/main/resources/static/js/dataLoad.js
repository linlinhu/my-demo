function initTable(modelName, totalPage, curr, limit) {
		
	var i=0,
		pageInput = $('#' + modelName + 'SearchForm input[name="page"]'),
		paramsEls = null,
		limit = limit ? limit : 8;

	pageInput.val(curr);
	
	//初始化列表
	$('#' + modelName +'Table').footable();
	if(totalPage > 0) {
		//执行一个laypage实例
		laypage.render({
			elem: modelName + 'Page', //注意，这里的 test1 是 ID，不用加 # 号
			count: totalPage * limit, //数据总数 //从服务端得到
			limit: limit,
			curr: pageInput.val(),
			theme: '#0069b6',
			first : '«', //将首页显示为数字1,。若不显示，设置false即可
			last : '»', //将尾页显示为总页数。若不显示，设置false即可
			prev : '‹', //若不显示，设置false即可
		  	next: '›', //若不显示，设置false即可
			jump : function(obj, first) {
				if(!first) {
					pageInput.val(obj.curr);
					pageSearch(modelName, limit);
				}
			}
		});
	}  
	$('#' + modelName + 'SearchForm button[role="submit"]').attr('onclick',"pageSearch('" + modelName + "', '" + limit + "')");
	$('#' + modelName + 'SearchForm button[role="reset"]').attr('onclick',"resetForm('" + modelName + "', '" + limit + "')");
	
	paramsEls = $('#' + modelName + 'SearchForm input[role="user-params"]');
	for(i = 0; i < paramsEls.length; i++) {
		$(paramsEls[i]).attr('onchange',"resetPage('" + modelName + "')");
	}
	
	paramsEls = $('#' + modelName + 'SearchForm select[role="user-params"]');
	for(i = 0; i < paramsEls.length; i++) {
		$(paramsEls[i]).attr('onchange',"resetPage('" + modelName + "')");
	}
	
}


/**
 * 搜索查询
 */
function pageSearch(modelName, limit) {
	goPage('index?limit=' + limit + '&' + $('#' + modelName + 'SearchForm').serialize());
}

/**
 * 重置表单
 */
function resetForm(modelName, limit) {
	$('#' + modelName + 'SearchForm input').val('');
	goPage('index?limit=' + limit);
}

/**
 * 重置页码
 */
function resetPage(modelName){
	$('#' + modelName + 'SearchForm input[name="page"]').val(1);
}
