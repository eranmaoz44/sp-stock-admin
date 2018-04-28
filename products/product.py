from abc import ABCMeta, abstractmethod


class Product(object):
    __metaclass__ = ABCMeta

    def __init__(self, name):
        self.name = name

    @abstractmethod
    def get_price(self, specification, db_handle):
        pass

    @abstractmethod
    def set_price(self, specification, price, db_handle):
        pass



