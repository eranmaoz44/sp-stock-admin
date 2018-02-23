from flask import Flask
from flask import g
from flask import request

from db_connector.sqlite3_db import SQLite3DB
from products.mattress import Mattress
from settings import sqlite3_db_file_path

application = Flask(__name__)


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

    return str(mattress.get_price([width, length], get_db_handle()))


if __name__ == '__main__':
    application.run()
