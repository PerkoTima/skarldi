"use strict";

const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
};

const resultsItems = document.querySelectorAll('.result_item')
const moreItems = document.querySelectorAll('.more')
const textMoreItems = document.querySelectorAll('.more_text')
const resultsBlockItems = document.querySelectorAll('.results')
for(let i = 0; i < moreItems.length; i++){
  moreItems[i].addEventListener('click',  () => {
    resultsBlockItems[i].classList.toggle('show')
    moreItems[i].classList.toggle('less')
    if(moreItems[i].classList.contains('less')){
      textMoreItems[i].textContent = 'Свернуть'
      resultsItems[i].style.marginBottom = '57px'
    }else{
      textMoreItems[i].textContent = 'Подробнее'
      resultsItems[i].style.marginBottom = '24px'
    }
    
  })  
}


let sttElem = document.querySelector('.arrow_up');

let sttClick = function sttClick() {
  sttElem.addEventListener('click', function () {
    let docHeight = window.scrollY;
    let progress = 0;
    let position = docHeight;
    let speed = 5;

    let sttAnim = function sttAnim() {
      progress += 1;
      position -= progress * speed;
      window.scrollTo(0, position);

      if (position > 0) {
        requestAnimationFrame(sttAnim);
      }
    };

    requestAnimationFrame(sttAnim);
  });
};

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
// questions.forEach(element => {
//   element.addEventListener('click', () => {
//     text.forEach(n => n.classList.remove('active'))
//     questions.forEach(e => e.src = './images/sprites/plus.svg')
//     if(!element.parentElement.previousElementSibling.querySelector('p').classList.contains('active')){
//       element.parentElement.previousElementSibling.querySelector('p').classList.add('active')
//       element.src = './images/sprites/minus.svg'
      
//     }else{
//       element.parentElement.previousElementSibling.querySelector('p').classList.remove('active')
//       element.src = './images/sprites/plus.svg'
//     }
//   })
// });

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

document.addEventListener('DOMContentLoaded', sttClick);
