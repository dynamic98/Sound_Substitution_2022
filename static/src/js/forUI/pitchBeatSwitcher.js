export function pitchBeatSwitcher() {
    let mode_pitchbeat = "pitch"

    let pitch_type = document.getElementById('pitchButton')
    let beat_type = document.getElementById('beatButton')
    let piano_container = document.getElementsByClassName("set")
    let drum_container = document.getElementsByClassName("set2")
    let picker_beat = document.getElementById('picker_beat')
    let picker_satu = document.getElementById("picker_satu")
    let picker_light = document.getElementById("picker_light")
    let palettes = document.getElementsByClassName('Palette')

    pitch_type.onclick = function (e) {
        // console.log("pitch mode")
        mode_pitchbeat = "pitch"
        piano_container[0].style.display = ''
        drum_container[0].style.display = 'none'
        picker_satu.style.display = ''
        picker_light.style.display = ''
        picker_beat.style.display = 'none'
        for (let i = 0; i < 8; i++) {
            palettes[i].style.display = ''
        }
    }
    beat_type.onclick = function (e) {
        // console.log("beat mode")
        mode_pitchbeat = "beat"
        piano_container[0].style.display = 'none'
        drum_container[0].style.display = ''
        picker_satu.style.display = 'none'
        picker_light.style.display = 'none'
        picker_beat.style.display = ''
        for (let i = 0; i < 8; i++) {
            palettes[i].style.display = 'none'
        }

    }

    let drum = document.getElementById("drum")
    drum.onclick = function (e) {
        let drum_audio = document.getElementById("drum_audio")
        drum_audio.play()
    }

}