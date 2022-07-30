import os
import json
import time
import jinja2

def WriteUserDB(data):
    UserName = data['UserName']
    TaskNum = data['TaskNum']
        
    thisdate = time.localtime(time.time())
    id = str(thisdate.tm_year)+'-'+str(thisdate.tm_mon)+'-'+str(thisdate.tm_mday)+'-'+str(thisdate.tm_hour)+'-'+str(thisdate.tm_min)+'-'+str(thisdate.tm_sec)
    SavePath = os.path.join(os.getcwd(), 'static', 'user', UserName)
    with open(os.path.join(SavePath, id+'-'+TaskNum+'-DB.json'), 'w') as f:
        f.write(json.dumps(data, indent="  "))

    #     with open(os.path.join(SavePath, id+'-'+TaskNum+'-DB.json'), 'w') as f:
   
   
    # if (data['TaskIndex']==False):
    # with open(os.path.join(SavePath, id+'-'+TaskNum+'-'+TaskIndex+'-DB.json'), 'w') as f:
    #     f.write(json.dumps(data, indent="  "))

    # else:
    #     TaskIndex = data['TaskIndex']
    #     with open(os.path.join(SavePath, id+'-'+TaskNum+'-DB.json'), 'w') as f:
    #         f.write(json.dumps(data, indent="  "))



    return "happy"
