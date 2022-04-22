// import { audio, audio_context, file as target} from './modules.js';
import { show_canvas } from './modules.js'
let file, audio, fileLabel, audio_context;
let realTitle = document.getElementById('title');
let analyser, wavesurfer, src, bufferLength, dataArray;
let chroma, maxChroma, energy, amplitudeSpectrum;
let AudioLastTime, AudioCurrentTime;
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

AudioLastTime = 0;
AudioCurrentTime = 0;

// LOAD MUSIC (vizInit)
function FileInit() {
    file = document.getElementById("thefile");
    audio = document.getElementById("audio");
    fileLabel = document.querySelector("label.file");
    audio_context = audio_context || new AudioContext();

    wavesurfer = WaveSurfer.create({
        container: document.querySelector('#waveform'),
        waveColor: '#A8DBA8',
        progressColor: '#3B8686',
        // fillParent: false,
        // minPxPerSec: 6,
        cursorWidth : 5,
        normalize: true,

        // pixelRatio: 1,
        // scrollParent: true,
        // minimap: true,
        // backend: 'MediaElement',
        // plugins: [
        //     WaveSurfer.minimap.create({
        //         height: 30,
        //         waveColor: '#ddd',
        //         progressColor: '#999',
        //         cursorColor: '#999'
        //     })
        // ]
        });

    var saveButton = document.getElementsByClassName("pcr-save");
    console.log('audio input completed')
    document
    .querySelector('[data-action="play"]')
    .addEventListener('click', ()=>{ 
        console.log("PlayPause button pressed");
        wavesurfer.playPause();
        // audio.pause();
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
        var files = this.files;
        audio.src = URL.createObjectURL(files[0]);
        console.log("VizInit play");
        
        var fileList = file.files[0].name;
        realTitle.innerText = fileList;
        
        wavesurfer.load(audio);
        audio.load();
        // src = src || audio_context.createMediaElementSource(audio);
        src = audio_context.createMediaElementSource(audio);
        
        wavesurfer.on('ready', () => {
            console.log("wavesurfer is ready");
            audio.play();
            wavesurfer.play();
            // wavesurfer.setMute(true);
            audio.volume = 0.2;
        })

        AnalyzerPlay(src);
        }
}
  
function AnalyzerPlay(src) {
    console.log("AnalyzerPlay starts");
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
    // var powerSpectrum = 0;

    const meyda_analyser = Meyda.createMeydaAnalyzer({
        audioContext: audio_context,
        source: src,
        buffersize: 64,
        featureExtractors: ["energy", "chroma", "amplitudeSpectrum"],
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
            amplitudeSpectrum = features['amplitudeSpectrum']
        }
    })
    meyda_analyser.start();
}

function updateChroma(pitchValues){
    let result = [];
    pitchValues.forEach((value, index) => {
        // console.log(value);
        let currentPitch = pitchClasses[index];
        // console.log(frameBuffer);
        let currentPitchBuffer = frameBuffer.get(currentPitch);
        // console.log(typeof currentPitchBuffer);
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


function SyncAudio(){
    wavesurfer.on('audioprocess', function() {
        if(wavesurfer.isPlaying()) {
            // var totalTime = wavesurfer.getDuration(),
            AudioCurrentTime = wavesurfer.getCurrentTime();

            // console.log(AudioCurrentTime - AudioLastTime);
            var AudioDifference = AudioCurrentTime - AudioLastTime;
            if (AudioDifference > 0.01 || AudioDifference < 0){
                audio.currentTime = AudioCurrentTime;
                // console.log(AudioCurrentTime - AudioLastTime);
            }
            AudioLastTime = AudioCurrentTime;
        }
    })
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
SyncAudio();


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


export {audio, analyser, wavesurfer, chroma, maxChroma, energy, amplitudeSpectrum, bufferLength, dataArray};