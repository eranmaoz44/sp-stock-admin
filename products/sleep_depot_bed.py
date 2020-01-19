from products.bed import Bed


class SleepDepotBed(Bed):
    _classic_sleep_depot = 'sleep_depot_windows'
    _sleep_depot_regular_base = 'sleep_depot_regular_base'
    _sleep_depot_new = 'sleep_depot_new'

    def __init__(self, name, is_jewish_bed):
        super(SleepDepotBed, self).__init__(name)
        self.is_jewish_bed = is_jewish_bed

    def get_price(self, db_handle, specification=[]):
        bed_price = super().get_price(db_handle, specification)

        if self.is_jewish_bed:
            if super().get_name() == self._classic_sleep_depot:
                bed_price = bed_price + 500
            elif super().get_name() == self._sleep_depot_regular_base:
                bed_price = bed_price + 200
            elif super().get_name() == self._sleep_depot_new:
                bed_price = bed_price + 500
        res = bed_price
        return res
