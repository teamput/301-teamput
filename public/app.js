'use strict';

//on menu click open or close nav bar for mobile
$(function mobileClick(){
    $('header').hide();
    $('#hamburger').on('click', () => {
        //show or hide header with transition
        console.log('clicked');
        $('#header').show();
        $('header').slideToggle();
    });
})
mobileClick();

$(main).click(
    alert('bla')
)