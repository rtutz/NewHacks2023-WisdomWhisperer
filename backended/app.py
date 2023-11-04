from flask import Flask

from routes.whisp import whisp

app = Flask(__name__)

app.register_blueprint(whisp, url_prefix='/endpoint')  # Registering the Blueprint

if __name__ == '__main__':
    app.run(debug=True)