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
    pitchBeatSwitcher
}
from './forUI/pitchBeatSwitcher.js'

import {
    FiniteStateMachine
} from './Utility/FiniteStateMachine.js'



pitchBeatSwitcher()

let geometryButtons = new ButtonCustomization("shapeContainer", "btn btn-primary", "btn-")
let textureButtons = new ButtonCustomization("shapeContainer", "textureButton")
let pitchslide = new SlideCustomization("visualContainer_pitch", "customMenu", "range")

let kandinsky;
let bpmTimer = new BPMTimer();
let stats = new Stats();
let switcher = new Switcher();
let visualization = new Visualization(1)
let progressTimer = new ProgressTimer(15, document.getElementById("ProgressBar"));
let MusicLength = 50;
let musicSheet = new MusicSheet(MusicLength);
let piano = new Piano("pianoContainer");

main()

function main() {
    bpmTimer.setBPM(100)
    bpmTimer.setBPMByMeshCount(20)
    kandinsky = new Kandinsky(bpmTimer.getBPM(), 1);
    piano.setNoteDuration(300);
    visualization.createProgressBar(5, "#0000FF", 0.4)

    //event handler
    //---------------------------------------------------------------
    $("input[class=checkbox]").change(() => {
        visualization.setConnectionLineVisibility($(".checkbox")[0].checked)
    })
    geometryButtons.assignEventHandler("click", visualization.setGeometryType)
    textureButtons.assignEventHandler("click", visualization.setTexture)
    pitchslide.assignEventHandler("click", (para, value) => {
        if (para == "slide-pitch-interval") {
            kandinsky.setRange(value)
        } else if (para == "slide-pitch-size") {
            piano.setCurrentEnergy(value)
        }
    })
    piano.assignEventOnPianoRow("mousedown", draw, musicSheet.setMusicArray, 1, 4)
    piano.assignEventOnPianoRow("mousedown", draw, musicSheet.setMusicArray, 2, 5)
    piano.assignEventOnPianoRow("mousedown", draw, musicSheet.setMusicArray, 3, 6)
    //---------------------------------------------------------------
    update();
}


function update() {
    stats.begin()
    requestAnimationFrame(update);

    musicSheet.setCurrentIndex(Math.round(progressTimer.getThisSeconds() / (15000 / MusicLength)))

    if ((musicSheet.getCurrentIndex() == 0) && musicSheet.isCurrentIndexUpdated()) {
        visualization.reset();
        bpmTimer.restart()

    }
    if (!bpmTimer.isUnderFourBeat()) {
        visualization.reset();

    } else if (bpmTimer.isUnderFourBeat()) {
        if (musicSheet.getKeyboardEnergy() > 0 && (musicSheet.isCurrentIndexUpdated())) {
            let pitchAndEnergy = switcher.getPitchAndEnergy(
                musicSheet.getKeyboardPitch(),
                musicSheet.getKeyboardEnergy(),
                musicSheet.getKeyboardNote()
            )
            kandinsky.calculate(pitchAndEnergy);
            visualization.setColor("savedPiano", kandinsky.getNormalizedTone(), kandinsky.getNormalizedOctave())
            visualization.createVisualNote("savedPiano", kandinsky.getPitchEnergy(), kandinsky.getPitchWidth(), kandinsky.getPitchHeight())
            // console.log("Create Mesh!!", CurrentIndex, LastIndex, CurrentKeyboardPitch);

        }
    }
    visualization.moveProgressBar(1);
    visualization.render();
    visualization.update();
    stats.end();
    musicSheet.setLastIndex(musicSheet.getCurrentIndex())
}


//callback for each Instrument 
//drum class must have the same getPitch Energy, getPitchWidth and getPitchHeight Functions. 
function draw(pitch, energy, midi) {
    let pitchAndEnergy = switcher.getPitchAndEnergy(pitch, energy, midi);
    kandinsky.calculate(pitchAndEnergy);
    //myThree.createColor(kandinsky.getNormalizedTone(), kandinsky.getNormalizedOctave())
    visualization.createVisualNote("piano", kandinsky.getPitchEnergy(), kandinsky.getPitchWidth(), kandinsky.getPitchHeight())

}