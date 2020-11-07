# compose_flask/app.py
from flask import Flask
from redis import Redis
from markupsafe import escape, Markup
from flask import render_template, request, jsonify
import requests
import pdb

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
    page_id = api_response['query']['search'][0]['pageid']
    return wikipedia_content(page_id)

def wikipedia_content(page_id):
    uri = f"http://en.wikipedia.org/w/api.php?action=query&prop=info&pageids={page_id}&inprop=url&format=json"
    request = requests.get(uri)
    return jsonify(request.json()['query']['pages'][str(page_id)])

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)