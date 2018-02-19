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
    def query(self, query, args=[], only_first_result=False):
        pass
