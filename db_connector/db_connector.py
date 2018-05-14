from abc import ABCMeta, abstractmethod


class DBConnector(object):
    __metaclass__ = ABCMeta

    def __init__(self):
        pass

    @abstractmethod
    def connect(self):
        pass

    @abstractmethod
    def disconnect(self):
        pass

    @abstractmethod
    def query_select(self, query, args=[], only_first_result=False):
        pass

    @abstractmethod
    def query_insert_or_update(self, query, args=[]):
        pass

    @abstractmethod
    def query_create_table(self, query):
        pass
