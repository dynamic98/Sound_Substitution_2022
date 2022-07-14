
let selecting = false
let selected_className=''

const tp_grid = document.getElementById('full_grid')


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
        // console.log(t_position, p_position)
        color_change(cord, t_position, p_position)
    }
}

function color_change(tar_class_name, t, p){
    var el = document.getElementsByClassName(tar_class_name);
    let ContainerName = document.getElementsByClassName('container');
    // console.log(el[0]);
    if(el!=ContainerName){
        var color=(t*30).toString()
        // console.log(color
        console.log(p, t)
        // el[0].style.background = 'blue'
        // hsl
        el[0].style.background= 'hsl('+color+', 70%, 40%)';
        // color:hsl(0, 70%, 40%)
    }
}

// document.onclick=function(e){
//     var class_name_is = e.class_name
//     console.log(class_name_is)
// }

// function tp_cord(event){
//     // console.log("(x, y) : ", x, y)
//     var class_name = event.class_name;
//     this.class_name
//     console.log(class_name)
// }

// const full_grid_canvas = document.getElementById('full_grid');

// full_grid_canvas.onmousedown = function(e){
//     selecting=true
//     let x = e.offsetX
//     let y = e.offsetY
//     console.log(x, y)
// }

// full_grid_canvas.onmouseup = function(e){
//     selecting=false
// }

// full_grid_canvas.onmousemove = function(e){
//     if (selecting==true){
//         let x = e.offsetX
//         let y = e.offsetY
//         console.log(x, y)
//     }

// }


// full_grid_canvas.addEventListener('mousedown', (GetGridPosition) => {
//     selecting = true
//     console.log("mousedown")
//     GetGridPosition();
// });

// full_grid_canvas.addEventListener('mousemove', (event)=>{
//     if (selecting==true){
//         console.log("selecting")
//     }
// });

// full_grid_canvas.addEventListener('mouseup', (event) => {
//     console.log("mouseup")
//     selecting = false
// });

