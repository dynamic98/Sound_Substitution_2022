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


main();

function main() {
    visualization.initialize();
    kandinsky = new Kandinsky(50, 1);
    bpmTimer.setBPM(50);

    geometryButtons.assignEventHandler("click", visualization.getGeometryManager().setGeometryType)
    textureButtons.assignEventHandler("click", visualization.getTextureManager().setTexture)
    piano.assignEventOnPianoRow("mousedown", "mouseup", 1, 4)
    piano.assignEventOnPianoRow("mousedown", "mouseup", 2, 5)

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    stats.begin()
    if (!bpmTimer.isUnderFourBeat()) {
        visualization.reset();
    }
    //under 4 beat = calculate and create Geomtry 
    else if (bpmTimer.isUnderFourBeat() & piano.isPlaying()) {

        let pitchAndEnergy = switcher.getPitchAndEnergy(piano.getAudioData(), piano.getEnergy(), piano.getPitch());

        kandinsky.calculate(pitchAndEnergy);
        //myThree.createColor(kandinsky.getNormalizedTone(), kandinsky.getNormalizedOctave())
        visualization.createVisualNote(kandinsky.getPitchEnergy(), kandinsky.getPitchWidth(), kandinsky.getPitchHeight())
        
    }

    visualization.render();
    visualization.update();
    stats.end()
}

document.body.appendChild(stats.dom);