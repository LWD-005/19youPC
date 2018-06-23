(function($){
	function GetRequest() {
		var url = location.search; //获取url中"?"符后的字串   
		var theRequest = new Object();
		if(url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for(var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			}
		}
		return theRequest;
	}
	var Request = new Object();
	Request = GetRequest();
	var id = Request['id'];
	var apiUrl = 'http://newadmin.19you.com/api/';
	var dataToken = md5("indexgetcontent");
	$.ajax({
		type:"post",
		url:apiUrl+"index/getContent",
		data:{
			token:dataToken,
			id:id
		},
		dataType:"json",
		success:function(res){
			var zwData = res.data;
			$(".lm_banner img").attr('src',zwData.icon);
			$(".news_bt .tit_h1").html(zwData.title);
			$(".news_bt .news_fbsj").html(timestampToTime(zwData.addTime));
			$(".news_zw").html(zwData.content);
		}
	});
	function timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        D = date.getDate() + ' ';
        h = date.getHours() + ':';
        m = date.getMinutes() + ':';
        s = date.getSeconds();
        return Y+M+D+h+m+s;
   }
})(jQuery)
