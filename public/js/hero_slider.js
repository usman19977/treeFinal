// * Ahmad's Hero Slider
// $(document).ready(function () {
//   var interval;
//   // options
//   var speed = 500; //transition speed - fade
//   var autoswitch = true; //auto slider options
//   var autoswitch_speed = 5000; //auto slider speed

//   // add first initial active class
//   $('.slide').first().addClass('active');

//   // hide all slides
//   $('.slide').hide;

//   // show only active class slide
//   $('.active').show();

//   // Next Event Handler
//   $('#next').on('click', nextSlide); // call function nextSlide

//   // Prev Event Handler
//   $('#prev').on('click', prevSlide); // call function prevSlide

//   // Auto Slider Handler
//   if (autoswitch == true) {
//     interval = setInterval(nextSlide, autoswitch_speed); // call function and value 4000
//   }

//   // Switch to next slide
//   function nextSlide() {
//     window.clearTimeout(interval);
//     // get active class
//     var activeClasses = Array.from(document.getElementsByClassName('active'));
//     activeClasses.forEach((el) => {
//       if (!el.classList.contains('slide')) return;
//       el.classList.remove('active');
//       if (el.nextElementSibling) {
//         el.nextElementSibling.classList.add('active');
//       } else {
//         $('.slide').first().addClass('active');
//       }
//       $('.slide').fadeOut(speed);
//       $('.active').fadeIn(speed);
//     });

//     // console.log('$active1', $('.active'));
//     // $('.active').toggleClass('oldActive');
//     // console.log('$active2', $('.active'));
//     // console.log('$oldActive', $('.oldActive'));
//     // if ($('.oldActive').is(':last-child')) {
//     //   $('.slide').first().addClass('active');
//     // } else {
//     //   $('.oldActive').next().addClass('active');
//     // }
//     // $('.oldActive').removeClass('oldActive');
//     // $('.slide').fadeOut(speed);
//     // $('.active').fadeIn(speed);
//     window.setInterval(nextSlide, autoswitch_speed);
//   }

//   // Switch to prev slide
//   function prevSlide() {
//     window.clearTimeout();
//     var activeClasses = Array.from(document.getElementsByClassName('active'));
//     activeClasses.forEach((el) => {
//       if (!el.classList.contains('slide')) return;
//       el.classList.remove('active');
//       if (el.previousElementSibling) {
//         el.previousElementSibling.classList.add('active');
//       } else {
//         $('.slide').last().addClass('active');
//       }
//       $('.slide').fadeOut(speed);
//       $('.active').fadeIn(speed);
//     });

//     // $('.active').toggleClass('oldActive');
//     // if ($('.oldActive').is(':first-child')) {
//     //   $('.slide').last().addClass('active');
//     // } else {
//     //   $('.oldActive').prev().addClass('active');
//     // }
//     // $('.oldActive').removeClass('oldActive');
//     // $('.slide').fadeOut(speed);
//     // $('.active').fadeIn(speed);
//     window.setInterval(nextSlide, autoswitch_speed);
//   }
// });

// * Darren's 1st Commit Code
// ! I changed the name from active to good as active is colliding with modals' active class
$(document).ready(function () {
  // options
  var speed = 500; //transition speed - fade
  var autoswitch = true; //auto slider options
  var autoswitch_speed = 5000; //auto slider speed

  // add first initial active class
  $('.slide').first().addClass('good');

  // hide all slides
  $('.slide').hide;

  // show only good class slide
  $('.good').show();

  // Next Event Handler
  $('#next').on('click', nextSlide); // call function nextSlide

  // Prev Event Handler
  $('#prev').on('click', prevSlide); // call function prevSlide

  // Auto Slider Handler
  if (autoswitch == true) {
    setInterval(nextSlide, autoswitch_speed); // call function and value 4000
  }

  // Switch to next slide
  function nextSlide() {
    console.log('$(`good`)', $(`good`));
    $('.good').removeClass('good').addClass('oldActive');
    if ($('.oldActive').is(':last-child')) {
      $('.slide').first().addClass('good');
    } else {
      $('.oldActive').next().addClass('good');
    }
    $('.oldActive').removeClass('oldActive');
    $('.slide').fadeOut(speed);
    $('.good').fadeIn(speed);
  }

  // Switch to prev slide
  function prevSlide() {
    console.log('$(`good`)', $(`good`));
    $('.good').removeClass('good').addClass('oldActive');
    if ($('.oldActive').is(':first-child')) {
      $('.slide').last().addClass('good');
    } else {
      $('.oldActive').prev().addClass('good');
    }
    $('.oldActive').removeClass('oldActive');
    $('.slide').fadeOut(speed);
    $('.good').fadeIn(speed);
  }
});
