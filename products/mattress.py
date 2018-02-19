from product import Product


class Mattress(Product):
    def __init__(self, name):
        super(Mattress, self).__init__(name)

    def get_price(self, specification, db_handle):
        mattress_id = db_handle.query('SELECT id from mattresses where name=?', args=[self.name],
                                      only_first_result_needed=True)
        return db_handle.query('SELECT PRICE FROM mattresses_prices WHERE id = ? and width = ? and length = ?',
                               args=[mattress_id]+specification, only_first_result_needed=True)

    def set_price(self, specification=()):
        pass
