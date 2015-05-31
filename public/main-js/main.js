jQuery(document).ready(function($) {
    $('#break').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
        if(isInView) {
            if(visiblePartY == 'bottom') {
                console.log('Div End Visible!');
                $('nav').addClass('animated fadeInDownBig').show();
                
            }
        }
    });
    $('#hero').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
        if(isInView) {
            if(visiblePartY == 'bottom') {
				console.log('Hero Top Visible!')
				$('nav').removeClass('animated fadeInDownBig').hide();
			}
        }
    });
});