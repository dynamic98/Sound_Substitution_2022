# Sound_Substitution_2022
Sound Enjoyment for DHH(Deaf and Hard-of-Hearing)

# VibvizTool
- 사용 언어: javascript
- 사용 라이브러리(js 기반): three.js(3차원 시각화), pickr(컬러판), meyda(오디오 feature 추출)

<img width="1200" src="https://user-images.githubusercontent.com/59073612/156991563-8cf7596e-d485-4ef2-9f9b-ca69078ca595.gif">

### Requirements
#### 1) node modules
three.js 꼭 설치하기

#### 2) npm
*ex. npm install meyda >> installation of meyda*
- "simonwep/pickr"
- "babel-cli": "6.26.0"
- "meyda": "5.3.0"
- "nodemon": "2.0.15"
- "p5": "1.4.1"
- "pickr": "0.1.4"
- "vite": "2.8.6"

### How To RUN
1. turn on the terminal
2. git clone this repository
3. change your root directory to 'VibvizTool' folder
4. type 'npm run dev' on the terminal
5. enter to http://localhost:3000/


<hr>


### ⭐ 새로 추가한 기능
- 유저의 color input 에 따라 시각화 color가 실시간으로 변경 (03/07)
- Visual Feature 버튼 드롭다운 메뉴와 인터랙션 추가 (03/08)
- Visual Feature 와 Colors 메뉴 유저의 선택에 따라 실시간으로 변경 (03/14)
- meyda 를 사용해 Audio Feature 추출, energy + chroma 를 사용해 시각화 적용 (03/15)


### 지금까지 구현한 것
- 화면 인터페이스 디자인, 버튼 구성
- 음악 업로드
- 음악에 따라 play 되는 시각화
- 음악 타이틀이 우측 상단에 나옴
- 마우스를 사용한 유저의 인터랙션 가능


### 앞으로 해야하는 것
- **music feature, visualize feature 버튼을 누름에 따라 시각화 output 이 변하도록 만들기**
- 어느 크기의 화면에서나 예쁘게 나오게 반응형 웹으로 만들기(현재는 제 모니터 기준이라 찌부될 가능성 높음 ㅋ)
