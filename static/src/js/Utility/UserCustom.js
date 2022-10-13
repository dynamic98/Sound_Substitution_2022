$('#ExecuteJson').click(function(){
    // var left = $('#input-left').val();
    // var right = $('#input-right').val();
    let username = 'default_user';
    let usernumber = 10000;

    let piano_shape = 'Circle';
    let piano_texture = 'None';
    let piano_palette_num = 0;
    let piano_palette_set = ['hsl(0, 100%, 100%)', 'hsl(0, 100%, 100%)', 'hsl(0, 100%, 100%)', 'hsl(0, 100%, 100%)', 'hsl(0, 100%, 100%)', 'hsl(0, 100%, 100%)', 'hsl(0, 100%, 100%)', 'hsl(0, 100%, 100%)', 'hsl(0, 100%, 100%)', 'hsl(0, 100%, 100%)', 'hsl(0, 100%, 100%)', 'hsl(0, 100%, 100%)'];
    let piano_interval = 70;
    let piano_size = 50;
    let piano_line = true;

    let drum_shape = 'Circle';
    let drum_texture = 'None';
    let drum_color = 100;
    let drum_size = 50;

    let haptic_sensitivity = 0.8
    let haptic_intensity = 0.6

    var postdata = {
        'UserName':username,
        'UserNumber':usernumber,
        "piano":
                {
                    'shape':piano_shape,
                    'texture':piano_texture,
                    'palette_num':piano_palette_num,
                    'palette_set':piano_palette_set,
                    'interval':piano_interval,
                    'size':piano_size,
                    'line':piano_line
                },
        "drum":
                {
                    'shape':drum_shape,
                    'texture':drum_texture,
                    'color':drum_color,
                    'size':drum_size
                },
        "haptic":
                {
                    'sensitivity':haptic_sensitivity,
                    'intensity':haptic_intensity
                }
    }
    $.ajax({
        type: 'POST',
        url: '/SaveUserCustom',
        data: JSON.stringify(postdata),
        dataType : 'JSON',
        contentType: "application/json",
        success: function(data){
            alert('Customization 저장완료..')
        },
        error: function(request, status, error){
            alert('ajax 통신 실패')
            alert(error);
        }
    })
})