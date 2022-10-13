const shape_square = document.getElementById("btn-square");
const shape_circle = document.getElementById("btn-circle");
const shape_triangle= document.getElementById("btn-triangle");
const shape_decagon = document.getElementById("btn-decagon");
const shape_star = document.getElementById("btn-star");



const texture_none = document.getElementById("none");
const texture_wood = document.getElementById("wood");
const texture_stone = document.getElementById("stone");
const texture_paper = document.getElementById("paper");


const pitch_button = document.getElementById("pitchButton");
const beat_button = document.getElementById("beatButton");


const transparent = '#FFFFFF';
const red = '#FF5C5C';
const black = '#221E21';
const gray = '#767676';



let now_shape = '';


shapeColorChange();
// paletteColorChange();
textureColorChange();
menuColorChange();

pitch_button.click()
function shapeColorChange() {
    shape_square.addEventListener("click", () => {
        shape_square.style.background = red;
        shape_circle.style.background = black;
        shape_triangle.style.background = black;
        shape_decagon.style.background = black;
        shape_star.style.background = black;
        now_shape = 'square';
    });

    shape_circle.addEventListener("click", () => {
        shape_square.style.background = black;
        shape_circle.style.background = red;
        shape_triangle.style.background = black;
        shape_decagon.style.background = black;
        shape_star.style.background = black;
        now_shape = 'circle';
    });

    shape_triangle.addEventListener("click", () => {
        shape_square.style.background = black;
        shape_circle.style.background = black;
        shape_triangle.style.background = red;
        shape_decagon.style.background = black;
        shape_star.style.background = black;
        now_shape = 'triangle';
    });

    shape_decagon.addEventListener("click", () => {
        shape_square.style.background = black;
        shape_circle.style.background = black;
        shape_triangle.style.background = black;
        shape_decagon.style.background = red;
        shape_star.style.background = black;
        now_shape = 'decagon';
    });

    shape_star.addEventListener("click", () => {
        shape_square.style.background = black;
        shape_circle.style.background = black;
        shape_triangle.style.background = black;
        shape_decagon.style.background = black;
        shape_star.style.background = red;
        now_shape = 'star';
    });
}



function textureColorChange() {
    texture_none.addEventListener("click", () => {
        texture_none.style.outlineColor = red;
        texture_wood.style.outlineColor = transparent;
        texture_stone.style.outlineColor = transparent;
        texture_paper.style.outlineColor = transparent;
    });

    texture_wood.addEventListener("click", () => {
        texture_none.style.outlineColor = transparent;
        texture_wood.style.outlineColor = red;
        texture_stone.style.outlineColor = transparent;
        texture_paper.style.outlineColor = transparent;
    });

    texture_stone.addEventListener("click", () => {
        texture_none.style.outlineColor = transparent;
        texture_wood.style.outlineColor = transparent;
        texture_stone.style.outlineColor = red;
        texture_paper.style.outlineColor = transparent;
    });

    texture_paper.addEventListener("click", () => {
        texture_none.style.outlineColor = transparent;
        texture_wood.style.outlineColor = transparent;
        texture_stone.style.outlineColor = transparent;
        texture_paper.style.outlineColor = red;
    });
}


function menuColorChange() {
    pitch_button.addEventListener("click", () => {
        pitch_button.style.background = red;
        beat_button.style.background = gray;
    });

    beat_button.addEventListener("click", () => {
        pitch_button.style.background = gray;
        beat_button.style.background = red;
    });
}
