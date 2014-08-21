$(window).on('beforeunload', function() {
    $(window).scrollTop(0); 
});



$(document).ready(function(){
	var oldHeight = $(window).height();

	$('.linkbutton').mouseover(function(){
		$('#hovertext').show();
	})
	$('.linkbutton').mouseout(function(){
		$('#hovertext').hide();
	})

	function adjustSizes(){
		var h = $(window).height();

		$('#menu').css('top',(h-340)/2+"px");
		$('.interactive').css('height','100%');
		if(oldHeight != h){
			$(window).scrollTop(0);
			currentActive = 0;
			isScrolling = false;
			$('.downicon').css('visibility','visible');
			$('.upicon').css('visibility','hidden');
		}
		oldHeight = h;
		// #menu
		// .interactive
		if(h<600){
			$('.interactive').css('padding-top','50px');
			$('#first').css('padding-top','50px');
			$('.subtext').css('display','none');
		}
		else {
			$('.interactive').css('padding-top','50px');
			$('#first').css('padding-top','100px');
			$('.subtext').css('display','inline');
		}
		// if height is small reduce .interactive, #first padding top
	}
	adjustSizes();

	$(window).resize(function(){
		adjustSizes();
	});
	// Todo adjust depending on scroll pos.

	$('.upicon').toggle();
	$('#menulabels > li').mouseover(function(){
		$(this).addClass('hover');
	});
	$('#menulabels > li').mouseout(function(){
		$(this).removeClass('hover');
	});
	$('#menulabels > li').click(function(){
		if(!isScrolling){
			if(!$(this).hasClass('active')){

				var prevpos = $('#menulabels > li').index($('#menulabels .active'));
				var num = $('#menulabels > li').index($(this));

				var delta = num-prevpos;
				if(delta>0)
					cycleDown(delta,true);
				else
					cycleUp(-delta,true);
			}
		}
	});
	 
	var currentActive = 0;
	var isScrolling = false;
	var wasScrollingDown = false;
	var wasScrollingUp = false;

	//Firefox
	$('body').bind('DOMMouseScroll', function(e){
		if(!isScrolling){
			console.log(isScrolling);
			if(e.originalEvent.detail > 0) {
		        cycleDown(1);
			}
			else {
		        cycleUp(1);
			}
		}
		return false;
	});
	//IE, Opera, Webkit
	$('body').bind('mousewheel', function(e){
		if(!isScrolling){
		    if(e.originalEvent.wheelDelta < 0){
		        cycleDown(1);
		    }
		    else {
		        cycleUp(1);
		    }
		}
	    return false; 
	 });

	$('.downicon').click(function(){
		// do some stuff
		if(!isScrolling)
			cycleDown(1);
	});
	$('.upicon').click(function(){
		// do some stuff
		if(!isScrolling)
			cycleUp(1);
	});


	function cycleUp(n,override){
		if(!isScrolling || wasScrollingDown || override){
			var prev = currentActive;
			if(currentActive>0){
				$('.downicon').css('visibility','visible');
				isScrolling = true;			
				currentActive=currentActive-n;
				$('#menulabels > li.active').removeClass('active');
				$('#menulabels > li').addClass('passive');
				$('#menulabels > li').css('color','color:rgba(256,256,256,0.3)');
				var newSel = $('#menulabels li:nth-child('+(currentActive+1)+')');
				newSel.removeClass('passive');
				newSel.addClass('active');
				//$('#pill').css('-webkit-transition','height '+n*0.1+'s linear');
				$(function () {
				    $('#pill').animate({
				       height: (1+currentActive)*57+'px'
				    }, { duration: 600, easing:"swing", queue: false });
				    $("html, body").animate({
				       scrollTop:$(document).scrollTop()-(n*$(window).innerHeight())+"px"
				    }, { duration: 600, easing:"swing", complete:function(){
				    	wasScrollingDown = false;
				    	wasScrollingUp = true;
				    	clearTimeout( $.data( this, "scrollCheck" ) );
			    		$.data( this, "scrollCheck", setTimeout(function() {
			    			isScrolling = false;
			    		}, 600));
					}, queue: false});
				});
			}
			if(currentActive == 0 && prev!=currentActive){
				$('.upicon').toggle();
			}
		}
	}

	function cycleDown(n,override){
		if(!isScrolling || wasScrollingUp || override){	
			var prev = currentActive;
			if(currentActive<5){
				if(currentActive==0)
					$('.upicon').toggle();
				isScrolling = true;
				currentActive=currentActive+n;
				$('#menulabels > li.active').removeClass('active');
				$('#menulabels > li').addClass('passive');
				$('#menulabels > li').css('color','color:rgba(256,256,256,0.3)');
				var newSel = $('#menulabels li:nth-child('+(currentActive+1)+')');
				newSel.removeClass('passive');
				newSel.addClass('active');
				$(function () {
				    $('#pill').animate({
				       height: (1+currentActive)*57+'px'
				    }, { duration: 600, easing:"swing", queue: false });
				    $("html, body").animate({
				       scrollTop:$(document).scrollTop()+(n*$(window).innerHeight())+"px"
				    }, { duration: 600, easing:"swing", complete:function(){
				    	wasScrollingDown = true;
				    	wasScrollingUp = false;
				    	clearTimeout( $.data( this, "scrollCheck" ) );
			    		$.data( this, "scrollCheck", setTimeout(function() {
			    			isScrolling = false;
			    		}, 600));
				    }, queue: false});
				});
			}
			if(currentActive == 5){
				$('.downicon').css('visibility','hidden');
			}
		}
	}
});

