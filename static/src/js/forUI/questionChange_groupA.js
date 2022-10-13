const groupA_question = document.getElementById("question_groupA");
const groupA_submit = document.getElementById("submit_groupA");


const question_one = document.getElementById("question_one");
const question_two = document.getElementById("question_two");
const question_three = document.getElementById("question_three");
const question_mola = document.getElementById("question_mola");

const red = '#c52828';
const grey = '#767676';

let groupA_count = 0;
let groupB_count = 0;
let groupC_count = 0;
let groupD_count = 0;


const groupA_questionList = [
    "1. 가장 높은 음은 무엇인가요?",
    "2. 가장 큰 소리는 무엇인가요?",
    "3. 소리가 점점 높아지는 멜로디는 무엇인가요?",
    "4. 소리가 점점 커지는 멜로디는 무엇인가요?",
    "5. 소리가 점점 빨라지는 멜로디는 무엇인가요?",
    "6. 소리가 점점 커지면서 음이 내려가는 멜로디는 무엇인가요?",
    "7. 소리가 점점 빨라지면서 음이 내려가는 멜로디는 무엇인가요?",
    "8. 소리가 점점 커지면서 음이 빨라지는 멜로디는 무엇인가요?",
    "9. 소리의 음이 높이 변화가 가장 많은 멜로디는 무엇인가요?",
    "테스트가 끝났습니다."
]


groupA_questionChanger();


function groupA_questionChanger() {
    groupA_submit.addEventListener("click", () => {
        groupA_count += 1
        groupA_question.innerText = groupA_questionList[groupA_count]
        question_one.style.background = grey;
        question_two.style.background = grey;
        question_three.style.background = grey;
        question_mola.style.background = grey;
    });
}