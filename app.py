# compose_flask/app.py
from flask import Flask
from redis import Redis
from markupsafe import escape
from flask import render_template, request, jsonify

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


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)