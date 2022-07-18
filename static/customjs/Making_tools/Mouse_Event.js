// import * as Tone from "../";
let selecting = false
let selected_className=''
let time=32
let pitch=24
let speed=2
let melody_canvas = new Array(time)
let painting_mode= true

let instrument=["piano", "guitar", "marimba"]
let tool=["restart", "paint", "erase", "save"]
let playcontrol=["play", "stop"]
let pitch_dict={1:"C4", 2:"C#4",3:"D4",4:"D#4",5:"E4",6:"F4",7:"F#4",8:"G4",9:"G#4",10:"A4",11:"A#4",12:"B4",
                13:"C5", 14:"C#5",15:"D5",16:"D#5",17:"E5",18:"F5",19:"F#5",20:"G5",21:"G#5",22:"A5",23:"A#5",24:"B5"};

const tp_grid = document.getElementById('full_grid')
const synth = new Tone.Synth().toDestination();
init();
function init(){
    // Tone.start()
    for (var i=0; i<time; i++){
        melody_canvas[i]=new Array(pitch)
        for (var j=0; j<pitch; j++){
            // melody_canvas[i][j]=[0]
            melody_canvas[i][j]=[parseInt(0)]
            let el_classname="t"+(i+1).toString()+"_p"+(j+1).toString()
            let el =document.getElementsByClassName(el_classname)
            el[0].style.background="black"
        }
    }
}

tp_grid.onclick=function(e){
    let selected_className = e.path[0].className
    // console.log(selected_className, e.path[0].id)
    if((selected_className.includes('_'))&&(selected_className!="menu_left")&&(selected_className!="menu_right")){
        logging(selected_className)
    }else if (selected_className!="container"){
        let selected_id=e.path[0].id
        if (instrument.includes(selected_id)){
            set_instrument(selected_id)
        }
        if (tool.includes(selected_id)){
            set_tool(selected_id)
        }
        if(playcontrol.includes(selected_id)){
            set_playcontrol(selected_id)
        }
    }
}
tp_grid.onmousedown=function(e){
    selecting = true
    selected_className = e.path[0].className
    if((selected_className.includes('_'))&&(selected_className!="menu_left")&&(selected_className!="menu_right")){
        logging(selected_className)
    }
}
tp_grid.onmousemove=function(e){
    selected_className = e.path[0].className
    if((selecting==true)&&(selected_className.includes('_')&&(selected_className!="menu_left")&&(selected_className!="menu_right"))){
        logging(selected_className)
    }
}
tp_grid.onmouseup=function(e){
    selecting=false
}

// 선택된 그리드 값 반환하여 logging 
function logging(cord){
    if (String(cord).includes('_')){
        var splited_cord = cord.split('_')
        var t_position= splited_cord[0].replace('t', '')
        var p_position=splited_cord[1].replace('p', '')
        if (painting_mode==true){
            melody_canvas[t_position-1][p_position-1]=parseInt(melody_canvas[t_position-1][p_position-1])+1}
        else if(painting_mode==false){
            melody_canvas[t_position-1][p_position-1]=parseInt(0)}
        console.log(cord)
        // color_change(cord, t_position, p_position)
    }
    set_color()
}

// 색 saturation 변화 X
function color_change(tar_class_name, t, p){
    var el = document.getElementsByClassName(tar_class_name);
    let ContainerName = document.getElementsByClassName('container');
    // console.log(tar_class_name, t, p)
    // console.log(el[0]);
    if(el!=ContainerName){
        var color=(p*30).toString()
        el[0].style.background= 'hsl('+color+', 50%, 70%)';

    }
}
// 색 횟수에 따라 saturation 변화 O
function set_color(){
    for (var i=0; i<time; i++){
        for(var j=0; j<pitch; j++){
            let el_classname="t"+(i+1).toString()+"_p"+(j+1).toString()
            let el =document.getElementsByClassName(el_classname)
            var color=(j*30).toString()
            var satuation=melody_canvas[i][j]*35
            if(melody_canvas[i][j]!=0){
                el[0].style.background='hsl('+color+', '+satuation+'%, 70%)';
                // console.log(color, satuation, melody_canvas)
            }if(melody_canvas[i][j]==0){
                el[0].style.background='black';
            }
        }
    }

}

function set_instrument(inst){
    console.log(inst)
}

function set_tool(tool){
    // console.log(tool)

    if (tool=="paint"){
        let mode_button=document.getElementById('paint')
        // mode_button.style.animation='blink'
        painting_mode=true
    }
    if(tool=="erase"){
        painting_mode=false
    }
    if (tool=="restart"){
        init()
        console.log(melody_canvas)
        set_color()
    }
}


function playPiano(time, pitch_num, counter){
    
    Tone.start()
    let now=Tone.now()
    console.log("----------------------------------------------")
    console.log(time, pitch_num, pitch_dict[pitch_num], counter)
    // synth.triggerAttack(pitch_dict[pitch_num, now], time, counter)
    // synth.triggerRelease(now+100)
    synth.volume.value=counter*10
    synth.triggerAttackRelease(pitch_dict[pitch_num], '2n', now+time/10)
    // console.log(time, pitch_num, counter)
    // console.log(pitch_dict[pitch_num], now+time/10)
    
}

function set_playcontrol(play_controller){
    console.log(play_controller)
    if(play_controller=="play"){

        for(var i=0; i<time; i++){
            let current_melody=melody_canvas[i]
            for(var j=0; j<pitch; j++){
                let current_pitch=current_melody[j]
                if (current_pitch!='0'){
                    playPiano(i+1, j+1, current_pitch)
                }
            }
        }
    }
}
