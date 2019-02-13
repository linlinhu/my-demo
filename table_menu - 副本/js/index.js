
var tipForm = document.getElementsByClassName('cover')[0],
	tabBar = document.getElementsByClassName('tab-bar')[0],
	content = document.getElementsByClassName('content')[0],
	isVariable = true,
	tabNode, textNode;

// 新增输入框
function showTipForm() {
	chargeNodes(0);
	if(hasClass(tipForm, 'hide')) {
		if (isVariable) {
			removeClass(tipForm, 'hide');
			document.getElementsByClassName('input-tab')[0].value = '';
			document.getElementsByClassName('input-text')[0].value = '';
		}
	}
}

function hideTipForm() {
	addClass(tipForm, 'hide');
}

// 添加节点
function addTab() {
	var tab, text, list, i;
	tabNode = document.createElement('div'),
	textNode = document.createElement('div');
	tab = document.getElementsByClassName('input-tab')[0].value;
	text = document.getElementsByClassName('input-text')[0].value;
	list = document.getElementsByClassName('tab');

	for (i = 0; i < list.length; i++) {
		if (tab === list[i].innerHTML) {
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
	hideNodes('tab', 'text');
	tabNode.setAttribute('class', 'tab');
	tabNode.setAttribute('onclick', 'selectNode(this)');
	tabNode.innerHTML = tab;
	textNode.setAttribute('class', 'text ' + tab);
	textNode.innerHTML = text;
	tabBar.appendChild(tabNode);
	content.appendChild(textNode);
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
	tabNode = e,
	textNode = document.getElementsByClassName(tabNode.innerHTML)[0];
	hideNodes('tab', 'text');
	e.style.background = '#006c84';
	removeClass(textNode, 'hide');
}

// 节点数量判断 type: 0表示加，1表示减
function chargeNodes(type) {
	var list = document.getElementsByClassName('tab'),
		len = list.length,
		tips = document.getElementsByClassName('alert')[0];

	if (type === 0) {
		if (len < 4) {
			addClass(tips, 'hide');
			isVariable = true;
		} else {
			removeClass(tips, 'hide');
			tips.innerHTML = 'tab数量不能多于4个';
			isVariable = false;
		}
	} else{
		if (len > 1) {
			addClass(tips, 'hide');
			isVariable = true;
		} else {
			removeClass(tips, 'hide');
			tips.innerHTML = 'tab数量不能少于1个';
			isVariable = false;
		}
	}
}

// 删除节点
function removeNode() {
	hideTipForm();
	chargeNodes(1);
	if (isVariable) {
		tabBar.removeChild(tabNode);
		content.removeChild(textNode);
	}
	selectNode(document.getElementsByClassName('tab')[0]);
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

