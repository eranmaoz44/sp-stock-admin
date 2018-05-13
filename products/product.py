class Product(object):
    def __init__(self, category, name, parameters=[]):
        self.name = name
        self.category = category
        self.parameters = parameters

    def get_price(self, specification, db_handle):
        mattress_id = self._get_mattress_id(db_handle)
        return db_handle.query_select(
            'SELECT PRICE FROM {}_prices WHERE id = ? AND {}'.format(self.category, self._generate_params_condition()),
            args=[mattress_id] + specification, only_first_result_needed=True)

    def set_price(self, specification, price, db_handle):
        mattress_id = self._get_mattress_id(db_handle)

        if not mattress_id:
            self._add_model_to_mattresses(db_handle)
            mattress_id = self._get_mattress_id(db_handle)

        current_price = self.get_price(specification, db_handle)

        if not current_price:
            set_price_result = db_handle.query_insert_or_update(
                'INSERT INTO {}_prices (id, {}, price) VALUES (?,?,?,?)'.format(self.category,
                                                                                self.generate_params_list()),
                [mattress_id] + specification + [price])
        else:
            set_price_result = db_handle.query_insert_or_update(
                'UPDATE {}_prices SET price=? WHERE id=? AND {}'.format(self.category, self._generate_params_condition()),
                [price, mattress_id] + specification)

        return set_price_result

    def _add_model_to_mattresses(self, db_handle):
        db_handle.query_insert_or_update(
            'INSERT INTO {} (id, name, description) values(Null,?,Null)'.format(self.category),
            [self.name])

    def _get_mattress_id(self, db_handle):
        return db_handle.query_select('SELECT id from {} where name=?'.format(self.category), args=[self.name],
                                      only_first_result_needed=True)

    def _generate_params_condition(self):
        if len(self.parameters) > 0:
            res = '{} = ?'.format(self.parameters[0])

        for parameter in self.parameters[1:]:
            res += ' AND {} = ?'.format(parameter)

        return res

    def _generate_params_list(self):
        res = ', '.join(self.parameters)
        return res
