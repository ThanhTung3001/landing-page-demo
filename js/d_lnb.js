/*
���� : http://designblack.com
��¥ : 2016-01-19
*/
$(document).ready(function(){
	var $window=$(window);
	var $body=$('body');			
	var $lnb=$('#d_lnb');
	var $bg=$('#d_lnb_bg');
	var $li=$lnb.find('li');
	var $sub=$lnb.find('.sub');
	var $lnb_btn=$('.lnb_btn , #d_lnb .close, #d_lnb_mask');
	var winWidth=$window.width()+17;
	var current=0;
	var speed=300;
	var subHeight=280;


	//event
	$li.bind({
		//pc ����,�ƿ�
		mouseenter:function(){
			if(winWidth>=1024){
				$(this).addClass('on');
				$sub.stop().animate({'height':subHeight},speed);
				$bg.stop().animate({'height':subHeight},speed);
			}
		},
		mouseleave:function(){
			if(winWidth>=1024){
				$(this).removeClass('on');
				$sub.stop().animate({'height':0},speed);
				$bg.stop().animate({'height':0},speed);
			}
		},
		//�����Ŭ��
		click:function(){			
			if(winWidth<1024){
				if(current!=$li.index($(this))){
					$sub.hide();
					$li.removeClass('on');
				}
				current=$li.index($(this));				
				$(this).toggleClass('on');
				$(this).find('.sub').toggle();				
			}
		}
	});

	$lnb_btn.bind('click',function(){
		$body.toggleClass('lnb_on');
		if($body.hasClass('lnb_on')){
			$lnb.css({'left':'-100%'}).stop().animate({'left':0},speed);
		}else{
			$lnb.css({'left':'0'}).stop().animate({'left':'-100%'},speed);
			$li.removeClass('on');
			$sub.hide();
		}
	});
 
	
	//body class �б�
	function setBodyClass(_b){
		winWidth=$window.width()+17;
		if(_b==0){
			if(winWidth>=1024){
				$body.addClass('pc');
			}else{
				$body.addClass('mo');
			}
		}
		if(winWidth>=1024){
			if($body.hasClass('mo')){
				$body.removeClass('mo');
				$body.addClass('pc');
				//console.log('pc');
				$sub.show().css('height',0);
				$li.removeClass('on');
			}
		}else{
			if($body.hasClass('pc')){
				$body.removeClass('pc');
				$body.addClass('mo');
				//console.log('mo');				
				$sub.hide().css('height','auto');
				
			}
		}
	};
	setBodyClass(0);

	$window.resize(function(){
		setBodyClass(1);					
	})

});