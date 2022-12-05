"use strict";
$(document).ready(function(){
  $('a[href^="#"]').on("click", function (event) {
    event.preventDefault();
    let id  = $(this).attr('href'),
    top = $(id).offset().top - 100;
    $('body,html').animate({scrollTop: top}, 500);
  });
  $('.arrow_up').on('click', function(){
    $('body,html').animate({scrollTop: 0}, 500);
  });
  $(window).scroll(function() {
    let height = $(window).scrollTop();
    if(height > 500){
      $('.menu_button').removeClass('disactive');
      $('nav').addClass('shadow');
    } else{
      $('.menu_button').addClass('disactive');
      $('nav').removeClass('shadow');
    }
  });
  $('.more').on('click', function(){
    $('.results').not($(this).parent().find('.results')).slideUp(500);
    $(this).parent().find('.results').slideToggle(500);
    $('.more_text').not($(this).find('.more_text')).addClass('active');
    $('.less_text').not($(this).find('.less_text')).removeClass('active');
    $(this).find('.more_text').toggleClass('active');
    $(this).find('.less_text').toggleClass('active');
    $(this).parent().addClass('mb_57');
    $(this).toggleClass('less');
    $('.result_item').not($(this).parent()).removeClass('mb_57');
    $('.more').not($(this)).removeClass('less');
  });
  $('.more_info .more-icon').on('click', function(){
    $('.question_info .text').not($(this).parent().prev().find('.text')).slideUp(500);
    $('.more-icon').not($(this)).removeClass('icon-minus').addClass('icon-plus');
    $(this).toggleClass('icon-plus').toggleClass('icon-minus').parent().prev().find('.text').slideToggle(500);
  });
  $('.tel').on('click', function(){
    navigator.clipboard.writeText($(this).attr('data-tel'))
    .then(() => {
      $('.tooltiptext').text('Скопировано');
    })
    .catch(err => {
      console.log('Something went wrong', err);
    })
    .finally(()=>{
      setTimeout(()=> {$('.tooltiptext').text('Скопировать номер')}, 500);
    })
  });
});