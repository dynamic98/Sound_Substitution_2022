// import * as Tone from "../";

let selecting = false
let selected_className=''
let time=32
let pitch=24
let speed=2
let melody_canvas = new Array(time)
let painting_mode= true
let note=16
let beat=3

// let instrument=["piano", "guitar", "marimba"]
let emotion=["happy", "sad", "exciting", "peaceful"]
let palette=["palette1", "palette2", "palette3", "palette4", "palette5", "palette6"]
let shape=["rectangle", "circle", "triangle","hexagon", "star"]
let volume=["volume1", "volume2", "volume3"]

// 값 받아오기 전 디폴트값 설정 
let emotion_setted="happy"
let palette_setted="palette1"
let shape_setted="triangle"
let volume_setted="volume1"


let tool=["restart", "paint", "erase"]
let playcontrol=["play", "convert"]
let pitch_dict={1:"C4", 2:"C#4",3:"D4",4:"D#4",5:"E4",6:"F4",7:"F#4",8:"G4",9:"G#4",10:"A4",11:"A#4",12:"B4",
                13:"C5", 14:"C#5",15:"D5",16:"D#5",17:"E5",18:"F5",19:"F#5",20:"G5",21:"G#5",22:"A5",23:"A#5",24:"B5"};

const tp_grid = document.getElementById('full_grid')
const synth = new Tone.Synth().toDestination();
const drum = new Tone.Synth().toDestination();
// const piano_inst=new Tone.Piano().toDestination();

init();
function init(){
    // Tone.start()
    for (var i=0; i<time; i++){
        melody_canvas[i]=new Array(pitch)
        for (var j=0; j<pitch; j++){
            // melody_canvas[i][j]=[0]
            melody_canvas[i][j]=parseInt(0)
            let el_classname="t"+(i+1).toString()+"_p"+(j+1).toString()
            let el =document.getElementsByClassName(el_classname)
            // el[0].textContent="★"
            // el[0].style.fontSize="30px"
            // el[0].style="font-size:px; text-align:center;"
            // el[0].draggable="false"
            
            el[0].style.color="rgb(65, 63, 63)"
            el[0].style.background="black"
            // el[0].style.border="dotted"
            // el[0].style.borderWidth ="0.01em"
            // el[0].style="-webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none;  user-select: none;"
            
        }
    }
}

tp_grid.onclick=function(e){
    let selected_className = e.path[0].className
    console.log(selected_className)
    // if(selected_className.includes('glyphicon')){
    //     let selected_id=e.path[0].id
    //     console.log(selected_id)
    //     logging(selected_id)
    // }
    // else 
    if((selected_className.includes('_'))&&(selected_className!="menu_left")&&(selected_className!="menu_right")){
        logging(selected_className)
    }else if (selected_className!="container"){
        let selected_id=e.path[0].id
        if (emotion.includes(selected_id)){
            set_emotion(selected_id)
        }
        if (tool.includes(selected_id)){
            set_tool(selected_id)
        }
        if(playcontrol.includes(selected_id)){
            set_playcontrol(selected_id)
        }
        if(volume.includes(selected_id)){
            // set_volume(selected_id)
            volume_setted=selected_id
        }
    }
}
tp_grid.onmousedown=function(e){
    
    selecting = true
    selected_className = e.path[0].className
    // if(selected_className.includes('glyphicon')){
    //         let selected_id=e.path[0].id
    //         console.log(selected_id)
    //         logging(selected_id)
    //     }
    // else 
    if((selected_className.includes('_'))&&(selected_className!="menu_left")&&(selected_className!="menu_right")){
        logging(selected_className)
    }
    // if(selected_className.includes('glyphicon')){
    //     let selected_id=e.path[0].id
    //     console.log(selected_className, selected_id)
    //     logging(selected_id)
    // }
}
tp_grid.onmousemove=function(e){
   
    selected_className = e.path[0].className
    // if((selecting==true)&&selected_className.includes('glyphicon')){
    //         let selected_id=e.path[0].id
    //         console.log(selected_id)
    //         logging(selected_id)
    // }
    // else 
    if((selecting==true)&&(selected_className.includes('_')&&(selected_className!="menu_left")&&(selected_className!="menu_right"&&(selected_className!="blank_bottom")))){
        // console.log(selected_className, e.path[0].id)
        logging(selected_className)
    }
    // if((selecting==true)&&selected_className.includes('glyphicon')){
    //     let selected_id=e.path[0].id
    //     console.log(selected_className , selected_id)
    //     logging(selected_id)
    // }
}
tp_grid.onmouseup=function(e){
    selecting=false
}

