$('.service h4').on('click', function() {
  $(this).parent().children('.service-form').slideToggle();
});

$('.create-project .submit-create-project').on('click', function(event) {
  event.preventDefault();
  var l = Ladda.create(this),
          that = this,
          projectName = $('.create-project input').val();

  if (projectName.length > 0) {
    l.start();
    $.post('/dashboard/projects?project[name]=' + projectName, function( data ) {
      $('.service-wrap h2').delay(1000).html(data.name).queue(function(next) {
        l.stop();
        $(that).html('Success!').delay(2000).delay(200, function() {
          $('.project-wrap').fadeOut(500, function() {
            $('.service-wrap').fadeIn(500);
          });
        });
      });
    });
  }
});

//Ladda.bind( '.ladda-button', {
//  callback: function( instance ) {
//    var label = $('.ladda-button.submit-create-project .ladda-label');
//    var progress = 0;
//    var interval = setInterval( function() {
//      progress = Math.min( progress + Math.random() * 0.1, 1 );
//      instance.setProgress( progress );
//
//      if( progress === 1 ) {
//        instance.stop();
//        clearInterval( interval );
//        label.html('Success!').delay(2000).delay(200, function() {
//          $('.project-wrap').fadeOut(500, function() {
//            $('.service-wrap').fadeIn(500);
//          });
//        });
//      }
//    }, 200 );
//  }
//} );

// You can control loading explicitly using the JavaScript API
// as outlined below:

// var l = Ladda.create( document.querySelector( 'button' ) );
// l.start();
// l.stop();
// l.toggle();
// l.isLoading();
// l.setProgress( 0-1 );
