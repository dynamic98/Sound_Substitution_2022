// import * as Tone from "tone";
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
    Piano
} from './Customization/Piano.js'
import {
    ProgressTimer
} from './Utility/ProgressTimer.js'
import {
    MusicSheet
} from './forUI/MusicSheet.js'
import {
    AbsolutePosition
} from './Utility/AbsolutePosition.js'
import {
    GetUserCustom
}
from './Utility/GetUserCustom.js'


// let geometryButtons = new ButtonCustomization("shapeContainer", "btn btn-primary", "btn-")
// let textureButtons = new ButtonCustomization("shapeContainer", "textureButton")

let kandinsky;
let bpmTimer = new BPMTimer();
let stats = new Stats();
let switcher = new Switcher();
let bloom_length = 1
let visualization = new Visualization(bloom_length);
let progressTime = 15;
let progressTimer = new ProgressTimer(progressTime, document.getElementById("ProgressBar"));

let piano = new Piano("pianoContainer");
// let MyColorPicker = new ColorPicker();

let Task1Sheet = [
    {keyboard_pitch:{frequency: 0, confidence: 1, note:  "C4", midi:60}, keyboard_energy: 50, drum_pitch: {frequency: 0, confidence: 1, note: 0, midi: 0}, drum_energy: 0},
    {keyboard_pitch:{frequency: 0, confidence: 1, note:  "E4", midi:64}, keyboard_energy: 50, drum_pitch: {frequency: 0, confidence: 1, note: 0, midi: 0}, drum_energy: 0},
    {keyboard_pitch:{frequency: 0, confidence: 1, note:  "G4", midi:67}, keyboard_energy: 50, drum_pitch: {frequency: 0, confidence: 1, note: 0, midi: 0}, drum_energy: 0},
    {keyboard_pitch:{frequency: 0, confidence: 1, note:  "C4", midi:60}, keyboard_energy: 50, drum_pitch: {frequency: 0, confidence: 1, note: 0, midi: 0}, drum_energy: 0}, 
    {keyboard_pitch:{frequency: 0, confidence: 1, note:  "E4", midi:64}, keyboard_energy: 50, drum_pitch: {frequency: 0, confidence: 1, note: 0, midi: 0}, drum_energy: 0},
    {keyboard_pitch:{frequency: 0, confidence: 1, note:  "G4", midi:67}, keyboard_energy: 50, drum_pitch: {frequency: 0, confidence: 1, note: 0, midi: 0}, drum_energy: 0},
    {keyboard_pitch:{frequency: 0, confidence: 1, note:  "A4", midi:69}, keyboard_energy: 50, drum_pitch: {frequency: 0, confidence: 1, note: 0, midi: 0}, drum_energy: 0},
    {keyboard_pitch:{frequency: 0, confidence: 1, note:  "A4", midi:69}, keyboard_energy: 50, drum_pitch: {frequency: 0, confidence: 1, note: 0, midi: 0}, drum_energy: 0},
    {keyboard_pitch:{frequency: 0, confidence: 1, note:  "A4", midi:69}, keyboard_energy: 50, drum_pitch: {frequency: 0, confidence: 1, note: 0, midi: 0}, drum_energy: 0},
    {keyboard_pitch:{frequency: 0, confidence: 1, note:  "G4", midi:67}, keyboard_energy: 50, drum_pitch: {frequency: 0, confidence: 1, note: 0, midi: 0}, drum_energy: 0},
    ]
let MusicLength = Task1Sheet.length;
let WritingMusicSheet = new MusicSheet(MusicLength);
let TaskMusicSheet = new MusicSheet(MusicLength);
TaskMusicSheet.setMusicSheet(Task1Sheet);
let AbsCount, LoopAmount, TotalCount, NoteInterval, OneLoopMusicLength, LoopCount, LoopRemainder, Pictured = false;
let MyUserCustom = new GetUserCustom();
let pitch_palette;

document.body.appendChild(stats.dom);


