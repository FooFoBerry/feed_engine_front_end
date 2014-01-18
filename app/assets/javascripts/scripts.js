$('.create-project .ladda-button').on('click', function(event) {
  event.preventDefault();
});

$('.service h4').on('click', function() {
  $(this).parent().children('.service-form').slideToggle();
});

Ladda.bind( '.ladda-button', {
  callback: function( instance ) {
    var label = $('.ladda-button.submit-create-project .ladda-label');
    var progress = 0;
    var interval = setInterval( function() {
      progress = Math.min( progress + Math.random() * 0.1, 1 );
      instance.setProgress( progress );

      if( progress === 1 ) {
        instance.stop();
        clearInterval( interval );
        label.html('Success!').delay(2000).delay(200, function() {
          $('.project-wrap').fadeOut(500, function() {
            $('.service-wrap').fadeIn(500);
          });
        });
      }
    }, 200 );
  }
} );

// You can control loading explicitly using the JavaScript API
// as outlined below:

// var l = Ladda.create( document.querySelector( 'button' ) );
// l.start();
// l.stop();
// l.toggle();
// l.isLoading();
// l.setProgress( 0-1 );
