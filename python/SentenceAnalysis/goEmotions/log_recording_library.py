#!/usr/bin/env python
# -*- coding:utf-8 -*-

import getpass
import datetime

user_computer = getpass.getuser()

def log_query(query_string, num, id):
    # if id!='opening':
    Date=datetime.datetime.now().strftime('%Y-%m-%d')
    # log_path = '/home/' + str(user_computer) + '/Desktop/chatbot/source/logset/'+str(Date)+'/'
    log_path = '/Users/' + str(user_computer) + '/Desktop/chatbot/source/logset/' + str(Date) + '/'+id+'/'
    log_query = open(log_path + 'log_query_'+str(num)+'.txt', 'a')
    log_query.write(str(query_string) + '\n')
    log_query.close()




def log_answer(answer_string, num, id):
    # if id!='opening':
    Date = datetime.datetime.now().strftime('%Y-%m-%d')
    # log_path = '/home/' + str(user_computer) + '/Desktop/chatbot/source/logset/'+str(Date)+'/'
    log_path = '/Users/' + str(user_computer) + '/Desktop/chatbot/source/logset/' + str(Date) + '/'+id+'/'
    log_answer = open(log_path + 'log_answer_'+str(num)+'.txt', 'a')
    log_answer.write(str(answer_string))
    log_answer.close()


if __name__ == "__main__":
    log_query()
    log_answer()


