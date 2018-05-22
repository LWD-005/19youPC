//nav导航按钮
$(".wmenu").on("click",function(){
	if ($(".menu").is(":hidden")) {
		$(".wmenu").css({"background":"url(img/index/menu_hover1.png) no-repeat"})
		$(".menu").slideToggle();
	} else{
		$(".menu").slideToggle(function(){
				$(".wmenu").css({"background":"url(img/index/g_menu.png) no-repeat"});
		});
	
	}
})
