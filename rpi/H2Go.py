#! /usr/bin/python2

import time
import RPi.GPIO as GPIO
import sys
import json
import numpy as np
from datetime import datetime
from setup import setup 

# Calibrates hx711
REF_UNIT = -417
# Takes median of read_num values read by hx711 
READ_NUM = 7

HOURS = 24
UNIT_PER_HOUR = 60
water_intake = [0] * (HOURS * UNIT_PER_HOUR)
water_intake_time = [0] * (HOURS * UNIT_PER_HOUR)

# drink detection
DD_MAX_LEN = 10
dd_arr = []
DD_THRESHOLD = 0.10

db = setup.firebase_config()
hx = setup.hx711_config(REF_UNIT)

def cleanAndExit():
    print("Cleaning...")
    GPIO.cleanup()
    print("Bye!")
    sys.exit()

def record_water_intake():
    date = datetime.now()
    date_str = strftime("%Y%m%d%H%M") 
    return date_str 




while True:
    try:
        # LOGIC TO SEE IF DRINKING OCCURRED
        weight = hx.get_weight(READ_NUM)
        dd_arr.append(weight)
        
        if len(dd_arr) >= DD_MAX_LEN:
            dd_arr = dd_arr[1:]
        if np.std(dd_arr) / np.average() <= DD_THRESHOLD:
            record_water_intake()
        
        # data = { "datetime": datetime.now(), "weight": val }
        # data = json.dumps(data)
        # db.child("readings").child("weights").push(data)
        adate = datetime.now()
        x = adate.strftime("%Y%m%d%H%M") 
        print(val + " " + x)

        hx.power_down()
        hx.power_up()
        time.sleep(0.1)

    except (KeyboardInterrupt, SystemExit):
        cleanAndExit()
