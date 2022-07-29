import {
    Visualization
} from './Viz/Visualization.js'
import {
    Kandinsky
} from './Utility/Kandinsky.js'
import {
    BPMTimer
} from './Utility/BPMTimer.js'
import {
    Switcher
} from './Utility/Switcher.js'
import {
    ButtonCustomization
} from './Customization/ButtonCustomization.js'
import {
    SlideCustomization
} from './Customization/SlideCustomization.js'
import {
    Piano
} from './Customization/Piano.js'
import {
    Drum
} from './Customization/Drum.js'

import {
    MusicSheet
} from './forUI/MusicSheet.js'
import {
    pitchBeatSwitcher
}
from './forUI/pitchBeatSwitcher.js'
import {
    ColorPicker
}
from './forUI/ColorPicker.js'

import {
    FiniteStateMachine
} from './Utility/FiniteStateMachine.js'



pitchBeatSwitcher()

let geometryButtons = new ButtonCustomization("shapeContainer", "btn btn-primary", "btn-")
let textureButtons = new ButtonCustomization("shapeContainer", "textureButton")
let pitchslide = new SlideCustomization("visualContainer_pitch", "customMenu", "range")

let kandinsky;
let bpmTimer = new BPMTimer();
let stats = new Stats();
let switcher = new Switcher();

let MusicLength = 50;
let musicSheet = new MusicSheet(MusicLength);

let bloom_length = 1
let visualization = new Visualization(bloom_length);

let piano = new Piano("pianoContainer");
let drum = new Drum("drum")
let mode_pitchbeat="pitch"

let MyColorPicker = new ColorPicker();

let pitch_type = document.getElementById('pitchButton')
let beat_type=document.getElementById('beatButton')
let piano_container=document.getElementsByClassName("set")
let drum_container=document.getElementsByClassName("set2")
let pitch_area=document.getElementById('pitch_area')
let beat_area=document.getElementById('beat_area')
let reset=document.getElementById('reset')


pitch_type.onclick=function(e){
    // console.log("pitch mode")
    mode_pitchbeat="pitch"
    piano_container[0].style.display=''
    drum_container[0].style.display='none'
    pitch_area.style.display=''
    beat_area.style.display='none'

}
beat_type.onclick=function(e){
    // console.log("beat mode")
    mode_pitchbeat="beat"
    piano_container[0].style.display='none'
    drum_container[0].style.display=''
    pitch_area.style.display='none'
    beat_area.style.display=''
}

// let drum=document.getElementById("drum")
// drum.onclick=function(e){
//     let drum_audio=document.getElementById("drum_audio")
//     drum_audio.play()
// }

const checkbox = document.getElementById('pitch-checkbox')
checkbox.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
        console.log("checked")
      } else {
        console.log("not checked")
      }
})

let MeshAmount=20, NoteInterval;
let counter = 0
document.body.appendChild(stats.dom);
let pitch_palette_num = null;
let pitch_palette_set = null;
let beat_color = null
main()

function main() {
    bpmTimer.setBPM(20)
    bpmTimer.setBPMByMeshCount(MeshAmount)
    kandinsky = new Kandinsky(bpmTimer.getBPM(), 1);
    piano.setNoteDuration(300);
    // visualization.createProgressBar(5, "#0000FF", 0.4)

    //event handler
    //---------------------------------------------------------------
    $("input[class=checkbox]").change(() => {
        visualization.setConnectionLineVisibility($(".checkbox")[0].checked)
    })
    geometryButtons.assignEventHandler("click", visualization.setGeometryType)
    textureButtons.assignEventHandler("click", visualization.setTexture)
    pitchslide.assignEventHandler("click", (para, value) => {
        if (para == "slide-pitch-interval") {
            kandinsky.setRange(value)
        } else if (para == "slide-pitch-size") {
            piano.setCurrentEnergy(value)
        }
    })

    piano.assignEventOnPianoRow("mousedown", draw_piano, musicSheet.setPitchArray, 1, 3)
    piano.assignEventOnPianoRow("mousedown", draw_piano, musicSheet.setPitchArray, 2, 4)
    piano.assignEventOnPianoRow("mousedown", draw_piano, musicSheet.setPitchArray, 3, 5)
    drum.assignEventOnDrum("mousedown", draw_drum, musicSheet.setBeatArray)
    MyColorPicker.PitchOnclickListener(set_pitch_palette);
    MyColorPicker.BeatOnclickListener(set_beat_color)
    NoteInterval = 230/MeshAmount;

    reset.addEventListener("click", ()=>{
        visualization.reset();
        counter=0;
    })

    update();
}


function update() {
    stats.begin()
    requestAnimationFrame(update);

    if (counter>MeshAmount) {
        visualization.reset();
        counter = 0
    } 
    visualization.render();
    visualization.update();
    stats.end();
}


//callback for each Instrument 
//drum class must have the same getPitch Energy, getPitchWidth and getPitchHeight Functions. 
function draw_piano(pitch, energy, midi) {
    let pitchAndEnergy = switcher.getPitchAndEnergy(pitch, energy, midi);
    kandinsky.calculate(pitchAndEnergy);
    visualization.createVisualAbsNote("piano", kandinsky.getPitchEnergy(), NoteInterval*counter, kandinsky.getPitchHeight())
    visualization.createConnectionLine("piano")
    counter++
}
function draw_drum(pitch, energy, midi) {
    let pitchAndEnergy = switcher.getPitchAndEnergy(pitch, energy, midi);
    kandinsky.calculate(pitchAndEnergy);
    visualization.createVisualAbsNote("drum", kandinsky.getPitchEnergy(), NoteInterval*counter, kandinsky.getPitchHeight())
    visualization.createConnectionLine("drum")
    counter++
}

function set_pitch_palette(num, set){
    pitch_palette_num = num;
    pitch_palette_set = set;
}
function set_beat_color(color){
    beat_color = color

}