import sqlite3

from db_connector.db_connector import DBConnector


class SQLite3DB(DBConnector):
    def __init__(self, path_to_sqlite3_db_file):
        super(SQLite3DB, self).__init__()
        self.path_to_sqllite3_db_file = path_to_sqlite3_db_file

    def connect(self):
        self.db = sqlite3.connect(self.path_to_sqllite3_db_file)

    def query_select(self, query, args=[], only_first_result_needed=False):
        query_handle = self.db.execute(query, args)
        results = query_handle.fetchall()
        query_handle.close()

        if results:
            if not only_first_result_needed:
                return_value = results
            else:
                return_value = results[0][0]
        else:
            return_value = None

        return return_value

    def query_insert_or_update(self, query, args=[]):
        db_cursor = self.db.cursor()
        db_cursor.execute(query, args)
        rows_successfully_updated = db_cursor.rowcount
        self.db.commit()
        db_cursor.close()
        return rows_successfully_updated

    def query_create_table(self, query):
        db_cursor = self.db.cursor()
        db_cursor.execute(query)
        self.db.commit()
        db_cursor.close()

    def disconnect(self):
        self.db.close()
