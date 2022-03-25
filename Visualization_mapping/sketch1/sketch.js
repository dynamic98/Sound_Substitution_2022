// const p5 = require('p5');
// var socket = io;

function setup(){
    createCanvas(400, 400);
    background(51);
 
    fill(100,100,0);
    noStroke();
    ellipse(100, 100, 50, 50);
    socket.on('mouse', newDrawing);
}

function newDrawing(data){
  noStroke();
  fill(255, 0, 100);
  ellipse(data.x, data.y, 36, 36);
}

function mouseDragged(){
  console.log('Sending: '+ mouseX + ',' + mouseY);
  var data = {
    x: mouseX,
    y: mouseY
  };
  socket.emit('mouse', data);

  noStroke(); 
  fill(100);
  ellipse(mouseX, mouseY, 36, 36);
}

function draw() {   
  }