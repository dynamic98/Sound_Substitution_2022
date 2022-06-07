from flask import Flask, render_template, request


app = Flask(__name__)

@app.route('/')
def index():
  return render_template('mainMenu.html')


@app.route('/abstract', methods=['POST'])
def abstract():
  if request.method == 'POST':
      word = '추상적 시각화 페이지 입니다.'
  else:
    pass
  return render_template('abstract.html', word=word)


@app.route('/concrete', methods=['POST'])
def concrete():
  if request.method == 'POST':
      word = '구상적 시각화 페이지 입니다.'
  else:
    pass
  return render_template('concrete.html', word=word)


if __name__ == '__main__':
  app.run(debug=True)





