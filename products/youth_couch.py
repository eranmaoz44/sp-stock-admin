from products.product import Product


class YouthCouch(Product):
    def __init__(self, name):
        super(YouthCouch, self).__init__('youth_couches', name, ['width', 'length', 'isWithMechanism'])
