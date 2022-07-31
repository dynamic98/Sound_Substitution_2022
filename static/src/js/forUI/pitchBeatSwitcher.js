export function pitchBeatSwitcher() {
    let mode_pitchbeat = "pitch"

    let pitch_type = document.getElementById('pitchButton')
    let beat_type = document.getElementById('beatButton')
    let piano_container = document.getElementsByClassName("set")
    let drum_container = document.getElementsByClassName("set2")
    let pitch_area = document.getElementById('pitch_area')
    let beat_area = document.getElementById('beat_area')

    let circle_button = document.getElementById('btn-circle')
    let square_button=document.getElementById('btn-squre')
    let triangle_button=document.getElementById('btn-triangle')
    let star_button =document.getElementById('btn-star')
    let decagon_button =document.getElementById('btn-decagon')


    pitch_type.onclick = function (e) {
        // console.log("pitch mode")
        mode_pitchbeat = "pitch"
        console.log('pitch mode is ON')
        piano_container[0].style.display = ''
        drum_container[0].style.display = 'none'
        pitch_area.style.display = ''
        beat_area.style.display = 'none'

    }
    beat_type.onclick = function (e) {
        // console.log("beat mode")
        mode_pitchbeat = "beat"
        onsole.log('beat mode is ON')
        piano_container[0].style.display = 'none'
        drum_container[0].style.display = ''
        pitch_area.style.display = 'none'
        beat_area.style.display = ''
    }

    let drum = document.getElementById("drum")
    drum.onclick = function (e) {
        let drum_audio = document.getElementById("drum_audio")
        drum_audio.play()
    }

}