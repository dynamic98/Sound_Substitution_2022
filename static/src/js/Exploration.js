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

let geometryButtons = new ButtonCustomization("shapeContainer", "btn btn-primary", "btn-")
let textureButtons = new ButtonCustomization("shapeContainer", "textureButton")

let kandinsky;
let bpmTimer = new BPMTimer();
let stats = new Stats();
let piano = new Piano("pianoContainer");

let switcher = new Switcher();
let visualization = new Visualization()

document.body.appendChild(stats.dom);


main()

function main() {
    visualization.initialize();
    bpmTimer.setBPMByMeshCount(8)
    kandinsky = new Kandinsky(bpmTimer.getBPM(), 1);

    geometryButtons.assignEventHandler("click", visualization.setGeometryType)
    textureButtons.assignEventHandler("click", visualization.setTexture)
    piano.assignEventOnPianoRow("click", draw, 1, 4)
    piano.assignEventOnPianoRow("click", draw, 2, 5)

    update();
}

function update() {
    stats.begin()
    requestAnimationFrame(update);
    if (!bpmTimer.isUnderFourBeat()) {
        visualization.reset();
    } else {
        visualization.render();
        visualization.update();
    }
    stats.end();
}

function draw() {
    let pitchAndEnergy = switcher.getPitchAndEnergy(piano.getAudioData(), piano.getEnergy(), piano.getPitch());
    kandinsky.calculate(pitchAndEnergy);
    //myThree.createColor(kandinsky.getNormalizedTone(), kandinsky.getNormalizedOctave())
    visualization.createVisualNote(kandinsky.getPitchEnergy(), kandinsky.getPitchWidth(), kandinsky.getPitchHeight())
    visualization.createConnectonLine()
}