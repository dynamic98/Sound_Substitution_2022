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
// let AudioLastTime, AudioCurrentTime;

let LastAudio = '';
let CurrentAudio = '';

let PitchORDynamic = 'pitch' 

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



// Custom Phase (Dynamic)

const verysmallMusic = document.getElementById("verysmallMusic");
const smallMusic = document.getElementById("smallMusic");
const loudMusic = document.getElementById("loudMusic");
const veryloudMusic = document.getElementById("veryloudMusic");


let audio_verysmall, audio_small, audio_loud, audio_veryloud;
let audio_context_verysmall, audio_context_small, audio_context_loud, audio_context_veryloud;
let src_verysmall, src_small, src_loud, src_veryloud;


let verysmall_count = 0;
let small_count = 0;
let loud_count = 0;
let veryloud_count = 0;






// meyda analyzer 실행 함수
function AnalyzerPlay(audio_context, src) {
    console.log("pitch meyda analyzer starts");
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
        featureExtractors: ["chroma"],
        callback: (features) => {
            chroma = Array.from(features['chroma']);
            amplitudeSpectrum = features['amplitudeSpectrum'];  
            if(PitchORDynamic=='dynamic'){
                maxChroma = 5;
                energy = features['energy']*0.4;
                
            } else if (PitchORDynamic=='pitch'){
                energy = 0.4;
            }
            console.log('max pitch', maxChroma);
            
        }
    })
    meyda_analyser.start();
}


function LastPause(LastAudio){
    console.log(LastAudio);
    if (LastAudio != ''){
    let AudioList = [audio_do, audio_re, audio_mi, audio_fa, audio_sol, audio_la, audio_si, audio_verysmall, audio_small, audio_loud, audio_veryloud];
    let PitchList = ['do', 're', 'mi', 'fa', 'sol', 'la', 'si', 'verysmall', 'small', 'loud', 'veryloud']
    let ButtonList = [pitch_do, pitch_re, pitch_mi, pitch_fa, pitch_sol, pitch_la, pitch_si, verysmallMusic, smallMusic, loudMusic, veryloudMusic];
    AudioList[PitchList.indexOf(LastAudio)].pause();
    ButtonList[PitchList.indexOf(LastAudio)].style.background = black;
    };
}




// EVENT LISTENERS
document.querySelector('#pitch_do').addEventListener('click', ()=>{
    PitchORDynamic = 'pitch';
    CurrentAudio = 'do';
    if (CurrentAudio!=LastAudio){
        LastPause(LastAudio);
        do_count = 0;
    };
    LastAudio = CurrentAudio;

    do_count = do_count + 1;
    if (do_count % 2 != 0){
        audioPath = './audio/pitch_do.mp3'

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
    PitchORDynamic = 'pitch';
    CurrentAudio = 're';
    if (CurrentAudio!=LastAudio){
        LastPause(LastAudio);
        re_count = 0;
    };
    LastAudio = CurrentAudio;
    re_count = re_count + 1;

    if (re_count % 2 != 0){
        audioPath = './audio/pitch_re.mp3'

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
    PitchORDynamic = 'pitch';
    CurrentAudio = 'mi';
    if (CurrentAudio!=LastAudio){
        LastPause(LastAudio);
        mi_count = 0;
    };
    LastAudio = CurrentAudio;
    mi_count = mi_count + 1;

    if (mi_count % 2 != 0){
        audioPath = './audio/pitch_mi.mp3'

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
    PitchORDynamic = 'pitch';
    CurrentAudio = 'fa';
    if (CurrentAudio!=LastAudio){
        LastPause(LastAudio);
        fa_count = 0;
    };
    LastAudio = CurrentAudio;
    fa_count = fa_count + 1;

    if (fa_count % 2 != 0){
        audioPath = './audio/pitch_fa.mp3';

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
    PitchORDynamic = 'pitch';
    CurrentAudio = 'sol';
    if (CurrentAudio!=LastAudio){
        LastPause(LastAudio);
        sol_count = 0;
    };
    LastAudio = CurrentAudio;
    sol_count = sol_count + 1;

    if (sol_count % 2 != 0){
        audioPath = './audio/pitch_sol.mp3'

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
    PitchORDynamic = 'pitch';
    CurrentAudio = 'la';
    if (CurrentAudio!=LastAudio){
        LastPause(LastAudio);
        la_count = 0;
    };
    LastAudio = CurrentAudio;
    la_count = la_count + 1;

    if (la_count % 2 != 0){
        audioPath = './audio/pitch_la.mp3'

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
    PitchORDynamic = 'pitch';
    CurrentAudio = 'si';
    if (CurrentAudio!=LastAudio){
        LastPause(LastAudio);
        si_count = 0;
    };
    LastAudio = CurrentAudio;
    si_count = si_count + 1;

    if (si_count % 2 != 0){
        audioPath = './audio/pitch_si.mp3'

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

// EVENT LISTENERS
document.querySelector('#verysmallMusic').addEventListener('click', ()=>{
    PitchORDynamic = 'dynamic';
    CurrentAudio = 'verysmall';
    if (CurrentAudio!=LastAudio){
        LastPause(LastAudio);
        verysmall_count = 0;
    };
    LastAudio = CurrentAudio;

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
    PitchORDynamic = 'dynamic';
    CurrentAudio = 'small';
    if (CurrentAudio!=LastAudio){
        LastPause(LastAudio);
        small_count = 0;
    };
    LastAudio = CurrentAudio;
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
    PitchORDynamic = 'dynamic';
    CurrentAudio = 'loud';
    if (CurrentAudio!=LastAudio){
        LastPause(LastAudio);
        loud_count = 0;
    };
    LastAudio = CurrentAudio;
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
    PitchORDynamic = 'dynamic';
    CurrentAudio = 'veryloud';
    if (CurrentAudio!=LastAudio){
        LastPause(LastAudio);
        veryloud_count = 0;
    };
    LastAudio = CurrentAudio;
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


export { analyser, maxChroma, energy, bufferLength, dataArray, PitchORDynamic };