var tipForm = document.getElementsByClassName('cover')[0],
	tabBar = document.getElementsByClassName('tab-bar')[0],
	content = document.getElementsByClassName('content')[0],
	nextTab = document.getElementsByClassName('next')[0],
	preTab = document.getElementsByClassName('pre')[0],
	list = [],
	tabNode, box, tabWidth, boxLeft;

// 初始化页面
init();
function init() {
	list.push(new CreateTab('tab1', '开始啦'));
	showNodes();
	selectNode();
	swiper();
}

// 渲染节点
function showNodes() {
	var len = list.length,
		tabHtml = '',
		textHtml = '',
		containerWidth = 600,
		i, tabs;

	for (i = 0; i < len; i++) {
		tabHtml += '<div class="tab" tabID="' + list[i].tabID + '" onclick=\'selectNode("' + list[i].tabID + '")\' ondblclick=\'showEditNode("' + list[i].tabID + '")\'>' +
						list[i].tab +
						'<span class="close" onclick="removeNode(this)"></span>' +
					'</div>';
		textHtml += '<div class="text ' + list[i].tab + '" ondblclick=\'showEditNode("' + list[i].tabID + '")\'>' + list[i].text + '</div>';
	}
	tabBar.innerHTML = '<div id="box">' +  tabHtml + '</div>';
	content.innerHTML = textHtml;
	chargeNodes();
	hideNodes('tab', 'text');
	tabs = tabBar.getElementsByClassName('tab');
	box = document.getElementById('box');
	if (len < 4) {
		for (i = 0; i < len; i++) {
			tabs[i].style.width = (1 / len) * containerWidth + 'px';
		}
		boxLeft = 0;
	} else {
		for (i = 0; i < len; i++) {
			tabs[i].style.width = 0.25 * containerWidth + 'px';
			tabWidth = 0.25 * containerWidth;
		}
		boxLeft = 4 - list.length;
	}

	box.style.width = parseInt(tabs[0].style.width) * len + 'px';
	position();
}

// 输入框
function showTipForm(title, tab, text) {
	tipForm.getElementsByTagName('p')[0].innerHTML = title;
	if (hasClass(tipForm, 'hide')) {
		removeClass(tipForm, 'hide');
		document.getElementsByClassName('input-tab')[0].value = tab;
		document.getElementsByClassName('input-text')[0].value = text;
	}
	document.getElementsByClassName('confirm')[0].removeEventListener('click', edit);
	document.getElementsByClassName('confirm')[0].addEventListener('click', addTab);
}

function hideTipForm() {
	addClass(tipForm, 'hide');
}

// 添加节点
function addTab() {
	var tab, text, i, temp;

	tab = document.getElementsByClassName('input-tab')[0].value;
	text = document.getElementsByClassName('input-text')[0].value;
	for (i = 0; i < list.length; i++) {
		if (tab === list[i].tab) {
			alert('tab名称重复');
			return false;
		}
	}
	if(tab.trim().length === 0) {
		alert('tab名不能为空');
		return false;
	}
	if(text.trim().length === 0) {
		text = '暂无内容。';
	}
	temp = new CreateTab(tab, text);
	list.push(temp);
	showNodes();
	selectNode();
	hideTipForm();
}

// 隐藏节点
function hideNodes(tabBarClassName, textClassName) {
	var textList = document.getElementsByClassName(textClassName),
		barList = document.getElementsByClassName(tabBarClassName),
		Tlen = textList.length,
		Blen = barList.length,
		i;

	for (i = 0; i < Tlen; i++) {
		addClass(textList[i], 'hide');
	}
	for (i = 0; i < Blen; i++) {
		barList[i].style.background = '#999';
	}
}

// 选中节点
function selectNode(e) {
	var tabs = tabBar.getElementsByClassName('tab'),
		len = tabs.length,
		textNode, i;

	tabNode = e || tabs[tabs.length - 1].getAttribute('tabID');
	textNode = document.getElementsByClassName(tabNode)[0];
	hideNodes('tab', 'text');
	for (i = 0; i < len; i++) {
		if (tabNode === tabs[i].getAttribute('tabID')) {
			tabs[i].style.background = '#006c84';
		}
	}
	removeClass(textNode, 'hide');
}

