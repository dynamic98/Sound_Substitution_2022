# -*- coding: utf-8 -*-
from flask import Flask, render_template, request, jsonify
from featureExtraction import extract_feature
from werkzeug.utils import secure_filename
import os
import selenium
import webbrowser
from python.WriteHapticCustom import WriteHapticCustom as WHC
from python.UserCustomization import WriteUserCustom, GetUserCustom
from python.UserDB import WriteUserDB
from python.HapticCustomize import VirtualBrowser

## 필요한 함수 선언 
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

folder = os.path.join('./static/music/separated')

UserName = 'default_user'
UserNumber = 0
ChromeBrowser = VirtualBrowser()

# create the file 
os.makedirs(folder, exist_ok=True)


@app.route('/')
def login():
  return render_template('login.html', User_Name= 'default_user', User_Number='default_number', login="log in")


@app.route('/menu', methods=['POST'])
def menu():
  if request.method == 'POST':
      id_name = request.form['id_name']
      id_number = request.form['id_number']
      global UserName
      global UserNumber
      if id_name:
        UserName = id_name
        UserNumber = id_number
        os.makedirs(os.path.join('./static/user', UserName), exist_ok=True)
        ChromeBrowser.SetUserName(UserName)
        return render_template('menu.html', User_Name=UserName, User_Number=UserNumber, login="log out")
      else:
        UserName = 'default_user'
        return render_template('menu.html', User_Name=UserName, User_Number=UserNumber, login="log in")
  else:
    return render_template('menu.html',User_Name=UserName,  User_Number=UserNumber, login="log out")


@app.route('/exploration', methods=['POST'])
def explore():
  if request.method=='POST':
    data = GetUserCustom(UserName)
  else:
    pass
  return render_template('Exploration.html',User_Name=UserName, User_Number = UserNumber, data = data, login="log in")




@app.route('/exploration-task_one_drum', methods=['POST'])
def exploration_task_one_drum():
  data = GetUserCustom(UserName)
  return render_template('exploration_task_one_drum.html',User_Name=UserName, User_Number = UserNumber, data = data, login="log in")

@app.route('/exploration-task_two_piano', methods=['POST'])
def exploration_task_two_piano():
  data = GetUserCustom(UserName)
  return render_template('exploration_task_two_piano.html',User_Name=UserName, User_Number = UserNumber, data = data, login="log in")

@app.route('/exploration-task_three_drum', methods=['POST'])
def exploration_task_three_drum():
  data = GetUserCustom(UserName)
  return render_template('exploration_task_three_drum.html',User_Name=UserName, User_Number = UserNumber, data = data, login="log in")

@app.route('/exploration-task_four_piano', methods=['POST'])
def exploration_task_four_piano():
  data = GetUserCustom(UserName)
  return render_template('exploration_task_four_piano.html',User_Name=UserName, User_Number = UserNumber, data = data, login="log in")

@app.route('/exploration-task_five_piano', methods=['POST'])
def exploration_task_five_piano():
  data = GetUserCustom(UserName)
  return render_template('exploration_task_five_piano.html',User_Name=UserName, User_Number = UserNumber, data = data, login="log in")

@app.route('/exploration-task_six_piano', methods=['POST'])
def exploration_task_six_piano():
  data = GetUserCustom(UserName)
  return render_template('exploration_task_six_piano.html',User_Name=UserName, User_Number = UserNumber, data = data, login="log in")

@app.route('/exploration-task_seven_piano', methods=['POST'])
def exploration_task_seven_piano():
  data = GetUserCustom(UserName)
  return render_template('exploration_task_seven_piano.html',User_Name=UserName, User_Number = UserNumber, data = data, login="log in")

@app.route('/exploration-task_eight_piano', methods=['POST'])
def exploration_task_eight_piano():
  data = GetUserCustom(UserName)
  return render_template('exploration_task_eight_piano.html',User_Name=UserName, User_Number = UserNumber, data = data, login="log in")




@app.route('/listening', methods=['POST'])
def listen():
  data = GetUserCustom(UserName)
  entireSongList= makeHTMLWithFileList('static/music/original')
  separatedSongList= makeHTMLWithFileList('static/music/separated')
  return render_template('listen.html', filelist=entireSongList, separatedFileList=separatedSongList, User_Name=UserName, User_Number = UserNumber, data = data )




@app.route('/test', methods=['POST'])
def test():
  return render_template('testmenu.html',User_Name=UserName, login="log in")

@app.route('/test-groupA', methods=['POST'])
def groupA():
  data = GetUserCustom(UserName)
  return render_template('test_groupA.html',User_Name=UserName, User_Number = UserNumber, data = data, login="log in")

@app.route('/test-groupB', methods=['POST'])
def groupB():
  data = GetUserCustom(UserName)
  return render_template('test_groupB.html',User_Name=UserName, User_Number = UserNumber, data = data, login="log in")