main()

import
{
    Utility
}
from './Utility/Utility.js'

async function main() {
    await Utility.sleep(1000)
    bpmTimer.setBPM(20)
    bpmTimer.setBPMByMeshCount(20)
    kandinsky = new Kandinsky(bpmTimer.getBPM(), 1);
    piano.setNoteDuration(300);

    piano.assignEventOnPianoRow("mousedown", draw, WritingMusicSheet.setMusicArray, 1, 3)
    piano.assignEventOnPianoRow("mousedown", draw, WritingMusicSheet.setMusicArray, 2, 4)
    piano.assignEventOnPianoRow("mousedown", draw, WritingMusicSheet.setMusicArray, 3, 5)

    AbsCount = AbsolutePosition(bpmTimer.getFourBeatTime());
    LoopAmount = progressTime*1000 / bpmTimer.getFourBeatTime();
    // if(LoopAmount<1){LoopAmount = 1}

    apply_default_custom()
    TotalCount = AbsCount*LoopAmount;
    NoteInterval = TotalCount/MusicLength;
    OneLoopMusicLength = Math.floor(MusicLength/LoopAmount)
    if(OneLoopMusicLength>MusicLength){OneLoopMusicLength=MusicLength};
    LoopRemainder = MusicLength%OneLoopMusicLength
    LoopCount = 0;
    Pictured = false;
    update();
}

