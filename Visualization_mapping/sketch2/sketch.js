var song;
var sliderRate;
var sliderPan;
var button


function setup(){
  createCanvas(200, 200);
  song = loadSound("assets/beat.mp3");
  button = createButton("play");
  button.mouseClicked(togglePlaying);
  fft = new p5.FFT();
  // pitch 조정
  sliderRate = createSlider(0, 2, 1, 0.01);
  // 왼쪽 오른쪽 스피커 밸런스 조정
  sliderPan = createSlider(-1, 1, 0, 0.01);
  sliderVol = createSlider(0, 1, 0.5, 0.01);

}

function togglePlaying(){
    if (song.isPlaying()) {
      song.pause();
    } else {
      song.loop();
    }
    // song.setVolume(0.5);
  // song.play();
}

function draw(){
  background(0);
  // console.log('fff')
  song.rate(sliderRate.value());
  song.pan(sliderPan.value());
  song.setVolume(sliderVol.value());

  let spectrum = fft.analyze();
  // console.log("ff")
  // console.log(spectrum)
  noStroke();
  fill(255, 0, 255);
  for (let i = 0; i< spectrum.length; i++){
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  }

  let waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(20);
  for (let i = 0; i < waveform.length; i++){
    let x = map(i, 0, waveform.length, 0, width);
    let y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
  }
  endShape();

}