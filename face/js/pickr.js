import '@simonwep/pickr/dist/themes/classic.min.css';   // 'classic' theme
import '@simonwep/pickr/dist/themes/monolith.min.css';  // 'monolith' theme
import '@simonwep/pickr/dist/themes/nano.min.css';      // 'nano' theme
import Pickr from '@simonwep/pickr';

const pickr = Pickr.create({
    el: '.visualButtonColors',
    theme: 'monolith',
    useAsButton: true,
    position: 'right-end',
    defaultRepresentation: 'HEX',
    components: {
        // Main components
        preview: false,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            hsla: false,
            hsva: false,
            cmyk: false,
            input: true,
            clear: false,
            save: true
        }
    }
});

// 선택한 색상을 'save' 버튼을 누를 때만 console 에 출력하기
// HEXA code 로 저장
pickr.on('save', (color, instance) => {
    const userColor = color.toHEXA().toString();
    document.querySelector('#userCustom').innerHTML = userColor;
});


export { pickr };
