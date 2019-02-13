

	var startData = {
			elem : '#noDailyDate',
			format : 'YYYY-MM-DD',
			min : '2010-02-14', //设定最小日期
			max : laydate.now(-1), //最大日期 昨天
			istoday : false,
			issure: false, //是否显示确认
			festival: true, //是否显示节日
			choose: function(dates){ //选择好日期的回调
				$.ajax({ 
					url: 'dailyReport/noDailyReportData/'+dates, 
					method:'get',
					success: function(res, error){
						var noDailyReportData = res[0] ? res[0].accounts : '',
							container = $('.no-daily .accounts');
						
						$('.no-daily .accounts').attr('accounts', noDailyReportData);
						noDailyList(noDailyReportData, container);
			        }
				});
			}
		},
		noDailyReportData = $('.no-daily .accounts').attr('accounts'),
		container = $('.no-daily .accounts');
	
	// 加载日历控件
	laydate(startData);
	$('#noDailyDate').val($('.no-daily .accounts').attr('todayDate'));
	
	// 加载footable
	$('.footable').footable();
	//noDailyList(noDailyReportData, container);
	//showLeaveTimes();	

/**
 * 渲染未提交日报的列表
 * @param {String} data
 * @param {Object} container 渲染内容的节点
 */
function noDailyList(data, container){
	var list = data.length > 0 ? data.split(" ") : [],
		len = list.length,
		html = '',
		i;
	if(data.length > 0){
		if (len > 0) {
			for(i = 0; i < len; i++) {
				html +='<span class="col-sm-3 col-md-2">' + list[i] + '</span>'
			}
		}
	} else {
		html = "无"
	}
	
	container.html(html);
}

/**
 * 判断请假的时段
 */
function showLeaveTimes(){
	var now = laydate.now(),
		ele = document.getElementsByClassName('leave-times'),
		html = '',
		result ='',
		len, i, j, data, beginTime, endTime;
	if (ele){
		len = ele.length;
		for (i = 0; i<len; i++){
			data = ele[i].getAttribute('leave-times');
			html = '';
			result ='';
			data = eval("("+data+")")
			for (j = 0; j< data.length; j++){
				beginTime = laydate.now(data[j].beginTime,"YYYY-MM-DD hh:mm");
				if (beginTime.indexOf(now) == -1) {
					result += '未来'
				} else if (beginTime.indexOf("09:") !== -1){
					result += '上午';
				} else if (beginTime.indexOf("13:") !== -1){
					result += '下午';
				}
			}
			html = judge(result);
			ele[i].innerHTML = html;
		}
	}
	function judge(result){
		var html = '';
		if (result.indexOf('上午') !== -1 && result.indexOf('下午') !== -1){
			html += "全天  ";
		} else if (result.indexOf('上午') !== -1) {
			html += "上午  ";
		} else if (result.indexOf('下午') !== -1) {
			html += "下午  ";
		}
		if (result.indexOf('未来') !== -1) {
			html += "未来  ";
		}
		return html
	}
}
