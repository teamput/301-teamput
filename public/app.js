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

function foodOptions(){
  
  let currentFood = 1;
  $('#food-section section').toggle();
  $(`#food-section section:nth-of-type(${currentFood})`).toggle();
  

  $('.seeNextFood').on('click', () => {
    currentFood += 1;
    $(`#food-section section:nth-of-type(${currentFood})`).slideDown();
  })
  
}
foodOptions();

function musicOptions(){
  
  let currentmusic = 1;
  $('#music-section section').toggle();
  $(`#music-section section:nth-of-type(${currentmusic})`).toggle();
  

  $('.seeNextMusic').on('click', () => {
    currentmusic += 1;
    $(`#music-section section:nth-of-type(${currentmusic})`).slideDown();
  })
  
}
musicOptions();


function eventOptions(){
  
  let currentevent = 1;
  $('#event-section section').toggle();
  $(`#event-section section:nth-of-type(${currentevent})`).toggle();
  

  $('.seeNextEvent').on('click', () => {
    currentevent += 1;
    $(`#event-section section:nth-of-type(${currentevent})`).slideDown();
  })
  
}
eventOptions();

function newsOptions(){
  
  let currentnews = 1;
  $('#news-section section').toggle();
  $(`#news-section section:nth-of-type(${currentnews})`).toggle();
  

  $('.seeNextNews').on('click', () => {
    currentnews += 1;
    $(`#news-section section:nth-of-type(${currentnews})`).slideDown();
  })
  
}
newsOptions();