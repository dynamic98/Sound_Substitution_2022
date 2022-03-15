'use strict';

// Create an instance
var wavesurfer;

// Init & load audio file
document.addEventListener('DOMContentLoaded', function() {
    // Init
    wavesurfer = WaveSurfer.create({
        container: document.querySelector('#waveform'),
        waveColor: '#A8DBA8',
        progressColor: '#3B8686',
        normalize: true
    });

    // Load audio from URL
    wavesurfer.load('./assets/beat.mp3');

    // Equalizer
    wavesurfer.on('ready', function() {
        let EQ = [
            {
                f: 32,
                type: 'lowshelf'
            },
            {
                f: 64,
                type: 'peaking'
            },
            {
                f: 125,
                type: 'peaking'
            },
            {
                f: 250,
                type: 'peaking'
            },
            {
                f: 500,
                type: 'peaking'
            },
            {
                f: 1000,
                type: 'peaking'
            },
            {
                f: 2000,
                type: 'peaking'
            },
            {
                f: 4000,
                type: 'peaking'
            },
            {
                f: 8000,
                type: 'peaking'
            },
            {
                f: 16000,
                type: 'highshelf'
            }
        ];

        // Create filters
        let filters = EQ.map(function(band) {
            let filter = wavesurfer.backend.ac.createBiquadFilter();
            filter.type = band.type;
            filter.gain.value = 0;
            filter.Q.value = 1;
            filter.frequency.value = band.f;
            return filter;
        });

        // Connect filters to wavesurfer
        wavesurfer.backend.setFilters(filters);

        // For debugging
        wavesurfer.filters = filters;
    });

    // Log errors
    wavesurfer.on('error', function(msg) {
        console.log(msg);
    });

    // Bind play/pause button
    document
        .querySelector('[data-action="play"]')
        .addEventListener('click', wavesurfer.playPause.bind(wavesurfer));
    
    document
    .querySelector('[data-action="peaks"]')
    .addEventListener('click', function() {
        // load peaks from JSON file. See https://wavesurfer-js.org/faq/
        // for instructions on how to generate peaks
            console.log('loaded peaks!');
            console.log(wavesurfer.backend.mergedPeaks);

            // load peaks into wavesurfer.js
            // wavesurfer.load('./assets/beat.mp3', [1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1]);
            // wavesurfer.load('./assets/beat.mp3', wavesurfer.backend.mergedPeaks);
            wavesurfer.backend.setPeaks([1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1]);
            // wavesurfer.backend.setPeaks(wavesurfer.backend.mergedPeaks);
            wavesurfer.drawBuffer();
            // document.body.scrollTop = 0;
        });

    document
    .querySelector('[data-action="lowfilter"]')
    .addEventListener('click', function() {
        // load peaks from JSON file. See https://wavesurfer-js.org/faq/
        // for instructions on how to generate peaks
        // TODO: Change it to bandpass filter
            var lowwpass = wavesurfer.backend.ac.createBiquadFilter();
            console.log('lowpass-filter');
            lowwpass.frequency.value = 150;
            console.log(lowwpass);
            console.log(wavesurfer.backend.buffer);
            wavesurfer.backend.setFilter(lowwpass);
            console.log(wavesurfer.backend.buffer);
        });

    document
    .querySelector('[data-action="test"]')
    .addEventListener('click', function() {
            console.log(wavesurfer.backend.data);
    });
    // Progress bar
    (function() {
        const progressDiv = document.querySelector('#progress-bar');
        const progressBar = progressDiv.querySelector('.progress-bar');

        let showProgress = function(percent) {
            progressDiv.style.display = 'block';
            progressBar.style.width = percent + '%';
        };

        let hideProgress = function() {
            progressDiv.style.display = 'none';
        };

        wavesurfer.on('loading', showProgress);
        wavesurfer.on('ready', hideProgress);
        wavesurfer.on('destroy', hideProgress);
        wavesurfer.on('error', hideProgress);
    })();
});