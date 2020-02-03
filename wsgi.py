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
from products.polyron_bed import PolyronBed
from products.sleep_depot_bed import SleepDepotBed
from products.youth_couch import YouthCouch
from products.polyron_youth_couch import PolyronYouthCouch
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
    is_buying_mattress = request.args.get('is_buying_mattress')
    is_jewish_bed = request.args.get('is_jewish_bed')

    specification = [width, length, is_jewish_bed, is_buying_mattress]

    # Polyron beds require special treatment
    if 'polyron' in model:
        head_height, is_jewish_bed = extract_polyron_bed_params_from_request()
        bed = PolyronBed(model, head_height, is_jewish_bed, True if is_buying_mattress.lower() == 'true' else False)
    elif 'sleep_depot' in model:
        is_jewish_bed = extract_is_jewish_bed_param_from_request()
        bed = SleepDepotBed(model, is_jewish_bed)
    else:
        bed = Bed(model)
    price = bed.get_price(get_db_handle(), specification)

    return Response(status=200, response=str(price))


def extract_polyron_bed_params_from_request():
    head_height = request.args.get('head_height')
    if head_height is None:
        head_height = 0
    else:
        head_height = int(head_height)
    is_jewish_bed = extract_is_jewish_bed_param_from_request()
    return head_height, is_jewish_bed


def extract_is_jewish_bed_param_from_request():
    is_jewish_bed = request.args.get('is_jewish_bed')
    if is_jewish_bed is None:
        is_jewish_bed = 'false'
    if is_jewish_bed.lower() == 'true':
        is_jewish_bed = True
    else:
        is_jewish_bed = False
    return is_jewish_bed


@application.route('/api/bed/<model>', methods=['POST'])
def set_bed_price(model):
    width = request.args.get('width')
    length = request.args.get('length')
    is_jewish_bed = request.args.get('is_jewish_bed')
    is_buying_mattress = request.args.get('is_buying_mattress')

    price = request.get_json()['price']
    bed = Bed(model)

    bed.set_price(get_db_handle(), [width, length, is_jewish_bed, is_buying_mattress], price)

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


@application.route('/api/youth_couch/<model>', methods=['GET'])
def get_youth_couch_price(model):
    width = request.args.get('width')
    length = request.args.get('length')
    is_with_mechanism = request.args.get('is_with_mechanism')
    if is_with_mechanism is None:
        is_with_mechanism = 'false'
    # Polyron beds require special treatment
    if 'polyron' in model:
        youth_couch = PolyronYouthCouch(model)
        specification = [width, length, is_with_mechanism]
    else:
        youth_couch = YouthCouch(model)
        specification = [width, length, is_with_mechanism]

    price = youth_couch.get_price(get_db_handle(), specification)

    return Response(status=200, response=str(price))


@application.route('/api/youth_couch/<model>', methods=['POST'])
def set_youth_couch_price(model):
    width = request.args.get('width')
    length = request.args.get('length')
    is_with_mechanism = request.args.get('is_with_mechanism')
    if is_with_mechanism is None:
        is_with_mechanism = 'false'
    price = request.get_json()['price']
    youth_couch = YouthCouch(model)

    youth_couch.set_price(get_db_handle(), [width, length, is_with_mechanism], price)

    return Response(status=200)


if __name__ == '__main__':
    application.run(host='0.0.0.0')
