'use strict';

//on menu click open or close nav bar for mobile
$(function mobileClick() {
  $('#menu').hide();
  $('#hamburger').on('click', () => {
    //show or hide header with transition
    console.log('clicked');

    $('#menu').slideToggle();
  });
});

$('h1:only-child').hide();

