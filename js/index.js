"use strict";
$(document).ready(function(){
  const TOKEN = '5939845302:AAGn2XmkaJGp_rtADkq9oVk24dvECwVXiww'
  const CHAT_ID = '207535650'
  const URL_API = `https://api.telegram.org/bot${ TOKEN }/sendMessage`
  const IPINFO_TOKEN = 'c980e0b6c7a3df'
  const popular_questions = document.querySelector('#popular_questions').getBoundingClientRect();
  // let footer = document.querySelector('footer').getBoundingClientRect();
  let about = document.querySelector('#about').getBoundingClientRect();
  // console.log(about)
  // console.log(popular_questions)
  // console.log(popular_questions.bottom)
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
    height > 620 ? $('.menu_button').removeClass('disactive') : $('.menu_button').addClass('disactive');
    height > 130 ? $('nav').addClass('shadow') : $('nav').removeClass('shadow');
    height > about.y - 200 && height < popular_questions.bottom - popular_questions.height ? $('.mobile_button_wrapper').addClass('show') : $('.mobile_button_wrapper').removeClass('show');
  });
  $('.more').on('click', function(){
    $('.results').not($(this).parent().find('.results')).slideUp(500);
    $(this).parent().find('.results').slideToggle(500);
    $('.more_text').not($(this).find('.more_text')).addClass('active');
    $('.less_text').not($(this).find('.less_text')).removeClass('active');
    $(this).find('.more_text').toggleClass('active');
    $(this).find('.less_text').toggleClass('active');
    $(this).toggleClass('less');
    $('.result_item').not($(this).parent()).removeClass('mb_57');
    $(this).parent().toggleClass('mb_57');
    $('.more').not($(this)).removeClass('less');
  });
  $('.more_info img').on('click', function(){
    $('.question_info .text').not($(this).parent().prev().find('.text')).slideUp(500);
    $('.more_info img').not($(this)).attr('src', '../images/sprites/plus.svg');
    $(this).attr('src') == '../images/sprites/minus.svg' ? $(this).attr('src', '../images/sprites/plus.svg').parent().prev().find('.text').slideToggle(500) : $(this).attr('src', '../images/sprites/minus.svg').parent().prev().find('.text').slideToggle(500);
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
  $('.refresh').on('click', function(){
    $('input').val('')
    $(this).parent().prev().addClass('active')
    $(this).parent().removeClass('active')
  })
  let phone = ''
  $(function () {
    var input = $('#phone');
    var iti_el = $('.iti.iti--allow-dropdown.iti--separate-dial-code');
    if(iti_el.length){
        iti.destroy();
    }
    for(var i = 0; i < input.length; i++){
      iti_el = intlTelInput(input[i], {
        autoHideDialCode: false,
        autoPlaceholder: "aggressive" ,
        initialCountry: "auto",
        separateDialCode: true,
        preferredCountries: ['by','fr','it','de','es','ae','ru'],
        customPlaceholder:function(selectedCountryPlaceholder,selectedCountryData){
          return ''+selectedCountryPlaceholder.replace(/[0-9]/g,'X');
        },
        geoIpLookup: function(callback) {
          $.get(`https://ipinfo.io/json?token=${IPINFO_TOKEN}`, function() {}, "jsonp").always(function(resp) {
            var countryCode = (resp && resp.country) ? resp.country : "";
            callback(countryCode);
          });
        },
        utilsScript: "./utils.js"
      });
      input.on("focus click countrychange", function(e, countryData) {
        var pl = $(this).attr('placeholder') + '';
        var res = pl.replace( /X/g ,'9');
        if(res != 'undefined'){
            $(this).inputmask(res, {placeholder: "X", clearMaskOnLostFocus: true});
        }
      });  
      input.on("focusout", function(e, countryData) {
        phone = iti_el.getNumber();
      });
    }
  })
  $('.form').submit(function(e){
    e.preventDefault()
    let message = `<b>Заявка с сайта</b>\n`
    message += `<b>Client:</b> ${this.name.value}\n`
    message += `<b>Phone:</b> ${phone}\n`
    axios.post(URL_API, {
      chat_id: CHAT_ID,
      parse_mode: 'html',
      text: message,
    })
    .then(() => {
      $(this).removeClass('active')
      $(this).next().addClass('active')
    })
    .catch(err => {
        console.log(err)
    })
    })
})