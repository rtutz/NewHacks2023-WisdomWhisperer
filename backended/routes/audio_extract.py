# https://github.com/yt-dlp/yt-dlp#embedding-yt-dlp
# https://github.com/jiaaro/pydub
import yt_dlp
from pydub import AudioSegment
from pydub.utils import make_chunks
import math
import re


def download_audio(url: str) -> dict:
    URLS = [url]
    regex = "^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$"
    uuid = re.search(regex, url, re.IGNORECASE).group(6)
    ydl_opts = {
        'format': 'mp3/worstaudio/worst',
        'outtmpl': 'downloads/' + uuid + '/' + uuid,
        # ℹ️ See help(yt_dlp.postprocessor) for a list of available Postprocessors and their arguments
        'postprocessors': [{  # Extract audio using ffmpeg
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
        }]
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        error_code = ydl.download(URLS)
        # https://stackoverflow.com/questions/70583652/grabbing-video-title-from-yt-dlp-command-line-output
        info_dict = ydl.extract_info(url, download=False)
        video_title = info_dict.get('title', None)
        if error_code == 0:
            return {'response': error_code, 'title': video_title, 'file_path': 'downloads/' + uuid + '/',
                    'file_name': uuid + '.mp3'}
        else:
            return {'response': error_code}


def split_audio(file_path: str, file_name: str) -> list:
    # https://stackoverflow.com/questions/36632511/split-audio-file-into-several-files-each-below-a-size-threshold
    list_of_chunks = []
    myaudio = AudioSegment.from_file(file_path + file_name, "mp3")
    channel_count = myaudio.channels  # Get channels
    sample_width = myaudio.sample_width  # Get sample width
    duration_in_sec = len(myaudio) / 1000  # Length of audio in sec
    sample_rate = myaudio.frame_rate

    print("sample_width=", sample_width)
    print("channel_count=", channel_count)
    print("duration_in_sec=", duration_in_sec)
    print("frame_rate=", sample_rate)
    bit_rate = 16  # assumption , you can extract from mediainfo("test.wav") dynamically

    mp3_file_size = (sample_rate * bit_rate * channel_count * duration_in_sec) / 8
    print("mp3_file_size = ", mp3_file_size)

    file_split_size = 10000000  # 10Mb OR 10, 000, 000 bytes
    total_chunks = mp3_file_size // file_split_size

    # chunk_length_in_sec = math.ceil((duration_in_sec * 10000000) / mp3_file_size)  # in sec
    chunk_length_in_sec = math.ceil((duration_in_sec * 100000000) / mp3_file_size)  # in sec
    chunk_length_ms = chunk_length_in_sec * 1000
    chunks = make_chunks(myaudio, chunk_length_ms)

    # Export all the individual chunks as mp3 files
    for i, chunk in enumerate(chunks):
        chunk_name = f'{file_path}chunk_{i}.mp3'
        print("exporting", chunk_name)
        chunk.export(chunk_name, format="mp3")
        list_of_chunks.append(chunk_name)
    return list_of_chunks


if __name__ == "__main__":
    url = 'https://www.youtube.com/watch?v=sV6uuMAnJUE'

    response = download_audio(url)
    if response['response'] == 0:
        print("Download Successful: ", response['title'])
        chunk_list = split_audio(response['file_path'], response['file_name'])
        print(chunk_list)
    else:
        print("Error in downloading, error code: ", response)
