
var tipForm = document.getElementsByClassName('cover')[0],
	tabBar = document.getElementsByClassName('tab-bar')[0],
	content = document.getElementsByClassName('content')[0],
	list = [],
	tabNode;
// 初始化页面
 init();
function init() {
	list.push({tab:'第一个tab', text:'第一个内容'});
	showNodes();
	selectNode();
}
// 渲染节点
function showNodes() {
	var len = list.length,
		tabHtml = '',
		textHtml = '',
		i;
	for (i = 0; i < len; i++) {
		tabHtml += '<div class="tab" onclick="selectNode(this)">' + list[i].tab + '</div>';
		textHtml += '<div class="text ' + list[i].tab + '">' + list[i].text + '</div>';
	}
	tabBar.innerHTML = tabHtml;
	content.innerHTML = textHtml;
	chargeNodes();
	hideNodes('tab', 'text');
}

// 新增输入框
function showTipForm() {
	if (hasClass(tipForm, 'hide')) {
			removeClass(tipForm, 'hide');
			document.getElementsByClassName('input-tab')[0].value = '';
			document.getElementsByClassName('input-text')[0].value = '';
	}
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
	temp = {
		tab: tab,
		text: text
	}
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
		textNode;
	tabNode = e || tabs[tabs.length - 1];
	textNode = document.getElementsByClassName(tabNode.innerHTML)[0];
	hideNodes('tab', 'text');
	tabNode.style.background = '#006c84';
	removeClass(textNode, 'hide');
}

// 节点数量判断 
function chargeNodes() {
	var list = document.getElementsByClassName('tab'),
		len = list.length ,
		add = document.getElementsByClassName('add')[0],
		minus = document.getElementsByClassName('minus')[0];

	if (len >= 4) {
		addClass(add, 'hide');
	} else if (len <= 1) {
		addClass(minus, 'hide');
	} else {
		removeClass(add, 'hide');
		removeClass(minus, 'hide');
	}
}

// 删除节点
function removeNode() {
	var len = list.length,
		temp = tabNode.innerHTML,
		i, index;

	for(i = 0; i < len; i++) {
		if (list[i].tab === temp) {
			index = i;
			console.log(index);
			break;
		}
	}
	list.splice(index, 1);
	showNodes();
	if (index < (len - 1)){
		tabNode = tabBar.getElementsByClassName('tab')[index];
	} else{
		tabNode = tabBar.getElementsByClassName('tab')[index - 1];
	}
	selectNode(tabNode);
}

// 构造函数
function CreateTab(tab, text) {
	this.tab = tab;
	this.text = text;
	if(typeof this.sayName !== 'function') {
		console.log("需要创建原型方法");
		CreateTab.prototype.sayName = function() {
			console.log('我是'+this.tab+',是一只'+this.text)
		}
	}
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

