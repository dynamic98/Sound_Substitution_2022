import nltk
nltk.download('punkt')

from soynlp.utils import DoublespaceLineCorpus
from soynlp.noun import LRNounExtractor_v2

import itertools
from gensim.models import Word2Vec
from nltk.tokenize import word_tokenize

from multilabel_pipeline import MultiLabelPipeline

import preprocess_text
import re

from konlpy.tag import *


okt = Okt()


# tokens 경로에서 리스트 데이터 불러오기
tokens = preprocess_text.tokens
tokens = list(itertools.chain.from_iterable(tokens))


# 진짜 토크나이징한 리스트 real_tokens
real_tokens = []
for i in range(len(tokens)):
    real_tokens.append(word_tokenize(tokens[i]))

# word2vec 모델 불러와서 학습하기
model = Word2Vec(real_tokens, alpha=0.025, window=2, min_count=5, sg=1)
model.train(real_tokens, total_examples=len(real_tokens), epochs=5)


# soynlp 사용을 위한 txt 파일 만들어주기 (기존 파일 기준)

# with open('data.txt', 'w') as f:
#     for line in tokens:
#         f.write(line)



# [응용] 명사 추출한 것 바탕으로 유사어 검색 자동화하기

# 문장에 포함된 명사를 알려주는 함수
def show_nouns(text):
    for _ in range(len(text)):
        noun_lst = okt.nouns(text)
    return noun_lst


# 문장에 포함된 동사를 알려주는 함수
def show_verbs(text):
    okts = []
    verbs = []
    for i in range(len(text)):
        okts.append(okt.pos(text[i]))
    for j in range(len(okts)):
        for k in range(len(okts[j])):
            if okts[j][k][1] == 'Verb' and len(okts[j][k][0]) > 1:
                verbs.append(okts[j][k][0])
    return verbs


# 문장에 포함된 형용사를 알려주는 함수
def show_adjectives(text):
    okts = []
    adjs = []
    for i in range(len(text)):
        okts.append(okt.pos(text[i]))
    for j in range(len(okts)):
        for k in range(len(okts[j])):
            if okts[j][k][1] == 'Adjective' and len(okts[j][k][0]) > 1:
                adjs.append(okts[j][k][0])
    return adjs


# 단어와 연관된 유사어를 알려주는 함수
def find_similar_words(text):
    similar_words_lst = []
    for i in range(len(text)):
        try:
            similar_words_lst.append({text[i]: model.wv.most_similar(text[i])})
        except:
            pass

    return similar_words_lst


# 문장에 들어있는 명사/동사/형용사 추출
def show_words(text):
    noun = show_nouns(text)
    verb = show_verbs(text)
    adj = show_adjectives(text)
    return noun, verb, adj




# 추출한 명사/동사/형용사의 유의어 데이터셋에서 추출
def show_similar_words(text):
    similar_noun = find_similar_words(show_nouns(text))
    similar_verb = find_similar_words(show_verbs(text))
    similar_adj = find_similar_words(show_adjectives(text))
    return similar_noun, similar_verb, similar_adj


# 유사어 자체에서 품사별 추출해서 알려주는 함수

# 명사
# def extract_from_similar_nouns(lst):
#     real_similar_words_lst = []
#     nouns_lst = []
#     for i in range(len(lst)):
#         value = list(itertools.chain.from_iterable(list(lst[i].values())))
#         real_similar_words_lst.extend(re.compile('[가-힣]+').findall(str(value)))

#     for j in range(len(real_similar_words_lst)):
#         nouns_lst.append(show_nouns([real_similar_words_lst[j]]))
#     real_similar_words_lst = set(list(itertools.chain.from_iterable(list(nouns_lst)))) # 중복 제거
#     return real_similar_words_lst



# # 예시로 데이터에는 없는 raw text 를 넣어보자

# # 에피소드
# data = ['이번에 새로 데뷔한 여자 아이돌 노래 좋더라구']
# show_words(data)