function update() {
    stats.begin()
    requestAnimationFrame(update);
    WritingMusicSheet.setCurrentIndex(Math.floor(progressTimer.getThisSeconds() / (15000/MusicLength)))
    if (!progressTimer.getPlayed()){
        if(!Pictured){ // User first encounter this state
            visualization.reset();
            bpmTimer.restart()
            // visualization.createNowLocation(kandinsky.getPitchWidth())
            visualization.createProgressBar(10,(0.8, 0.5, 0.5),0.6)
            LoopCount = 0;
            for (let i=0; i<OneLoopMusicLength; i++){
                let currentIndex = LoopCount*OneLoopMusicLength+i
                TaskMusicSheet.setCurrentIndex(currentIndex)
                if(TaskMusicSheet.getKeyboardEnergy()!=0){
                    let pitchAndEnergy = switcher.getPitchAndEnergy(
                            TaskMusicSheet.getKeyboardPitch(),
                            TaskMusicSheet.getKeyboardEnergy(),
                            TaskMusicSheet.getKeyboardNote()
                        )
                    kandinsky.calculate(pitchAndEnergy);
                    visualization.setColor("savedPiano", pitch_palette[kandinsky.tone][0], pitch_palette[kandinsky.tone][1], pitch_palette[kandinsky.tone][2])
                    visualization.createVisualAbsNote("savedPiano", kandinsky.getPitchEnergy(), kandinsky.getPitchWidth()*NoteInterval*i, kandinsky.getPitchHeight())
                    if(MyUserCustom.CustomObj.Piano.line){
                        visualization.createConnectionLine("savedPiano")
                    }
                }
            Pictured=true;
            }
        }else{ //Pictured
            console.log("What Should We Do In this State?");
            visualization.counterTimer.reset();
            visualization.moveProgressBar(kandinsky.getPitchWidth())

        }       
    } else if(progressTimer.getThisSeconds()==15000){ // End state
        progressTimer.played = false;
        progressTimer.element.value = "0"
        Pictured=false;

    } else{ //progressTimer.getPlayed()==true
    if (progressTimer.getThisSeconds()==0){
        visualization.reset();
        bpmTimer.restart()
        visualization.createProgressBar(10,(0.8, 0.5, 0.5),0.6)
        LoopCount = 0;
        for (let i=0; i<OneLoopMusicLength; i++){
            let currentIndex = LoopCount*OneLoopMusicLength+i
            TaskMusicSheet.setCurrentIndex(currentIndex)
            if(TaskMusicSheet.getKeyboardEnergy()!=0){
                let pitchAndEnergy = switcher.getPitchAndEnergy(
                        TaskMusicSheet.getKeyboardPitch(),
                        TaskMusicSheet.getKeyboardEnergy(),
                        TaskMusicSheet.getKeyboardNote()
                    )
                kandinsky.calculate(pitchAndEnergy);
                visualization.setColor("savedPiano", pitch_palette[kandinsky.tone][0], pitch_palette[kandinsky.tone][1], pitch_palette[kandinsky.tone][2])
                visualization.createVisualAbsNote("savedPiano", kandinsky.getPitchEnergy(), kandinsky.getPitchWidth()*NoteInterval*i, kandinsky.getPitchHeight())
                if(MyUserCustom.CustomObj.Piano.line){
                    visualization.createConnectionLine("savedPiano")
                }
            }
        }
    }
    if (!bpmTimer.isUnderFourBeat()) {
        console.log("this time");
        visualization.reset();
        visualization.createProgressBar(10,(0.8, 0.5, 0.5),0.6)
        LoopCount ++;
        console.log(LoopCount, Math.floor(LoopAmount))
        if(LoopCount<Math.floor(LoopAmount)){
            for (let i=0; i<OneLoopMusicLength; i++){
                let currentIndex = LoopCount*OneLoopMusicLength+i
                TaskMusicSheet.setCurrentIndex(currentIndex)
                if(TaskMusicSheet.getKeyboardEnergy()!=0){

                    let pitchAndEnergy = switcher.getPitchAndEnergy(
                            TaskMusicSheet.getKeyboardPitch(),
                            TaskMusicSheet.getKeyboardEnergy(),
                            TaskMusicSheet.getKeyboardNote()
                        )
                    kandinsky.calculate(pitchAndEnergy);
                    visualization.setColor("savedPiano", pitch_palette[kandinsky.tone][0], pitch_palette[kandinsky.tone][1], pitch_palette[kandinsky.tone][2])
                    visualization.createVisualAbsNote("savedPiano", kandinsky.getPitchEnergy(), kandinsky.getPitchWidth()*NoteInterval*i, kandinsky.getPitchHeight())
                    if(MyUserCustom.CustomObj.Piano.line){
                        visualization.createConnectionLine("savedPiano")
                    }
                }
            }
        }else{
            for (let i=0; i<LoopRemainder; i++){
                    let currentIndex = LoopCount*OneLoopMusicLength+i
                    TaskMusicSheet.setCurrentIndex(currentIndex)
                    if(TaskMusicSheet.getKeyboardEnergy()!=0){
                        let pitchAndEnergy = switcher.getPitchAndEnergy(
                                TaskMusicSheet.getKeyboardPitch(),
                                TaskMusicSheet.getKeyboardEnergy(),
                                TaskMusicSheet.getKeyboardNote()
                            )
                        kandinsky.calculate(pitchAndEnergy);
                        visualization.setColor("savedPiano", pitch_palette[kandinsky.tone][0], pitch_palette[kandinsky.tone][1], pitch_palette[kandinsky.tone][2])
                        visualization.createVisualAbsNote("savedPiano", kandinsky.getPitchEnergy(), kandinsky.getPitchWidth()*NoteInterval*i, kandinsky.getPitchHeight())
                        if(MyUserCustom.CustomObj.Piano.line){
                            visualization.createConnectionLine("savedPiano")
                            }
                    }
            }
        }

    } else if (bpmTimer.isUnderFourBeat()) {
            if(progressTimer.getPlayed()){
            visualization.moveProgressBar(kandinsky.getPitchWidth()*1.3)
            }
        }
    }
    visualization.render();
    visualization.update();
    stats.end();
}


