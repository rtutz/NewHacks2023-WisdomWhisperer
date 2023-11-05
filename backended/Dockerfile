FROM python:3.11

# Create app directory
WORKDIR /python-docker

COPY requirements.txt requirements.txt
COPY GACKey.json GACKey.json
RUN pip3 install -r requirements.txt
RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y ffmpeg

COPY . .

EXPOSE 5555
CMD [ "python3", "app.py"]