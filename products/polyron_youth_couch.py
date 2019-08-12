from products.youth_couch import YouthCouch


class PolyronYouthCouch(YouthCouch):
    _polyron_and_a_half = 'half'
    _polyron_spolyron = 'spolyron'
    _polyron_and_a_half_standard_specification = ['120', '200']
    _spolyron_standard_height = 200

    def __init__(self, name):
        super(PolyronYouthCouch, self).__init__(name)
        #self.bed_head = BedHead(self._bed_head_name)


    @staticmethod
    def _get_half_size_price_multiplier(width, length):
        multiplier = 1.0
        if width >= 130:
            multiplier += 0.1
        if length == 180 or length == 210:
            multiplier += 0.1
        return multiplier


    def get_price(self, db_handle, specification):
        width = specification[0]
        length = specification[1]
        is_with_mechanism = specification[2]
        if self._polyron_and_a_half in super().get_name():
            standard_price = super().get_price(db_handle, self._polyron_and_a_half_standard_specification + [is_with_mechanism])
            price = round(standard_price * self._get_half_size_price_multiplier(int(width), int(length)))
        elif self._polyron_spolyron in super().get_name():
            price = super().get_price(db_handle, [width, self._spolyron_standard_height, is_with_mechanism])
        else:
            price = super().get_price(db_handle, specification)

        return price
