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
    PlayInstrument
} from './Utility/PlayInstrument.js'
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
import {
    QuestionSetTest
}
from './forUI/QuestionSet_Test.js'

const groupD_question = document.getElementById("question_groupD");
const groupD_submit = document.getElementById("submit_groupD");
const canvas = document.getElementById("canvas")

let choice_one = document.getElementById("question_one");
let choice_two = document.getElementById("question_two");
let choice_three = document.getElementById("question_three");
let choice_mola = document.getElementById("question_mola");

const red = '#c52828';
const grey = '#767676';

let groupD_count = 0;
let SelectedQuestion = 0;
let SelectedAnswer = 4;
let ChoiceList = [choice_one, choice_two, choice_three, choice_mola];
let LogData = []
let startTime = Date.now();

const groupD_questionList = [
    "1-1. 가장 낮은 음은 무엇인가요? 📣 ",
    "1-2. 가장 낮은 음은 무엇인가요? 🎨",
    "2-1. 가장 작은 소리는 무엇인가요? 📣 ",
    "2-2. 가장 작은 소리는 무엇인가요? 🎨",
    "3-1. 소리가 점점 낮아지는 멜로디는 무엇인가요? 📣 ",
    "3-2. 소리가 점점 낮아지는 멜로디는 무엇인가요? 🎨",
    "4-1. 소리가 점점 작아지는 멜로디는 무엇인가요? 📣 ",
    "4-2. 소리가 점점 작아지는 멜로디는 무엇인가요? 🎨",
    "5-1. 소리가 점점 느려지는 멜로디는 무엇인가요? 📣 ",
    "5-2. 소리가 점점 느려지는 멜로디는 무엇인가요? 🎨",
    "6-1. 소리가 점점 작아지면서 음이 올라가는 멜로디는 무엇인가요? 📣 ",
    "6-2. 소리가 점점 작아지면서 음이 올라가는 멜로디는 무엇인가요? 🎨",
    "7-1. 소리가 점점 느려지면서 음이 올라가는 멜로디는 무엇인가요? 📣 ",
    "7-2. 소리가 점점 느려지면서 음이 올라가는 멜로디는 무엇인가요? 🎨",
    "8-1. 소리가 점점 작아지면서 음이 느려지는 멜로디는 무엇인가요? 📣 ",
    "8-2. 소리가 점점 작아지면서 음이 느려지는 멜로디는 무엇인가요? 🎨",
    "9-1. 리듬의 변화가 가장 많은 멜로디는 무엇인가요? 📣 ",
    "9-2. 리듬의 변화가 가장 많은 멜로디는 무엇인가요? 🎨",
    "테스트가 끝났습니다."
]

let kandinsky;
let bpmTimer = new BPMTimer();
let stats = new Stats();
let switcher = new Switcher();
let bloom_length = 1
let visualization = new Visualization(bloom_length);
let progressTime = 5;
let progressTimer = new ProgressTimer(progressTime, document.getElementById("ProgressBar"));
let playinstrument = new PlayInstrument();
let questionset = new QuestionSetTest();

let SetD = questionset.getD();
let TaskSheet, MusicLength, TaskMusicSheet;
let AbsCount, LoopAmount, TotalCount, NoteInterval, OneLoopMusicLength, LoopCount, LoopRemainder, Pictured = false;
let MyUserCustom = new GetUserCustom();
let pitch_palette;

document.body.appendChild(stats.dom);

function MakeChoice(){
    ChoiceList.forEach(function (choice, index){
        choice.addEventListener("click", function(){
            SelectedAnswer = index+1;
            console.log("SelectedAnswer",SelectedAnswer);
            UpdateTaskSheet();
            LogData.push("Timestamp#"+(Date.now()-startTime).toString()+"#Action#"+"SelectedAnswer#"+SelectedAnswer.toString())

        })
    })
}

