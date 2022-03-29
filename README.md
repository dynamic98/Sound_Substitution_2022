# Sound_Substitution_2022
Sound Enjoyment for DHH(Deaf and Hard-of-Hearing)

# VibvizTool
### 사용 언어   <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black"/>

### 사용 라이브러리
- **three.js** (3차원 시각화, https://threejs.org/)
- **pickr** (컬러판, https://simonwep.github.io/pickr/)
- **meyda** (audio feature 추출, https://meyda.js.org/audio-features)

<img width="1200" src="https://user-images.githubusercontent.com/59073612/160543795-e1b5c012-87c6-468e-8f50-88ddbb27182f.gif">

### Install Requirements on the NPM
```
npm install
```
터미널에 위 명령어를 입력하면 package.json 에 있는 dependencies(필요한 라이브러리) 가 알아서 깔립니다.



### How To RUN
1. turn on the terminal
2. git clone this repository
3. change to your root directory
4. type 'npm run dev' on the terminal
5. enter to http://localhost:3000/
6. press 'Choose A Music to Visualize!' button and pick a music in the mp3 format
7. visualize!


<hr>


### ⭐ 새로 추가한 기능
- 유저의 color input 에 따라 시각화 color가 실시간으로 변경 (03/07)
- Visual Feature 버튼 드롭다운 메뉴와 인터랙션 추가 (03/08)
- Visual Feature 와 Colors 메뉴 유저의 선택에 따라 실시간으로 변경 (03/14)
- meyda 를 사용해 Audio Feature 추출, energy + chroma(= pitch) 를 사용해 시각화 적용 (03/15)
- meyda 를 사용해 Audio Feature 추출, pitch, amplitude 에 따른 시각화 적용 (03/21)
- 메뉴 인터페이스 수정(시각+햅틱 추가), 버튼에 따라 geometry 다르게 송출, 배경색 수정 (03/29)


### 지금까지 구현한 것
- 화면 인터페이스 디자인, 버튼 구성
- 음악 업로드
- 음악에 따라 play 되는 시각화
- 음악 타이틀이 우측 상단에 나옴
- 마우스를 사용한 유저의 인터랙션 가능


### 앞으로 해야하는 것
- **music feature, visualize feature 버튼을 누름에 따라 시각화 output 이 변하도록 만들기**
- 어느 크기의 화면에서나 예쁘게 나오게 반응형 웹으로 만들기(현재는 제 모니터 기준이라 찌부될 가능성 높음 ㅋ)
