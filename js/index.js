(function($) {
	var li_length = $('#carousel_hzjd li').length;
	if(li_length > 3) {
		//     if(li_length<4){
		//        $('#carousel_hzjd ul').append($('#carousel_hzjd ul li').clone(true));
		//     }
		move();
		var li_w = $('#carousel_hzjd li:eq(0)').width();
		function play() {
			timer = setInterval(function() {
				var li_w = $('#carousel_hzjd li:eq(0)').width();
				var lis = $('#carousel_hzjd ul li');
				$('#carousel_hzjd ul').animate({
					left: -3 * li_w
				}, 2000, function() { 
					for(var i = 0; i <= 2; i++) {
						$(lis[i]).remove();
						$('#carousel_hzjd ul').append($(lis[i]).clone(true));
					}
					$(this).css('left', '0px');
				})
			}, 7000);
		}
		play();
		$("#carousel_hzjd").on("mouseover", function() {
			clearInterval(timer);
		});
		$("#carousel_hzjd").on("mouseout", function() {
			play();
		});
		$(".ft_btn").on("mouseover", function() {
			clearInterval(timer);
		});
		$(".ft_btn").on("mouseout", function() {
			play();
		});
	} else {
		$("#carousel_hzjd li:last-child").addClass("person_last");
	}

	function prev(e) {
		var li_w = $('#carousel_hzjd li:eq(0)').width();
		var _this = this;
		$(this).off('click');
		var len = $('#carousel_hzjd ul li').length - 1;
		var lis = $('#carousel_hzjd ul li');

		for(var i = len; i > len - 3; i--) {
			$(lis[i]).remove();
			$('#carousel_hzjd ul').prepend($(lis[i]).clone(true));
		}
		$('#carousel_hzjd ul').css('left', -3 * li_w).animate({
			left: 0
		}, 2000, function() {
			$(_this).on('click', prev);
		});

	} //prev end

	//向右移
	function next(e) {
		var li_w = $('#carousel_hzjd li:eq(0)').width();
		var _this = this;
		$(this).off('click');
		var lis = $('#carousel_hzjd ul li');
		$('#carousel_hzjd ul').animate({
			left: -3 * li_w
		}, 2000, function() {
			for(var i = 0; i <= 2; i++) {
				$(lis[i]).remove();
				$('#carousel_hzjd ul').append($(lis[i]).clone(true));
			}
			$(this).css('left', '0px');
			$(_this).on('click', next);
		})
	} //next end

	function move() {
		var li_w = $('#carousel_hzjd li:eq(0)').width();
		var leng_all = $('#carousel_hzjd ul li').length;
		$('#carousel_hzjd ul').css('width', li_w * leng_all);
		$('.left_btn').bind('click', prev);
		$('.right_btn').bind('click', next);

	} //move end
	var apiUrl = 'http://newadmin.19you.com/api/';
	var dataToken = md5("indexindex");
	$.ajax({
		type: "get",
		url: apiUrl+'index/index',
		data: {
			token: dataToken
		},
		dataType: "json",
		success: function(res) {
			//大轮播图
			var carousel = res.carousel;
			for(var i = 0; i < carousel.length; i++) {
				if(i == 0) {
					var carouselStr = '<div class="item active">' +
						' <img src="' + carousel[i].img + '" data-src="" alt="Second slide">' +
						'<div class="banner_content">' +
						'<div class="banner_xq">' +
						'<img src="' + carousel[i].icon + '"/>' +
						' <h1>' + carousel[i].title + '</h1>' +
						'<p class="p_bt">' + carousel[i].name + '</p>' +
						'<span class="hero_xq">' + carousel[i].bewrite + '</span>' +
						'<p><a class="btn hero_btn" href="' + carousel[i].gameUrl + '" role="button">查看详情</a></p>' +
						'</div>' +
						'</div> ' +
						'</div>'
						var olStr = '<li data-target="#myCarousel" data-slide-to="' + i + '" class="active"></li>'
				} else {
					var carouselStr = '<div class="item">' +
						' <img src="' + carousel[i].img + '" data-src="" alt="Second slide">' +
						'<div class="banner_content">' +
						'<div class="banner_xq">' +
						'<img src="' + carousel[i].icon + '"/>' +
						' <h1>' + carousel[i].title + '</h1>' +
						'<p class="p_bt">' + carousel[i].name + '</p>' +
						'<span class="hero_xq">' + carousel[i].bewrite + '</span>' +
						'<p><a class="btn hero_btn" href="' + carousel[i].gameUrl + '" role="button">查看详情</a></p>' +
						'</div>' +
						'</div> ' +
						'</div>'
						var olStr = '<li data-target="#myCarousel" data-slide-to="' + i + '"></li>'
				}
				
				$('.slide .carousel-inner').append(carouselStr);
				$('.slide .carousel-indicators').append(olStr);
			}
			//精品游戏
			var game = res.game;
			for (var i=0;i<game.length;i++) {
				var gameStr = '<div class="hero_list">'+
		    					'<div class="hero_img">'+
		    						'<a href="" class="hero_more"></a>'+
		    						'<img src="' + game[i].gameImg + '"/>'+
		    						'<div class="hero_tc">'+
		    							'<div class="hero_ewm">'+
		    								'<img src="' + game[i].qrcode + '"/>'+
		    							'</div>'+
		    							'<div class="hero_xz">'+
		    								'<p class="p_xz">' + game[i].gameName + '</p>'+
		    								'<p class="p_yxlb">' + game[i].keywords + '</p>'+
		    								'<p class="p_icon">'+
		    									'<a href="" class="home_icon fl"></a>'+
		    									'<a href="' + game[i].gameLink + '" class="xz_icon fl"></a>'+
		    								'</p>'+
		    							'</div>'+
		    						'</div>'+
		    					'</div>'+
		    					'<div class="hero_content">'+
		    						'<p class="yxjp_bt">' + game[i].gameName + '</p>'+
		    						'<span class="jxjp_xx">' + game[i].description + '</span>'+
		    					'</div>'+
		    					'<div class="list_bot">'+
		    						'<div class="list_dz">'+
		    							'<div class="dz_icon">'+
		    								
		    							'</div>'+
		    							'<span class="dz_cs">'+'1982'+'</span>'+'人赞过'+
		    						'</div>'+
		    							'<a href="game.html" class="jrgw_a">'+'</a>'+
		    						
		    					'</div>'
		    				'</div>'
		    $(".jpyx_list").append(gameStr);
			}
			//游戏资讯
			var information = res.Information;
			for (var j=0;j<information.length;j++) {
				var informationStr = '<div class="yxzx_content">'+
			    				'<a href="news_zw.html?id='+information[j].id+'">'+
			    					'<div class="yxzx_hero">'+
				    					'<div class="yxzx_icon fl">'+
				    						'<img src="'+information[j].icon+'"/>'+
				    					'</div>'+
				    					'<div class="yxzx_xx">'+
				    						'<p class="yxzx_p">'+information[j].title+'</p>'+
				    						'<p class="p_xx">'+information[j].description+'</p>'+
				    					'</div>'+
				    				'</div>'+
			    				'</a>'+
			    			'</div>'
			   	$('.yxzxCont').append(informationStr);
			}
			//论坛热帖
			var forum = res.forum;
			for (var k=0;k<forum.length;k++) {
				var forumStr = '<li><a href="news_zw.html?id='+forum[k].id+'">'+forum[k].title+'</a><span class="fbsj">'+timestampToTime(forum[k].addTime,1)+'</span></li>';
				$('.ltrt_content ul').append(forumStr);
			}
			//最新开服
			var newest = res.newest;
			for (var i=0;i<newest.length;i++) {
				var newestStr = '<div class="zxkf_content">'+
								'<a href="news_zw.html?id='+newest[i].id+'">'+
			    				'<div class="zxkf_xx">'+
			    					'<b></b>'+
			    					'<i></i>'+
			    					'<div class="zxkf_fbsj">'+
			    						'<p class="p_rq">'+timestampToTime(newest[i].addTime,2)+'</p>'+
			    						'<p class="p_sj">'+timestampToTime(newest[i].addTime,3)+'</p>'+
			    					'</div>'+
			    					'<div class="zxkf_icon">'+
			    						'<img src="'+newest[i].icon+'"/>'+
			    					'</div>'+
			    					'<div class="zxkf_nr">'+
			    						'<p class="zxkf_bt">'+newest[i].title+'</p>'+
			    						'<p class="zxkf_fbt">'+newest[i].keyword+'</p>'+
			    					'</div>'+
			    				'</div>'+
			    				'</a>'
			    			'</div>'
			    $(".zxkf").append(newestStr);
			}
		}
	});
	//时间戳转换成日期函数,format值为1时返回03/08形式的日期，值为2时返回03.08形式日期，参数为3时返回11:30时间
	function timestampToTime(timestamp,format) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '-';
        if (format == 2) {
        	M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
        } else{
        	M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
        }
        D = date.getDate() + ' ';
        h = date.getHours() + ':';
        m = date.getMinutes() + ':';
        s = date.getSeconds();
        if (format == 3) {
        	return h+m;
        } else{
        	return M+D;
        }
   }
})(jQuery)