function submit_groupD(){
    groupD_submit.addEventListener("click", () => {
        LogData.push("Timestamp#"+(Date.now()-startTime).toString()+"#Action#"+"Submit#"+groupD_count.toString())
        groupD_count += 1
        if(groupD_count==18){
            console.log(LogData);
            groupD_question.innerText = groupD_questionList[18]
            let postdata = Object.assign({}, LogData)
            postdata.UserName = MyUserCustom.CustomObj.UserName;
            postdata.UserNumber = MyUserCustom.CustomObj.UserNumber
            postdata.TaskNum = "TestGroupD"
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

            // postdata
        }else if(groupD_count>18){
            console.log("You Should Not Encounter This State.")
        }else{
        SelectedQuestion = Math.floor(groupD_count/2)
        console.log(SelectedQuestion)
        SelectedAnswer = 4
        groupD_question.innerText = groupD_questionList[groupD_count]
        question_one.style.background = grey;
        question_two.style.background = grey;
        question_three.style.background = grey;
        question_mola.style.background = grey;

        if (groupD_count % 2 == 1) {
            canvas.style.visibility="visible";
        } else {
            canvas.style.visibility="hidden";
        }

        UpdateTaskSheet();
        }
    });
}

function UpdateTaskSheet(){
    if(SelectedAnswer!=4){
        console.log("UpdateTaskSheet")
        TaskSheet = SetD[SelectedQuestion][SelectedAnswer-1];
        MusicLength = TaskSheet.length;
        TaskMusicSheet = new MusicSheet(MusicLength);
        TaskMusicSheet.setMusicSheet(TaskSheet);
        main()
        progressTimer.pause();
        progressTimer.play();


    }else{
        TaskSheet = null;
        MusicLength = 0;
        TaskMusicSheet = null;
        progressTimer.pause();
        progressTimer.element.value = "0"
        visualization.reset();
        bpmTimer.restart()
    }
}

UpdateTaskSheet();
MakeChoice();
submit_groupD();
initialize();

main()

function initialize() {
    bpmTimer.setBPM(20)
    bpmTimer.setBPMByMeshCount(20)
    kandinsky = new Kandinsky(bpmTimer.getBPM(), 1);
    AbsCount = AbsolutePosition(bpmTimer.getFourBeatTime());
    apply_default_custom()
}


function main() {
    NoteInterval = AbsCount/MusicLength;
    LoopCount = 0;
    Pictured = false;
    // UpdateTaskSheet();
    visualization.reset();
    bpmTimer.restart()
    progressTimer.element.value = "0"
    progressTimer.played = true;

}

update();


