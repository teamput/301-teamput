'use strict';

//on menu click open or close nav bar for mobile
$(function mobileClick() {
  $('header').hide();
  $('#hamburger').on('click', () => {
    //show or hide header with transition
    console.log('clicked');
    $('#header').show();
    $('header').slideToggle();
  });
})
mobileClick();

$.ajax({
  type: 'POST',
  dataType: 'json',
}).then(results => {
  console.log(results.body);
})

// on menu click open or close nav bar for mobile
$(function mobileClick() {
    $('#menu').hide();
    $('#hamburger').on('click', () => {
        //show or hide #menu with transition
        console.log('clicked');
        $('#menu').slideToggle();
    });
})
mobileClick();

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
function radioButtons(){
    //on clicking a radio button
    $('label').click(function() {
        //set that labels input to checked
        console.log('got it');
    })
}
radioButtons();
