export class ButtonCustomization {

    constructor(HTMLClassContainer, className, eraseTextFromIDName = '') {
        this.parameter;
        this.HTMLClassContainer = HTMLClassContainer
        this.className = className
        this.eraseTextFromIDName = eraseTextFromIDName
        this.ModePitchBeat = 'pitch'

    }

    setModePitchBeat(mode_pitchbeat){
        this.ModePitchBeat = mode_pitchbeat;
    }

    assignEventHandler(event, callback1, callback2) {
        for (let child of $("." + this.HTMLClassContainer)[0].children) {
            if ($(child)[0].className.includes(this.className)) {
                $("#" + child.id).on(event, () => {
                    this.parameter = child.id.replace(this.eraseTextFromIDName, '')
                    console.log(this.parameter)
                    
                    if(this.ModePitchBeat=='pitch')
                        {
                        callback1("piano", this.parameter)
                        callback1("savedPiano", this.parameter)
                        callback2("piano", this.parameter)
                        } 
                    else if (this.ModePitchBeat=='beat')
                        {
                        callback1("drum", this.parameter)
                        callback1("savedDrum", this.parameter)
                        callback2("drum", this.parameter)
                        }
                })
            }

        }
    }

    getParameter() {
        return this.parameter
    }

}