import detect from 'bpm-detective'

const AudioContext = window.AudioContext || window.webkitAudioContext
const context = new AudioContext()

// Fetch some audio file
fetch('some/audio/file.wav').then(async function (response) {
  // Get response as ArrayBuffer
  const buffer = await response.arrayBuffer()

  // Decode audio into an AudioBuffer
  const data = await new Promise(function (resolve, reject) {
    context.decodeAudioData(buffer, resolve, reject)
  });

  // Run detection
  const bpm = detect(data)
  alert(`Detected BPM: ${bpm}`)
}).catch(console.error)