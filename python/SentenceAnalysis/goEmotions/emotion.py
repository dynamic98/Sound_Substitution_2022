from multilabel_pipeline import MultiLabelPipeline
from transformers import ElectraTokenizer
from model import ElectraForMultiLabelClassification
from pprint import pprint
from soynlp.utils import DoublespaceLineCorpus
from soynlp.noun import LRNounExtractor_v2
from konlpy.tag import *
from localStoragePy import localStoragePy


okt = Okt()

tokenizer_goemotions = ElectraTokenizer.from_pretrained("monologg/koelectra-base-v3-goemotions")
model_goemotions = ElectraForMultiLabelClassification.from_pretrained("monologg/koelectra-base-v3-goemotions")

goemotions = MultiLabelPipeline(
    model=model_goemotions,
    tokenizer=tokenizer_goemotions,
    threshold=0.3
)



# 문장이 내포하는 감정을 알려주는 함수
def show_emotion(text):
    emotion_lst = goemotions(text)
    emotion_dict = str(emotion_lst)[1:-1]
    emotion_dict = eval(emotion_dict)
    emotion = emotion_dict['labels'][0]
    return emotion
