export class ButtonCustomization {

    constructor(HTMLClassContainer, event, eraseText) {
        this.parameter;
        this.HTMLClassContainer = HTMLClassContainer
        this.event = event
        this.eraseText = eraseText
    }

    getParameter() {
        return this.parameter
    }


    assignEventHandler(callback) {
        for (let child of $("." + this.HTMLClassContainer)[0].children) {
            $("#" + child.id).on(this.event, () => {
                this.pararameter = child.id.replace(this.eraseText, '')
                callback(parameter)
            })
        }
    }

}