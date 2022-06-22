from flask import Flask, render_template, request
from featureExtraction import extract_feature
from werkzeug.utils import secure_filename
import os
import selenium
import webbrowser


app = Flask(__name__)

# os.makedirs(folder, exist_ok=True)


@app.route('/', methods=['POST', 'GET'])
def index():
  return render_template('index.html')


@app.route('/login', methods=['POST'])
def login():
  return render_template('login.html')


@app.route('/menu', methods=['POST'])
def menu():
  return render_template('menu.html')


@app.route('/custom', methods=['POST'])
def custompitch():
  return render_template('custompitch.html')



  


if __name__ == '__main__':
  app.run(host=os.getenv('IP', '0.0.0.0'), port=int(os.getenv('PORT', 8080)), debug=True)




