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
questions.forEach(element => {
  element.addEventListener('click', () => {
    if(!element.parentElement.previousElementSibling.querySelector('p').classList.contains('active')){
      element.parentElement.previousElementSibling.querySelector('p').classList.add('active')
      element.src = './images/sprites/minus.svg'
      
    }else{
      element.parentElement.previousElementSibling.querySelector('p').classList.remove('active')
      element.src = './images/sprites/plus.svg'
    }
    
    

  })
  // console.log(element)
});
// console.log(questions)

document.addEventListener('DOMContentLoaded', sttClick);