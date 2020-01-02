'use strict';

//on menu click open or close nav bar for mobile
$(function mobileClick() {
  $('#menu').hide();
  $('#hamburger').on('click', () => {
    //show or hide header with transition
    console.log('clicked');

    $('#menu').slideToggle();
  });
})
// mobileClick();

$.ajax({
  type: 'POST',
  dataType: 'json',
}).then(results => {
  console.log(results.body);
})

// $(main).click(
//     alert('bla')
// )

// function radio_toolbar_click(ev) {
//     let checked = document.querySelector('input[name="hunger"]:checked');
//     if (checked) {
//         checked.checked = false;
//     }
//     ev.target.previousElementSibling.checked = true;
// }

function radioButtons() {
  //on clicking a radio button
  $('label').click(function () {
    //set that labels input to checked
    console.log('got it');
  })
}
radioButtons();

function foodOptions() {
  //hide all food but one
  let currentFood = 1
  $('#food-section section').toggle();
  $(`#food-section section:nth-of-type(${currentFood})`).toggle();

  //on click 
  $('.seeNextFood').on('click', () => {
    // $(`#food-section section:nth-of-type(${currerntFood})`).slideDown();
    currentFood += 1;
    $(`#food-section section:nth-of-type(${currentFood})`).slideDown();
  })

  //=> hide this food 
  //show next food
}
foodOptions();

// changing colors of selected trivia answers
$('[data-correct=true]').click(function () {
  $(this).toggleClass('correct');
});
$('[data-correct=false]').click(function () {
  $(this).toggleClass('incorrect');
});
