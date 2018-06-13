from products.product import Product


class BedHead(Product):
    def __init__(self, name):
        super(BedHead, self).__init__('bed_heads', name, ['width_range'])
