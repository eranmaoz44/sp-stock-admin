from products.bed import Bed
from products.bed_head import BedHead


class PolyronBed(Bed):
    _bed_head_name = 'polyron_bed_head'
    _shoam_sapir_name = 'polyron_shoam_sapir'
    _inbar_name = 'polyron_shoam_sapir_inbar'
    _regular_base = 'polyron_base'
    _gal_base = 'polyron_gal'
    _polyron_turkiz_bareket = 'polyron_turkiz_bareket'
    _width_index_in_specification = 0

    def __init__(self, name, head_height, is_jewish_bed, is_buying_mattress):
        super(PolyronBed, self).__init__(name)
        self.bed_head = BedHead(self._bed_head_name)
        self.head_height = head_height
        self.is_jewish_bed = is_jewish_bed
        self.is_buying_mattress = is_buying_mattress

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

    @staticmethod
    def _extract_width_from_specification(specification):
        return int(specification[PolyronBed._width_index_in_specification])

    def get_price(self, db_handle, specification=[]):
        bed_price = super().get_price(db_handle, specification)
        width = self._extract_width_from_specification(specification)
        if self.head_height != 0:
            head_price = self._get_head_price(db_handle, width, self.head_height)
        elif super().get_name() == self._shoam_sapir_name:
            head_price = 300  # Shoam or sapir without head automatically needs klapa which costs 300
        else:
            head_price = 0

        if self.is_jewish_bed:
            if super().get_name() == self._shoam_sapir_name or super().get_name() == self._inbar_name:
                bed_price = round(bed_price * 1.3)
            elif super().get_name() == self._regular_base:
                if self.is_buying_mattress:
                    bed_price = round(bed_price * 1.7)
                else:
                    bed_price = round(bed_price * 1.3)
            elif super().get_name() == self._gal_base:
                if self.is_buying_mattress:
                    bed_price = round(bed_price * 1.7)
                else:
                    bed_price = round(bed_price * 1.4)
            else:
                bed_price = round(bed_price * 1.2)

        res = bed_price + head_price

        return res
