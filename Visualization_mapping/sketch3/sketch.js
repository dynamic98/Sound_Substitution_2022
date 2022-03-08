var mic, fft;

var peak;

var spectrum = [];

var detected = false;

function setup() {
  noCanvas();

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.001);
  fft.setInput(mic);
  peak = new p5.PeakDetect(60, 100, 0.05);
}

function draw() {
  spectrum = fft.waveform();
  var frequencies = fft.analyze();
  peak.update(fft);
  if (peak.isDetected) {
    detected = true;
  } else {
    detected = false;
  }

}

// set up the scene
var scene = new THREE.Scene();

// set up the camera to see the actual scene
var cam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
scene.add(cam);

// set up the renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// make the canvas adaptable to the window screen
window.addEventListener('resize', function() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width, height);
  cam.aspect = width / height;
  cam.updateProjectionMatrix();
});

(function() {
  var script = document.createElement('script');
  script.onload = function() {
    var stats = new Stats();
    document.body.appendChild(stats.dom);
    requestAnimationFrame(function loop() {
      stats.update();
      requestAnimationFrame(loop)
    });
  };
  script.src = '//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';
  document.head.appendChild(script);
})()

// create the particle variable
var particlesCount = 256;
var particles = new THREE.Geometry();
var particlesMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 1
});

// add the lines geometry to the scene
var lines = new THREE.Geometry();

for (var i = 0; i < particlesCount; i++) {
  var px = map(i, 0, particlesCount, -window.innerWidth*0.7, window.innerWidth*0.7);
  var py = 0;
  var pz = -700;
    var particle = new THREE.Vector3(px, py, pz);

  // addthe particle to the array
  particles.vertices.push(particle);
  // lines.vertices.push( particle );
}

for (var i = 0; i < particlesCount; i++) {
  var a = particles.vertices[i];
  for (var j = i + 1; j < particlesCount; j++) {
    var b = particles.vertices[j];
    if (a.distanceTo(b) < window.innerWidth / 6) {
      lines.vertices.push(a);
      lines.vertices.push(b);
    }
  }
}

var line = new THREE.Line(lines, new THREE.LineBasicMaterial({
  color: 0xffffff,
  opacity: 0.1,
  transparent: true
}));

scene.add(line);

// Create a new particle system with the particles and the material
var ParticleSystem = new THREE.Points(particles, particlesMaterial);

// Add the particle system to the scene
scene.add(ParticleSystem);

// update function
var update = function() {
  for (var i = 0; i < particlesCount; i++) {
    var particle = particles.vertices[i];

    var a = map(i, 0, particlesCount, 0, Math.PI * 2);

    // particle.y = 0 + map(spectrum[i], -1, 1, -window.innerHeight/10, window.innerheight/10);
    particle.x = map(i, 0, particlesCount, -window.innerWidth*0.7, window.innerWidth*0.7);
    particle.y = spectrum[i]*1000;
  }

  // flag to the particle system
  // that we've changed its vertices.
  particles.verticesNeedUpdate = true;
  lines.verticesNeedUpdate = true;
  lines.__dirtyvertices = true;
};

// render function
var render = function() {
  // let's render the actual scene, first parameter is the scene, second the camera
  renderer.render(scene, cam);
};

// Game Loop function (update, render, repeat)
var cycle = function() {
  requestAnimationFrame(cycle);

  update();
  render();
};

cycle();

// ------------------------------------------------------------------------------------------

/* map function
 ** ported from p5js
 ** https://github.com/processing/p5.js/blob/master/src/math/calculation.js#L409
 */
function map(n, start1, stop1, start2, stop2, withinBounds) {
  var newval = ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  if (!withinBounds) {
    return newval;
  }
  if (start2 < stop2) {
    return this.constrain(newval, start2, stop2);
  } else {
    return this.constrain(newval, stop2, start2);
  }
}
