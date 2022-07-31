import os
import json
import time

def WriteHapticCustom(UserName, Sensitivity, Intensity):
    refFilefolderPath = os.path.join(os.getcwd(), 'static', 'user', 'default_user')
    this_Sensitivity = -int(float(Sensitivity)/100*120)
    this_Intensity = int(float(Intensity)/100*40)
    id = int(time.time())
    data = """
    {
    "id": "%d",
    "name": "%d",
    "isDefault": false,
    "version": 2,
    "category": "Music",
    "description": "",
    "tags": null,
    "selectedDevices": [ "Arm" ],
    "useMirroring": [ true, true ],
    "activeArea": [ [ ],  [ ],  [ ], [ ], [ ], [ ],  [ ], [ ], [ ], [] ],
    "isManualMapping": [ true, true, true, true, true, true, true, true, true, true],
    "channels": [{"rmsThreshold": %d, "useAdaptiveThreshold": true, "adaptiveHigh": 95, "adaptiveLow": 50,
    "subFilters": ["""%(id, id, this_Sensitivity)
    for i,_ in enumerate(range(0, 15)):
        if i == 0:
            subfilter = """ {
            "enable": true,
            "dbHigh": 0,
            "dbLow": -85,
            "vsm": %d
            }"""%(this_Intensity)
        else:
            subfilter = """,{
            "enable": true,
            "dbHigh": 0,
            "dbLow": -85,
            "vsm": %d
            }"""%(this_Intensity)
        data+=subfilter

    data+=""" ],
      "subFilterMotorMappings": ["""

    for i,_ in enumerate(range(0, 15)):
        if i == 0:
            filtermotor = """ {"mappingVest": [0, 0, 0, 0, 0],
            "mappingOthers": [252, 0, 0, 0, 0 ]
            } """
        else:
            filtermotor = """ ,{"mappingVest": [0, 0, 0, 0, 0],
            "mappingOthers": [252, 0, 0, 0, 0 ]
            } """
        data+=filtermotor
    data+= """ ]},"""
    # with open(os.path.join(refFilefolderPath, 'Modify.txt'), 'r') as f:
    #     modify = f.read()
    with open(os.path.join(refFilefolderPath, 'leftover.txt'), 'r') as f:
        leftover = f.read()
    data += leftover
    json_data = json.loads(data)
    # # print(json_data)
    SavePath = os.path.join(os.getcwd(), 'static', 'user', UserName)
    with open(os.path.join(SavePath, '%d.bhc'%(id)), 'w') as f:
        f.write(json.dumps(json_data, indent="  "))

    return id
    # print(json.dumps(data, indent="  "))
    #     json_data = json.load(f)
    # print(left, right)
    # print(json.dumps(json_data, indent="\t"))