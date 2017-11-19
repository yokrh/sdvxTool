# coding: UTF-8
import boto3
import json
import random


"""
Runtime
  python2.7
Handler
  sdvx_api_weekly_update.lambda_handler
"""

BUCKET = 'sdvx'
s3 = boto3.client('s3')


def lambda_handler(event, context):
    print '*** lambda function start ***'

    weekly_tracks = []
    for i in range(15, 21):
        level = str(i)
        key = 'data/' + str(i) + '.json'
        response = s3.get_object(Bucket=BUCKET, Key=key)
        json_str = response['Body'].read().decode('utf-8')
        tracks = json.loads(json_str)

        track_list = []
        for key in tracks:
            track = tracks[key]
            t = {}
            t['id'] = track['id']
            t['name'] = track['name']
            t['level'] = track['level']
            t['difficulty'] = track['difficulty']
            t['ver'] = track['ver']
            t['path'] = track['path']
            track_list.append(t)

        track = random.choice(track_list)
        weekly_tracks.append(track)

    key = 'data/weekly.json'
    body = json.dumps(weekly_tracks, ensure_ascii=False)
    s3.put_object(Bucket=BUCKET, Key=key, Body=body)

    print '*** lambda function end ***'
