// import { audio, audio_context, file as target} from './modules.js';
import { SkeletonHelper } from 'three';
import { show_canvas } from './modules.js'
let file, audio, fileLabel, audio_context;
let realTitle = document.getElementById('title');
let analyser, wavesurfer, src, bufferLength, dataArray;
let chroma, maxChroma, energy, amplitudeSpectrum;
let AudioDifference;
let AudioCurrentTime, AudioLastTime;
// let target;

const pitchClasses = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B"
];

let frameBuffer = new Map();
pitchClasses.forEach((pitch) => {
    frameBuffer.set(pitch, []);
});

// AudioLastTime = 0;
// AudioCurrentTime = 0;

// LOAD MUSIC (vizInit)
function FileInit() {
    file = document.getElementById("thefile");
    audio = document.getElementById("audio");
    fileLabel = document.querySelector("label.file");
    audio_context = audio_context || new AudioContext();
    let video = document.getElementById('video');
    const UsrAg = navigator.userAgent;
    let stream = null;
    if (UsrAg.indexOf('Firefox') > -1) { stream = video.mozCaptureStream(); }
    else { stream = video.captureStream(); }


    console.log('audio input completed')
    document
    .querySelector('[data-action="play"]')
    .addEventListener('click', ()=>{ 
        console.log("PlayPause button pressed");
        TogglePlay();
    })
  }


function FileChange(){
    file.onchange = function(){
        // canvas rendering by file input
        show_canvas("canvas"); // visual-canvas
        show_canvas("demo");   // haptic-canvas
        show_canvas("music-controls") // music controller

        fileLabel.classList.add('normal');
        let files = this.files;
        audio.src = URL.createObjectURL(files[0]);
        console.log("VizInit play");
        
        let fileList = file.files[0].name;
        realTitle.innerText = fileList;

        // audio.load();
        video.load();
        // src = audio_context.createMediaElementSource(audio);
        src = audio_context.createMediaElementSource(video);
        // src = audio_context.createMediaStreamSource(video);
        // video.volume = 1;
        video.play()

        
        AnalyzerPlay(audio_context, src);
    }
}
  
function AnalyzerPlay(audio_context, src) {
    analyser = audio_context.createAnalyser();
    src.connect(analyser);
    analyser.connect(audio_context.destination);
    analyser.fftSize = 512;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    // meyda analyser
    chroma = 0;
    maxChroma = 0;
    energy = 0;
    amplitudeSpectrum = 0;

    const meyda_analyser = Meyda.createMeydaAnalyzer({
        audioContext: audio_context,
        source: src,
        buffersize: 1024,
        featureExtractors: ["energy", "chroma"],
        callback: (features) => {
            try {
            chroma = updateChroma(features['chroma']);
            } catch (err){
                console.log(err);
            }

            // console.log(chroma);
            maxChroma = chroma.indexOf(max(chroma));
            // console.log(chroma);
            energy = features['energy']
        }
    })
    meyda_analyser.start();
}


function updateChroma(pitchValues){
    let result = [];
    pitchValues.forEach((value, index) => {
        let currentPitch = pitchClasses[index];
        let currentPitchBuffer = frameBuffer.get(currentPitch);
        currentPitchBuffer.push(value);
        let framesToBuffer = 20;
        while (currentPitchBuffer.length > framesToBuffer) {
            currentPitchBuffer.shift();
        }
        let framesAverage = 
            currentPitchBuffer.reduce((total, value) => total+value, 0)/currentPitchBuffer.length;
        framesAverage = Math.pow(framesAverage, 5);
        result.push(framesAverage);
    });
    return result;
};


function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }



function TogglePlay(){
    if (audio.paused){
        audio.play();
    } else {
        audio.pause();
    }
}

FileInit();
FileChange();
// AudioSync();
// SyncAudio();


// some helper functions here
function fractionate(val, minVal, maxVal) {
    return (val - minVal)/(maxVal - minVal);
  }
  
  function modulate(val, minVal, maxVal, outMin, outMax) {
    var fr = fractionate(val, minVal, maxVal);
    var delta = outMax - outMin;
    return outMin + (fr * delta);
  }
  
  function avg(arr){
    var total = arr.reduce(function(sum, b) { return sum + b; });
    return (total / arr.length);
  }
  
  function max(arr){
    return arr.reduce(function(a, b){ return Math.max(a, b); })
  }
  
  // export {audio};
// const button = document.getElementById("thefile");
// button.addEventListener('click', titleAudio);


export {audio, audio_context, src, analyser, wavesurfer, chroma, maxChroma, energy, amplitudeSpectrum, bufferLength, dataArray};