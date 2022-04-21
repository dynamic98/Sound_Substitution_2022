// Explore Phase (Pitch)

const pitch_do = document.getElementById("pitch_do");
const pitch_re = document.getElementById("pitch_re");
const pitch_mi = document.getElementById("pitch_mi");
const pitch_fa = document.getElementById("pitch_fa");
const pitch_sol = document.getElementById("pitch_sol");
const pitch_la = document.getElementById("pitch_la");
const pitch_si = document.getElementById("pitch_si");

let audioTitle
let file, audio, fileLabel, audio_context;

let analyser, wavesurfer, src, bufferLength, dataArray;
let chroma, maxChroma, energy, amplitudeSpectrum;
let AudioLastTime, AudioCurrentTime;

let audioPlayer = document.getElementById("player");
let clickCount = 0;
let isPlaying = false;



function FileInit(pitchButton) {
    let pitch = String(pitchButton.id);
    let audioPath = `./pitch_audio/${pitch}.mp3`


    audio = new Audio(audioPath);
    audio_context = audio_context || new AudioContext();
    audio.load();
    readyWavesurfer(pitchButton);
    eventListenPitch(pitchButton);

    document
    .querySelector(`#${pitch}`)
    .addEventListener('click', ()=>{

        if (audio.paused){
            audio.play();
            wavesurfer.play();
        } else {
            audio.pause();
            wavesurfer.pause();
        }
    })
};
;




// 버튼 색상 변경해주는 함수
function eventListenPitch(pitchButton){
    pitchButton.addEventListener("click", ()=>{
        clickCount = clickCount + 1

        if (clickCount % 2 != 0){
            pitchButton.style.background = '#FF5C5C';
        } else {
            pitchButton.style.background = '#221E21';
        }
    });
}

// meyda analyzer 실행 함수
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

    const meyda_analyser = Meyda.createMeydaAnalyzer({
        audioContext: audio_context,
        source: src,
        buffersize: 64,
        featureExtractors: ["energy", "chroma", "amplitudeSpectrum"],
        callback: (features) => {
            chroma = Array.from(features['chroma']);
            // maxChroma = chroma.indexOf(max(chroma));
            energy = features['energy'];
            amplitudeSpectrum = features['amplitudeSpectrum'];

            console.log('전체', typeof chroma);
            // console.log(Array.from(chroma));
            // console.log('최댓값', maxChroma);
        }
    })
    meyda_analyser.start();
}


// wavesurfer 가져오는 함수
function readyWavesurfer(pitchButton){
    wavesurfer = WaveSurfer.create({
        container: document.querySelector('#waveform'),
        waveColor: '#A8DBA8',
        progressColor: '#3B8686',
        cursorWidth : 5,
        normalize: true,
        });

    let pitch = String(pitchButton.id);
    let audioPath = `./pitch_audio/${pitch}.mp3` // 함수화 시키기위해 문자열 포매팅
    audio = new Audio(audioPath);
    wavesurfer.load(audio);
    // audio.load();
    src = audio_context.createMediaElementSource(audio);

    wavesurfer.on('ready', () => {
        console.log("wavesurfer is ready");
        audio.volume = 0.2;
    })

    AnalyzerPlay(src);
}


// 여기에서 싱크가 잘 안맞는듯?
function SyncAudio(){
    wavesurfer.on('audioprocess', function() {
        if(wavesurfer.isPlaying()) {
            AudioCurrentTime = wavesurfer.getCurrentTime();

            console.log('sync before', AudioCurrentTime - AudioLastTime);
            let AudioDifference = AudioCurrentTime - AudioLastTime;
            if (AudioDifference > 0.005 || AudioDifference < 0){
                audio.currentTime = AudioCurrentTime;
                console.log('sync after', AudioCurrentTime - AudioLastTime);
            }
            AudioLastTime = AudioCurrentTime;
        }
    })
}



FileInit(pitch_do);
FileInit(pitch_re);
FileInit(pitch_mi);
// SyncAudio();