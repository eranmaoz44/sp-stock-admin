from products.product import Product


class Bed(Product):
    def __init__(self, name):
        super(Bed, self).__init__('beds', name, ['width', 'length', 'is_buying_mattress'])
