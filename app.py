from flask import Flask, render_template, request
from featureExtraction import extract_feature
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)

@app.route('/')
def index():
  return render_template('mainMenu.html')

# abstact 페이지에서는 오디오 파일을 변수에 저장만 하기
@app.route('/abstract', methods=['POST'])
def abstract():
  return render_template('abstract.html')
  


# abstracted 페이지에서는 저장된 오디오 파일의 변수를 html 에 전달
@app.route('/abstracted', methods=['POST'])
def abstracted():
  if request.method == 'POST':
      file = request.files['thefile']
      print('file:', file)
      file.save(secure_filename(file.filename))
      print('file has saved!')
  else:
    pass
  return render_template('abstract.html')






@app.route('/concrete', methods=['POST'])
def concrete():
  if request.method == 'POST':
      word = '구상적 시각화 페이지 입니다.'
  else:
    pass
  return render_template('concrete.html', word=word)


if __name__ == '__main__':
  app.run(host=os.getenv('IP', '0.0.0.0'), port=int(os.getenv('PORT', 8080)), debug=True)





