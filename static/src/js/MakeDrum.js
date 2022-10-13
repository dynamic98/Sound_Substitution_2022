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
    Drum
} from './Customization/Drum.js'
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

let drum = new Drum("drum");

let Task1Sheet = [
    {keyboard_pitch: {frequency: 0, confidence: 1, note:    0,  midi:  0} , keyboard_energy:  0, drum_pitch: {frequency: 0, confidence: 1, note: "F4", midi: 65}, drum_energy: 50},
    {keyboard_pitch: {frequency: 0, confidence: 1, note:    0,  midi:  0} , keyboard_energy:  0, drum_pitch: {frequency: 0, confidence: 1, note: "F4", midi: 65}, drum_energy: 50},
    {keyboard_pitch: {frequency: 0, confidence: 1, note:    0,  midi:  0} , keyboard_energy:  0, drum_pitch: {frequency: 0, confidence: 1, note: "F4", midi: 65}, drum_energy: 50},
    {keyboard_pitch: {frequency: 0, confidence: 1, note:    0,  midi:  0} , keyboard_energy:  0, drum_pitch: {frequency: 0, confidence: 1, note: "F4", midi: 65}, drum_energy: 50},
    {keyboard_pitch: {frequency: 0, confidence: 1, note:    0,  midi:  0} , keyboard_energy:  0, drum_pitch: {frequency: 0, confidence: 1, note: "F4", midi: 65}, drum_energy: 50},
    {keyboard_pitch: {frequency: 0, confidence: 1, note:    0,  midi:  0} , keyboard_energy:  0, drum_pitch: {frequency: 0, confidence: 1, note: "F4", midi: 65}, drum_energy: 50},
    {keyboard_pitch: {frequency: 0, confidence: 1, note:    0,  midi:  0} , keyboard_energy:  0, drum_pitch: {frequency: 0, confidence: 1, note: "F4", midi: 65}, drum_energy: 50},
    {keyboard_pitch: {frequency: 0, confidence: 1, note:    0,  midi:  0} , keyboard_energy:  0, drum_pitch: {frequency: 0, confidence: 1, note: "F4", midi: 65}, drum_energy: 50},
    {keyboard_pitch: {frequency: 0, confidence: 1, note:    0,  midi:  0} , keyboard_energy:  0, drum_pitch: {frequency: 0, confidence: 1, note: "F4", midi: 65}, drum_energy: 50},
    {keyboard_pitch: {frequency: 0, confidence: 1, note:    0,  midi:  0} , keyboard_energy:  0, drum_pitch: {frequency: 0, confidence: 1, note: "F4", midi: 65}, drum_energy: 50},
    {keyboard_pitch: {frequency: 0, confidence: 1, note:    0,  midi:  0} , keyboard_energy:  0, drum_pitch: {frequency: 0, confidence: 1, note: "F4", midi: 65}, drum_energy: 50},
    {keyboard_pitch: {frequency: 0, confidence: 1, note:    0,  midi:  0} , keyboard_energy:  0, drum_pitch: {frequency: 0, confidence: 1, note: "F4", midi: 65}, drum_energy: 50},
    {keyboard_pitch: {frequency: 0, confidence: 1, note:    0,  midi:  0} , keyboard_energy:  0, drum_pitch: {frequency: 0, confidence: 1, note: "F4", midi: 65}, drum_energy: 50},
    {keyboard_pitch: {frequency: 0, confidence: 1, note:    0,  midi:  0} , keyboard_energy:  0, drum_pitch: {frequency: 0, confidence: 1, note: "F4", midi: 65}, drum_energy: 50},
    {keyboard_pitch: {frequency: 0, confidence: 1, note:    0,  midi:  0} , keyboard_energy:  0, drum_pitch: {frequency: 0, confidence: 1, note: "F4", midi: 65}, drum_energy: 50},
    {keyboard_pitch: {frequency: 0, confidence: 1, note:    0,  midi:  0} , keyboard_energy:  0, drum_pitch: {frequency: 0, confidence: 1, note: "F4", midi: 65}, drum_energy: 50},
    {keyboard_pitch: {frequency: 0, confidence: 1, note:    0,  midi:  0} , keyboard_energy:  0, drum_pitch: {frequency: 0, confidence: 1, note: "F4", midi: 65}, drum_energy: 50},
    {keyboard_pitch: {frequency: 0, confidence: 1, note:    0,  midi:  0} , keyboard_energy:  0, drum_pitch: {frequency: 0, confidence: 1, note: "F4", midi: 65}, drum_energy: 50},
    {keyboard_pitch: {frequency: 0, confidence: 1, note:    0,  midi:  0} , keyboard_energy:  0, drum_pitch: {frequency: 0, confidence: 1, note: "F4", midi: 65}, drum_energy: 50},
    {keyboard_pitch: {frequency: 0, confidence: 1, note:    0,  midi:  0} , keyboard_energy:  0, drum_pitch: {frequency: 0, confidence: 1, note: "F4", midi: 65}, drum_energy: 50},
    {keyboard_pitch: {frequency: 0, confidence: 1, note:    0,  midi:  0} , keyboard_energy:  0, drum_pitch: {frequency: 0, confidence: 1, note: "F4", midi: 65}, drum_energy: 50},
    {keyboard_pitch: {frequency: 0, confidence: 1, note:    0,  midi:  0} , keyboard_energy:  0, drum_pitch: {frequency: 0, confidence: 1, note: "F4", midi: 65}, drum_energy: 50},
    {keyboard_pitch: {frequency: 0, confidence: 1, note:    0,  midi:  0} , keyboard_energy:  0, drum_pitch: {frequency: 0, confidence: 1, note: "F4", midi: 65}, drum_energy: 50},
    ]
