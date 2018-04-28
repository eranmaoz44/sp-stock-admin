from product import Product


class Mattress(Product):
    def __init__(self, name):
        super(Mattress, self).__init__(name)

    def get_price(self, specification, db_handle):
        mattress_id = self._get_mattress_id(db_handle)
        return db_handle.query_select('SELECT PRICE FROM mattresses_prices WHERE id = ? and width = ? and length = ?',
                                      args=[mattress_id] + specification, only_first_result_needed=True)

    def set_price(self, specification, price, db_handle):
        mattress_id = self._get_mattress_id(db_handle)

        if not mattress_id:
            self._add_model_to_mattresses(db_handle)
            mattress_id = self._get_mattress_id(db_handle)

        current_price = self.get_price(specification, db_handle)

        if not current_price:
            set_price_result = db_handle.query_insert_or_update(
                'INSERT INTO mattresses_prices (id, width, length, price) VALUES (?,?,?,?)',
                [mattress_id] + specification + [price])
        else:
            set_price_result = db_handle.query_insert_or_update(
                'UPDATE mattresses_prices SET price=? WHERE id=? AND width=? AND length=?',
                [price, mattress_id] + specification)

        return set_price_result

    def _add_model_to_mattresses(self, db_handle):
        db_handle.query_insert_or_update('INSERT INTO mattresses (id, name, description) values(Null,?,Null)',
                                         [self.name])

    def _get_mattress_id(self, db_handle):
        return db_handle.query_select('SELECT id from mattresses where name=?', args=[self.name],
                                      only_first_result_needed=True)