// 节点数量判断 
function chargeNodes() {
	var len = list.length,
		add = document.getElementsByClassName('add')[0],
		minus = document.getElementsByClassName('minus')[0];

	if (len >= 8) {
		addClass(add, 'hide');
	} else if (len <= 1) {
		addClass(minus, 'hide');
	} else {
		removeClass(add, 'hide');
		removeClass(minus, 'hide');
	}
}

// 删除节点
function removeNode(e) {
	var len = list.length,
		i, index, tabs, temp;

	if (window.confirm('确认删除')) {
		if (e) {
			window.event ? window.event.cancelBubble = true : e.stopPropagation();
			temp = e.parentNode.getAttribute('tabID');
		} else{
			temp = tabNode;
		}
		if (len > 1) {
			for (i = 0; i < len; i++) {
				if (list[i].tab === temp) {
					index = i;
				}
			}
			list.splice(index, 1);
			showNodes();
			if (!e || temp === tabNode) {
				if (index < (len - 1)) {
					tabNode = tabBar.getElementsByClassName('tab')[index].getAttribute('tabID');
				} else{
					tabNode = tabBar.getElementsByClassName('tab')[index - 1].getAttribute('tabID');
				}
			}
			boxLeft += 1;
			selectNode(tabNode);
		}
	}
}

// 确定位置
function position() {
	var len = list.length;

	if (len > 4) {
		box.style.marginLeft = boxLeft * tabWidth + 'px';
	}

	changeTabStatus(len, boxLeft);
}

// 滑动
function swiper() {
	var start, end;

	content.addEventListener('touchstart', function(e) {
		start = e.changedTouches[0].pageX;
	});
	content.addEventListener('touchend', function(e) {
		end = e.changedTouches[0].pageX;
		if (start - end > 0) { // 向左滑动
			changeTab(1);
		} else { // 向右滑动
			changeTab(0);
		}
	});
}

// 切换 type：0：上一个 1：下一个
function changeTab(type) {
	var len, index, i;
len = list.length;
	for (i = 0; i < len; i++) {
		if(list[i].tabID === tabNode) {
			index = i;
		}
	}
	if (type === 1) { // 向左滑动 下一个
		if (index > 0) {
			selectNode(list[index - 1].tabID);
			if (-index === boxLeft) {
				boxLeft += 1;
			}
		}
	} else { // 向右滑动 上一个
		if (index < len - 1) {
			selectNode(list[index + 1].tabID);
			if (index + boxLeft >= 3) {
				boxLeft -= 1;
			}
		}
	}
	position();
}

// 切换按钮的状态
function changeTabStatus(len, left) {
	addClass(preTab, 'hide');
	addClass(nextTab, 'hide');
	if (len > 4) {
		if(left === 0) {
			removeClass(nextTab, 'hide');
		} else if (len + left <= 4) {
			removeClass(preTab, 'hide');
		} else {
			removeClass(preTab, 'hide');
			removeClass(nextTab, 'hide');
		}
	}
}

// 获取需要编辑的节点
function showEditNode(e) {
	var tab = e,
		text = document.getElementsByClassName(e)[0].innerHTML;
	selectNode(e);
	showTipForm('编辑选项卡', tab, text);
	document.getElementsByClassName('confirm')[0].removeEventListener('click', addTab);
	document.getElementsByClassName('confirm')[0].addEventListener('click', edit);
}
// 编辑
function edit() {
	var len = list.length,
		tab = document.getElementsByClassName('input-tab')[0].value,
		text = document.getElementsByClassName('input-text')[0].value,
		i, index;

	for (i = 0; i < list.length; i++) {
		if (tabNode === list[i].tab) {
			index = i;
		} else if (tab === list[i].tab) {
			alert('tab名称重复');
			return false;
		}
	}
	if(tab.trim().length === 0) {
		alert('tab名不能为空');
		return false;
	}
	if(text.trim().length === 0) {
		text = '暂无内容。';
	}
	list[index] = new CreateTab(tab, text);
	tabNode = list[index].tab;
	showNodes();
	selectNode(tabNode);
	hideTipForm();
}

// 构造函数
function CreateTab(tab, text) {
	this.tab = tab;
	this.text = text;
	this.tabID = tab;
}

// 检索class  
function hasClass(element, className) {
	var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');

	return element.className.match(reg);
}
// 添加class  
function addClass(element, className) {
	if (!this.hasClass(element, className)) {
		element.className += ' ' + className;
	}
}
// 删除class
function removeClass(element, className) {
	var reg;

	if (hasClass(element, className)) {
		reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
		element.className = element.className.replace(reg,'');
	}
}

