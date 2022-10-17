# -*- coding:utf-8 -*-

import ast
import enum
from lib2to3.pgen2.pgen import DFAState
from re import M
from multilabel_pipeline import MultiLabelPipeline
from transformers import ElectraTokenizer
from model import ElectraForMultiLabelClassification
from pprint import pprint
import pandas as pd
import time
import random
import os
import datetime
import csv 
from edit_distance_library import similarity
from collections import OrderedDict




tokenizer = ElectraTokenizer.from_pretrained("monologg/koelectra-base-v3-goemotions")
model = ElectraForMultiLabelClassification.from_pretrained("monologg/koelectra-base-v3-goemotions")

goemotions = MultiLabelPipeline(
    model=model,
    tokenizer=tokenizer,
    threshold=0.3
)

def music_data_load():
    global df
    music_path='processed_dataset_v3.csv'
    abs_path=os.path.join(os.path.abspath(os.path.dirname(__file__)), music_path)
    df = pd.read_csv(abs_path, sep='#')
    keywordList=[]
    for i in range(len(df)):
        keywordList.append(ast.literal_eval(df.loc[i, 'keyword']))
    df["keywordList"]=keywordList
    
    
def query_analysis(input_query):
    '''
    최종 ED score를 구하는 함수
    '''
    sum_val=[]
    for target_sum in df['summary']:
        # print(target_sum+"\n\n")
        score=similarity(input_query, str(target_sum))
        sum_val.append(score)
    df['summary_ed']=sum_val

def sorting_df(sort_df, q_num):
    sort_df=sort_df.sort_values(by=['summary_ed'], ascending=False)
    final_list.append(sort_df[0:3])

def music_data_senti():
    # 9번 문항 
    global senti_df
    senti_df=df[df['type']==9]
    sum_val=[]
    for target_sum in senti_df['summary']:
        senti_val=goemotions(str(target_sum))
        sum_val.append(senti_val)
    senti_df['summary_senti']=sum_val
    # print(senti_df)
    # print("\n\n\n")

def sorting_senti_df(compare_val):
    global senti_df
    compare=compare_val[0]
    list_senti=senti_df['summary_senti'].tolist()

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

    senti_df['summary_senti_score']=senti_score
    senti_df=senti_df.sort_values(by=['summary_senti_score'], ascending=True)
    return senti_df[0:3]



if __name__ == "__main__":
    # 음악 정보값 load 
    music_data_load()

    # raw data로부터 감정정보 추출 
    music_data_senti()

    # 질문 예시
    query="힙합을 베이스로 그루브한 웨이브가 가미된 댄스"

    # 1~6 문항 - query와 summary ed값 계산 및 비교하여 나열
    query_analysis(str(query))
    final_list=[]
    for question in range(1, 7):
        sorting_df(df[df['type']==question], question)

    query_senti=goemotions(query)

    # 9 문항 - query와 summary senti 값 비교하여 나열
    final_senti=sorting_senti_df(query_senti)
    


    print("\n\n\n")
    for i, result in enumerate(final_list):
        print("Question number "+str(i+1))
        print(result)
        # print(result['music'])
        print("\n\n\n")

    print(final_senti)
    # print(final_senti['music'])
    print("\n\n\n")

