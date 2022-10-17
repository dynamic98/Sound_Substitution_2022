# 학습 데이터 불러오고 전처리하기
import pandas as pd
import itertools

# 1. 1차연도 어노테이터들이 적은 문장
music_by_numbers = pd.read_excel('./annotated/dance_by_numbers.xlsx', engine='openpyxl')
dance_by_numbers = pd.read_excel('./annotated/dance_by_numbers.xlsx', engine='openpyxl')
visual_by_numbers = pd.read_excel('./annotated/dance_by_numbers.xlsx', engine='openpyxl')

# 2. 대화 음성 오픈 데이터셋
# talking_data_1 = pd.read_excel('/Users/lifeofpy/Desktop/dataset_청각2/감정 분류를 위한 대화 음성 데이터셋_4차년도.xlsx', engine='openpyxl')
# talking_data_2 = pd.read_excel('/Users/lifeofpy/Desktop/dataset_청각2/감정 분류를 위한 대화 음성 데이터셋_5차년도_1차.xlsx', engine='openpyxl')
# talking_data_3 = pd.read_excel('/Users/lifeofpy/Desktop/dataset_청각2/감정 분류를 위한 대화 음성 데이터셋_5차년도_2차.xlsx', engine='openpyxl')

# 3. 한국어 발라드 가사 데이터셋
lyrics_ballad = open('./annotated/lyrics_ballad.txt', 'r').read().split('\n')
lyrics_ballad = [[x] for x in lyrics_ballad if x != '']  # 결측치 제거


# 데이터 전처리하기
music_by_numbers = music_by_numbers.drop(['Unnamed: 0'], axis=1)
dance_by_numbers = dance_by_numbers.drop(['Unnamed: 0'], axis=1)
visual_by_numbers = visual_by_numbers.drop(['Unnamed: 0'], axis=1)

# 데이터프레임 리스트로 바꾸기
def change_df_tolst(df):
    word_list = df.values.tolist()
    for i in range(len(word_list)):
        for j in range(len(word_list[i])):
            word_list[i][j] = word_list[i][j].split(", '")
    word_list = list(itertools.chain.from_iterable(word_list))
    return word_list

music_list = change_df_tolst(music_by_numbers)
dance_list = change_df_tolst(dance_by_numbers)
visual_list = change_df_tolst(visual_by_numbers)

# talking_data_1_list = talking_data_1[['발화문']].values.tolist()
# talking_data_2_list = talking_data_2[['발화문']].values.tolist()
# talking_data_3_list = talking_data_3[['발화문']].values.tolist()

# 데이터를 하나의 리스트로 합쳐줌(2차원 리스트 >> 1차원 리스트)
# Word2Vec 모델 학습을 위해 댓글 문장 nltk 를 사용해서 토크나이징

# tokens 파일로 저장하기
tokens = music_list + dance_list + visual_list + lyrics_ballad

# 문장 데이터의 총 개수
print(len(tokens))