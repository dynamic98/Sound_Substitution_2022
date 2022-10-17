#!/usr/bin/env python
# -*- coding:utf-8 -*-

import time
import random
import os
import datetime

from edit_distance_library import similarity
from collections import OrderedDict


path='../Data/'
ori_data_path = path + 'ar_data_query.txt'

query_dict = OrderedDict()


def create_qa_dict():
    '''
    make two dictionaries from query text file, answer text file
    '''
    ori_data_read = open(ori_data_path, "r", encoding="utf-8")

    queries = ori_data_read.readlines()
    for num, query in enumerate(queries):
        query_dict[num] = query


def query_analysis(input_query):
    '''
    최종 ED score를 구하는 함수
    '''
    ori_data_read = open(ori_data_path, "r", encoding="utf-8")
    lines = ori_data_read.readlines()
    candidate_list = []

    for num, line in enumerate(lines):
        score = similarity(input_query, line)  # Edit distance
        candidate_list.append((num, score))

    ori_data_read.close()

    def sim_score(t):
        return t[1]

    candidate_list.sort(key=sim_score, reverse=True)

    print("--------------------- ED score analysis ---------------------")
    print('최상위 쿼리 ED 값: ', candidate_list[0][1])

    return candidate_list[0][1], candidate_list[0][0]  # the most similar query

def ed_processing(query):
    create_qa_dict()
    ed_score, query_index=query_analysis(str(query))
    return ed_score, query_index, query_dict[query_index]

if __name__ == "__main__":
    create_qa_dict()