/**
 * Handles front page carousel.
 * 
 */
$(document).ready(function(){
  $('.carousel').slick({
    dots: true,
    speed: 300,
    slidesToShow: 1,
    autoplay: true,
    infinite : false,
    arrows: false,
    pauseOnHover: true
  });
});