import os
import json
import time

def WriteHapticCustom(UserName, left, right):
    refFilefolderPath = os.path.join(os.getcwd(), 'static', 'user', 'default_user')
    Intensity_H1 = 16
    Intensity_H2 = 15
    Intensity_H3 = 14
    Sensitivity_H1 = -40
    Sensitivity_H2 = -50
    Sensitivity_H3 = -20
    H1toH2 = round(13/100*float(left)) + 1
    H2toH3 = round(13/100*float(right)) + 1
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
    "channels": [{"rmsThreshold": -50, "useAdaptiveThreshold": true, "adaptiveHigh": 95, "adaptiveLow": 50,
    "subFilters": ["""%(id, id)
    for i_H1,_ in enumerate(range(0, H1toH2)):
        if i_H1 == 0:
            subfilter = """ {
            "enable": true,
            "dbHigh": 0,
            "dbLow": %d,
            "vsm": %d
            }"""%(Sensitivity_H1, Intensity_H1)
        else:
            subfilter = """,{
            "enable": true,
            "dbHigh": 0,
            "dbLow": %d,
            "vsm": %d
            }"""%(Sensitivity_H1, Intensity_H1)
        data+=subfilter
    
    for _ in range(H1toH2, H2toH3):
        subfilter = """,{
        "enable": true,
        "dbHigh": 0,
        "dbLow": %d,
        "vsm": %d
        }"""%(Sensitivity_H2, Intensity_H2)
        data+=subfilter
    
    for _ in range(H2toH3, 15):
        subfilter = """,{
        "enable": true,
        "dbHigh": 0,
        "dbLow": %d,
        "vsm": %d
        }"""%(Sensitivity_H3, Intensity_H3)
        data+=subfilter

    data+=""" ],
      "subFilterMotorMappings": ["""

    for i_H1,_ in enumerate(range(0, H1toH2)):
        if i_H1 == 0:
            filtermotor = """ {"mappingVest": [0, 0, 0, 0, 0],
            "mappingOthers": [144, 0, 0, 0, 0 ]
            } """
        else:
            filtermotor = """ ,{"mappingVest": [0, 0, 0, 0, 0],
            "mappingOthers": [144, 0, 0, 0, 0 ]
            } """
        data+=filtermotor

    for _ in range(H1toH2, H2toH3):
        filtermotor = """,{"mappingVest": [0, 0, 0, 0, 0],
            "mappingOthers": [72, 0, 0, 0, 0 ]}"""
        data+=filtermotor
    
    for _ in range(H2toH3, 15):
        filtermotor = """,{"mappingVest": [0, 0, 0, 0, 0],
            "mappingOthers": [36, 0, 0, 0, 0 ]}"""
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