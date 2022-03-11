from products.product import Product


class Adjustable(Product):
    def __init__(self, name):
        super(Adjustable, self).__init__('adjustables', name, ['width','length'])
