import os
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="springstudent",
  password="springstudent",
  database="deneme"
)

mycursor = mydb.cursor()
mycursor.execute("SELECT * FROM jobs")
jobs = mycursor.fetchall()
mycursor.fetchall()  # Consume the result set
job_list = []
for job in jobs:
    job_dict = {
        'jobId': job[0],
        'userName': job[1],
        'title': job[2],
        'channelName': job[3],
        'channelId': job[4],
        'participantCount': job[6],
        'price': job[5]
    }
    job_list.append(job_dict)

app = Flask(__name__)
CORS(app)

scopes = ["https://www.googleapis.com/auth/youtube.force-ssl"]

def subscribe_to_channel(channel_id):
    print(channel_id)
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

    api_service_name = "youtube"
    api_version = "v3"
    client_secrets_file = 'C:/Users/dinoe/OneDrive/Masaüstü/son/freelancer-main/client/clientsecret.json'

    # Get credentials and create an API client
    flow = InstalledAppFlow.from_client_secrets_file(client_secrets_file, scopes)
    credentials = flow.run_local_server(port=5000)
    service = build(api_service_name, api_version, credentials=credentials)

    request = service.subscriptions().insert(
        part="snippet",
        body={
            "snippet": {
                "resourceId": {
                    "channelId": channel_id
                }
            }
        }
    )
    response = request.execute()

    if 'snippet' in response:
        print("Abonelik başarıyla gerçekleştirildi.")
        return {'success': True}
    else:
        print("Abonelik gerçekleştirilemedi.")
        return {'success': False}

@app.route('/subscribe', methods=['POST'])
def subscribe():
    channel_id = request.json.get('channelId')

    subscribe_to_channel(channel_id)

    response = {'success': True}

    return jsonify(response)

@app.route('/jobs', methods=['GET'])
def getJobs():

    return jsonify(job_list)


if __name__ == '__main__':
    app.run(port=7000)