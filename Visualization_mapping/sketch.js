// const p5 = require('p5');

function setup(){
    createCanvas(400, 400);
    background(51);

    socket = socket.io.connect('https://localhost:3000')
}

function draw() {
    if (mouseIsPressed) {
      fill(0);
    } else {
      fill(255);
    }
    ellipse(mouseX, mouseY, 80, 80);
    
  }