// import * as Tone from "tone";
import {
    Visualization
} from './Viz/Visualization.js'
import {
    Kandinsky
} from './Viz/Kandinsky.js'
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

let geometryButtons = new ButtonCustomization("shapeContainer", "btn btn-primary", "btn-")
let textureButtons = new ButtonCustomization("shapeContainer", "textureButton")

let kandinsky;
let bpmTimer = new BPMTimer();
let stats = new Stats();
let switcher = new Switcher();
let visualization = new Visualization()

document.body.appendChild(stats.dom);

let MyProgressTimer = new ProgressTimer(15, document.getElementById("ProgressBar"));
let MyMusicSheet = new MusicSheet(50);
let piano = new Piano("pianoContainer", MyMusicSheet, MyProgressTimer);
let LastIndex = -1;


main()

function main() {
    visualization.initialize();

    bpmTimer.setBPM(100)
    bpmTimer.setBPMByMeshCount(20)
    kandinsky = new Kandinsky(bpmTimer.getBPM(), 1);
    piano.setNoteDuration(300);

    geometryButtons.assignEventHandler("click", visualization.setGeometryType)
    textureButtons.assignEventHandler("click", visualization.setTexture)
    piano.assignEventOnPianoRow("click", draw, 1, 4)
    piano.assignEventOnPianoRow("click", draw, 2, 5)

    update();
}

function update() {
    stats.begin()

    requestAnimationFrame(update);

    let CurrentIndex = Math.round(MyProgressTimer.getThisSeconds() / 300)
    if (CurrentIndex == 50) {
        CurrentIndex = 0;
    }
    // console.log(CurrentIndex);
    // console.log(MyProgressTimer.getThisSeconds(), Math.round(MyProgressTimer.getThisSeconds()/375));
    // console.log(CurrentIndex, MyMusicSheet.getMusicArray(CurrentIndex));
    let CurrentMusicArray = MyMusicSheet.getMusicArray(CurrentIndex)
    let CurrentKeyboardPitch = CurrentMusicArray.keyboard_pitch
    let CurrentKeyboardEnergy = CurrentMusicArray.keyboard_energy
    let CurrentKeyboardNote = CurrentKeyboardPitch.midi % 12


    if (!bpmTimer.isUnderFourBeat()) {
        visualization.reset();
    } else if (bpmTimer.isUnderFourBeat()) {
        if (CurrentKeyboardEnergy > 0 && (CurrentIndex != LastIndex)) {
            let pitchAndEnergy = switcher.getPitchAndEnergy(CurrentKeyboardPitch, CurrentKeyboardEnergy, CurrentKeyboardNote);
            kandinsky.calculate(pitchAndEnergy);
            visualization.setColor(kandinsky.getNormalizedTone(), kandinsky.getNormalizedOctave())
            visualization.createVisualNote(kandinsky.getPitchEnergy(), kandinsky.getPitchWidth(), kandinsky.getPitchHeight())
            console.log("Create Mesh!!", CurrentIndex, LastIndex, CurrentKeyboardPitch);
            visualization.createConnectonLine()
        }
        // let pitchAndEnergy = switcher.getPitchAndEnergy(piano.getAudioData(), piano.getEnergy(), piano.getPitch());
    }
    visualization.render();
    visualization.update();
    stats.end();
    LastIndex = CurrentIndex;
}

function draw() {
    let pitchAndEnergy = switcher.getPitchAndEnergy(piano.getAudioData(), piano.getEnergy(), piano.getPitch());
    kandinsky.calculate(pitchAndEnergy);
    //myThree.createColor(kandinsky.getNormalizedTone(), kandinsky.getNormalizedOctave())
    visualization.createVisualNote(kandinsky.getPitchEnergy(), kandinsky.getPitchWidth(), kandinsky.getPitchHeight())
    visualization.createConnectonLine()
}

document.body.appendChild(stats.dom);