// 선택된 그리드 값 반환하여 logging 
function logging(cord){
    // console.log(cord)
    if (String(cord).includes('_')){
        var splited_cord = cord.split('_')
        var t_position= splited_cord[0].replace('t', '')
        var p_position=splited_cord[1].replace('p', '')
        if (painting_mode==true){
            for(let i=0; i<24; i++){
                if(i==parseInt(p_position-1)){
                    continue;
                }
                if(melody_canvas[parseInt(t_position)-1][i]!=0){
                    melody_canvas[parseInt(t_position)-1][i]=0
                }
            }
            melody_canvas[t_position-1][p_position-1]=parseInt(melody_canvas[t_position-1][p_position-1])+1
        }
        else if(painting_mode==false){
            melody_canvas[t_position-1][p_position-1]=parseInt(0)
        }
        // console.log(cord, melody_canvas[t_position-1][p_position-1])
        // color_change(cord, t_position, p_position)
    }
    
    // set_shade(t_position, p_position)
    // set_color(cord)
    color_explore(cord)
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

function color_explore(cord){
    for (var i=0; i<time; i++){
        for(var j=0; j<pitch; j++){
            let el_classname="t"+(i+1).toString()+"_p"+(j+1).toString()
            let el =document.getElementsByClassName(el_classname)
            // var satu=((j+1)*8).toString()
            var color=30*j
            el[0].style.background='hsl('+color+', 100%, 50%)'
        
            }
        }
    }



// 색 횟수에 따라 saturation 변화 O
function set_color(cord){
    for (var i=0; i<time; i++){
        for(var j=0; j<pitch; j++){
            let el_classname="t"+(i+1).toString()+"_p"+(j+1).toString()
            let el =document.getElementsByClassName(el_classname)
            var color=(j*30).toString()
            // var satuation='100'
            // var satuation=melody_canvas[i][j]*35
            if(melody_canvas[i][j]!=0){
                // el[0].textContent="★"
                // el[0].innerHTML="<p style='draggable=false'>★</p>"
                // el[0].innerHTML="<img src='../../static/images/emotion/shy.png' style='width:40px ;height:40px;'>"
                var added_style="transform:rotate(90deg)"
                // if (shape_setted=="triangle"){
                //     added_style="transform:rotate(-90deg)"                    
                // }
                var inner="<div 'id="+cord+"gly' class='glyphicon glyphicon-inbox' style='margin-left:"+15/parseInt(volume_setted[6])+"px; margin-top:"+10/parseInt(volume_setted[6])+"px; "+added_style+"'></div>"
                el[0].innerHTML=inner
                
                el[0].style.fontSize=parseInt(volume_setted[6])*9+"px"
                el[0].style.color='hsl('+color+', 100%, 70%)'
                el[0].style.background='hsl('+color+', 20%, 20%)'
                // el[0].style.background="black"

                el[0].style.border="dotted"
                el[0].style.borderWidth ="0.01em"
            }if(melody_canvas[i][j]==parseInt(0)){
                el[0].textContent=""
                el[0].style.color="rgb(65, 63, 63)"
                el[0].style.background='black';
                el[0].style.border="dotted"
                el[0].style.borderWidth ="0.01em"
            }
        }
    }
}

function set_shade(i, j){
    // console.log(i, j)
    let el_classname="t"+(i+1).toString()+"_p"+(j+1).toString()
    let el =document.getElementsByClassName(el_classname)
    console.log(i, j, el[0])
    el[0].textContent="★"
    el[0].style="font-size:15px; text-align:center;"
    
    // let createdCanvas=document.createElement('canvas')
    // el[0].appendChild(createdCanvas)
    // console.log(createdCanvas)
    // let ctx=createdCanvas.getContext("2d")
    // ctx.beginPath();
    // ctx.arc(5, 5, 0.5, 0, 2*Math.PI)
    // ctx.stroke()
    // el[0].appendChild(createdCanvas)
}

function set_emotion(emo){
    emotion_setted=emo
    // palette_setted=""
    // shape_setted=""
    // let shape=["rectangle", "circle", "triangle","hexagon", "star"]
    // rectangle - stop 
    // circle cd
    // triangle - play transform rotate(-90deg); 또는 triangle-top  
    // hexagon - certificate
    // star - star 
    
}

function set_tool(tool){
    if (tool=="paint"){
        // let mode_button=document.getElementById('paint')
        // mode_button.style.animation='blink'
        painting_mode=true
    }
    if(tool=="erase"){
        painting_mode=false
    }
    if (tool=="restart"){
        init()
        // console.log(melody_canvas)
        set_color()
    }
}


function playPiano(time, pitch_num, counter){
    if (counter=="initial"){
        Tone.start()
    }
    else{
        Tone.start()
        let now=Tone.now()

        synth.triggerAttackRelease(pitch_dict[pitch_num], note.toString()+'n', now+time/5)
        // let el_classname="t"+(time).toString()+"_p"+(pitch_num).toString()
        // let el =document.getElementsByClassName(el_classname)
        // el[0].style.background='white'
        // el[0].style.background='black'
    }
        

}

function playDrum(time, type){
    Tone.start()
    let now=Tone.now()
    let drum_pitch="C2"
    if (type==2){
        drum_pitch="E2"        
    }
    drum.triggerAttackRelease(drum_pitch, note.toString()+'n', now+time/5)
}

// requestAnimationFrame

// function animate(){
//     requestAnimationFrame(animate);

// }





function set_playcontrol(play_controller){
    if(play_controller=="play"){
        console.log(melody_canvas)
        playPiano(0, 0, "initial")
        for(var i=0; i<time; i++){
            let current_melody=melody_canvas[i]
            // if(i%beat==0){
            //     playDrum(i, 1)
            // }else{
            //     playDrum(i, 2)
            // }
            for(var j=0; j<pitch; j++){
                let current_pitch=current_melody[j]
                if (current_pitch!='0'){
                    playPiano(i+1, j+1, current_pitch)
                    // let el_classname="t"+(i+1).toString()+"_p"+(j+1).toString()
                    // let el =document.getElementsByClassName(el_classname)
                    // el[0].style.background='black'
                    
                }
            }
            
        }
    }
    // if(play_controller=="stop"){
    // }
    if(play_controller=="convert"){

    }
}