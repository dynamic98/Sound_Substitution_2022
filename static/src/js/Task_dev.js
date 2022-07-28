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
//bloom length 
let visualization = new Visualization(1)
let progressTime = 15;
let progressTimer = new ProgressTimer(progressTime, document.getElementById("ProgressBar"));

let piano = new Piano("pianoContainer");

let Task1Sheet = [
{keyboard_pitch: {frequency: 0, confidence: 1, note:    0,   midi: 0} , keyboard_energy:  0, drum_pitch: {frequency: 0, confidence: 1, note: 0, midi: 0}, drum_energy: 0},
{keyboard_pitch: {frequency: 0, confidence: 1, note: 'E4',  midi: 64} , keyboard_energy: 50, drum_pitch: {frequency: 0, confidence: 1, note: 0, midi: 0}, drum_energy: 0},
{keyboard_pitch: {frequency: 0, confidence: 1, note: 'B4',  midi: 71} , keyboard_energy: 50, drum_pitch: {frequency: 0, confidence: 1, note: 0, midi: 0}, drum_energy: 0},
{keyboard_pitch: {frequency: 0, confidence: 1, note: 'F4',  midi: 65} , keyboard_energy: 50, drum_pitch: {frequency: 0, confidence: 1, note: 0, midi: 0}, drum_energy: 0},
{keyboard_pitch: {frequency: 0, confidence: 1, note: 'C6',  midi: 84} , keyboard_energy: 50, drum_pitch: {frequency: 0, confidence: 1, note: 0, midi: 0}, drum_energy: 0},
{keyboard_pitch: {frequency: 0, confidence: 1, note: 'C5',  midi: 72} , keyboard_energy: 50, drum_pitch: {frequency: 0, confidence: 1, note: 0, midi: 0}, drum_energy: 0},
{keyboard_pitch: {frequency: 0, confidence: 1, note: 'F#4', midi: 66} , keyboard_energy: 50, drum_pitch: {frequency: 0, confidence: 1, note: 0, midi: 0}, drum_energy: 0},
{keyboard_pitch: {frequency: 0, confidence: 1, note: 'E4',  midi: 64} , keyboard_energy: 50, drum_pitch: {frequency: 0, confidence: 1, note: 0, midi: 0}, drum_energy: 0},
{keyboard_pitch: {frequency: 0, confidence: 1, note: 'E4',  midi: 64} , keyboard_energy: 50, drum_pitch: {frequency: 0, confidence: 1, note: 0, midi: 0}, drum_energy: 0},
{keyboard_pitch: {frequency: 0, confidence: 1, note: 'A4',  midi: 69} , keyboard_energy: 50, drum_pitch: {frequency: 0, confidence: 1, note: 0, midi: 0}, drum_energy: 0},
{keyboard_pitch: {frequency: 0, confidence: 1, note: 'C#4', midi: 61} , keyboard_energy: 50, drum_pitch: {frequency: 0, confidence: 1, note: 0, midi: 0}, drum_energy: 0},
]
let MusicLength = Task1Sheet.length;
let WritingMusicSheet = new MusicSheet(MusicLength);
let TaskMusicSheet = new MusicSheet(MusicLength);
TaskMusicSheet.setMusicSheet(Task1Sheet);
let AbsCount, LoopAmount, TotalCount, NoteInterval, OneLoopMusicLength, LoopCount, LoopRemainder;

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

    piano.assignEventOnPianoRow("mousedown", draw, WritingMusicSheet.setMusicArray, 1, 4)
    piano.assignEventOnPianoRow("mousedown", draw, WritingMusicSheet.setMusicArray, 2, 5)
    piano.assignEventOnPianoRow("mousedown", draw, WritingMusicSheet.setMusicArray, 3, 6)

    AbsCount = AbsolutePosition(bpmTimer.getFourBeatTime());
    LoopAmount = progressTime*1000 / bpmTimer.getFourBeatTime();
    // if(LoopAmount<1){LoopAmount = 1}
    TotalCount = AbsCount*LoopAmount;
    NoteInterval = TotalCount/MusicLength;
    OneLoopMusicLength = Math.floor(MusicLength/LoopAmount)
    if(OneLoopMusicLength>MusicLength){OneLoopMusicLength=MusicLength};
    LoopRemainder = MusicLength%OneLoopMusicLength
    LoopCount = 0;
    update();
}

function update() {
    stats.begin()
    requestAnimationFrame(update);
    WritingMusicSheet.setCurrentIndex(Math.floor(progressTimer.getThisSeconds() / (15000/MusicLength)))
    if (!progressTimer.getPlayed()){
        visualization.reset();
        bpmTimer.restart()
        // visualization.createNowLocation(kandinsky.getPitchWidth())
        LoopCount = 0;
        console.log(OneLoopMusicLength);
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
        }
        
        
    //     console.log(WritingMusicSheet.getMusicSheetPitch());
    } else if(progressTimer.getThisSeconds()==15000){
        progressTimer.played = false;
        progressTimer.element.value = "0"
    } else{ //progressTimer.getPlayed()==true
    if (progressTimer.getThisSeconds()==0){
        visualization.reset();
        bpmTimer.restart()
        visualization.createNowLocation(kandinsky.getPitchWidth())
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
        visualization.createNowLocation(kandinsky.getPitchWidth())
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
        visualization.MoveNowLocation(kandinsky.getPitchWidth());
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
