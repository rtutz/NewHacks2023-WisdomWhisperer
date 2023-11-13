from openai import OpenAI
import os
import dotenv


# https://platform.openai.com/docs/api-reference
def transcribe(file: str) -> str:
    """
    Transcribes file using OpenAI Whisper

    :param file: (str) Path to file (downloads/sV6uuMAnJUE/chunk_0.mp3)
    :return: (str) Transcription text, very long
    """
    dotenv.load_dotenv()
    client = OpenAI()
    client.api_key = os.getenv('OPENAI_API_KEY')
    audio_file = open(file, "rb")
    transcript = client.audio.transcriptions.create(
        model="whisper-1",
        file=audio_file,
        response_format="text"
    )
    return transcript


if __name__ == "__main__":
    print(transcribe('downloads/sV6uuMAnJUE/chunk_0.mp3'))
