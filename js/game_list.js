(function($) {
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
	var status;
	status = Request['status'];
	var statusCode = status == undefined ? 1 : status;
	var apiUrl = 'http://newadmin.19you.com/api/';
	var dataToken = md5("indexgamecenter");
	var count = 'count';
	$.ajax({
		type: 'post',
		url: apiUrl + 'index/gameCenter',
		dataType: 'json',
		data: {
			token: dataToken,
			status: statusCode,
		},
		success: function(res) {
			var gameData = res.game;
			var listData = res.data;
			window.sessionStorage.setItem(count, res.count);
			console.log(res)
			//banner图片
			for(var i = 0; i < gameData.length; i++) {
				var gameStr = '<div class="banner_s" data-id=' + i + '>' +
					'<div class="banner_icon fl">' +
					'<img src="' + gameData[i].gameImg + '"/>' +
					'</div>' +
					'<div class="banner_tit fl">' +
					'<p class="banner_bt">' + gameData[i].gameName + '</p>' +
					'<p class="banner_xx">' + gameData[i].keywords + '</p>' +
					'</div>' +
					'<div class="game_arrow"></div>' +
					'<div style="clear: both;"></div>' +
					'</div>'
				var gameImgStr = '<img src="' + gameData[0].img + '"/>';
				$(".banner_fl").append(gameStr);
			}
			$(".banner_fr").append('<img src="' + gameData[0].img + '"/>');
			$(".banner_s").on("mouseenter", function() {
				var index = $(this).data("id");
				$(".banner_fr").append('<img src="' + gameData[index].img + '"/>');
			})
			//列表
			for(var k = 0; k < listData.length; k++) {
				if(status == 1 || status == undefined) {
					var listStr = '<div class="game_xx">' +
						'<div class="icon_fl">' +
						'<img src="' + listData[k].gameImg + '"/>' +
						'</div>' +
						'<div class="icon_ct">' +
						'<h4 class="icon_bt">' + listData[k].gameName + '</h4>' +
						'<p class="icon_xx">' + listData[k].description + '</p>' +
						'<p class="icon_btn">' +
						'<a href="" class="icon_gw"></a>' +
						'<a href="' + listData[k].gameLink + '" class="icon_xz"></a>' +
						'</p>' +
						'</div>' +
						'<div class="icon_fr">' +
						'<img src="' + listData[k].qrcode + '"/>' +
						'<p class="ewm_ms">扫描二维码直接下载游戏</p>' +
						'</div>' +
						'</div>'
				} else {
					var listStr = '<div class="game_xx">' +
									'<a href="/19game/news_zw.html?id='+listData[k].id+'">'+
									'<div class="icon_fl">' +
									'<img src="' + listData[k].icon + '"/>' +
									'</div>' +
									'<div class="icon_ct">' +
									'<h4 class="icon_bt">' + listData[k].title + '</h4>' +
									'<p class="icon_xx">' + listData[k].description + '</p>' +
									'</div>' +
									'</a>'
									'</div>'
				}
				$(".game_news").append(listStr);
			}
		}
	});

	/********************************分页************************************/
	setTimeout(function() {
		var sessionPages = window.sessionStorage.getItem(count);
		var totalPages = sessionPages % 4 == 0 ? sessionPages / 4 : sessionPages / 4 + 1;
		$('.pagination').bootstrapPaginator({
			currentPage: 1,
			totalPages: totalPages,
			size: "normal",
			bootstrapMajorVersion: 3,
			alignment: "right",
			numberOfPages: 8,
			itemTexts: function(type, page, current) {
				switch(type) {
					case "first":
						return "首页";
					case "prev":
						return "上一页";
					case "next":
						return "下一页";
					case "last":
						return "末页";
					case "page":
						return page;
				} //默认显示的是第一页。
			},
			onPageClicked: function(event, originalEvent, type, page) { //给每个页眉绑定一个事件，其实就是ajax请求，其中page变量为当前点击的页上的数字。
				$.ajax({
					url: apiUrl + 'index/gameCenter',
					type: 'POST',
					data: {
						page: 4 * (page - 1),
						token: dataToken,
						status: statusCode,
					},
					dataType: 'JSON',
					success: function(callback) {
						var listData = callback.data;
						var listStr = '';
						for(var k = 0; k < listData.length; k++) {
							if(status == 1 || status == undefined) {
								listStr += '<div class="game_xx">' +
									'<div class="icon_fl">' +
									'<img src="' + listData[k].gameImg + '"/>' +
									'</div>' +
									'<div class="icon_ct">' +
									'<h4 class="icon_bt">' + listData[k].gameName + '</h4>' +
									'<p class="icon_xx">' + listData[k].description + '</p>' +
									'<p class="icon_btn">' +
									'<a href="" class="icon_gw"></a>' +
									'<a href="' + listData[k].gameLink + '"class="icon_xz"></a>' +
									'</p>' +
									'</div>' +
									'<div class="icon_fr">' +
									'<img src="' + listData[k].qrcode + '"/>' +
									'<p class="ewm_ms">扫描二维码直接下载游戏</p>' +
									'</div>' +
									'</div>'
							} else {
								listStr += '<div class="game_xx">' +
									'<a href="/19game/news_zw.html?id='+listData[k].id+'">'+
									'<div class="icon_fl">' +
									'<img src="' + listData[k].icon + '"/>' +
									'</div>' +
									'<div class="icon_ct">' + 
									'<h4 class="icon_bt">' + listData[k].title + '</h4>' +
									'<p class="icon_xx">' + listData[k].description + '</p>' +
									'</div>' +
									'</a>'
									'</div>'
							}
						}
						$('.game_news').html(listStr);
					}

				})
			}
		});
	}, 200)
})(jQuery)