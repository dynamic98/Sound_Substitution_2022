const groupB_question = document.getElementById("question_groupB");
const groupB_submit = document.getElementById("submit_groupB");


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


const groupB_questionList = [
    "1. 가장 낮은 음은 무엇인가요?",
    "2. 가장 작은 소리는 무엇인가요?",
    "3. 소리가 점점 낮아지는 멜로디는 무엇인가요?",
    "4. 소리가 점점 작아지는 멜로디는 무엇인가요?",
    "5. 소리가 점점 느려지는 멜로디는 무엇인가요?",
    "6. 소리가 점점 커지면서 음이 올라가는 멜로디는 무엇인가요?",
    "7. 소리가 점점 빨라지면서 음이 올라가는 멜로디는 무엇인가요?",
    "8. 소리가 점점 커지면서 음이 느려지는 멜로디는 무엇인가요?",
    "9. 리듬의 변화가 가장 적은 멜로디는 무엇인가요?",
    "테스트가 끝났습니다."
]


groupB_questionChanger();


function groupB_questionChanger() {
    groupB_submit.addEventListener("click", () => {
        groupB_count += 1
        groupB_question.innerText = groupB_questionList[groupB_count]
        question_one.style.background = grey;
        question_two.style.background = grey;
        question_three.style.background = grey;
        question_mola.style.background = grey;
    });
}