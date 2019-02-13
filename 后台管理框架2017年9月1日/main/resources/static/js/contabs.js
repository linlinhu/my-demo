/***
 * 监听浏览器前进后退
 */
window.onpopstate = function(event) {
	var dataUrl = window.location.hash.substring(1),
		params = event.state,
		convertTab = null,
		dataIndex = 0,
		iframeOperation = '';
	
	$('.J_menuTab').each(function() {
		if (dataUrl.indexOf($(this).attr('iframe-index')) >= 0) {
			dataIndex = $(this).attr('data-index');
			iframeOperation = dataUrl.substring($(this).attr('iframe-index').length);
			return false;
		}
	})
	if(params){
		params.flag = 3;
	}else{
		params = {
			flag:3
		}
	}
	
	loadContentData(dataIndex, params, iframeOperation);
};

//计算元素集合的总宽度
function calSumWidth(elements) {
    var width = 0;
    $(elements).each(function () {
        width += $(this).outerWidth(true);
    });
    return width;
}
//滚动到指定选项卡
function scrollToTab(element) {
    var marginLeftVal = calSumWidth($(element).prevAll()), marginRightVal = calSumWidth($(element).nextAll());
    // 可视区域非tab宽度
    var tabOuterWidth = calSumWidth($(".content-tabs").children().not(".J_menuTabs"));
    //可视区域tab宽度
    var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
    //实际滚动宽度
    var scrollVal = 0;
    if ($(".page-tabs-content").outerWidth() < visibleWidth) {
        scrollVal = 0;
    } else if (marginRightVal <= (visibleWidth - $(element).outerWidth(true) - $(element).next().outerWidth(true))) {
        if ((visibleWidth - $(element).next().outerWidth(true)) > marginRightVal) {
            scrollVal = marginLeftVal;
            var tabElement = element;
            while ((scrollVal - $(tabElement).outerWidth()) > ($(".page-tabs-content").outerWidth() - visibleWidth)) {
                scrollVal -= $(tabElement).prev().outerWidth();
                tabElement = $(tabElement).prev();
            }
        }
    } else if (marginLeftVal > (visibleWidth - $(element).outerWidth(true) - $(element).prev().outerWidth(true))) {
        scrollVal = marginLeftVal - $(element).prev().outerWidth(true);
    }
    $('.page-tabs-content').animate({
        marginLeft: 0 - scrollVal + 'px'
    }, "fast");
}

/***
 * 加载内容
 * @param dataIndex 选中的下标
 * @param params 数据加载参数
 * @param operation 数据加载操作
 * @returns {Boolean}
 */
