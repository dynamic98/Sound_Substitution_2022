// Custom Phase (Dynamic)

const verysmallMusic = document.getElementById("verysmallMusic");
const smallMusic = document.getElementById("smallMusic");
const loudMusic = document.getElementById("loudMusic");
const veryloudMusic = document.getElementById("veryloudMusic");


let audioTitle, audioPath;
let file, audio, fileLabel, audio_context;

let analyser, wavesurfer, src, bufferLength, dataArray;
let chroma, maxChroma, energy, amplitudeSpectrum;
let AudioLastTime, AudioCurrentTime;


const red = '#FF5C5C';
const black = '#221E21';


let audio_verysmall, audio_small, audio_loud, audio_veryloud;
let audio_context_verysmall, audio_context_small, audio_context_loud, audio_context_veryloud;
let src_verysmall, src_small, src_loud, src_veryloud;


let verysmall_count = 0;
let small_count = 0;
let loud_count = 0;
let veryloud_count = 0;


// meyda analyzer 실행 함수
function AnalyzerPlay(audio_context, src) {
    console.log("dynamics meyda analyzer starts");
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
        buffersize: 64,
        featureExtractors: ["energy"],
        callback: (features) => {
            energy = features['energy'];
            energy = energy * 1000;
            console.log('energy', energy);
            
        }
    })
    meyda_analyser.start();
}


// EVENT LISTENERS
document.querySelector('#verysmallMusic').addEventListener('click', ()=>{
    verysmall_count = verysmall_count + 1;

    if (verysmall_count % 2 != 0){
        audioPath = './audio/verysmall.mp3';

        audio_verysmall = new Audio(audioPath);
        audio_context_verysmall = audio_context_verysmall || new AudioContext();
        audio_verysmall.load();
        src_verysmall = audio_context_verysmall.createMediaElementSource(audio_verysmall);
        AnalyzerPlay(audio_context_verysmall, src_verysmall);

        audio_verysmall.play();
        verysmallMusic.style.background = red;

    } else if (audio_verysmall.duration > 0 || verysmall_count % 2 == 0){
        audio_verysmall.pause();
        audio_verysmall.currentTime = 0;
        verysmallMusic.style.background = black;
    }
});



document.querySelector('#smallMusic').addEventListener('click', ()=>{
    small_count = small_count + 1;

    if (small_count % 2 != 0){
        audioPath = './audio/small.mp3';

        audio_small = new Audio(audioPath);
        audio_context_small = audio_context_small || new AudioContext();
        audio_small.load();
        src_small = audio_context_small.createMediaElementSource(audio_small);
        AnalyzerPlay(audio_context_small, src_small);

        audio_small.play();
        smallMusic.style.background = red;

    } else if (audio_small.duration > 0 || small_count % 2 == 0){
        audio_small.pause();
        audio_small.currentTime = 0;
        smallMusic.style.background = black;
    }
});



document.querySelector('#loudMusic').addEventListener('click', ()=>{
    loud_count = loud_count + 1;

    if (loud_count % 2 != 0){
        audioPath = './audio/loud.mp3';

        audio_loud = new Audio(audioPath);
        audio_context_loud = audio_context_loud || new AudioContext();
        audio_loud.load();
        src_loud = audio_context_loud.createMediaElementSource(audio_loud);
        AnalyzerPlay(audio_context_loud, src_loud);

        audio_loud.play();
        loudMusic.style.background = red;

    } else if (audio_loud.duration > 0 || loud_count % 2 == 0){
        audio_loud.pause();
        audio_loud.currentTime = 0;
        loudMusic.style.background = black;
    }
});


document.querySelector('#veryloudMusic').addEventListener('click', ()=>{
    veryloud_count = veryloud_count + 1;

    if (veryloud_count % 2 != 0){
        audioPath = './audio/veryloud.mp3';

        audio_veryloud = new Audio(audioPath);
        audio_context_veryloud = audio_context_veryloud || new AudioContext();
        audio_veryloud.load();
        src_veryloud = audio_context_veryloud.createMediaElementSource(audio_veryloud);
        AnalyzerPlay(audio_context_veryloud, src_veryloud);

        audio_veryloud.play();
        veryloudMusic.style.background = red;

    } else if (audio_veryloud.duration > 0 || veryloud_count % 2 == 0){
        audio_veryloud.pause();
        audio_veryloud.currentTime = 0;
        veryloudMusic.style.background = black;
    }
});
