from products.product import Product


class Mattress(Product):
    def __init__(self, name):
        super(Mattress, self).__init__('mattresses', name, ['width', 'length'])
