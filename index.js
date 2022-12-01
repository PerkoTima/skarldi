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
  })
  $(window).scroll(function() {
    let height = $(window).scrollTop();
    if(height > 500){
      $('.menu_button').removeClass('disactive');
    } else{
      $('.menu_button').addClass('disactive');
    }
  });
  $('.more').on('click', function(){
    $(this).toggleClass('less')
    $(this).parent().find('.results').toggleClass('show')
    if($(this).hasClass('less')){
      $(this).parent().find('.more_text').text('Свернуть')
      $(this).parent().css({'margin-bottom': '57px'})
    }else{
      $(this).parent().find('.more_text').text('Подробнее')
      $(this).parent().css({'margin-bottom': '24px'})
    }
  }) 
});

const questions = document.querySelectorAll('.more_info img');
const text = document.querySelectorAll('.text')

for(let i = 0; i < questions.length; i++){
  questions[i].addEventListener('click', () => {
    text.forEach(n => n.classList.remove('active'))
    questions.forEach(n => n.src = './images/sprites/plus.svg')
    // text[i].classList.toggle('active')
    if(text[i].classList.contains('active')){
      questions[i].src = './images/sprites/plus.svg'
      text[i].classList.remove('active')
    }else{
      text[i].classList.add('active')
      questions[i].src = './images/sprites/minus.svg'
    }
  })
}
function copy(){
  const copyText = document.querySelector('.tel')
  const tooltip = document.querySelector('.tooltiptext')

  navigator.clipboard.writeText(copyText.dataset.tel)
    .then(() => {
      tooltip.innerHTML = 'Скопировано'
    })
    .catch(err => {
      console.log('Something went wrong', err);
    })
    .finally(()=>{
      setTimeout(()=> {tooltip.innerHTML = 'Скопировать номер'}, 500) 
    })
    
}