@app.route('/test-groupC', methods=['POST'])
def groupC():
  data = GetUserCustom(UserName)
  return render_template('test_groupC.html',User_Name=UserName, User_Number = UserNumber, data = data, login="log in")

@app.route('/test-groupD', methods=['POST'])
def groupD():
  data = GetUserCustom(UserName)
  return render_template('test_groupD.html',User_Name=UserName, User_Number = UserNumber, data = data, login="log in")





@app.route('/dev', methods=['POST'])
def dev():
  return render_template('mainMenu.html',User_Name=UserName, login="log in")



# dev 용 경로들 (나중에 최종본에는 삭제할 것)

# abstact 페이지에서는 오디오 파일을 변수에 저장만 하기
@app.route('/abstract', methods=['POST'])
def abstract():
  if request.method == 'POST':
    file = request.files['thefile']
    print(file)
    if os.path.isdir(os.path.join(folder, secure_filename(file.filename))):
      pass
    else: 
      file.save(os.path.join(folder, secure_filename(file.filename)))
      # extract_feature(folder) # 내가 원하는 음악의 Feature 추출
      # 이것을 classifier.ts 와 연결

    entireSongList= makeHTMLWithFileList('static/music/original')
    separatedSongList= makeHTMLWithFileList('static/music/separated')
    data = GetUserCustom(UserName)
  return render_template('abstract.html', filelist=entireSongList, separatedFileList=separatedSongList, User_Name=UserName, User_Number = UserNumber, data = data )



@app.route('/concrete', methods=['POST'])
def concrete():
  return render_template('Task_dev.html',User_Name=UserName, login="log in")


@app.route('/SendHaptic', methods=['POST'])
def ApplyHaptic():
  data = request.get_json()
  sensitivity = data['sensitivity']
  intensity = data['intensity']
  print(UserName)
  FileName = WHC(UserName, sensitivity, intensity)
  # VirtualBrowser(UserName, fileName)
  ChromeBrowser.SendHapticCustom(UserName, FileName)
  return data
  # return jsonify(result = "success", result2= data)

@app.route('/WriteUserCustom', methods=['POST'])
def wuc():
  if request.method == 'POST':
      word = '구상적 시각화 페이지 입니다.'
  else:
    pass
  return render_template('/loading.html')

@app.route('/SaveUserCustom', methods=['POST'])
def SaveUserCustom():
  data = request.get_json()
  # Sensitivity = data['haptic']['sensitivity']
  # Intensity = data['haptic']['intensity']
  # FileName = WHC(UserName, Sensitivity, Intensity)
  # print(FileName)
  # ChromeBrowser.SendHapticCustom(UserName, FileName)
  WriteUserCustom(data)

  return data
    # return jsonify(result = "success", result2= data)

@app.route('/SaveUserDB', methods=['POST'])
def SaveUserDB():
  data = request.get_json()
  # print('data', data)
  # print(type(data))
  WriteUserDB(data)
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

@app.route('/making_tool', methods=['POST'])
def making_tool():
  if request.method=='POST':
    word = '구상적 시각화 페이지 입니다.'
  else:
    pass
  return render_template('Exploration copy.html')

@app.route('/custom_data_dev', methods=['POST'])
def custom_data_dev():
  if request.method=='POST':
    data = GetUserCustom(UserName)
    print('user data', data)
  else:
    pass
  return render_template('customization_dev.html', data=data)

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

@app.route('/making_piano', methods=['POST'])
def making_piano():
  data = GetUserCustom(UserName)
  return render_template('making_pitch_task.html',User_Name=UserName, User_Number = UserNumber, data = data, login="log in")

@app.route('/making_drum', methods=['POST'])
def making_drum():
  data = GetUserCustom(UserName)
  return render_template('making_beat_task.html',User_Name=UserName, User_Number = UserNumber, data = data, login="log in")

# @app.route('/login', methods=['POST'])
# def login():
#   # if request.method == 'POST':
#   #   print(request.form['id_name'], request.form['id_number'])
#   # else:
#   #   pass
#   return render_template('login.html')

# @app.route('/letsgo', methods=['POST'])
# def letsgo():
#   if request.method == 'POST':
#     id_name = request.form['id_name']
#     id_number = request.form['id_number']
#     global UserName
#     if id_name:
#       UserName = id_name
#       os.makedirs(os.path.join('./static/user', UserName), exist_ok=True)
#       return render_template('mainMenu.html',User_Name= UserName, login="log out")
#     else:
#       UserName = 'default_user'
#       return render_template('mainMenu.html',User_Name= UserName, login="log in")
#   else:
#     return render_template('mainMenu.html',User_Name= UserName, login="log out")

# @app.route('/exploration', methods=['POST'])
# def Exploration():
#     return render_template('Exploration.html')


if __name__ == '__main__':
  app.run(host=os.getenv('IP', '0.0.0.0'), port=int(os.getenv('PORT', 8080)), debug=True, use_reloader=False)





