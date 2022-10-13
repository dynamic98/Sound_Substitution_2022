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
    SlideCustomization
} from './Customization/SlideCustomization.js'
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

let geometryButtons = new ButtonCustomization("shapeContainer", "btn btn-primary", "btn-")
let textureButtons = new ButtonCustomization("shapeContainer", "textureButton")
let pitchslide = new SlideCustomization("visualContainer_pitch", "customMenu", "range")

let kandinsky;
let bpmTimer = new BPMTimer();
let stats = new Stats();
let switcher = new Switcher();
let bloom_length = 1
let visualization = new Visualization(bloom_length);
let progressTime = 15;
let progressTimer = new ProgressTimer(progressTime, document.getElementById("ProgressBar"));

let piano = new Piano("pianoContainer");

let Task1Sheet = [
{keyboard_pitch: {frequency: 0, confidence: 1, note:    0,  midi:  0} , keyboard_energy:  0, drum_pitch: {frequency: 0, confidence: 1, note: 0, midi: 0}, drum_energy: 0},
{keyboard_pitch: {frequency: 0, confidence: 1, note: 'E3',  midi: 52} , keyboard_energy: 50, drum_pitch: {frequency: 0, confidence: 1, note: 0, midi: 0}, drum_energy: 0},
{keyboard_pitch: {frequency: 0, confidence: 1, note: 'B3',  midi: 59} , keyboard_energy: 50, drum_pitch: {frequency: 0, confidence: 1, note: 0, midi: 0}, drum_energy: 0},
{keyboard_pitch: {frequency: 0, confidence: 1, note: 'F3',  midi: 53} , keyboard_energy: 50, drum_pitch: {frequency: 0, confidence: 1, note: 0, midi: 0}, drum_energy: 0},
{keyboard_pitch: {frequency: 0, confidence: 1, note: 'C5',  midi: 72} , keyboard_energy: 50, drum_pitch: {frequency: 0, confidence: 1, note: 0, midi: 0}, drum_energy: 0},
{keyboard_pitch: {frequency: 0, confidence: 1, note: 'C4',  midi: 60} , keyboard_energy: 50, drum_pitch: {frequency: 0, confidence: 1, note: 0, midi: 0}, drum_energy: 0},
{keyboard_pitch: {frequency: 0, confidence: 1, note: 'F#3', midi: 54} , keyboard_energy: 50, drum_pitch: {frequency: 0, confidence: 1, note: 0, midi: 0}, drum_energy: 0},
{keyboard_pitch: {frequency: 0, confidence: 1, note: 'E5',  midi: 76} , keyboard_energy: 50, drum_pitch: {frequency: 0, confidence: 1, note: 0, midi: 0}, drum_energy: 0},
{keyboard_pitch: {frequency: 0, confidence: 1, note: 'E4',  midi: 64} , keyboard_energy: 50, drum_pitch: {frequency: 0, confidence: 1, note: 0, midi: 0}, drum_energy: 0},
{keyboard_pitch: {frequency: 0, confidence: 1, note: 'A4',  midi: 69} , keyboard_energy: 50, drum_pitch: {frequency: 0, confidence: 1, note: 0, midi: 0}, drum_energy: 0},
{keyboard_pitch: {frequency: 0, confidence: 1, note: 'C#4', midi: 61} , keyboard_energy: 50, drum_pitch: {frequency: 0, confidence: 1, note: 0, midi: 0}, drum_energy: 0},
]
let MusicLength = Task1Sheet.length;
let WritingMusicSheet = new MusicSheet(MusicLength);
let TaskMusicSheet = new MusicSheet(MusicLength);
TaskMusicSheet.setMusicSheet(Task1Sheet);
let AbsCount, LoopAmount, TotalCount, NoteInterval, OneLoopMusicLength, LoopCount, LoopRemainder, Pictured = false;

main()