//callback for each Instrument 
//drum class must have the same getPitch Energy, getPitchWidth and getPitchHeight Functions. 
function draw(pitch, energy, midi) {
    let pitchAndEnergy = switcher.getPitchAndEnergy(pitch, energy, midi);
    kandinsky.calculate(pitchAndEnergy);
    visualization.setColor("piano", pitch_palette[kandinsky.tone][0], pitch_palette[kandinsky.tone][1], pitch_palette[kandinsky.tone][2])
    //myThree.createColor(kandinsky.getNormalizedTone(), kandinsky.getNormalizedOctave())
    visualization.createVisualNote("piano", kandinsky.getPitchEnergy(), kandinsky.getPitchWidth()*1.3, kandinsky.getPitchHeight())
    if(MyUserCustom.CustomObj.Piano.line){
        visualization.createConnectionLine("piano")
        }
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
        if(MyUserCustom.CustomObj.Piano.palette_num=='10'){
            lightness=1
        }
        parsed_palette[i] = [hue, saturation, lightness]
    }
    return parsed_palette;
}

function piano_coloring(set_num, colors){
    for(let i=0; i<36; i++){    
        let color_num=i%12
        let piano_set = document.getElementById("key"+(i+1).toString())
        piano_set.style.background=colors[color_num]
    }
}

function apply_default_custom(){
    visualization.instruments['piano'].geometryManager.setGeometryType(MyUserCustom.CustomObj.Piano.shape.toLowerCase())
    visualization.instruments['savedPiano'].geometryManager.setGeometryType(MyUserCustom.CustomObj.Piano.shape.toLowerCase())
    visualization.instruments['piano'].textureManager.texture = visualization.instruments['piano'].textureManager.textureObject[MyUserCustom.CustomObj.Piano.texture.toLowerCase()]
    visualization.instruments['savedPiano'].textureManager.texture = visualization.instruments['savedPiano'].textureManager.textureObject[MyUserCustom.CustomObj.Piano.texture.toLowerCase()]
    pitch_palette = parse_pitch_palette(MyUserCustom.CustomObj.Piano.palette_set)
    kandinsky.setRange(MyUserCustom.CustomObj.Piano.interval)
    piano.setCurrentEnergy(50)
    piano_coloring(MyUserCustom.CustomObj.Piano.palette_num, MyUserCustom.CustomObj.Piano.palette_set)

    // piano line is automatically applied

    visualization.instruments['drum'].geometryManager.setGeometryType(MyUserCustom.CustomObj.Drum.shape.toLowerCase())
    visualization.instruments['savedDrum'].geometryManager.setGeometryType(MyUserCustom.CustomObj.Drum.shape.toLowerCase())
    visualization.instruments['drum'].textureManager.texture = visualization.instruments['drum'].textureManager.textureObject[MyUserCustom.CustomObj.Drum.texture.toLowerCase()]
    visualization.instruments['savedDrum'].textureManager.texture = visualization.instruments['savedDrum'].textureManager.textureObject[MyUserCustom.CustomObj.Drum.texture.toLowerCase()]
    // drum.setCurrentEnergy(MyUserCustom.CustomObj.Drum.size)
    // drum color is automatically applied
}

$('#reset').click(function(){
    WritingMusicSheet.resetMusicSheet();
    // visualization.reset();
    // progressTimer.played = true;
    progressTimer.element.value = "0"
})

$('#save').click(function(){
    let postdata = Object.assign({}, WritingMusicSheet.getMusicSheet())
    postdata.UserName=MyUserCustom.CustomObj.UserName;
    postdata.UserNumber=MyUserCustom.CustomObj.UserNumber;
    let TaskNum = $('.task_num')[0].innerText;
    // console.log(TaskNum);
    postdata.TaskNum = TaskNum
    WritingMusicSheet.resetMusicSheet();
    $.ajax({
        type: 'POST',
        url: '/SaveUserDB',
        data: JSON.stringify(postdata),
        dataType : 'JSON',
        contentType: "application/json",
        success: function(data){
            alert('DB 저장완료..')
        },
        error: function(request, status, error){
            alert('ajax 통신 실패')
            alert(error);
        }
    })

})