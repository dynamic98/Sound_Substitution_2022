from flask import Flask, render_template, request
from featureExtraction import extract_feature
from werkzeug.utils import secure_filename
import os


app = Flask(__name__)
folder = os.path.join('./static/music/')

os.makedirs(folder, exist_ok=True)


@app.route('/')
def index():
  return render_template('mainMenu.html')


# abstact 페이지에서는 오디오 파일을 변수에 저장만 하기
@app.route('/abstract', methods=['POST'])
def abstract():
  features = ''
  if request.method == 'POST':
    file = request.files['thefile']
    if os.path.isdir(os.path.join(folder, secure_filename(file.filename))):
      pass
    else: 
      file.save(os.path.join(folder, secure_filename(file.filename)))
      # extract_feature(folder) # 내가 원하는 음악의 Feature 추출
      # 이것을 classifier.ts 와 연결


  filelist = os.listdir(os.path.join('static/music'))
  print(filelist)
  filelist.sort(key=lambda x: os.path.getmtime(os.path.join('static/music', x)), reverse=True)
  filestrlist = ''

  for n, i in enumerate(filelist):
    if n != len(filelist)-1:
      filestrlist = filestrlist + i + ', '
    else:
      filestrlist = filestrlist + i

  return render_template('abstract.html', filelist=filestrlist)
  

@app.route('/concrete', methods=['POST'])
def concrete():
  if request.method == 'POST':
      word = '구상적 시각화 페이지 입니다.'
  else:
    pass
  return render_template('concrete.html', word=word)


@app.route('/hapticCustom', methods=['POST'])
def hapticCustom():
  if request.method == 'POST':
      word = '구상적 시각화 페이지 입니다.'
  else:
    pass
  return render_template('hapticCustom.html')


if __name__ == '__main__':
  app.run(host=os.getenv('IP', '0.0.0.0'), port=int(os.getenv('PORT', 8080)), debug=True)





