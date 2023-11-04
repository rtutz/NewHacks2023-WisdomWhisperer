# Note: you need to be using OpenAI Python v0.27.0 for the code below to work
import openai
import os
import shutil
from dotenv import load_dotenv

from langchain.document_loaders.generic import GenericLoader
from langchain.document_loaders.parsers import (
    OpenAIWhisperParser,
)
from langchain.document_loaders.blob_loaders.youtube_audio import YoutubeAudioLoader

load_dotenv()

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
openai.api_key = OPENAI_API_KEY

# audio_file= open("firebase.mp3", "rb")
# transcript = openai.Audio.transcribe("whisper-1", audio_file)
# print(transcript)

yturl = "https://youtu.be/vAoB4VbhRzM?si=CIoEglIDIvGkRt9R"
urls = [yturl]

# Directory to save audio files
save_dir = "./Downloads/YouTube"

# Transcribe the videos to text
loader = GenericLoader(YoutubeAudioLoader(urls, save_dir), OpenAIWhisperParser())
docs = loader.load()

for video in docs:
    print(video.page_content)

for filename in os.listdir(save_dir):
    file_path = os.path.join(save_dir, filename)
    try:
        if os.path.isfile(file_path) or os.path.islink(file_path):
            os.unlink(file_path)
        elif os.path.isdir(file_path):
            shutil.rmtree(file_path)
    except Exception as e:
        print('Failed to delete %s. Reason: %s' % (file_path, e))