let MusicLength = Task1Sheet.length;
let WritingMusicSheet = new MusicSheet(MusicLength);
let TaskMusicSheet = new MusicSheet(MusicLength);
TaskMusicSheet.setMusicSheet(Task1Sheet);
let AbsCount, LoopAmount, TotalCount, NoteInterval, OneLoopMusicLength, LoopCount, LoopRemainder, Pictured = false;
let MyUserCustom = new GetUserCustom();

document.body.appendChild(stats.dom);


main()

function main() {
    bpmTimer.setBPM(20)
    bpmTimer.setBPMByMeshCount(20)
    kandinsky = new Kandinsky(bpmTimer.getBPM(), 1);

    drum.assignEventOnDrum("mousedown", draw, WritingMusicSheet.setBeatArray)

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
                if(TaskMusicSheet.getDrumEnergy()!=0){
                    let pitchAndEnergy = switcher.getPitchAndEnergy(
                            TaskMusicSheet.getDrumPitch(),
                            TaskMusicSheet.getDrumEnergy(),
                            TaskMusicSheet.getDrumNote()
                        )
                    kandinsky.calculate(pitchAndEnergy);
                    visualization.setColor("savedDrum", MyUserCustom.CustomObj.Drum.color/360, 0.5, 1)
                    visualization.createVisualAbsNote("savedDrum", kandinsky.getPitchEnergy(), kandinsky.getPitchWidth()*NoteInterval*i, kandinsky.getPitchHeight())
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
            if(TaskMusicSheet.getDrumEnergy()!=0){
                let pitchAndEnergy = switcher.getPitchAndEnergy(
                        TaskMusicSheet.getDrumPitch(),
                        TaskMusicSheet.getDrumEnergy(),
                        TaskMusicSheet.getDrumNote()
                    )
                kandinsky.calculate(pitchAndEnergy);
                visualization.setColor("savedDrum", MyUserCustom.CustomObj.Drum.color/360, 0.5, 1)
                visualization.createVisualAbsNote("savedDrum", kandinsky.getPitchEnergy(), kandinsky.getPitchWidth()*NoteInterval*i, kandinsky.getPitchHeight())
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
                if(TaskMusicSheet.getDrumEnergy()!=0){

                    let pitchAndEnergy = switcher.getPitchAndEnergy(
                            TaskMusicSheet.getDrumPitch(),
                            TaskMusicSheet.getDrumEnergy(),
                            TaskMusicSheet.getDrumNote()
                        )
                    kandinsky.calculate(pitchAndEnergy);
                    visualization.setColor("savedDrum", MyUserCustom.CustomObj.Drum.color/360, 0.5, 1)
                    visualization.createVisualAbsNote("savedDrum", kandinsky.getPitchEnergy(), kandinsky.getPitchWidth()*NoteInterval*i, kandinsky.getPitchHeight())
                }
            }
        }else{
            for (let i=0; i<LoopRemainder; i++){
                    let currentIndex = LoopCount*OneLoopMusicLength+i
                    TaskMusicSheet.setCurrentIndex(currentIndex)
                    if(TaskMusicSheet.getDrumEnergy()!=0){
                        let pitchAndEnergy = switcher.getPitchAndEnergy(
                                TaskMusicSheet.getDrumPitch(),
                                TaskMusicSheet.getDrumEnergy(),
                                TaskMusicSheet.getDrumNote()
                            )
                        kandinsky.calculate(pitchAndEnergy);
                        visualization.setColor("savedDrum", MyUserCustom.CustomObj.Drum.color/360, 0.5, 1)
                        visualization.createVisualAbsNote("savedDrum", kandinsky.getPitchEnergy(), kandinsky.getPitchWidth()*NoteInterval*i, kandinsky.getPitchHeight())
                    }
            }
        }

    } else if (bpmTimer.isUnderFourBeat()) {
            if(progressTimer.getPlayed()){
            visualization.moveProgressBar(kandinsky.getPitchWidth())
            }
        }
    }
    visualization.render();
    visualization.update();
    stats.end();
}


