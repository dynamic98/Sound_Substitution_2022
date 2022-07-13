
let selecting = false

const full_grid_canvas = document.getElementById('full_grid');
full_grid_canvas.addEventListener('mousedown', (event) => {
    selecting = true
    console.log("mousedown")
});

full_grid_canvas.addEventListener('mousemove', (event)=>{
    if (selecting==true){
        console.log("selecting")
    }
});

full_grid_canvas.addEventListener('mouseup', (event) => {
    console.log("mouseup")
    selecting = false
});