function update() {
    stats.begin()
    requestAnimationFrame(update);
    if (TaskMusicSheet != null){
        TaskMusicSheet.setCurrentIndex(Math.floor(progressTimer.getThisSeconds() / (15000/MusicLength)))
        if (!progressTimer.getPlayed()){
            if(!Pictured){ // User first encounter this state
                visualization.reset();
                bpmTimer.restart()
                // visualization.createNowLocation(kandinsky.getPitchWidth())
                // visualization.createProgressBar(10,(0.8, 0.5, 0.5),0.6)
                LoopCount = 0;
                console.log(TaskMusicSheet)
                Pictured=true;
            }else{ //Pictured
                console.log("What Should We Do In this State?");
                visualization.counterTimer.reset();
                // visualization.moveProgressBar(kandinsky.getPitchWidth())

            }       
        } else if(progressTimer.getThisSeconds()==15000){ // End state
            progressTimer.played = false;
            progressTimer.element.value = "0"
            Pictured=false;

        } else{ //progressTimer.getPlayed()==true
        if (progressTimer.getThisSeconds()==0){
            visualization.reset();
            bpmTimer.restart()
            LoopCount = 0;

        }
        if (!bpmTimer.isUnderFourBeat()) {
            console.log("this time");
            visualization.reset();

        } else if (bpmTimer.isUnderFourBeat()) {
            if(TaskMusicSheet.isCurrentIndexUpdated()){
 
                if(TaskMusicSheet.getKeyboardEnergy()!=0){
                    let pitchAndEnergy = switcher.getPitchAndEnergy(
                            TaskMusicSheet.getKeyboardPitch(),
                            TaskMusicSheet.getKeyboardEnergy(),
                            TaskMusicSheet.getKeyboardNote()
                        )
                    // console.log(TaskMusicSheet.getMusicArray(TaskMusicSheet.getCurrentIndex()))
                    console.log(TaskMusicSheet.getKeyboardStringNote(), TaskMusicSheet.getKeyboardEnergy());
                    playinstrument.playPiano(TaskMusicSheet.getKeyboardStringNote(), TaskMusicSheet.getKeyboardEnergy())
                    // console.log("PitchAndEnergy", pitchAndEnergy);
                    kandinsky.calculate(pitchAndEnergy);
                    visualization.setColor("savedPiano", pitch_palette[kandinsky.tone][0], pitch_palette[kandinsky.tone][1], pitch_palette[kandinsky.tone][2])
                    visualization.createVisualAbsNote("savedPiano", kandinsky.getPitchEnergy(), kandinsky.getPitchWidth()*NoteInterval*TaskMusicSheet.getCurrentIndex(), kandinsky.getPitchHeight())
                    if(MyUserCustom.CustomObj.Piano.line){
                        visualization.createConnectionLine("savedPiano")
                    }
                }
                if(TaskMusicSheet.getDrumEnergy()!=0){
                    let pitchAndEnergy = switcher.getPitchAndEnergy(
                            TaskMusicSheet.getDrumPitch(),
                            TaskMusicSheet.getDrumEnergy(),
                            TaskMusicSheet.getDrumNote()
                        )
                    playinstrument.playDrum(TaskMusicSheet.getDrumEnergy())
            
                    console.log("DrumEnergy",TaskMusicSheet.getDrumEnergy(), "pitchAndEnergy", pitchAndEnergy)
                    kandinsky.calculate(pitchAndEnergy);
                    visualization.setColor("savedDrum", pitch_palette[kandinsky.tone][0], pitch_palette[kandinsky.tone][1], pitch_palette[kandinsky.tone][2])
                    visualization.createVisualAbsNote("savedDrum", kandinsky.getPitchEnergy(), kandinsky.getPitchWidth()*NoteInterval*TaskMusicSheet.getCurrentIndex(), kandinsky.getPitchHeight())
                    // if(MyUserCustom.CustomObj.Piano.line){
                    //     visualization.createConnectionLine("savedDrum")
                    // }
                }
            }
            }
        }
    TaskMusicSheet.setLastIndex(TaskMusicSheet.getCurrentIndex())
    }
    visualization.render();
    visualization.update();
    stats.end();

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
    visualization.instruments['piano'].geometryManager.setGeometryType(MyUserCustom.CustomObj.Piano.shape.toLowerCase())
    visualization.instruments['savedPiano'].geometryManager.setGeometryType(MyUserCustom.CustomObj.Piano.shape.toLowerCase())
    visualization.instruments['piano'].textureManager.texture = visualization.instruments['piano'].textureManager.textureObject[MyUserCustom.CustomObj.Piano.texture.toLowerCase()]
    visualization.instruments['savedPiano'].textureManager.texture = visualization.instruments['savedPiano'].textureManager.textureObject[MyUserCustom.CustomObj.Piano.texture.toLowerCase()]
    pitch_palette = parse_pitch_palette(MyUserCustom.CustomObj.Piano.palette_set)
    kandinsky.setRange(MyUserCustom.CustomObj.Piano.interval)

    visualization.instruments['drum'].geometryManager.setGeometryType(MyUserCustom.CustomObj.Drum.shape.toLowerCase())
    visualization.instruments['savedDrum'].geometryManager.setGeometryType(MyUserCustom.CustomObj.Drum.shape.toLowerCase())
    visualization.instruments['drum'].textureManager.texture = visualization.instruments['drum'].textureManager.textureObject[MyUserCustom.CustomObj.Drum.texture.toLowerCase()]
    visualization.instruments['savedDrum'].textureManager.texture = visualization.instruments['savedDrum'].textureManager.textureObject[MyUserCustom.CustomObj.Drum.texture.toLowerCase()]

}



// let postdata = Object.assign({}, WritingMusicSheet.getMusicSheet())

// $('#reset').click(function(){
//     WritingMusicSheet.resetMusicSheet();
//     // visualization.reset();
//     // progressTimer.played = true;
//     progressTimer.element.value = "0"
// })

// $('#save').click(function(){
//     let postdata = Object.assign({}, WritingMusicSheet.getMusicSheet())
//     postdata.UserName=MyUserCustom.CustomObj.UserName;
//     postdata.UserNumber=MyUserCustom.CustomObj.UserNumber;
//     let TaskNum = $('.task_num')[0].innerText;
//     // console.log(TaskNum);
//     postdata.TaskNum = TaskNum
//     WritingMusicSheet.resetMusicSheet();
//     $.ajax({
//         type: 'POST',
//         url: '/SaveUserDB',
//         data: JSON.stringify(postdata),
//         dataType : 'JSON',
//         contentType: "application/json",
//         success: function(data){
//             alert('DB 저장완료..')
//         },
//         error: function(request, status, error){
//             alert('ajax 통신 실패')
//             alert(error);
//         }
//     })

// })