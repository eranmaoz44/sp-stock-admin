from products.bed import Bed
from products.bed_head import BedHead


class PolyronBed(Bed):
    _bed_head_name = 'polyron_bed_head'
    _shoam_sapir_name = 'polyron_shoam_sapir'

    def __init__(self, name):
        super(PolyronBed, self).__init__(name)
        self.bed_head = BedHead(self._bed_head_name)

    def _get_head_height_price_multiplier(self, head_height):
        if head_height <= 110:
            multiplier = 1.0
        elif head_height <= 120:
            multiplier = 1.1
        else:
            multiplier = 1.2
        return multiplier

    def _get_bed_width_range(self, width):
        if width <= 100:
            width_range = '0-100'
        elif width <= 160:
            width_range = '101-160'
        else:
            width_range = '161-200'
        return width_range

    def _get_head_price(self, db_handle, width, head_height):
        head_width_range = self._get_bed_width_range(width)
        normal_head_price = self.bed_head.get_price(db_handle, [head_width_range])
        height_multiplier = self._get_head_height_price_multiplier(head_height)

        return round(normal_head_price * height_multiplier)

    def get_price(self, db_handle, width, length, head_height):
        bed_price = super().get_price(db_handle, [width, length])
        if head_height != 0:
            head_price = self._get_head_price(db_handle, width, head_height)
        elif super().get_name() == self._shoam_sapir_name:
            head_price = 300  # Shoam or sapir without head automatically needs klapa which costs 300
        else:
            head_price = 0

        return bed_price + head_price
