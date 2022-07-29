import os
import json
import time
import jinja2

def WriteUserCustom(data):
    UserName = data['UserName']
    thisdate = time.localtime(time.time())
    id = str(thisdate.tm_year)+'-'+str(thisdate.tm_mon)+'-'+str(thisdate.tm_mday)+'-'+str(thisdate.tm_hour)+'-'+str(thisdate.tm_min)+'-'+str(thisdate.tm_sec)
    SavePath = os.path.join(os.getcwd(), 'static', 'user', UserName)
    with open(os.path.join(SavePath, id+'.json'), 'w') as f:
        f.write(json.dumps(data, indent="  "))

    return "happy"

def GetUserCustom(UserName):
    UserPath = os.path.join(os.getcwd(), 'static', 'user', UserName)
    filelist = os.listdir(os.path.join(UserPath))
    for n, i in enumerate(filelist):
        if not i.endswith('.json'):
            filelist.pop(n)

    if len(filelist) != 0:
        filelist.sort(key=lambda x: os.path.getmtime(os.path.join(UserPath, x)), reverse=True)
        RecentUserCustom = filelist[0]
        with open(os.path.join(UserPath, RecentUserCustom), 'r') as f:
            json_data = json.load(f)
    else:
        with open(os.path.join(os.getcwd(), 'static', 'user', 'default_user', 'default_custom.json'), 'r') as f:
            json_data = json.load(f)
    return json_data