function draw(pitch, energy, midi) {
    let pitchAndEnergy = switcher.getPitchAndEnergy(pitch, energy, midi);
    kandinsky.calculate(pitchAndEnergy);
    visualization.setColor("drum", MyUserCustom.CustomObj.Drum.color/360, 0.5, 0.5)
    //myThree.createColor(kandinsky.getNormalizedTone(), kandinsky.getNormalizedOctave())
    visualization.createVisualNote("drum", kandinsky.getPitchEnergy(), kandinsky.getPitchWidth(), kandinsky.getPitchHeight())

}

document.body.appendChild(stats.dom);

function apply_default_custom(){
    console.log(visualization.instruments['piano'].textureManager)
    visualization.instruments['piano'].geometryManager.setGeometryType(MyUserCustom.CustomObj.Piano.shape.toLowerCase())
    visualization.instruments['savedPiano'].geometryManager.setGeometryType(MyUserCustom.CustomObj.Piano.shape.toLowerCase())
    visualization.instruments['piano'].textureManager.texture = visualization.instruments['piano'].textureManager.textureObject[MyUserCustom.CustomObj.Piano.texture.toLowerCase()]
    visualization.instruments['savedPiano'].textureManager.texture = visualization.instruments['savedPiano'].textureManager.textureObject[MyUserCustom.CustomObj.Piano.texture.toLowerCase()]
    // visualization.instruments['piano'].textureManager.setTexture(MyUserCustom.CustomObj.Piano.texture.toLowerCase())
    // visualization.instruments['savedPiano'].textureManager.setTexture(MyUserCustom.CustomObj.Piano.texture.toLowerCase())
    // pitch_palette = parse_pitch_palette(MyUserCustom.CustomObj.Piano.palette_set)
    kandinsky.setRange(MyUserCustom.CustomObj.Piano.interval)
    // piano.setCurrentEnergy(MyUserCustom.CustomObj.Piano.size)
    // piano.setCurrentEnergy(50)
    // piano line is automatically applied

    visualization.instruments['drum'].geometryManager.setGeometryType(MyUserCustom.CustomObj.Drum.shape.toLowerCase())
    visualization.instruments['savedDrum'].geometryManager.setGeometryType(MyUserCustom.CustomObj.Drum.shape.toLowerCase())
    // visualization.instruments['drum'].textureManager.setTexture(MyUserCustom.CustomObj.Drum.texture.toLowerCase())
    // visualization.instruments['savedDrum'].textureManager.setTexture(MyUserCustom.CustomObj.Drum.texture.toLowerCase())
    visualization.instruments['drum'].textureManager.texture = visualization.instruments['drum'].textureManager.textureObject[MyUserCustom.CustomObj.Drum.texture.toLowerCase()]
    visualization.instruments['savedDrum'].textureManager.texture = visualization.instruments['savedDrum'].textureManager.textureObject[MyUserCustom.CustomObj.Drum.texture.toLowerCase()]
    // drum.setCurrentEnergy(MyUserCustom.CustomObj.Drum.size)
    // drum color is automatically applied
    drum.setCurrentEnergy(50)
}

$('#reset').click(function(){
    WritingMusicSheet.resetMusicSheet();
    // visualization.reset();
    progressTimer.element.value = "0"

})

$('#save').click(function(){
    let postdata = Object.assign({}, WritingMusicSheet.getMusicSheet())
    postdata.UserName=MyUserCustom.CustomObj.UserName;
    postdata.UserNumber=MyUserCustom.CustomObj.UserNumber;
    let TaskNum = $('.task_num')[0].innerText;

    // console.log(TaskNum);
    postdata.TaskNum = TaskNum
    // let TaskIndex = $('#task_index').value;
    // postdata.TaskIndex = TaskIndex

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