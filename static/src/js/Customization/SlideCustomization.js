export class SlideCustomization {

    constructor(HTMLClassContainer, DIVclassName, INPUTclassName) {
        this.parameter;
        this.HTMLClassContainer = HTMLClassContainer
        this.DIVclassName = DIVclassName
        this.INPUTclassName = INPUTclassName
        // this.eraseTextFromIDName= eraseTextFromIDName
        // console.log($("."+this.HTMLClassContainer)[0].children[1])
    }

    assignEventHandler(event, callback) {
        for (let child of $("." + this.HTMLClassContainer).find("."+this.DIVclassName)[0].children) {
            // console.log(child)
            if ($(child)[0].className.includes(this.INPUTclassName)) {
                $("#" + child.id).on(event, () => {
                    // console.log(child.id)
                    this.parameter = child.id
                    let value = child.value
                    // console.log(this.parameter, value)
                    callback(this.parameter, value)
                })
            }

        }
    }

    getParameter() {
        return this.parameter
    }

}