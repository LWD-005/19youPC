var li_length = $('#carousel_hzjd li').length;
if(li_length>3){
//     if(li_length<4){
//        $('#carousel_hzjd ul').append($('#carousel_hzjd ul li').clone(true));
//     }
  move();
  var li_w = $('#carousel_hzjd li:eq(0)').width();
  
  function play(){
    timer=setInterval(function(){
      var li_w = $('#carousel_hzjd li:eq(0)').width();
      var lis = $('#carousel_hzjd ul li');
      $('#carousel_hzjd ul').animate({left:-3*li_w},2000,function(){
          for(var i = 0;i<=2;i++){
              $(lis[i]).remove();
              $('#carousel_hzjd ul').append($(lis[i]).clone(true));
          }
          $(this).css('left','0px');
      })
    },7000);
  }
  play();
  $("#carousel_hzjd").on("mouseover",function(){
      clearInterval(timer);
  });
  $("#carousel_hzjd").on("mouseout",function(){
      play();
  });
    $(".ft_btn").on("mouseover",function(){
      clearInterval(timer);
  });
  $(".ft_btn").on("mouseout",function(){
      play();
  });
}else{
$("#carousel_hzjd li:last-child").addClass("person_last");
}
function prev(e){
      var li_w = $('#carousel_hzjd li:eq(0)').width();
      var _this= this;
      $(this).off('click');
      var len = $('#carousel_hzjd ul li').length-1;
      var lis = $('#carousel_hzjd ul li');

      for(var i = len;i>len-3;i--){
          $(lis[i]).remove();
          $('#carousel_hzjd ul').prepend($(lis[i]).clone(true));
      }
      $('#carousel_hzjd ul').css('left',-3*li_w).animate({left:0},2000,function(){
          $(_this).on('click',prev);
      });

  } //prev end

//向右移
  function next(e){
      var li_w = $('#carousel_hzjd li:eq(0)').width();
      var _this = this;
      $(this).off('click');
      var lis = $('#carousel_hzjd ul li');
        $('#carousel_hzjd ul').animate({left:-3*li_w},2000,function(){
        	console.log(1111)
            for(var i = 0;i<=2;i++){
                $(lis[i]).remove();
                $('#carousel_hzjd ul').append($(lis[i]).clone(true));
            }
            $(this).css('left','0px');
            $(_this).on('click',next);
        })
  } //next end

  function move(){
      var li_w = $('#carousel_hzjd li:eq(0)').width();
      var leng_all = $('#carousel_hzjd ul li').length;
      $('#carousel_hzjd ul').css('width',li_w*leng_all);
      $('.left_btn').bind('click',prev);
      $('.right_btn').bind('click',next);

  } //move end
  
  
 
