// Initialize your app
var myApp = new Framework7({
	pushState: true,
    swipePanel: 'left'
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '	<!-- Top Navbar-->' +
        '	<div class="navbar">' +
        '  		<div class="navbar-inner">' +
        '    		<div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    		<div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  		</div>' +
        '	</div>' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}
//登录页面
myApp.onPageInit('login', function (page) {
  // "page" variable contains all required information about loaded and initialized page 
  console.log('页面展开',page.name,page.query);
	$$("#my-form input[name='name']").val('winnie') /*初始化页面的时候赋值*/
	
  	$$('.loginSub').on('click', function(){
	  var formData = myApp.formToJSON('#my-form');
	  
	  if(formData.name.length == 0){
	  	myApp.alert('请填写用户名');
	  } else if (formData.password.length == 0) {
	  	myApp.alert('请填写密码');
	  } else {
	  	var userData = myApp.formStoreData('userData', {
		    'name': formData.name
		  });
		  console.log('去到首页')
		  mainView.router.back();
	  	/*mainView.router.loadPage('index.html')*/
	  }
	  
	});
	//$$('form.ajax-submit').on('submit', function (e) {
  		/*var xhr = e.detail.xhr; // actual XHR object
	 
	  	var data = e.detail.data; // Ajax repsonse from action file*/
	  	// do something with response data
	  	//var formData = myApp.formToJSON('#my-form');
	  	//if(formData.name.length == 0){
	  		//alert('名字不能为空');
	  		//return false
	  	//}
	  	//console.log('提交',formData.name)
	//});
})