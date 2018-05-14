from products.product import Product


class Accessory(Product):
    def __init__(self, name):
        super(Accessory, self).__init__('accessories', name, [])
