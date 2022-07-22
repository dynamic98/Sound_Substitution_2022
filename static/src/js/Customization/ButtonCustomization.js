export class ButtonCustomization {

    constructor(HTMLClassContainer, eraseText) {
        this.parameter;
        this.HTMLClassContainer = HTMLClassContainer
        this.eraseText = eraseText
    }

    assignEventHandler(event, callback) {
        for (let child of $("." + this.HTMLClassContainer)[0].children) {
            if ($(child)[0].localName == "button") {
                $("#" + child.id).on(event, () => {
                    this.parameter = child.id.replace(this.eraseText, '')
                    callback(this.parameter)
                })
            }

        }
    }

    getParameter() {
        return this.parameter
    }


}