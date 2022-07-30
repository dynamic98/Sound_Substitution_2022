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
    GetUserCustom
}
from './Utility/GetUserCustom.js'

// import {
//     FiniteStateMachine
// } from './Utility/FiniteStateMachine.js'



pitchBeatSwitcher()

let geometryButtons = new ButtonCustomization("shapeContainer", "btn btn-primary", "btn-")
let textureButtons = new ButtonCustomization("shapeContainer", "textureButton")
let pitchslide = new SlideCustomization("visualContainer_pitch", "customMenu", "range")
let beatslide = new SlideCustomization("visualContainer_beat", "customMenu", "range")
let hapticslide = new SlideCustomization("hapticContainer", "customMenu", "range")

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

let MyUserCustom = new GetUserCustom();
// let thisCustom = MyUserCustom.getCustomObj();


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
    geometryButtons.setModePitchBeat('pitch');
    textureButtons.setModePitchBeat('pitch');

    piano_container[0].style.display=''
    drum_container[0].style.display='none'
    pitch_area.style.display=''
    beat_area.style.display='none'

}
beat_type.onclick=function(e){
    // console.log("beat mode")
    mode_pitchbeat="beat"
    geometryButtons.setModePitchBeat('beat');
    textureButtons.setModePitchBeat('beat');

    piano_container[0].style.display='none'
    drum_container[0].style.display=''
    pitch_area.style.display='none'
    beat_area.style.display=''
}

let checkbox = document.getElementById('pitch-checkbox')
checkbox.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
        console.log("checked")
        MyUserCustom.CustomObj.Piano.line = true
    } else {
        console.log("not checked")
        MyUserCustom.CustomObj.Piano.line = false
    }
})

let MeshAmount=20, NoteInterval;
let counter = 0
let pitch_palette;
document.body.appendChild(stats.dom);

main()

