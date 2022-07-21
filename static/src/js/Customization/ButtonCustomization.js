export class ButtonCustomization {

    constructor(HTMLClassContainer, eraseText) {
        this.parameter;
        this.HTMLClassContainer = HTMLClassContainer
        this.eraseText = eraseText
    }

    assignEventHandler(event, callback) {
        for (let child of $("." + this.HTMLClassContainer)[0].children) {
            $("#" + child.id).on(event, () => {
                this.parameter = child.id.replace(this.eraseText, '')
                console.log(this.parameter)
                callback(this.parameter)
            })
        }
    }

    getParameter() {
        return this.parameter
    }


}