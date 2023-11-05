from flask import Flask
from flask_cors import CORS

import dotenv

dotenv.load_dotenv()

from routes.chat import chat  # Importing the Blueprint
from routes.whisp import whisp


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})  # Allow only specific origin


app.register_blueprint(whisp, url_prefix='/v1')  # Registering the Blueprint
app.register_blueprint(chat, url_prefix='/chat')  # Registering the Blueprint

# https://stackoverflow.com/questions/64218171/getting-a-socket-hang-up-error-when-trying-to-access-my-flask-app-in-a-docker-co
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=5555)
