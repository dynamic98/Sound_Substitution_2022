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
const transparent = '#FFFFFF';
const red = '#FF5C5C';
const black = '#221E21';



let pitch_type = document.getElementById('pitchButton')
let beat_type=document.getElementById('beatButton')
let piano_container=document.getElementsByClassName("set")
let drum_container=document.getElementsByClassName("set2")
let pitch_area=document.getElementById('pitch_area')
let beat_area=document.getElementById('beat_area')
let reset=document.getElementById('reset')

const shape_square = document.getElementById("btn-square");
const shape_circle = document.getElementById("btn-circle");
const shape_triangle= document.getElementById("btn-triangle");
const shape_decagon = document.getElementById("btn-decagon");
const shape_star = document.getElementById("btn-star");
let shape_button_list = {circle:shape_circle, square:shape_square, triangle:shape_triangle, star: shape_star, decagon: shape_decagon}


const texture_none = document.getElementById("none");
const texture_wood = document.getElementById("wood");
const texture_stone = document.getElementById("stone");
const texture_paper = document.getElementById("paper");
let texture_button_list = {none:texture_none, wood:texture_wood, stone:texture_stone, paper: texture_paper}

const palette_satu = document.getElementById("picker_satu")
const palette_light = document.getElementById("picker_light")
const palette_1 = document.getElementById("palette1")
const palette_2 = document.getElementById("palette2")
const palette_3 = document.getElementById("palette3")
const palette_4 = document.getElementById("palette4")
const palette_5 = document.getElementById("palette5")
const palette_6 = document.getElementById("palette6")
const palette_7 = document.getElementById("palette7")
const palette_8 = document.getElementById("palette8")
const palette_9 = document.getElementById("palette9")
let palette_button_list = {0: palette_satu, 1: palette_light, 2: palette_1, 3:palette_2, 4:palette_3, 5:palette_4, 6:palette_5, 7:palette_6, 8:palette_7, 9:palette_8, 10:palette_9}


pitch_type.onclick=function(e){
    console.log("pitch mode")
    mode_pitchbeat="pitch"
    geometryButtons.setModePitchBeat('pitch');
    textureButtons.setModePitchBeat('pitch');

    piano_container[0].style.display=''
    drum_container[0].style.display='none'
    pitch_area.style.display=''
    beat_area.style.display='none'

    for (let child in shape_button_list){
        if(child==MyUserCustom.CustomObj.Piano.shape){
            shape_button_list[child].style.background = red;
        }else{
            shape_button_list[child].style.background = black;
        }
    }
    for (let child in texture_button_list){
        if(child==MyUserCustom.CustomObj.Piano.texture){
            texture_button_list[child].style.outlineColor = red;
        }else{
            texture_button_list[child].style.outlineColor = transparent;
        }
    }
    for (let child in palette_button_list){
        if(child==MyUserCustom.CustomObj.Piano.texture){
            palette_button_list[child].style.background = red;
        }else{
            palette_button_list[child].style.background = transparent;
        }
    }

}
beat_type.onclick=function(e){
    console.log("beat mode")
    mode_pitchbeat="beat"
    geometryButtons.setModePitchBeat('beat');
    textureButtons.setModePitchBeat('beat');

    piano_container[0].style.display='none'
    drum_container[0].style.display=''
    pitch_area.style.display='none'
    beat_area.style.display=''

    for (let child in shape_button_list){
        if(child==MyUserCustom.CustomObj.Drum.shape){
            shape_button_list[child].style.background = red;
        }else{
            shape_button_list[child].style.background = black;
        }
    }
    for (let child in texture_button_list){
        if(child==MyUserCustom.CustomObj.Drum.texture){
            texture_button_list[child].style.outlineColor = red;
        }else{
            texture_button_list[child].style.outlineColor = transparent;
        }
    }

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
    visualization.setColor("drum", MyUserCustom.CustomObj.Drum.color['h']/360, 0.5, MyUserCustom.CustomObj.Drum.color['l']/100)
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

}
function parse_pitch_palette(set){
    let parsed_palette = new Array(12);
    for(let i=0;i<12;i++){
        let split_set = set[i].substring(4, set[i].length-1).split(",")
        let hue = parseFloat(split_set[0])/360;
        let saturation = parseFloat(split_set[1])/100
        let lightness = parseFloat(split_set[2])/100
        if(MyUserCustom.CustomObj.Piano.palette_num=='10'){
            lightness=1
        }
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
    MyColorPicker.set_SaturationAndLightness(parseInt(pitch_palette[0][0]*360))
    MyColorPicker.piano_coloring(MyUserCustom.CustomObj.Piano.palette_num, MyUserCustom.CustomObj.Piano.palette_set)

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

    for (let child in shape_button_list){
        if(child==MyUserCustom.CustomObj.Piano.shape){
            shape_button_list[child].style.background = red;
        }else{
            shape_button_list[child].style.background = black;
        }
    }
    for (let child in texture_button_list){
        if(child==MyUserCustom.CustomObj.Piano.texture){
            texture_button_list[child].style.outlineColor = red;
        }else{
            texture_button_list[child].style.outlineColor = transparent;
        }
    }
    for (let child in palette_button_list){
        if(child==MyUserCustom.CustomObj.Piano.texture){
            palette_button_list[child].style.background = red;
        }else{
            palette_button_list[child].style.background = transparent;
        }
    }
    // shape_button_list[MyUserCustom.CustomObj.Piano.shape].style.background = red;
    // texture_button_list[MyUserCustom.CustomObj.Piano.texture].style.background = red;
    // palette_button_list[MyUserCustom.CustomObj.Piano.palette_num.toString()].style.background = red;


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


$('#slide-haptic-sensitivity').click(function(){
    let sensitivity = document.getElementById('slide-haptic-sensitivity').value
    let intensity = document.getElementById('slide-haptic-intensity').value
    let postdata = {
        "sensitivity": sensitivity,
        "intensity": intensity
    }
    $.ajax({
        type: 'POST',
        url: '/SendHaptic',
        data: JSON.stringify(postdata),
        dataType : 'JSON',
        contentType: "application/json",
        success: function(data){
            // alert('haptic 완료')
        },
        error: function(request, status, error){
            alert('ajax 통신 실패')
            alert(error);
        }
    })
})

$('#slide-haptic-intensity').click(function(){
    let sensitivity = document.getElementById('slide-haptic-sensitivity').value
    let intensity = document.getElementById('slide-haptic-intensity').value
    let postdata = {
        "sensitivity": sensitivity,
        "intensity": intensity
    }
    $.ajax({
        type: 'POST',
        url: '/SendHaptic',
        data: JSON.stringify(postdata),
        dataType : 'JSON',
        contentType: "application/json",
        success: function(data){
            // alert('haptic 완료')
        },
        error: function(request, status, error){
            alert('ajax 통신 실패')
            alert(error);
        }
    })
})