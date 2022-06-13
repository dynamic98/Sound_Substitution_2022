let target = document.getElementById('thefile');


// 음악이 무조건 하나 input 으로 들어와야 메뉴를 보여주는 함수
function show_canvas(delimiter){
    // if (target.files.length == 1){ 
    //   document.getElementById(delimiter).style.visibility = "visible";
    // } else {
    //   document.getElementById(delimiter).style.visibility = "hidden";
    // }
    document.getElementById(delimiter).style.visibility = "visible";
}


export { show_canvas };
