export class ButtonCustomization {

    constructor(HTMLClassContainer, className, eraseTextFromIDName='') {
        this.parameter;
        this.HTMLClassContainer = HTMLClassContainer
        this.className = className
        this.eraseTextFromIDName= eraseTextFromIDName
        
    }

    assignEventHandler(event, callback) {
        for (let child of $("." + this.HTMLClassContainer)[0].children) {
            if ($(child)[0].className.includes(this.className)) {
                $("#" + child.id).on(event, () => {
                    this.parameter = child.id.replace(this.eraseTextFromIDName, '')
                    console.log(this.parameter)
                    callback("piano",this.parameter)
                })
            }

        }
    }

    getParameter() {
        return this.parameter
    }

}