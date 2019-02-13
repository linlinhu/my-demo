/** 
 * 将网络图片下载到本地并显示，包括缓存 
 */
(function(lazyimg) {

	lazyimg.lazyLoad = function(doc, cb) {

		lazyLoad(doc ? doc : document);
	}
	var lazyLoad = function(doc, cb) {
		var imgs = doc.querySelectorAll('img.lazy');
		async.each(imgs, function(img, cb1) {
			var data_src = img.getAttribute('data-src');
			if(data_src && data_src.indexOf('http://') >= 0) {
				common.cache.getFile(data_src, function(localUrl) {
					setPath(img, localUrl);
				});
			}
		}, function() {
			cb && cb();
		});

	}

	function setPath(img, src) {
		img.setAttribute('src', src);
		img.classList.remove("lazy");
	}
}(window.Lazyimg = {}));