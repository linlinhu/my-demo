(function(com) {

	var hashCode = function(str) {
		var hash = 0;
		if(!str || str.length == 0) return hash;
		for(i = 0; i < str.length; i++) {
			char = str.charCodeAt(i);
			hash = ((hash << 5) - hash) + char;
			hash = hash & hash; // Convert to 32bit integer 
		}
		return hash;
	};
	com.hashCode = hashCode;
	/** 
	 *存储当前下载路径
	 */
	var cache = {};
	cache.getFile = function(netPath, cb) {
		var filePathCache = getLocalFileCache(netPath);
		alert("缓存：" + filePathCache)
		if(filePathCache) {
			return cb(filePathCache);
		} else {

			alert("无缓存下载：" + netPath);
			
			if(plus.storage.getLength()>=100){
				plus.storage.clear();
			}
			Filedownload(netPath, function(localPath) {
				return cb(localPath);
			});
		}
	};

	//下载 
	var Filedownload = function(netPath, callback) {
		var dtask = plus.downloader.createDownload(netPath, {}, function(d, status) {
			// 下载完成 
			if(status == 200) {
				plus.io.resolveLocalFileSystemURL(d.filename, function(entry) {
					setLocalFileCache(netPath, entry.toLocalURL());
					callback(entry.toLocalURL()); //获取当前下载路径 
				});
			}
		});
		dtask.start();
	};

	function getLocalFileCache(netPath) {

		var FILE_CACHE_KEY = "filePathCache_" + common.hashCode(netPath);
		console.log("key=" + FILE_CACHE_KEY);
		var localUrlObj = plus.storage.getItem(FILE_CACHE_KEY);
		return localUrlObj;
	}

	function setLocalFileCache(netPath, localPath) {
		var FILE_CACHE_KEY = "filePathCache_" + common.hashCode(netPath);
		plus.storage.setItem(FILE_CACHE_KEY, localPath);
	}

	com.cache = cache;
}(window.common = {}))