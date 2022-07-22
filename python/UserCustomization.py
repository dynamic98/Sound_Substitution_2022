import os
import json
import time

def WriteUserCustom(data):

    # json_data = json.loads(data)
    UserName = data['username']
    # print(json.dumps(data, indent="  "))
    # # print(json_data)
    # SavePath = os.path.join(os.getcwd(), 'static', 'user', UserName)
    # with open(os.path.join(SavePath, '%d.json'%(id)), 'w') as f:
        # f.write(json.dumps(json_data, indent="  "))

    return "happy"
    # print(json.dumps(data, indent="  "))
    #     json_data = json.load(f)
    # print(left, right)
    # print(json.dumps(json_data, indent="\t"))