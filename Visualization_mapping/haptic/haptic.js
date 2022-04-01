'use strict';

import {audio_context, audio, file, fileLabel, src} from '../../script/main.js';
export {haptic_change};

// Create an instance
var wavesurfer;
var ch0_data;
var ch1_data;
var audio_buffer;
// var file;

// console.log("init_audio", audio);


// console.log("hahaha");
function init(){
    console.log('Haptic_code is Initiated');
    wavesurfer = WaveSurfer.create({
    container: document.querySelector('#waveform'),
    waveColor: '#A8DBA8',
    progressColor: '#3B8686',
    normalize: true
    });
}
init();


function haptic_change(){
    console.log("haptic_changed", audio.src);
    wavesurfer.load(audio);
    console.log(wavesurfer);
}



// // Init & load audio file
// document.addEventListener('DOMContentLoaded', function() {
//     // Init
//     wavesurfer = WaveSurfer.create({
//         container: document.querySelector('#waveform'),
//         waveColor: '#A8DBA8',
//         progressColor: '#3B8686',
//         normalize: true
//     });

//     // Load audio from URL
//     wavesurfer.load('../../sampleMP3/John Splithoff - Fahrenheit.mp3');

//     // Log errors
//     wavesurfer.on('error', function(msg) {
//         console.log(msg);
//     });

//     // Bind play/pause button
//     document
//         .querySelector('[data-action="play"]')
//         .addEventListener('click', wavesurfer.playPause.bind(wavesurfer));

//     // document
//     // .querySelector('[data-action="lowfilter"]')
//     // .addEventListener('click', function() {
//     //     // load peaks from JSON file. See https://wavesurfer-js.org/faq/
//     //     // for instructions on how to generate peaks
//     //     // TODO: Change it to bandpass filter
//     //         var lowwpass = wavesurfer.backend.ac.createBiquadFilter();
//     //         console.log('lowpass-filter');
//     //         lowwpass.frequency.value = 100;
//     //         console.log(lowwpass);
//     //         console.log(wavesurfer.backend.buffer);
//     //         wavesurfer.backend.setFilter(lowwpass);
//     //         console.log(wavesurfer.backend.buffer);
//     //     });

//     document
//     .querySelector('[data-action="test"]')
//     .addEventListener('click', function() {
//         console.log(wavesurfer.getDuration());
//         console.log(wavesurfer.backend.buffer.sampleRate);
//         console.log(wavesurfer.backend.buffer.length);
//         console.log(wavesurfer.backend.buffer.numberOfChannels);
//         // console.log(wavesurfer.backend.mergedPeaks);
        
//         ch0_data = wavesurfer.backend.buffer.getChannelData(0);
//         ch1_data = wavesurfer.backend.buffer.getChannelData(1);
//         // vocal, drum, guit, bass, inst
//         wavesurfer.load('./assets/bass.mp3');

//         // wavesurfer.backend.buffer.copyToChannel(ch0_data, 0);
//         // wavesurfer.backend.buffer.copyToChannel(ch1_data, 1);
        
//         // wavesurfer.loadDecodedBuffer(wavesurfer.backend.buffer);
//     });

//     document
//     .querySelector('[data-action="test2"]')
//     .addEventListener('click', function() {
//         console.log(wavesurfer.getDuration());
//         console.log(wavesurfer.backend.buffer.sampleRate);
//         console.log(wavesurfer.backend.buffer.length);
//         console.log(wavesurfer.backend.buffer.numberOfChannels);

//         ch0_data = wavesurfer.backend.buffer.getChannelData(0);
//         ch1_data = wavesurfer.backend.buffer.getChannelData(1);

//         const hz = 100;
//         const volume = 1.0;
//         const sineWaveArray = new Float32Array(wavesurfer.backend.buffer.length);
//         var i;
//         var sampleTime;

//         for (i = 0; i < sineWaveArray.length; i++) {
//             sampleTime = i / wavesurfer.backend.buffer.sampleRate;
//             // sineWaveArray[i] = Math.sin(Math.asin(ch0_data[i])* hz) * volume;
//             // sineWaveArray[i] = Math.sin(Math.asin(ch0_data[i])* Math.PI * 2) * volume;
//             sineWaveArray[i] = Math.sin(sampleTime * Math.PI * 2 * hz) * volume;
//         }
        
//         const ch0_haptic = new Float32Array(wavesurfer.backend.buffer.length);
//         const ch1_haptic = new Float32Array(wavesurfer.backend.buffer.length);

//         for (i = 0; i < sineWaveArray.length; i++) {
//             ch0_haptic[i] = sineWaveArray[i]*Math.abs(ch0_data[i]);
//             ch1_haptic[i] = sineWaveArray[i]*Math.abs(ch1_data[i]);
//             // ch0_haptic[i] = sineWaveArray[i];
//             // ch1_haptic[i] = sineWaveArray[i];
//         }
//         console.log(ch1_haptic)
//         wavesurfer.backend.buffer.copyToChannel(ch0_haptic, 0);
//         wavesurfer.backend.buffer.copyToChannel(ch1_haptic, 1);
        
//         wavesurfer.loadDecodedBuffer(wavesurfer.backend.buffer);

//         // console.log(wavesurfer.backend.data);
//         // wavesurfer.load(osc)
//     });

//     // Progress bar
//     (function() {
//         const progressDiv = document.querySelector('#progress-bar');
//         const progressBar = progressDiv.querySelector('.progress-bar');

//         let showProgress = function(percent) {
//             progressDiv.style.display = 'block';
//             progressBar.style.width = percent + '%';
//         };

//         let hideProgress = function() {
//             progressDiv.style.display = 'none';
//         };

//         wavesurfer.on('loading', showProgress);
//         wavesurfer.on('ready', hideProgress);
//         wavesurfer.on('destroy', hideProgress);
//         wavesurfer.on('error', hideProgress);
//     })();
// });