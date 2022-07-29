export class StageManager {
    constructor(...args) {
        this.instruments = {}
        for (const arg of args) {
            this.instruments[arg] = {
                play: false,
                record: false,
                playback: false
            }
        }

        this.currentState;
    }

    getState() {
        for (let instrument in this.instruments) {
            for (let playState in this.instruments[instrument]) {
                if ((this.instruments[instrument][playState])) {
                    this.currentState = this.instruments[instrument][playState]
                    return this.currentState
                }

            }
        }
    }
}