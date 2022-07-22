const shape_square = document.getElementById("btn-square");
const shape_circle = document.getElementById("btn-circle");
const shape_triangle= document.getElementById("btn-triangle");
const shape_decagon = document.getElementById("btn-decagon");
const shape_star = document.getElementById("btn-star");

const palette_1 = document.getElementById("palette1");
const palette_2 = document.getElementById("palette2");
const palette_3 = document.getElementById("palette3");
const palette_4 = document.getElementById("palette4");
const palette_5 = document.getElementById("palette5");
const palette_6 = document.getElementById("palette6");
const palette_7 = document.getElementById("palette7");

const texture_none = document.getElementById("none");
const texture_wood = document.getElementById("wood");
const texture_stone = document.getElementById("stone");
const texture_paper = document.getElementById("paper");


const transparent = '#FFFFFF';
const red = '#FF5C5C';
const black = '#221E21';

let now_shape = '';


shapeColorChange();
paletteColorChange();
textureColorChange();


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


function paletteColorChange() {
    palette_1.addEventListener("click", () => {
        palette_1.style.borderColor = red;
        palette_2.style.borderColor = transparent;
        palette_3.style.borderColor = transparent;
        palette_4.style.borderColor = transparent;
        palette_5.style.borderColor = transparent;
        palette_6.style.borderColor = transparent;
        palette_7.style.borderColor = transparent;
    });

    palette_2.addEventListener("click", () => {
        palette_1.style.borderColor = transparent;
        palette_2.style.borderColor = red;
        palette_3.style.borderColor = transparent;
        palette_4.style.borderColor = transparent;
        palette_5.style.borderColor = transparent;
        palette_6.style.borderColor = transparent;
        palette_7.style.borderColor = transparent;
    });


    palette_3.addEventListener("click", () => {
        palette_1.style.borderColor = transparent;
        palette_2.style.borderColor = transparent;
        palette_3.style.borderColor = red;
        palette_4.style.borderColor = transparent;
        palette_5.style.borderColor = transparent;
        palette_6.style.borderColor = transparent;
        palette_7.style.borderColor = transparent;
    });

    palette_4.addEventListener("click", () => {
        palette_1.style.borderColor = transparent;
        palette_2.style.borderColor = transparent;
        palette_3.style.borderColor = transparent;
        palette_4.style.borderColor = red;
        palette_5.style.borderColor = transparent;
        palette_6.style.borderColor = transparent;
        palette_7.style.borderColor = transparent;
    });

    palette_5.addEventListener("click", () => {
        palette_1.style.borderColor = transparent;
        palette_2.style.borderColor = transparent;
        palette_3.style.borderColor = transparent;
        palette_4.style.borderColor = transparent;
        palette_5.style.borderColor = red;
        palette_6.style.borderColor = transparent;
        palette_7.style.borderColor = transparent;
    });

    palette_6.addEventListener("click", () => {
        palette_1.style.borderColor = transparent;
        palette_2.style.borderColor = transparent;
        palette_3.style.borderColor = transparent;
        palette_4.style.borderColor = transparent;
        palette_5.style.borderColor = transparent;
        palette_6.style.borderColor = red;
        palette_7.style.borderColor = transparent;
    });

    palette_7.addEventListener("click", () => {
        palette_1.style.borderColor = transparent;
        palette_2.style.borderColor = transparent;
        palette_3.style.borderColor = transparent;
        palette_4.style.borderColor = transparent;
        palette_5.style.borderColor = transparent;
        palette_6.style.borderColor = transparent;
        palette_7.style.borderColor = red;
    });

}


function textureColorChange() {
    texture_none.addEventListener("click", () => {
        texture_none.style.borderColor = red;
        texture_wood.style.borderColor = transparent;
        texture_stone.style.borderColor = transparent;
        texture_paper.style.borderColor = transparent;
    });
}