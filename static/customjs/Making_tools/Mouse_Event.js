
let selecting = false
let selected_className=''
let time=32
let pitch=24
let melody_canvas = new Array(time)

const tp_grid = document.getElementById('full_grid')
init()
function init(){
    for (var i=0; i<time; i++){
        melody_canvas[i]=new Array(pitch)
        for (var j=0; j<pitch; j++){
            // melody_canvas[i][j]=[0]
            melody_canvas[i][j]=[parseInt(0)]
        }
    }
}

tp_grid.onclick=function(e){
    selected_className = e.path[0].className
    logging(selected_className)
}
tp_grid.onmousedown=function(e){
    selecting = true
    selected_className = e.path[0].className
    logging(selected_className)
}
tp_grid.onmousemove=function(e){
    if(selecting==true){      
      selected_className = e.path[0].className
      logging(selected_className)
    }
}
tp_grid.onmouseup=function(e){
    selecting=false
}

function logging(cord){
    if (String(cord).includes('_')){
        var splited_cord = cord.split('_')
        var t_position= splited_cord[0].replace('t', '')
        var p_position=splited_cord[1].replace('p', '')
        melody_canvas[t_position-1][p_position-1]=parseInt(melody_canvas[t_position-1][p_position-1])+1
        // color_change(cord, t_position, p_position)
    }
    set_color()
}

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

function set_color(){
    for (var i=0; i<time; i++){
        for(var j=0; j<pitch; j++){
            let el_classname="t"+(i+1).toString()+"_p"+(j+1).toString()
            let el =document.getElementsByClassName(el_classname)
            var color=(j*30).toString()
            var satuation=melody_canvas[i][j]*35
            if(melody_canvas[i][j]!=0){
                el[0].style.background='hsl('+color+', '+satuation+'%, 70%)';
                console.log(color, satuation, melody_canvas)
            }
        }
    }

}
