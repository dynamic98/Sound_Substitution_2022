import { RectAreaLight } from 'three';
import { show_canvas } from './modules.js'
import {getPeaks, getIntervals} from './getBPM.js'

let file, audio, fileLabel, audio_context;
let realTitle = document.getElementById('title');
let analyser, wavesurfer, src, bufferLength, dataArray;
let chroma, maxChroma, energy, amplitudeSpectrum;
let AudioDifference;
let AudioCurrentTime, AudioLastTime;
let selectedMusic, selectMusicText;
let data, sampleRate;
let bpm = null;

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

// const waveSurfer = document.getElementById("waveform");
const wavesurferclick = document.querySelector("#waveform");
const musicSelect = document.getElementById("select-music");

let frameBuffer = new Map();
pitchClasses.forEach((pitch) => {
    frameBuffer.set(pitch, []);
});

AudioLastTime = 0;
AudioCurrentTime = 0;

// LOAD MUSIC (vizInit)
function FileInit() {
    // file = document.getElementById("thefile");
    audio = document.getElementById("audio");
    // fileLabel = document.querySelector("label.file");
    changeMusicSelect();
    musicSelect.onchange = function(){
        changeMusicSelect();
    };

    // audio.src = URL.createObjectURL()
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audio_context = audio_context || new AudioContext();

    console.log('audio input completed')
    document
    .querySelector('[data-action="play"]')
    .addEventListener('click', ()=>{ 
        console.log("PlayPause button pressed");
        TogglePlay();
    })

  } 


function FileChange(){
    // file.onchange = function(){
        // canvas rendering by file input
        show_canvas("canvas"); // visual-canvas
        show_canvas("demo");   // haptic-canvas
        show_canvas("music-controls") // music controller

        // fileLabel.classList.add('normal');
        // let files = this.files;
        // audio.src = URL.createObjectURL(files[0]);

        fetch(selectedMusic).then(res => res.arrayBuffer())
        .then(arrayBuffer =>{
            let OfflineAudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
            let offlineCtx = new OfflineAudioContext(2, 30*44100, 44100);
            offlineCtx.decodeAudioData(arrayBuffer, function(buffer){
                let source = offlineCtx.createBufferSource();
                source.buffer = buffer;
                let lowpass = offlineCtx.createBiquadFilter();
                lowpass.type = "lowpass";
                lowpass.frequency.value = 150;
                lowpass.Q.value = 1;

                // Run the output of the source through the low pass.

                source.connect(lowpass);

                // Now a highpass to remove the bassline.

                let highpass = offlineCtx.createBiquadFilter();
                highpass.type = "highpass";
                highpass.frequency.value = 100;
                highpass.Q.value = 1;

                // Run the output of the lowpass through the highpass.

                lowpass.connect(highpass);

                // Run the output of the highpass through our offline context.

                highpass.connect(offlineCtx.destination);

                // Start the source, and render the output into the offline conext.

                source.start(0);
                offlineCtx.startRendering();
                });

                offlineCtx.oncomplete = function(e) {
                    let buffer = e.renderedBuffer;
                    let peaks = getPeaks([buffer.getChannelData(0), buffer.getChannelData(1)]);
                    let groups = getIntervals(peaks);
          
                    let top = groups.sort(function(intA, intB) {
                      return intB.count - intA.count;
                    }).splice(0, 5);
                    bpm = Math.round(top[0].tempo);
                    console.log("tempo",Math.round(top[0].tempo), top[1].tempo);
                  };

            })

        fetch(selectedMusic).then(res => res.blob())
        .then(blob =>{
            console.log(blob);
            audio.src = URL.createObjectURL(blob);
            console.log("VizInit play");
        
            // let fileList = file.files[0].name;
            // realTitle.innerText = fileList;
            // console.log(file);
            // file.files[0].name = selectMusicText;
            audio_context.resume();
            audio.load();
            src = audio_context.createMediaElementSource(audio);
            audio.volume = 1;
            // audio.play();
            
            AnalyzerPlay(audio_context, src);
        })
}
  
function AnalyzerPlay(audio_context, src) {
    analyser = audio_context.createAnalyser();
    src.connect(analyser);
    analyser.connect(audio_context.destination);

    analyser.fftSize = Math.pow(2,13);
    data = new Float32Array(analyser.fftSize);
    sampleRate = audio_context.sampleRate;

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
            // try {
            // chroma = updateChroma(features['chroma']);
            // } catch (err){
            //     console.log(err);
            // }

            // maxChroma = chroma.indexOf(max(chroma));
            energy = features['energy']
        }
    })
    meyda_analyser.start();
}

function changeMusicSelect(){
    let selectValue = musicSelect.options[musicSelect.selectedIndex].value;
    selectMusicText = musicSelect.options[musicSelect.selectedIndex].text;
    // console.log("changeMusicSelect", selectValue, selectText);
    // selectedMusic = new File("../static/music/"+selectText);
    // selectedMusic = 'http://192.168.0.34:8080/static/music/'+selectMusicText;
    selectedMusic = 'static/music/'+selectMusicText;
    FileChange();
    console.log(selectedMusic)
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

function SyncAudio(){
    wavesurferclick.addEventListener("click", async ()=>{
        await sleep(1);
        AudioCurrentTime = wavesurfer.getCurrentTime();
        audio.currentTime = AudioCurrentTime;
})}




function TogglePlay(){
    if (audio.paused){
        audio.play();
    } else {
        audio.pause();
    }
}

window.onload = function(){
FileInit();
// FileChange();
// SyncAudio();
}
window.addEventListener("DOMContentLoaded", ()=>{
    FileChange();
    SyncAudio();
})

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



export { audio, audio_context, src, wavesurfer, analyser, chroma, maxChroma, energy, data, sampleRate, bpm};