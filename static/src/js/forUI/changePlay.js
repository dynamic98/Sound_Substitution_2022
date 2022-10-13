// play & pause 아이콘을 클릭에 따라 바꾸는 js 파일입니다.

const playButton = document.getElementById("play");
let count = 0

playButtonChange();

function playButtonChange(){
    playButton.addEventListener("click", () => {
        count += 1
        if (count % 2 != 0){
            document.querySelector('.glyphicon-play').setAttribute("class", "glyphicon glyphicon-pause");
        } else {
            document.querySelector('.glyphicon-pause').setAttribute("class", "glyphicon glyphicon-play");
        }
    })
};