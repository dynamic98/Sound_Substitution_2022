# -*- coding:utf-8 -*-

import json
import pandas as pd
from scipy import stats
import seaborn as sns
import matplotlib.pyplot as plt
from multilabel_pipeline import MultiLabelPipeline
from transformers import ElectraTokenizer
from model import ElectraForMultiLabelClassification
from pprint import pprint
import pandas as pd


tokenizer = ElectraTokenizer.from_pretrained("monologg/koelectra-base-v3-goemotions")
model = ElectraForMultiLabelClassification.from_pretrained("monologg/koelectra-base-v3-goemotions")

goemotions = MultiLabelPipeline(
    model=model,
    tokenizer=tokenizer,
    threshold=0.3
)

a_list=[]
a_full_list=[]
targets=['Mother', 'Father', 'Family', 'Female', 'Male', 'Marriage', 'Friend', 'Authority', 'Fear', 'Guilty', 'SelfAbility', 'Past', 'Future', 'Goal']


def survey_load():
    global q_list
    q_list=pd.read_excel('../../Data/Survey_List.xlsx', engine='openpyxl')

user_result=dict()
user_result['name']="YGN"
user_result["number"]="01"


survey_load()

print("불안하고 눈물이 나와")
print("우는 건 나쁜 일이 아니에요\n")

print("이 세상에서 완전히 사라지고 싶어")
print("당신은 혼자가 아니에요. 제가 옆에 있다는 것만 기억해주세요.\n")

print("오늘은 구름이랑 달이 예쁘더라")
print("당신은 복받은 사람\n")

print("내가 머리는 좀 좋아")
print("머리랑 가슴이 가끔 따로 놀죠\n")

# print(q_list)
for i, question in enumerate(q_list['Question']):
    answer=input("Q"+str(i+1)+":"+question+"\n"+"A:")
    ques=goemotions(question)
    res=goemotions(answer)
    total_res=goemotions(question+answer)
    # print("Q:"+ques)
    print(res)
    # print("Total"+total_res)
    a_list.append(" "+answer)
    print("\n")


q_list['Answer']=a_list

for tar in targets:
    temp_pd=q_list[(q_list['Target']==tar)]
    print(temp_pd)

writer=pd.ExcelWriter('../Data/User_Raw_Data/'+user_result['name']+user_result['number']+'.xlsx', engine='openpyxl')
q_list.to_excel(writer, "Result")
writer.close()