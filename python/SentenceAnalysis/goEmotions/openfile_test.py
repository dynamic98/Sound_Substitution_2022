import os
import pandas as pd
import ast


path = '/Users/mactamong/Desktop/Amodal_WordAnalysis/Data/'
music_path=path+'processed_dataset_v2.csv'

# df = pd.read_csv(music_path, sep='#', encoding='cp949')
df = pd.read_csv(music_path, sep='#')
keywordlist = ast.literal_eval(df.loc[6,'keyword'])
print(type(keywordlist))
