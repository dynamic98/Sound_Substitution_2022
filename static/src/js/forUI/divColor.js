const happyButton = document.getElementById("happy");
const sadButton = document.getElementById("sad");
const excitingButton = document.getElementById("exciting");
const peacefulButton = document.getElementById("peaceful");

const emotionContainer = document.getElementById("emotionContainerID");



const happyColor = '#D0A000';
const sadColor = '#C10877';
const excitingColor = '#2B6EE2';
const peacefulColor = '#1BB783';


divColorChange();

function divColorChange() {
    happyButton.addEventListener("click", () => {
        emotionContainer.style.background = happyColor;
    });

    sadButton.addEventListener("click", () => {
        emotionContainer.style.background = sadColor;
    });

    excitingButton.addEventListener("click", () => {
        emotionContainer.style.background = excitingColor;
    });

    peacefulButton.addEventListener("click", () => {
        emotionContainer.style.background = peacefulColor;
    });
}