// import { audio, audio_context, file as target} from './modules.js';
let file, audio, fileLabel, audio_context;
let realTitle = document.getElementById('title');
let analyser, wavesurfer, src, bufferLength, dataArray;
let chroma, maxChroma, energy, amplitudeSpectrum;
let AudioLastTime, AudioCurrentTime;
// let target;
export {audio, analyser, wavesurfer, chroma, maxChroma, energy, amplitudeSpectrum, bufferLength, dataArray};

// function titleAudio(){
//     // target = document.getElementById('thefile');
//     target.addEventListener('change', function(){
//         var fileList = target.files[0].name;
//         realTitle.innerText = fileList;
//     });
// }
AudioLastTime = 0;
AudioCurrentTime = 0;

// LOAD MUSIC (vizIntit)
function FileInit() {
    file = document.getElementById("thefile");
    audio = document.getElementById("audio");
    fileLabel = document.querySelector("label.file");
    audio_context = audio_context || new AudioContext();

    wavesurfer = WaveSurfer.create({
        container: document.querySelector('#waveform'),
        waveColor: '#A8DBA8',
        progressColor: '#3B8686',
        normalize: true
        });

    // document.onload = function(e){
    //   audio.play();
    //   play();
    // }
    var saveButton = document.getElementsByClassName("pcr-save");

    document
    .querySelector('[data-action="play"]')
    .addEventListener('click', ()=>{ 
        console.log("PlayPause button pressed");
        wavesurfer.playPause();
        // audio.pause();
        TogglePlay();
    })
  }

// function haptic_change(){
//     console.log("haptic_changed", audio.src);
//     wavesurfer.load(audio);
//     wavesurfer.on('ready', () => {
//         wavesurfer.play();
//         console.log("Haptic Audio Starts");
//         })
// }

function FileChange(){
    file.onchange = function(){
        fileLabel.classList.add('normal');
        var files = this.files;
        audio.src = URL.createObjectURL(files[0]);
        console.log("VizInit play");
        
        var fileList = file.files[0].name;
        realTitle.innerText = fileList;
        
        wavesurfer.load(audio);
        audio.load();
        src = src || audio_context.createMediaElementSource(audio);
        
        wavesurfer.on('ready', () => {
            console.log("wavesurfer is ready");
            audio.play();
            wavesurfer.play();
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
        maxChroma = features['chroma'].indexOf(max(features['chroma']))
        energy = features['energy']
        amplitudeSpectrum = features['amplitudeSpectrum']
        }
    })
    meyda_analyser.start();
}


function SyncAudio(){
    wavesurfer.on('audioprocess', function() {
        if(wavesurfer.isPlaying()) {
            // var totalTime = wavesurfer.getDuration(),
            AudioCurrentTime = wavesurfer.getCurrentTime();

            // console.log(AudioCurrentTime - AudioLastTime);
            var AudioDifference = AudioCurrentTime - AudioLastTime;
            if (AudioDifference > 0.006 || AudioDifference < 0){
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