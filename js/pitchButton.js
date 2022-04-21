// Explore Phase (Pitch)

const pitch_do = document.getElementById("pitch_do");
const pitch_re = document.getElementById("pitch_re");
const pitch_mi = document.getElementById("pitch_mi");
const pitch_fa = document.getElementById("pitch_fa");
const pitch_sol = document.getElementById("pitch_sol");
const pitch_la = document.getElementById("pitch_la");
const pitch_si = document.getElementById("pitch_si");

let audioTitle, audioPath;
let file, audio, fileLabel, audio_context;

let analyser, wavesurfer, src, bufferLength, dataArray;
let chroma, maxChroma, energy, amplitudeSpectrum;
let AudioLastTime, AudioCurrentTime;

let audioPlayer = document.getElementById("player");

const red = '#FF5C5C';
const black = '#221E21';


let audio_do, audio_re, audio_mi, audio_fa, audio_sol, audio_la, audio_si;
let audio_context_do, audio_context_re, audio_context_mi, audio_context_fa, audio_context_sol, audio_context_la, audio_context_si;
let src_do, src_re, src_mi, src_fa, src_sol, src_la, src_si;


let do_count = 0;
let re_count = 0;
let mi_count = 0;
let fa_count = 0;
let sol_count = 0;
let la_count = 0;
let si_count = 0;





// meyda analyzer 실행 함수
function AnalyzerPlay(audio_context, src) {
    console.log("AnalyzerPlay starts");
    analyser = audio_context.createAnalyser();
    src.connect(analyser);
    analyser.connect(audio_context.destination);
    analyser.fftSize = 512;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    // meyda analyser
    chroma = 0;
    // maxChroma = 0;
    energy = 0;
    amplitudeSpectrum = 0;

    const meyda_analyser = Meyda.createMeydaAnalyzer({
        audioContext: audio_context,
        source: src,
        buffersize: 64,
        featureExtractors: ["energy", "chroma", "amplitudeSpectrum"],
        callback: (features) => {
            chroma = Array.from(features['chroma']);
            energy = features['energy'];
            amplitudeSpectrum = features['amplitudeSpectrum'];  

            console.log('pitch', chroma);
        }
    })
    meyda_analyser.start();
}







// EVENT LISTENERS

document.querySelector('#pitch_do').addEventListener('click', ()=>{
    do_count = do_count + 1;
    if (do_count % 2 != 0){
        audioPath = './pitch_audio/pitch_do.mp3'

        audio_do = new Audio(audioPath);
        audio_context_do = audio_context_do || new AudioContext();
        audio_do.load();
        src_do = audio_context_do.createMediaElementSource(audio_do);
        AnalyzerPlay(audio_context_do, src_do);
        maxChroma = 0;
        audio_do.play();
        pitch_do.style.background = red;

    } else if (audio_do.duration > 0 || do_count % 2 == 0){
        audio_do.pause();
        audio_do.currentTime = 0;
        pitch_do.style.background = black;
    }
});



document.querySelector('#pitch_re').addEventListener('click', ()=>{
    re_count = re_count + 1;

    if (re_count % 2 != 0){
        audioPath = './pitch_audio/pitch_re.mp3'

        audio_re = new Audio(audioPath);
        audio_context_re = audio_context_re || new AudioContext();
        audio_re.load();
        src_re = audio_context_re.createMediaElementSource(audio_re);
        AnalyzerPlay(audio_context_re, src_re);
        maxChroma = 2;

        audio_re.play();
        pitch_re.style.background = red;

    } else if (audio_re.duration > 0 || re_count % 2 == 0) {
        audio_re.pause();
        audio_re.currentTime = 0;
        pitch_re.style.background = black;
    }

});



document.querySelector('#pitch_mi').addEventListener('click', ()=>{
    mi_count = mi_count + 1;

    if (mi_count % 2 != 0){
        audioPath = './pitch_audio/pitch_mi.mp3'

        audio_mi = new Audio(audioPath);
        audio_context_mi = audio_context_mi || new AudioContext();
        audio_mi.load();
        src_mi = audio_context_mi.createMediaElementSource(audio_mi);
        AnalyzerPlay(audio_context_mi, src_mi);
        maxChroma = 4;

        audio_mi.play();
        pitch_mi.style.background = red;

    } else if (audio_mi.duration > 0 || mi_count % 2 == 0) {
        audio_mi.pause();
        audio_mi.currentTime = 0;
        pitch_mi.style.background = black;
    }

});



document.querySelector('#pitch_fa').addEventListener('click', ()=>{
    fa_count = fa_count + 1;

    if (fa_count % 2 != 0){
        audioPath = './pitch_audio/pitch_fa.mp3'

        audio_fa = new Audio(audioPath);
        audio_context_fa = audio_context_fa || new AudioContext();
        audio_fa.load();
        src_fa = audio_context_fa.createMediaElementSource(audio_fa);
        AnalyzerPlay(audio_context_fa, src_fa);
        maxChroma = 5;

        audio_fa.play();
        pitch_fa.style.background = red;

    } else if (audio_fa.duration > 0 || fa_count % 2 == 0) {
        audio_fa.pause();
        audio_fa.currentTime = 0;
        pitch_fa.style.background = black;
    }

});



document.querySelector('#pitch_sol').addEventListener('click', ()=>{
    sol_count = sol_count + 1;

    if (sol_count % 2 != 0){
        audioPath = './pitch_audio/pitch_sol.mp3'

        audio_sol = new Audio(audioPath);
        audio_context_sol = audio_context_sol || new AudioContext();
        audio_sol.load();
        src_sol = audio_context_sol.createMediaElementSource(audio_sol);
        AnalyzerPlay(audio_context_sol, src_sol);
        maxChroma = 7;

        audio_sol.play();
        pitch_sol.style.background = red;

    } else if (audio_sol.duration > 0 || sol_count % 2 == 0) {
        audio_sol.pause();
        audio_sol.currentTime = 0;
        pitch_sol.style.background = black;
    }

});



document.querySelector('#pitch_la').addEventListener('click', ()=>{
    la_count = la_count + 1;

    if (la_count % 2 != 0){
        audioPath = './pitch_audio/pitch_la.mp3'

        audio_la = new Audio(audioPath);
        audio_context_la = audio_context_la || new AudioContext();
        audio_la.load();
        src_la = audio_context_la.createMediaElementSource(audio_la);
        AnalyzerPlay(audio_context_la, src_la);
        maxChroma = 9;

        audio_la.play();
        pitch_la.style.background = red;

    } else if (audio_la.duration > 0 || la_count % 2 == 0) {
        audio_la.pause();
        audio_la.currentTime = 0;
        pitch_la.style.background = black;
    }

});



document.querySelector('#pitch_si').addEventListener('click', ()=>{
    si_count = si_count + 1;

    if (si_count % 2 != 0){
        audioPath = './pitch_audio/pitch_si.mp3'

        audio_si = new Audio(audioPath);
        audio_context_si = audio_context_si || new AudioContext();
        audio_si.load();
        src_si = audio_context_si.createMediaElementSource(audio_si);
        AnalyzerPlay(audio_context_si, src_si);
        maxChroma = 11;

        audio_si.play();
        pitch_si.style.background = red;

    } else if (audio_si.duration > 0 || si_count % 2 == 0) {
        audio_si.pause();
        audio_si.currentTime = 0;
        pitch_si.style.background = black;
    }

});



export { audio_do, audio_re, audio_mi, audio_fa, audio_sol, audio_la, audio_si, 
    analyser, chroma, maxChroma, energy, amplitudeSpectrum, bufferLength, dataArray };