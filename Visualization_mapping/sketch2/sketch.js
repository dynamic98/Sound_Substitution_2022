var song;
var sliderRate;
var sliderPan;
var button


function setup(){
  createCanvas(200, 200);
  song = loadSound("assets/beat.mp3", loaded);
  // pitch 조정
  sliderRate = createSlider(0, 2, 1, 0.01);
  // 왼쪽 오른쪽 스피커 밸런스 조정
  sliderPan = createSlider(-1, 1, 0, 0.01);

}

function loaded(){
  button = createButton("play");
  button.mousePressed(togglePlaying);

}

function togglePlaying(){
  song.play();
  song.setVolume(0.5);
}

function draw(){
  background(0);
  song.rate(sliderRate.value());
  song.pan(sliderPan.value());
}