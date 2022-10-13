const question_one = document.getElementById("question_one");
const question_two = document.getElementById("question_two");
const question_three = document.getElementById("question_three");
const question_mola = document.getElementById("question_mola");

const red = '#c52828';
const grey = '#767676';


questionColorChange();


function questionColorChange() {
    question_one.addEventListener("click", () => {
        question_one.style.background = red;
        question_two.style.background = grey;
        question_three.style.background = grey;
        question_mola.style.background = grey;
    });

    question_two.addEventListener("click", () => {
        question_one.style.background = grey;
        question_two.style.background = red;
        question_three.style.background = grey;
        question_mola.style.background = grey;
    });


    question_three.addEventListener("click", () => {
        question_one.style.background = grey;
        question_two.style.background = grey;
        question_three.style.background = red;
        question_mola.style.background = grey;
    });


    question_mola.addEventListener("click", () => {
        question_one.style.background = grey;
        question_two.style.background = grey;
        question_three.style.background = grey;
        question_mola.style.background = red;
    });


}