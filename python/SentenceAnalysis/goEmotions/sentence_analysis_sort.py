# -*- coding:utf-8 -*-

import ast
import enum
from lib2to3.pgen2.pgen import DFAState
from re import M
import os
import sys
from transformers import ElectraTokenizer
from pprint import pprint
import pandas as pd
import time
import random
import datetime
import csv
from collections import OrderedDict

from .multilabel_pipeline import MultiLabelPipeline
from .edit_distance_library import similarity
from .model import ElectraForMultiLabelClassification



class SentenceAnalysis:
    def __init__(self):
        self.tokenizer = ElectraTokenizer.from_pretrained("monologg/koelectra-base-v3-goemotions")
        self.model = ElectraForMultiLabelClassification.from_pretrained("monologg/koelectra-base-v3-goemotions")
        self.goemotions = MultiLabelPipeline(
            model=self.model,
            tokenizer=self.tokenizer,
            threshold=0.3
        )
        self.music_dict = {
            1:'[Bad Boy] Chorus',
            2:'[DUN DUN] Chorus',
            3:'[HIP] Chorus',
            4:'[Crazy] Chorus',
            5:'[Alcohol-Free] Chorus',
            6:'[Dun Dun Dance] Chorus',
            7:'[Rollin] Chorus',
            8:'[TT] Chorus',
            9:'[Love Shot] Chorus',
            10:'[Shine] Chorus',
            11:'[Kick it] Chorus',
            12:'[One Summer Day] Chorus',
            13:'[Reflection] Chorus',
            14:'[The Four Seasons] Spring',
            15:'[Stay in Memory] Highlight',
            16:'[Kiki Delivery Service] Intro',
            17:'[Kiki Delivery Service] Highlight',
            18:'[Emotion Sample] Amusing2',
            19:'[Emotion Sample] Angry1',
            20:'[Emotion Sample] Angry2',
            21:'[Emotion Sample] Annoying1',
            22:'[Emotion Sample] Annoying2',
            23:'[Emotion Sample] Anxious1',
            24:'[Emotion Sample] Anxious2',
            25:'[Emotion Sample] Amusing1',
            26:'[Emotion Sample] Beautiful1',
            27:'[Emotion Sample] Beautiful2',
            28:'[Emotion Sample] Euphoric1',
            29:'[Emotion Sample] Euphoric2',
            30:'[Emotion Sample] Sad1',
            31:'[Emotion Sample] Sad2',
            32:'[Emotion Sample] Fearful',
            33:'[Emotion Sample] Dreamy',
            34:'[Emotion Sample] Painful',
            35:'[How Much I Love You] Intro',
            36:'[Be Warmed] Intro',
            37:'[The More I Love You] Intro',
            38:'[Wonderful Radio] Intro',
            39:'[Desire and Hope] Highlight',
            40:'[Already Sad Love] Highlight',
            41:'[Ice Pond] Hightlight',
            42:'[Lovers] Intro',
            43:'[A Secret Meeting Under The Moon] Highlight',
            44:'[Flower Day] Highlight',
            45:'[First Meeting] Highlight',
            46:'[Two Lovers Under Moonlight] Highlight'
        }

        self.music_data_load()
        self.music_data_senti()
        print("Sentence Analysis Model is loaded.")

    def music_data_load(self):
        music_path='processed_dataset_v3.csv'
        abs_path=os.path.join(os.path.abspath(os.path.dirname(__file__)), music_path)
        self.df = pd.read_csv(abs_path, sep='#')
        keywordList=[]
        for i in range(len(self.df)):
            keywordList.append(ast.literal_eval(self.df.loc[i, 'keyword']))
        self.df["keywordList"]=keywordList

    def music_data_senti(self):
        # 9번 문항 
        # global senti_df
        self.senti_df=self.df[self.df['type']==9]
        sum_val=[]
        for target_sum in self.senti_df['summary']:
            senti_val=self.goemotions(str(target_sum))
            sum_val.append(senti_val)
        self.senti_df['summary_senti']=sum_val
        # print(senti_df)
        # print("\n\n\n")        
        
    def query_analysis(self, input_query):
        '''
        최종 ED score를 구하는 함수
        '''
        sum_val=[]
        for target_sum in self.df['summary']:
            # print(target_sum+"\n\n")
            score=similarity(input_query, str(target_sum))
            sum_val.append(score)
        df_summary = self.df.copy()
        df_summary['summary_ed']=sum_val
        # print(df_summary)

        music_score = {k: 0 for k in range(1,47)}
        final_list = []
        for question in [3,4,5,6,1]:
            sort_df = self.sorting_df(df_summary[df_summary['type']==question], question)
            for n,i in enumerate(sort_df['music'].tolist()):
                music_score[i] = music_score[i]+n
            final_list.append(sort_df[0:3])
        
        query_senti = self.getQuerySenti(input_query)
        final_senti = self.sorting_senti_df(query_senti)
        for n, i in enumerate(final_senti['music'].tolist()):
            music_score[i] = music_score[i]+n

        final_list.append(final_senti[0:3])
        total_music_sort = dict(sorted(music_score.items(), key=lambda item: item[1]))
        print(total_music_sort)
        music_sort_list = list(total_music_sort.keys())
        return final_list, music_sort_list

    def sorting_df(self, sort_df, q_num):
        sort_df=sort_df.sort_values(by=['summary_ed'], ascending=False)
        # sort_df=sort_df.sort_values(by=['summary_ed'], ascending=True)
        return sort_df
        

    def sorting_senti_df(self, compare_val):
        # global senti_df
        compare=compare_val[0]
        list_senti=self.senti_df['summary_senti'].tolist()

        senti_score=[]
        for music_num in range(len(list_senti)):
            temp_score=0
            target=list_senti[music_num][0]
            for i, com_emo in enumerate(compare['labels']):
                for j, tar_emo in enumerate(target['labels']):
                    if com_emo==tar_emo:
                        dif=(abs(compare['scores'][i]-target['scores'][j])*100)
                        temp_score+=dif
            if(temp_score==0):
                temp_score=100
            senti_score.append(temp_score)

        df_senti = self.senti_df.copy()
        df_senti['summary_senti_score']=senti_score
        df_senti=df_senti.sort_values(by=['summary_senti_score'], ascending=True)
        # df_senti=df_senti.sort_values(by=['summary_senti_score'], ascending=False)
        # pd.set_option('display.max_columns', None)
        return df_senti

    def getQuerySenti(self, query):
        return self.goemotions(query)
    
    def getMusicDict(self):
        return self.music_dict


if __name__ == "__main__":

    MySentenceAnalysis = SentenceAnalysis()
    print("load complete")

    # 음악 정보값 load 
    # MySentenceAnalysis.music_data_load()
    # raw data로부터 감정정보 추출 
    # MySentenceAnalysis.music_data_senti()

    # 질문 예시
    query="힙합을 베이스로 그루브한 웨이브가 가미된 댄스"

    # 1~6 문항 - query와 summary ed값 계산 및 비교하여 나열
    final_list = MySentenceAnalysis.query_analysis(str(query))

    print("\n\n\n")
    # for i, result in enumerate(final_list):
    #     print("Question number "+str(i+1))
    #     print(result)
    #     # print(result['music'])
    #     print("\n\n\n")


