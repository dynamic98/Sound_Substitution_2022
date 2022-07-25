// import * as Tone from "tone";
import {
    MyThree
} from './Viz/MyThree.js';
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
    SliderCustomization
} from './Customization/SliderCustomization.js'
import {
    Piano
} from './Customization/Piano.js'

let geometryButtons = new ButtonCustomization("shapeContainer", "btn-")
let materialSliders = new SliderCustomization("materialContainer")

let myThree = new MyThree("circle");
let kandinsky;
let bpmTimer = new BPMTimer();
let stats = new Stats();
let piano = new Piano("pianoContainer");

let switcher = new Switcher();


main();

function main() {
    myThree.initialize();
    kandinsky = new Kandinsky(50, 1);
    bpmTimer.setBPM(50);

    geometryButtons.assignEventHandler("click", myThree.switchGeometry)
    materialSliders.assignEventHandler("change", myThree.setMateriaParamaters)
    piano.assignEventOnPianoRow("mousedown", "mouseup", 1, 4)
    piano.assignEventOnPianoRow("mousedown", "mouseup", 2, 5)

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    stats.begin()
    if (!bpmTimer.isUnderFourBeat()) {
        myThree.reset();
    }
    //under 4 beat = calculate and create Geomtry 
    else if (bpmTimer.isUnderFourBeat() & piano.isPlaying()) {


        let pitchAndEnergy = switcher.getPitchAndEnergy(piano.getAudioData(), piano.getEnergy(), piano.getPitch());


        kandinsky.calculate(pitchAndEnergy);
        myThree.createColor(kandinsky.getNormalizedTone(), kandinsky.getNormalizedOctave())
        myThree.createMesh(kandinsky.getPitchEnergy(), kandinsky.getPitchWidth(), kandinsky.getPitchHeight())
        myThree.pickGlowReceivers(1);
    }
    myThree.render();
    myThree.update();
    stats.end()
}

document.body.appendChild(stats.dom);



