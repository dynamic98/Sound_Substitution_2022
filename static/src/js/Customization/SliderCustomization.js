export class SliderCustomization {
    constructor(HTMLClassContainer, event) {
        this.sliderList = {}

        for (let innerClass of $("." + HTMLClassContainer)[0].children) {
            for (let child of innerClass.children) {
                if (child.localName == "input") {
                    this.sliderList[child.id] = 0;
                    $("#" + child.id).on(event, () => {
                        this.sliderList[child.id] = $("#" + child.id).val() / 100
                        console.log(this.sliderList)
                    })
                }
            }
        }
    }

    getParameter() {
        return this.sliderList
    }


}