function main() {
    bpmTimer.setBPM(20)
    bpmTimer.setBPMByMeshCount(MeshAmount)
    kandinsky = new Kandinsky(bpmTimer.getBPM(), 1);
    piano.setNoteDuration(300);

    apply_default_custom();
    apply_default_custom_toHTML();
    // pitch_palette = parse_pitch_palette(MyUserCustom.CustomObj.Piano.palette_set);
    // visualization.createProgressBar(5, "#0000FF", 0.4)

    //event handler
    //---------------------------------------------------------------
    // $("input[class=checkbox]").change(() => {
    //     visualization.setConnectionLineVisibility($(".checkbox")[0].checked)
    // })
    geometryButtons.assignEventHandler("click", visualization.setGeometryType, MyUserCustom.setCustomShape)
    textureButtons.assignEventHandler("click", visualization.setTexture, MyUserCustom.setCustomTexture)
    pitchslide.assignEventHandler("click", (para, value) => {
        if (para == "slide-pitch-interval") {
            kandinsky.setRange(value)
            MyUserCustom.CustomObj.Piano.interval = value;
        } else if (para == "slide-pitch-size") {
            piano.setCurrentEnergy(value)
            MyUserCustom.CustomObj.Piano.size = value;
        }
    })
    beatslide.assignEventHandler("click", (para, value) => {
            drum.setCurrentEnergy(value)
            MyUserCustom.CustomObj.Drum.size = value;
    })
    hapticslide.assignEventHandler("click", (para, value) => {
        if (para == "slide-haptic-sensitivity") {
            MyUserCustom.CustomObj.Haptic.sensitivity = value;
        } else if (para == "slide-haptic-intensity") {
            MyUserCustom.CustomObj.Haptic.intensity = value;
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
    // console.log(MyUserCustom.getCustomObj());

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
    visualization.setColor("piano", pitch_palette[kandinsky.tone][0], pitch_palette[kandinsky.tone][1], pitch_palette[kandinsky.tone][2])
    visualization.createVisualAbsNote("piano", kandinsky.getPitchEnergy(), NoteInterval*counter, kandinsky.getPitchHeight())
    if(MyUserCustom.CustomObj.Piano.line){
    visualization.createConnectionLine("piano")
    }
    counter++
}
function draw_drum(pitch, energy, midi) {
    let pitchAndEnergy = switcher.getPitchAndEnergy(pitch, energy, midi);
    kandinsky.calculate(pitchAndEnergy);
    visualization.setColor("drum", MyUserCustom.CustomObj.Drum.color/360, 0.5, 0.5)
    visualization.createVisualAbsNote("drum", kandinsky.getPitchEnergy(), NoteInterval*counter, kandinsky.getPitchHeight())
    // visualization.createConnectionLine("drum")
    counter++
}

function set_pitch_palette(num, set){
    MyUserCustom.CustomObj.Piano.palette_num = num;
    MyUserCustom.CustomObj.Piano.palette_set = set;
    pitch_palette = parse_pitch_palette(set);
    // console.log(num, set)
}
function set_beat_color(color){
    MyUserCustom.CustomObj.Drum.color = color
    // console.log(color)

}
function parse_pitch_palette(set){
    let parsed_palette = new Array(12);
    for(let i=0;i<12;i++){
        let split_set = set[i].substring(4, set[i].length-1).split(",")
        let hue = parseFloat(split_set[0])/360;
        let saturation = parseFloat(split_set[1])/100
        let lightness = parseFloat(split_set[2])/100
        parsed_palette[i] = [hue, saturation, lightness]
    }
    return parsed_palette;
}

function apply_default_custom(){
    // console.log(visualization.instruments['piano'].textureManager)
    visualization.instruments['piano'].geometryManager.setGeometryType(MyUserCustom.CustomObj.Piano.shape.toLowerCase())
    visualization.instruments['savedPiano'].geometryManager.setGeometryType(MyUserCustom.CustomObj.Piano.shape.toLowerCase())
    visualization.instruments['piano'].textureManager.texture = visualization.instruments['piano'].textureManager.textureObject[MyUserCustom.CustomObj.Piano.texture.toLowerCase()]
    visualization.instruments['savedPiano'].textureManager.texture = visualization.instruments['savedPiano'].textureManager.textureObject[MyUserCustom.CustomObj.Piano.texture.toLowerCase()]
    // visualization.instruments['piano'].textureManager.setTexture(MyUserCustom.CustomObj.Piano.texture.toLowerCase())
    // visualization.instruments['savedPiano'].textureManager.setTexture(MyUserCustom.CustomObj.Piano.texture.toLowerCase())
    pitch_palette = parse_pitch_palette(MyUserCustom.CustomObj.Piano.palette_set)
    kandinsky.setRange(MyUserCustom.CustomObj.Piano.interval)
    piano.setCurrentEnergy(MyUserCustom.CustomObj.Piano.size)
    // piano line is automatically applied

    visualization.instruments['drum'].geometryManager.setGeometryType(MyUserCustom.CustomObj.Drum.shape.toLowerCase())
    visualization.instruments['savedDrum'].geometryManager.setGeometryType(MyUserCustom.CustomObj.Drum.shape.toLowerCase())
    // visualization.instruments['drum'].textureManager.setTexture(MyUserCustom.CustomObj.Drum.texture.toLowerCase())
    // visualization.instruments['savedDrum'].textureManager.setTexture(MyUserCustom.CustomObj.Drum.texture.toLowerCase())
    visualization.instruments['drum'].textureManager.texture = visualization.instruments['drum'].textureManager.textureObject[MyUserCustom.CustomObj.Drum.texture.toLowerCase()]
    visualization.instruments['savedDrum'].textureManager.texture = visualization.instruments['savedDrum'].textureManager.textureObject[MyUserCustom.CustomObj.Drum.texture.toLowerCase()]
    drum.setCurrentEnergy(MyUserCustom.CustomObj.Drum.size)
    // drum color is automatically applied
}

function apply_default_custom_toHTML(){
    document.getElementById('slide-pitch-interval').value = MyUserCustom.CustomObj.Piano.interval.toString()
    document.getElementById('slide-pitch-size').value = MyUserCustom.CustomObj.Piano.size.toString()
    document.getElementById('pitch-checkbox').checked = MyUserCustom.CustomObj.Piano.line
    document.getElementById('slide-beat-size').value = MyUserCustom.CustomObj.Drum.size.toString()
    document.getElementById('slide-haptic-sensitivity').value = MyUserCustom.CustomObj.Haptic.sensitivity.toString()
    document.getElementById('slide-haptic-intensity').value = MyUserCustom.CustomObj.Haptic.intensity.toString()
    MyColorPicker.piano_coloring(MyUserCustom.CustomObj.Piano.palette_num, MyUserCustom.CustomObj.Piano.palette_set)
}

$('#save').click(function(){
    // var left = $('#input-left').val();
    // var right = $('#input-right').val();
    let username = MyUserCustom.CustomObj.UserName;
    let usernumber = MyUserCustom.CustomObj.UserNumber;

    let piano_shape = MyUserCustom.CustomObj.Piano.shape;
    let piano_texture = MyUserCustom.CustomObj.Piano.texture;
    let piano_palette_num = MyUserCustom.CustomObj.Piano.palette_num;
    let piano_palette_set = MyUserCustom.CustomObj.Piano.palette_set;
    let piano_interval = MyUserCustom.CustomObj.Piano.interval;
    let piano_size = MyUserCustom.CustomObj.Piano.size;
    let piano_line = MyUserCustom.CustomObj.Piano.line;

    let drum_shape = MyUserCustom.CustomObj.Drum.shape;
    let drum_texture = MyUserCustom.CustomObj.Drum.texture;
    let drum_color = MyUserCustom.CustomObj.Drum.color;
    let drum_size = MyUserCustom.CustomObj.Drum.size;

    let haptic_sensitivity = MyUserCustom.CustomObj.Haptic.sensitivity;
    let haptic_intensity = MyUserCustom.CustomObj.Haptic.intensity;

    var postdata = {
        'UserName':username,
        'UserNumber':usernumber,
        "piano":
                {
                    'shape':piano_shape,
                    'texture':piano_texture,
                    'palette_num':piano_palette_num,
                    'palette_set':piano_palette_set,
                    'interval':piano_interval,
                    'size':piano_size,
                    'line':piano_line
                },
        "drum":
                {
                    'shape':drum_shape,
                    'texture':drum_texture,
                    'color':drum_color,
                    'size':drum_size
                },
        "haptic":
                {
                    'sensitivity':haptic_sensitivity,
                    'intensity':haptic_intensity
                }
    }
    $.ajax({
        type: 'POST',
        url: '/SaveUserCustom',
        data: JSON.stringify(postdata),
        dataType : 'JSON',
        contentType: "application/json",
        success: function(data){
            alert('Customization 저장완료..')
        },
        error: function(request, status, error){
            alert('ajax 통신 실패')
            alert(error);
        }
    })
})