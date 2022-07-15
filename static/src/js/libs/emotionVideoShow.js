const happyButton = document.querySelector('#happyButton');
const sadButton = document.querySelector('#sadButton');
const angryButton = document.querySelector('#angryButton');
const calmButton = document.querySelector('#calmButton');

let theVideo = document.querySelector('#theVideo');

let happyCount = 0;
let sadCount = 0;
let angryCount = 0;
let calmCount = 0;


happyButton.addEventListener("click", function(){
    happyCount += 1
    if (happyCount % 2 != 0) {
        theVideo.style.visibility = 'visible'
    } else {
        theVideo.style.visibility = 'hidden'
    }
});


sadButton.addEventListener("click", function(){
    sadCount += 1
    if (sadCount % 2 != 0) {
        theVideo.style.visibility = 'visible'
    } else {
        theVideo.style.visibility = 'hidden'
    }
});


angryButton.addEventListener("click", function(){
    angryCount += 1
    if (angryCount % 2 != 0) {
        theVideo.style.visibility = 'visible'
    } else {
        theVideo.style.visibility = 'hidden'
    }
})


calmButton.addEventListener("click", function(){
    calmCount += 1
    if (calmCount % 2 != 0) {
        theVideo.style.visibility = 'visible'
    } else {
        theVideo.style.visibility = 'hidden'
    }
})