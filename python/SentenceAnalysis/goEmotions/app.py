from flask import Flask, render_template, request
from emotion import show_emotion as emotion_predict
from word2vec import show_words as word_predict
from word2vec import show_similar_words as similar_word_predict


app = Flask(__name__)

@app.route('/')
def index(query=None):
  return render_template('index.html', query=query)


@app.route('/result', methods=['GET'])
def result(query=None):
  if request.method == 'POST':
    pass
  elif request.method == 'GET':
    temp = request.args.get('query')
    emotion = emotion_predict(temp)
    noun, verb, adj = word_predict(temp)
    similar_noun, similar_verb, similar_adj = similar_word_predict(temp)
  return render_template('result.html', query=temp, emotion=emotion, noun=noun, verb=verb, adj=adj, similar_noun=similar_noun, similar_verb=similar_verb, similar_adj=similar_adj)



if __name__ == '__main__':
  app.run(debug=True)