function loadContentData(dataIndex, params, operation,callback) {
	var	menuItem = $('.J_menuItem[data-index=' + dataIndex + ']'),
        menuName = $.trim(menuItem.text()),
        dataUrl = menuItem.attr('href'),
    	tabItem = $('.J_menuTab[data-index=' + dataIndex + ']'),
        tabStr = '',
    	contentItem = $(".J_iframe[name='iframe"+dataIndex+"']"),
    	contentStr = '',
        iframeIndex = '',
        loading = null;
	
    if (dataUrl == undefined || $.trim(dataUrl).length == 0)return false;
    
	iframeIndex = dataUrl.substring(0, dataUrl.lastIndexOf('/') + 1);
//	iframeIndex = iframeIndex.substring(0, iframeIndex.lastIndexOf('-'));
	
    // 选项卡菜单已存在
    if(tabItem.length >= 1) {
    	if (!tabItem.hasClass('active')) {
        	tabItem.addClass('active').siblings('.J_menuTab').removeClass('active');
    	}
    } else {
    	tabStr = '<a href="javascript:;" class="active J_menuTab" data-id="' + dataUrl + '" data-index="' + dataIndex + '" iframe-index="' + iframeIndex + '">' + menuName + ' <i class="fa fa-times-circle"></i></a>';
        $('.J_menuTab').removeClass('active');
		$('.J_menuTabs .page-tabs-content').append(tabStr);
    }
    
    // 内容div已存在
    if(contentItem.length >= 1) {
    	contentItem.show().siblings('.J_iframe').hide();
    } else {
    	// 添加选项卡对应的iframe
        contentStr = '<div class="J_iframe" name="iframe' + dataIndex + '" width="100%" height="100%"  data-id="' + dataUrl + '" seamless></div>';
        $('.J_mainContent').find('div.J_iframe').hide().parents('.J_mainContent').append(contentStr);
       
    }
    if (operation) {
	    dataUrl = iframeIndex + operation;
    }
    if (params.flag != 3) {//浏览器控制前进后退，不作hash记录
    	window.history.pushState(params, null,location.href.split("#")[0] + "#"+ dataUrl);
    }
   
    loading = layer.load();
    $.ajax({
    	url:base+dataUrl,
    	type:"get",
    	success:function(data){
    		layer.close(loading);
    		contentItem = $(".J_iframe[name='iframe"+dataIndex+"']");
    		contentItem.html(data);
        	scrollToTab(tabItem);
        	if(callback && typeof callback == "function"){
        		callback()
        	}
    	}
    })
    
    
}
$(function () {
    
    
    //查看左侧隐藏的选项卡
    function scrollTabLeft() {
        var marginLeftVal = Math.abs(parseInt($('.page-tabs-content').css('margin-left')));
        // 可视区域非tab宽度
        var tabOuterWidth = calSumWidth($(".content-tabs").children().not(".J_menuTabs"));
        //可视区域tab宽度
        var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
        //实际滚动宽度
        var scrollVal = 0;
        if ($(".page-tabs-content").width() < visibleWidth) {
            return false;
        } else {
            var tabElement = $(".J_menuTab:first");
            var offsetVal = 0;
            while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) {//找到离当前tab最近的元素
                offsetVal += $(tabElement).outerWidth(true);
                tabElement = $(tabElement).next();
            }
            offsetVal = 0;
            if (calSumWidth($(tabElement).prevAll()) > visibleWidth) {
                while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth) && tabElement.length > 0) {
                    offsetVal += $(tabElement).outerWidth(true);
                    tabElement = $(tabElement).prev();
                }
                scrollVal = calSumWidth($(tabElement).prevAll());
            }
        }
        $('.page-tabs-content').animate({
            marginLeft: 0 - scrollVal + 'px'
        }, "fast");
    }
    //查看右侧隐藏的选项卡
    function scrollTabRight() {
        var marginLeftVal = Math.abs(parseInt($('.page-tabs-content').css('margin-left')));
        // 可视区域非tab宽度
        var tabOuterWidth = calSumWidth($(".content-tabs").children().not(".J_menuTabs"));
        //可视区域tab宽度
        var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
        //实际滚动宽度
        var scrollVal = 0;
        if ($(".page-tabs-content").width() < visibleWidth) {
            return false;
        } else {
            var tabElement = $(".J_menuTab:first");
            var offsetVal = 0;
            while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) {//找到离当前tab最近的元素
                offsetVal += $(tabElement).outerWidth(true);
                tabElement = $(tabElement).next();
            }
            offsetVal = 0;
            while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth) && tabElement.length > 0) {
                offsetVal += $(tabElement).outerWidth(true);
                tabElement = $(tabElement).next();
            }
            scrollVal = calSumWidth($(tabElement).prevAll());
            if (scrollVal > 0) {
                $('.page-tabs-content').animate({
                    marginLeft: 0 - scrollVal + 'px'
                }, "fast");
            }
        }
    }

    //通过遍历给菜单项加上data-index属性
    $(".J_menuItem").each(function (index) {
        if (!$(this).attr('data-index')) {
            $(this).attr('data-index', index);
        }
    });
    function initIndex(){
    	loadContentData(0, {'flag':3}, null,function(){
    		quickLink()
    		
    	});
    	
    	
    	
		return false;
    }
    function quickLink(){
    	if(window.location.hash!=""){
    		var dataUrl = window.location.hash.substring(1),
    		params={},
    		convertTab = null,
    		dataIndex = 0,
    		iframeOperation = '';
    	
    		//console.log("++++"+params);
    		$('.J_menuItem').each(function() {
    			var index_op = dataUrl.split("/")
    			if ($(this).attr('href').indexOf(index_op[0])>=0) {
    				
    				dataIndex = $(this).data('index');
    				iframeOperation =index_op[1]
    				return false;
    			}
    		})
    		if(params){
    			params.flag = 3;
    		}else{
    			params = {
    				flag:3
    			}
    		}
    		
    		loadContentData(dataIndex, params, iframeOperation);
    	}
    }
    function menuItem() {
        // 获取标识数据
        var dataIndex = $(this).data('index');
        
        loadContentData(dataIndex, {'flag':1}, null);
        

		return false;
    }
    
    
    

    $('.J_menuItem').on('click', menuItem);


    // 关闭选项卡菜单
    function closeTab() {
        var closeTabId = $(this).parents('.J_menuTab').data('id');
        var currentWidth = $(this).parents('.J_menuTab').width();

        // 当前元素处于活动状态
        if ($(this).parents('.J_menuTab').hasClass('active')) {

            // 当前元素后面有同辈元素，使后面的一个元素处于活动状态
            if ($(this).parents('.J_menuTab').next('.J_menuTab').size()) {

                var activeId = $(this).parents('.J_menuTab').next('.J_menuTab:eq(0)').data('id');
                $(this).parents('.J_menuTab').next('.J_menuTab:eq(0)').addClass('active');

                $('.J_mainContent .J_iframe').each(function () {
                    if ($(this).data('id') == activeId) {
                        $(this).show().siblings('.J_iframe').hide();
                        return false;
                    }
                });

                var marginLeftVal = parseInt($('.page-tabs-content').css('margin-left'));
                if (marginLeftVal < 0) {
                    $('.page-tabs-content').animate({
                        marginLeft: (marginLeftVal + currentWidth) + 'px'
                    }, "fast");
                }

                //  移除当前选项卡
                $(this).parents('.J_menuTab').remove();

                // 移除tab对应的内容区
                $('.J_mainContent .J_iframe').each(function () {
                    if ($(this).data('id') == closeTabId) {
                        $(this).remove();
                        return false;
                    }
                });
            }

            // 当前元素后面没有同辈元素，使当前元素的上一个元素处于活动状态
            if ($(this).parents('.J_menuTab').prev('.J_menuTab').size()) {
                var activeId = $(this).parents('.J_menuTab').prev('.J_menuTab:last').data('id');
                $(this).parents('.J_menuTab').prev('.J_menuTab:last').addClass('active');
                $('.J_mainContent .J_iframe').each(function () {
                    if ($(this).data('id') == activeId) {
                        $(this).show().siblings('.J_iframe').hide();
                        return false;
                    }
                });

                //  移除当前选项卡
                $(this).parents('.J_menuTab').remove();

                // 移除tab对应的内容区
                $('.J_mainContent .J_iframe').each(function () {
                    if ($(this).data('id') == closeTabId) {
                        $(this).remove();
                        return false;
                    }
                });
            }
        }
        // 当前元素不处于活动状态
        else {
            //  移除当前选项卡
            $(this).parents('.J_menuTab').remove();

            // 移除相应tab对应的内容区
            $('.J_mainContent .J_iframe').each(function () {
                if ($(this).data('id') == closeTabId) {
                    $(this).remove();
                    return false;
                }
            });
            scrollToTab($('.J_menuTab.active'));
        }
        return false;
    }

    $('.J_menuTabs').on('click', '.J_menuTab i', closeTab);

    //关闭其他选项卡
    function closeOtherTabs(){
        $('.page-tabs-content').children("[data-id]").not(":first").not(".active").each(function () {
            $('.J_iframe[data-id="' + $(this).data('id') + '"]').remove();
            $(this).remove();
        });
        $('.page-tabs-content').css("margin-left", "0");
    }
    $('.J_tabCloseOther').on('click', closeOtherTabs);

    //滚动到已激活的选项卡
    function showActiveTab(){
        scrollToTab($('.J_menuTab.active'));
    }
    $('.J_tabShowActive').on('click', showActiveTab);


    // 点击选项卡菜单
    function activeTab() {
        if (!$(this).hasClass('active')) {
            var currentId = $(this).data('id');
            // 显示tab对应的内容区
            $('.J_mainContent .J_iframe').each(function () {
                if ($(this).data('id') == currentId) {
                    $(this).show().siblings('.J_iframe').hide();
                    return false;
                }
            });
            $(this).addClass('active').siblings('.J_menuTab').removeClass('active');
            scrollToTab(this);
        }
    }

    $('.J_menuTabs').on('click', '.J_menuTab', activeTab);

    //刷新iframe
    function refreshTab() {
        var target = $('.J_iframe[data-id="' + $(this).data('id') + '"]');
        var url = target.attr('src');
        //显示loading提示
        var loading = layer.load();
        target.attr('src', url).load(function () {
            //关闭loading提示
            layer.close(loading);
        });
    }

    $('.J_menuTabs').on('dblclick', '.J_menuTab', refreshTab);

    // 左移按扭
    $('.J_tabLeft').on('click', scrollTabLeft);

    // 右移按扭
    $('.J_tabRight').on('click', scrollTabRight);

    // 关闭全部
    $('.J_tabCloseAll').on('click', function () {
        $('.page-tabs-content').children("[data-id]").not(":first").each(function () {
            $('.J_iframe[data-id="' + $(this).data('id') + '"]').remove();
            $(this).remove();
        });
        $('.page-tabs-content').children("[data-id]:first").each(function () {
            $('.J_iframe[data-id="' + $(this).data('id') + '"]').show();
            $(this).addClass("active");
        });
        $('.page-tabs-content').css("margin-left", "0");
    });
    initIndex()
});


/***
 * 页面操作跳转
 * @param operation
 * @returns {Boolean}
 */
function goPage(operation) {
	var activeTab = $('.page-tabs-content a.active'),
		dataIndex = activeTab.attr('data-index'),
		target = '',
		pstr = '',
		jsonStr = '',
		params = {},
		i = 0;
	
	params.flag = 2;
//    if (operation.indexOf('?') > 0) {
//    	pstr = (operation.split('?')[1]).split('&');
//		for (i = 0; i < pstr.length; i++) {
//			jsonStr += '"' + (pstr[i].split('='))[0] + '":"' + (pstr[i].split('='))[1] + '",';
//		}
//		jsonStr = '{' + jsonStr.substring(0, jsonStr.length-1) + '}';
//		params = JSON.parse(jsonStr);
//	}
//
//    operation = (operation.split('?')[0]);
	
    loadContentData(dataIndex, params, operation);
}