function main() {
    bpmTimer.setBPM(20)
    bpmTimer.setBPMByMeshCount(20)
    kandinsky = new Kandinsky(bpmTimer.getBPM(), 1);
    piano.setNoteDuration(300);
    geometryButtons.assignEventHandler("click", visualization.setGeometryType)
    textureButtons.assignEventHandler("click", visualization.setTexture)
    pitchslide.assignEventHandler("click", (para, value)=>{
        if(para=="slide-pitch-interval"){
            kandinsky.setRange(value)
        }else if(para=="slide-pitch-size"){
            piano.setCurrentEnergy(value)
        }
    })

    piano.assignEventOnPianoRow("mousedown", draw, WritingMusicSheet.setMusicArray, 1, 3)
    piano.assignEventOnPianoRow("mousedown", draw, WritingMusicSheet.setMusicArray, 2, 4)
    piano.assignEventOnPianoRow("mousedown", draw, WritingMusicSheet.setMusicArray, 3, 5)

    AbsCount = AbsolutePosition(bpmTimer.getFourBeatTime());
    LoopAmount = progressTime*1000 / bpmTimer.getFourBeatTime();
    // if(LoopAmount<1){LoopAmount = 1}
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
                    visualization.setColor("savedPiano", kandinsky.getNormalizedTone(), kandinsky.getNormalizedOctave())
                    visualization.createVisualAbsNote("savedPiano", kandinsky.getPitchEnergy(), kandinsky.getPitchWidth()*NoteInterval*i, kandinsky.getPitchHeight())
                    visualization.createConnectionLine("savedPiano")
                }
            Pictured=true;
            }
        }else{ //Pictured
            console.log("What Should We Do In this State?");
            visualization.counterTimer.reset();
            // visualization.MoveNowLocation(kandinsky.getPitchWidth())
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
        // visualization.createNowLocation(kandinsky.getPitchWidth())
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
                visualization.setColor("savedPiano", kandinsky.getNormalizedTone(), kandinsky.getNormalizedOctave())
                visualization.createVisualAbsNote("savedPiano", kandinsky.getPitchEnergy(), kandinsky.getPitchWidth()*NoteInterval*i, kandinsky.getPitchHeight())
                // console.log("Create Mesh!!", CurrentIndex, LastIndex, CurrentKeyboardPitch);
                visualization.createConnectionLine("savedPiano")
            }
        }
    }
    if (!bpmTimer.isUnderFourBeat()) {
        console.log("this time");
        visualization.reset();
        visualization.createProgressBar(10,(0.8, 0.5, 0.5),0.6)
        // visualization.createNowLocation(kandinsky.getPitchWidth())
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
                    visualization.setColor("savedPiano", kandinsky.getNormalizedTone(), kandinsky.getNormalizedOctave())
                    visualization.createVisualAbsNote("savedPiano", kandinsky.getPitchEnergy(), kandinsky.getPitchWidth()*NoteInterval*i, kandinsky.getPitchHeight())
                    // console.log("Create Mesh!!", CurrentIndex, LastIndex, CurrentKeyboardPitch);
                    visualization.createConnectionLine("savedPiano")
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
                        visualization.setColor("savedPiano", kandinsky.getNormalizedTone(), kandinsky.getNormalizedOctave())
                        visualization.createVisualAbsNote("savedPiano", kandinsky.getPitchEnergy(), kandinsky.getPitchWidth()*NoteInterval*i, kandinsky.getPitchHeight())
                        // console.log("Create Mesh!!", CurrentIndex, LastIndex, CurrentKeyboardPitch);
                        visualization.createConnectionLine("savedPiano")
                    }
            }
        }

    } else if (bpmTimer.isUnderFourBeat()) {
        if(progressTimer.getPlayed()){
        // visualization.MoveNowLocation(kandinsky.getPitchWidth());
        visualization.moveProgressBar(kandinsky.getPitchWidth())

        }
    }
    //     if (WritingMusicSheet.getKeyboardEnergy() > 0 && (WritingMusicSheet.isCurrentIndexUpdated())) {
    //         let pitchAndEnergy = switcher.getPitchAndEnergy(
    //             WritingMusicSheet.getKeyboardPitch(),
    //             WritingMusicSheet.getKeyboardEnergy(),
    //             WritingMusicSheet.getKeyboardNote()
    //         )
    //         kandinsky.calculate(pitchAndEnergy);
    //         visualization.setColor("piano", kandinsky.getNormalizedTone(), kandinsky.getNormalizedOctave())
    //         visualization.createVisualNote("piano", kandinsky.getPitchEnergy(), kandinsky.getPitchWidth(), kandinsky.getPitchHeight())
    //         // console.log("Create Mesh!!", CurrentIndex, LastIndex, CurrentKeyboardPitch);
    //         visualization.createConnectionLine("piano")
    //     }
    }
    visualization.render();
    visualization.update();
    stats.end();
    // WritingMusicSheet.setLastIndex(WritingMusicSheet.getCurrentIndex())
}


//callback for each Instrument 
//drum class must have the same getPitch Energy, getPitchWidth and getPitchHeight Functions. 
function draw(pitch, energy, midi) {
    let pitchAndEnergy = switcher.getPitchAndEnergy(pitch, energy, midi);
    kandinsky.calculate(pitchAndEnergy);
    //myThree.createColor(kandinsky.getNormalizedTone(), kandinsky.getNormalizedOctave())
    visualization.createVisualNote("piano", kandinsky.getPitchEnergy(), kandinsky.getPitchWidth(), kandinsky.getPitchHeight())
    visualization.createConnectionLine("piano")
}
document.body.appendChild(stats.dom);
