var perspectiveWrapper =  $('#perspective'),
    container = perspectiveWrapper.children('.container'),
    contentWrapper = container.children('.wrapper'),
    services = $('.services'),
    body = $('body'),
    projectForm = $('.project-wrap');

function scrollY() {
  return window.pageYOffset || docElem.scrollTop;
}

function resetProjectForm() {
  $('.submit-create-project').html('Create Project');
}

body.on('click', '.service h4', function() {
  $(this).parent().children('.service-form').slideToggle();
});

body.on('click', '.service-wrap .finish', function() {
  hidePanel();
});

function showPanel() {
  perspectiveWrapper.addClass('modalview');
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  setTimeout( function() { perspectiveWrapper.addClass('animate'); }, 25 );
}

function hidePanel() {
  if (perspectiveWrapper.hasClass('animate')) {
    perspectiveWrapper.removeClass('modalview');
    perspectiveWrapper.removeClass('animate');
    projectForm.fadeOut(500);
    services.children().fadeOut(500);
  }
}

$('#showMenu').on('click', function(event) {
  event.stopPropagation();
  event.preventDefault();
  projectForm.fadeIn(500);
  showPanel();
});

$('#cancel').on('click', function(event) {
  event.stopPropagation();
  event.preventDefault();
  hidePanel();
});

$('.settings').on('click', function(event) {
  event.preventDefault();
  var project = $(this).parents('li').attr('id'),
      services = $('#' + project + '-services');
  services.fadeIn(500);
  showPanel();
});

// create a project
$('.create-project .submit-create-project').on('click', function(event) {
  event.preventDefault();
  var l = Ladda.create(this),
          that = this,
          noProjects = $('.no-projects'),
          projectList = $('.project-list ul'),
          services = $('.services'),
          serviceTemplate = $('#service-template'),
          projectTemplate = $('#project-template'),
          projectWrap = $('.project-wrap'),
          projectInput = $('.create-project input'),
          projectName = projectInput.val();

  if (projectName.length > 0) {
    l.start();
    $.post('/dashboard/projects?project[name]=' + projectName, function( data ) {

      if (noProjects.length > 0) {
        noProjects.hide();
      }

      projectList.append(
        Mustache.to_html(projectTemplate.html(), data)
      );

      services.append(
        Mustache.to_html(serviceTemplate.html(), data)
      );

      projectInput.val("");

      $(that).delay(2000).queue(function(next) {
        l.stop();
        $(that).html('Success!').delay(500).queue(function(next) {
          projectWrap.fadeOut(500, function() {
            $('#project-' + data.id + '-services').fadeIn(500);
            resetProjectForm();
          });
          next();
        });
        next();
      });

    });
  }
});

// create a repo
$('body').on('click', '.submit-add-repo', function(event) {
  event.preventDefault();
  var input = $(this).siblings('input'),
      that = this,
      project_id = $(this).parents('.service-wrap').attr('id').split('-')[1],
      github_url = input.val(),
      post_url = '/dashboard/repos?repo[github_url]=' + github_url + '&repo[project_id]=' + project_id,
      repos = $('.project-' + project_id + '-repos'),
      repoTemplate = $('#repo-template'),
      l = Ladda.create(this);

  console.log(project_id);
  console.log(github_url);
  console.log(repos);

  if (github_url.length > 0) {
    l.start();
    $.post(post_url, function( data ) {

      $(that).delay(2000).queue(function(next) {
        l.stop();
        $(that).html('Success!').delay(500).queue(function(next) {
          repos.append(
            Mustache.to_html(repoTemplate.html(), data)
          );
          next();
        });
        next();
      });
    });
  }
});

