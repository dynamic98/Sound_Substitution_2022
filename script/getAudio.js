import { file as target} from './modules.js';
let realTitle = document.getElementById('title');

function titleAudio(){
    // target = document.getElementById('thefile');
    target.addEventListener('change', function(){
        var fileList = target.files[0].name;
        realTitle.innerText = fileList;
    });
}

const button = document.getElementById("thefile");
button.addEventListener('click', titleAudio);