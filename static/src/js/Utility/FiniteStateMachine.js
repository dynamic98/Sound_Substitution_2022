export class FiniteStateMachine {
    constructor(...instrumentType) {
        this.instruments = {}
        for (const instrument of instrumentType) {
            this.instruments[instrument] = {
                play: false,
                record: false,
                playback: false
            }
        }

        this.currentState;
    }

    setCurrentState() {};

    getCurrentState() {
        for (let instrumentType in this.instruments) {
            for (let playState in this.instruments[instrumentType]) {
                if ((this.instruments[instrumentType][playState])) {
                    this.currentState = this.instruments[instrumentType][playState]
                    return this.currentState
                }

            }
        }
    }


    passValidation() {
        if (this.instruments[instrumentType][playState] == null || undefined) {
            console.error(`only instrument types and playstates: ${this.instruments} are 
        available`)
            return false;
        } else {
            return true
        }

    }
}


/* Finite State Machine 

UI를 통해 stage 1. 미디를 쳐주세요! stage 2 미디를 녹음하겠습니다. 등등을 진행해야 체계적일 것 같음.
물론 실험자가 안내를 하겠지만, UI와 프로그램 상에서 피실험인이 원활하게 실험의 각 단계에 참여할 수 있도록 도와줘야 한다고 생각함. 
지금은 녹음 버튼이 있지만 이게 고정된 시간으로 진행되어서 좀 강제적임. 다소 길게 느껴지기도 함. 
설사 주어진 시간을 기능적으로는 다 채워야하지 않아도 된다고 하더라도 심리적으로 압박감을 느낌. 
따라서 주어진 시간이 아니라 녹음 시작과 녹음을 종료할 수 있는 버튼(총 녹음된 시간을 보여주는 UI)
그리고 녹음된 것을 플레이백할 수 있는 버튼이 있으면 좋을 것 같음.(그래서 플레이백 시 총 녹음된 시간만큼 흘러가고 멈추는 시계)
-> 지금은 새로운 녹음버튼과 플레이백이 동일?

평소에는 녹음된 시각화가 보여질때, 새로운 인풋(미디 또는 키보드 입력)이 들어오는 것을 막는 것이 좋을 것 같음. 
-> 만약 녹음된 것과 새로운 인풋이 같이 보여지게 하면, 녹음이 축적되는 원리로 가야하지 않나 싶기도 함. 
    아니면 동시에 보여줄 이유가 없음. 또 이렇게 하면 이미 있는 녹음을 지우는 기능도 필요할듯. 

기본적으로는 현재 단계와 상태에 따라 가능한 것과 불가능한 것을 명확하게 구분짓는 것이 좋을 것 같음.
지금은 그런게 하나도 없음. 있어도 각 코드 구석에 분리된 상태로 존재해서 파악하기도 어렵고 수정하기도 어려움.
아래처럼 가능한 악기와 상태가 있으면 각 단계별로 어떠한 것들이 허용되는지를 true, false 값으로 정해서 시스템을 구성하면 좋을 것 
같음. 
나중에 실험의 유형? 예를 들어 녹음된 음악을 보고 똑같이 따라하는 것)을 하는 실험이라면 규칙을 그때 또 바꾸면 됨.
하지만 각 실험의 유형에 맞게 동시에 가능한 기능들을 제한하는 것은 필요하다고 생각함. 

stage 1. 미디 
1-1 미디 플레이
1-2 미디 녹음
1-3 녹음된 미디 플레이백 

stage 2. 드럼 
2-1 드럼 플레이 
2-2 드럼 녹음
2-3 드럼 플레이백


1-1 미디 플레이
   1-2 동시 가능, 1-3 동시 불가능
   2-1 동시 불가능(악기를 바꿔야하므로) 2-2 불가능 2-3 불가능 

1-2 미디 녹음
    1-1 동시 가능 1-3 동시 불가능(계속 축적시키는 형태가 아니면 너무 헷갈림)
    2-1 동 시 불가능(악기를 바꿔야하므로)2-2 불가능. 2-3 불가능(계속 축적시키는 형태가 아니면 너무 헷갈림)

1-3 ...



*/