var cnv, soundFile, fft, peakDetect;
var ellipseWidth = 0;

function preload() {
  soundFile = loadSound('assets/beat.mp3');
}

function setup() {
  cnv = createCanvas(100,100);
  textAlign(CENTER);

  fft = new p5.FFT();
  peakDetect = new p5.PeakDetect();

  setupSound();

  // when a beat is detected, call triggerBeat()
  peakDetect.onPeak(triggerBeat);
}

function draw() {
  background(0);
  fill(255);
  text('click to play', width/2, height/2);

  fft.analyze();
  peakDetect.update(fft);

  ellipseWidth *= 0.95;
  ellipse(width/2, height/2, ellipseWidth, ellipseWidth);
}

// this function is called by peakDetect.onPeak
function triggerBeat() {
  ellipseWidth = 50;
}

// mouseclick starts/stops sound
function setupSound() {
  cnv.mouseClicked( function() {
    if (soundFile.isPlaying() ) {
      soundFile.pause();
    } else {
      soundFile.loop();
    }
  });
}