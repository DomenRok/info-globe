# compose_flask/app.py
from flask import Flask
from redis import Redis
from markupsafe import escape
from flask import render_template, request, jsonify
import requests

app = Flask(__name__)
redis = Redis(host='redis', port=6379)

@app.route('/')
def index():
    return render_template('hello.html')

@app.route('/hits')
def hello():
    redis.incr('hits')
    hits = (redis.get('hits'))
    return "This site has been peep'd {} times.".format(hits)

#@app.route('/api/autocomplete/<city_name>')
def city_autocomplete():
    pass

def geocode():
    pass

def reverse_geocode():
    pass

@app.route('/api/city/<city_name>')
def wikipedia(city_name):
    uri = "https://en.wikipedia.org/w/api.php"
    params = {
        "action": "query",
        "format": "json",
        "list": "search",
        "srsearch": escape(city_name),
    }

    request = requests.get(url=uri, params=params)
    api_response = request.json()
    return jsonify(api_response)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)