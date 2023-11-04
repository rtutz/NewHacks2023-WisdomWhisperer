# Note: you need to be using OpenAI Python v0.27.0 for the code below to work
from flask import Blueprint, jsonify, request, make_response
import openai
import os
import shutil
from dotenv import load_dotenv
import re

whisp = Blueprint('whisp', __name__)

from langchain.document_loaders.generic import GenericLoader
from langchain.document_loaders.parsers import (
    OpenAIWhisperParser,
)
from langchain.document_loaders.blob_loaders.youtube_audio import YoutubeAudioLoader

load_dotenv()

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
openai.api_key = OPENAI_API_KEY


@whisp.route('/transcribe', methods=['POST'])
def transcribe():
    return_text = ""
    try:
        data = request.get_json()
        yturl = data.get('yturl')
        urls = [yturl]
        regex = "^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$"
        uuid = re.search(regex, yturl, re.IGNORECASE).group(6)
        try:
            # Directory to save audio files
            save_dir = "../Downloads/YouTube"
            # https://stackoverflow.com/questions/19377262/regex-for-youtube-url

            # Transcribe the videos to text
            loader = GenericLoader(YoutubeAudioLoader(urls, save_dir), OpenAIWhisperParser())
            docs = loader.load()
            try:
                for video in docs:
                    print(video.page_content)
                    return_text += " " + video.page_content
                for filename in os.listdir(save_dir):
                    file_path = os.path.join(save_dir, filename)
                    try:
                        if os.path.isfile(file_path) or os.path.islink(file_path):
                            os.unlink(file_path)
                        elif os.path.isdir(file_path):
                            shutil.rmtree(file_path)
                    except Exception as e:
                        print('Failed to delete %s. Reason: %s' % (file_path, e))
                response = make_response(
                    jsonify(
                        {"transcription": str(return_text), "uuid": uuid}
                    ),
                    200,
                )
                response.headers["Content-Type"] = "application/json"
                return response
            except:
                return jsonify("We hit an error"), 500
        except:
            return jsonify("Error transcribing"), 500
    except:
        return jsonify("Error with URL"), 400
