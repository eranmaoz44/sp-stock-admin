from flask import Flask
from flask import g
from flask import request
from flask import Response
from flask_cors import CORS

from db_connector.sqlite3_db import SQLite3DB
from products.mattress import Mattress
from settings import sqlite3_db_file_path

application = Flask(__name__)
cors = CORS(application, resources={r"/api/*": {"origins": "*"}})


@application.route('/')
def hello_world():
    return 'Hello World!'


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

    price = mattress.get_price([width, length], get_db_handle())

    return Response(status=200, response=str(price))


@application.route('/api/mattress/<model>', methods=['POST'])
def set_mattress_price(model):
    width = request.args.get('width')
    length = request.args.get('length')

    price = request.get_json()['price']
    mattress = Mattress(model)

    mattress.set_price([width, length], price, get_db_handle())

    return Response(status=200)


if __name__ == '__main__':
    application.run()
