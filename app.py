# -*- coding: utf-8 -*-
from flask import Flask, render_template, request, jsonify
from featureExtraction import extract_feature
from werkzeug.utils import secure_filename
import os
import selenium
import webbrowser
from python.WriteHapticCustom import WriteHapticCustom as WHC
from python.HapticCustomize import VirtualBrowser

##필요한 함수 선언 
###################################################
def makeHTMLWithFileList(relativePath):
  filelist = os.listdir(os.path.join(relativePath))
  # filelist.remove('mdx_extra_q')
  filelist.sort(key=lambda x: os.path.getmtime(os.path.join(relativePath, x)), reverse=True)
  filestrlist = ''

  for n, i in enumerate(filelist):
    if n != len(filelist)-1:
      filestrlist = filestrlist + i + ', '
    else:
      filestrlist = filestrlist + i
  print(filestrlist)
  return filestrlist
###################################################


app = Flask(__name__)

folder = os.path.join('./static/music/')

UserName = 'default_user'

os.makedirs(folder, exist_ok=True)

@app.route('/')
def index():
  return render_template('mainMenu.html', User_Name= 'default_user', login="log in")

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

  entireSongList= makeHTMLWithFileList('static/music/original')
  separatedSongList= makeHTMLWithFileList('static/music/separated')
  
  return render_template('abstract.html', filelist=entireSongList, separatedFileList=separatedSongList )



@app.route('/concrete', methods=['POST'])
def concrete():
  if request.method == 'POST':
      word = '구상적 시각화 페이지 입니다.'
  else:
    pass
  return render_template('concrete.html', word=word)


@app.route('/SendHapticCustom', methods=['POST'])
def ajax():
    data = request.get_json()
    left = data['left']
    right = data['right']
    print(UserName)
    fileName = WHC(UserName, left, right)
    VirtualBrowser(UserName, fileName)
    return data
    # return jsonify(result = "success", result2= data)

@app.route('/separate', methods=['POST'])
def separate():
  if request.method == 'POST':
    word = '구상적 시각화 페이지 입니다.'
  else:
    pass
  return render_template('separate.html')

@app.route('/haptic', methods=['POST'])
def haptic():
  if request.method == 'POST':
    result = '구상적 시각화 페이지 입니다.'
  else:
    pass
  return render_template('hapticCustom.html')


@app.route('/loading', methods=['POST'])
def loading():
  features = ''
  if request.method == 'POST':
    file = request.files['SSfile']
    print(file)
    if os.path.isdir(os.path.join(folder, secure_filename(file.filename))):
      pass
    else:
      file.save(os.path.join(folder, secure_filename(file.filename)))
      os.system("python -m demucs --mp3 static\\music\\%s -o static\\music" % secure_filename(file.filename))
    
    if UserName == 'default_user':
      return render_template('mainMenu.html',User_Name= UserName, login="log in")
    else:
      return render_template('mainMenu.html',User_Name= UserName, login="log out")
      # features = extract_feature(folder) # 내가 원하는 음악의 Feature 추출
      # 이것을 classifier.ts 와 연결

  return render_template('mainMenu.html')

@app.route('/login', methods=['POST'])
def login():
  # if request.method == 'POST':
  #   print(request.form['id_name'], request.form['id_number'])
  # else:
  #   pass
  return render_template('login.html')

@app.route('/letsgo', methods=['POST'])
def letsgo():
  if request.method == 'POST':
    id_name = request.form['id_name']
    id_number = request.form['id_number']
    global UserName
    if id_name:
      UserName = id_name
      os.makedirs(os.path.join('./static/user', UserName), exist_ok=True)
      return render_template('mainMenu.html',User_Name= UserName, login="log out")
    else:
      UserName = 'default_user'
      return render_template('mainMenu.html',User_Name= UserName, login="log in")
  else:
    return render_template('mainMenu.html',User_Name= UserName, login="log out")

if __name__ == '__main__':
  app.run(host=os.getenv('IP', '0.0.0.0'), port=int(os.getenv('PORT', 8080)), debug=True)





