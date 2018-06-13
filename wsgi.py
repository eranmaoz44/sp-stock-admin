import os
import flask
from flask import Flask
from flask import g
from flask import request
from flask import Response
from flask_cors import CORS

from db_connector.sqlite3_db import SQLite3DB
from products.accessory import Accessory
from products.bed import Bed
from products.bed_head import BedHead
from products.mattress import Mattress
from settings import sqlite3_db_file_path

application = Flask(__name__)
cors = CORS(application, resources={r"/api/*": {"origins": "*"}})


@application.route('/')
def index():
    print(os.getcwd())
    return flask.send_file('templates/index.html', mimetype='text.html')

@application.route('/tabset.html')
def tabset():
    return flask.render_template('tabset.html')


def get_db_handle():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = SQLite3DB(sqlite3_db_file_path)
        db.connect()
    return db


@application.teardown_appcontext
def close_db_handle_connection(exception):
    db_handle = getattr(g, '_database', None)
    if db_handle is not None:
        db_handle.disconnect()


@application.route('/api/mattress/<model>', methods=['GET'])
def get_mattress_price(model):
    width = request.args.get('width')
    length = request.args.get('length')

    mattress = Mattress(model)

    price = mattress.get_price(get_db_handle(), [width, length])

    return Response(status=200, response=str(price))


@application.route('/api/mattress/<model>', methods=['POST'])
def set_mattress_price(model):
    width = request.args.get('width')
    length = request.args.get('length')

    price = request.get_json()['price']
    mattress = Mattress(model)

    mattress.set_price(get_db_handle(), [width, length], price)

    return Response(status=200)


@application.route('/api/accessory/<name>', methods=['GET'])
def get_accessory_price(name):
    accessory = Accessory(name)

    price = accessory.get_price(get_db_handle())

    return Response(status=200, response=str(price))


@application.route('/api/accessory/<name>', methods=['POST'])
def set_accessory_price(name):
    price = request.get_json()['price']
    accessory = Accessory(name)

    accessory.set_price(get_db_handle(), [], price)

    return Response(status=200)


@application.route('/api/bed/<model>', methods=['GET'])
def get_bed_price(model):
    width = request.args.get('width')
    length = request.args.get('length')

    bed = Bed(model)

    price = bed.get_price(get_db_handle(), [width, length])

    return Response(status=200, response=str(price))


@application.route('/api/bed/<model>', methods=['POST'])
def set_bed_price(model):
    width = request.args.get('width')
    length = request.args.get('length')

    price = request.get_json()['price']
    bed = Bed(model)

    bed.set_price(get_db_handle(), [width, length], price)

    return Response(status=200)


@application.route('/api/bed_head/<model>', methods=['GET'])
def get_bed_head_price(model):
    width_range = request.args.get('width_range')

    bed_head = BedHead(model)

    price = bed_head.get_price(get_db_handle(), [width_range])

    return Response(status=200, response=str(price))


@application.route('/api/bed_head/<model>', methods=['POST'])
def set_bed_head_price(model):
    width_range = request.args.get('width_range')

    price = request.get_json()['price']
    bed_head = BedHead(model)

    bed_head.set_price(get_db_handle(), [width_range], price)

    return Response(status=200)

if __name__ == '__main__':
    application.run(host='0.0.0.0')
