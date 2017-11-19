# coding: UTF-8
import boto3
import re
import json
import urllib2
from bs4 import BeautifulSoup


"""
Runtime
  python2.7
Handler
  sdvx_api_track_update.lambda_handler
"""

BUCKET = 'sdvx'
s3 = boto3.client('s3')
    

def lambda_handler(event, context):
    print '*** lambda function start ***'
    
    for i in range(15, 21):
        level = str(i)
        
        url = "http://www.sdvx.in/sort/sort_" + level + ".htm"
        html = urllib2.urlopen(url)
        soup = BeautifulSoup(html, "html.parser")
        htmlbody = str(soup.body)

        key = 'data/' + str(i) + '.html.txt'
        body = htmlbody
        s3.put_object(Bucket=BUCKET, Key=key, Body=body)

        response = s3.get_object(Bucket=BUCKET, Key=key)
        flines = response['Body'].read().decode('utf-8').splitlines()

        data = {}
        difficultyMap = {"a": "ADV", "e": "EXH", "i": "INF", "g": "GRV", "h": "HVN", "m": "MXM"}
        difficultyVerMap = {"i": "02", "g": "03", "h": "04"}
        for fline in flines:
            id_data = re.search("SORT(.+?)\(\)", fline)
            name_data = re.search("<!--(.+?)-->", fline)
            if id_data and name_data:
                id = id_data.group(1).lower()
                name = name_data.group(1)
                difficulty = "-"
                for k, v in difficultyMap.iteritems():
                    if k in id: difficulty = v
                ver = id[0:2]
                for k, v in difficultyVerMap.iteritems():
                    if k in id: ver = v
                path = "/" + ver + "/" + id
                
                value = {
                "id": id,
                "name": name,
                "level": level,
                "difficulty": difficulty,
                "ver": ver,
                "path": path
                }
                data[id] = value
    
        key = 'data/' + str(i) + '.json'
        body = json.dumps(data, ensure_ascii=False)
        s3.put_object(Bucket=BUCKET, Key=key, Body=body)
        
    print '*** lambda function end ***'
