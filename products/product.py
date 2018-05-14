import sqlite3


class Product(object):
    def __init__(self, category, name, parameters=[]):
        self.name = name
        self.category = category
        self.parameters = parameters

    def get_price(self, db_handle, specification=[]):
        product_id = self._get_product_id(db_handle)
        price = self._get_price_with_id(db_handle, specification, product_id)

        return price

    def _get_price_with_id(self, db_handle, specification, product_id):
        try:
            price = self._get_product_price_aux(db_handle, specification, product_id)
        except sqlite3.OperationalError as exception:
            if 'no such table' in str(exception):
                self._create_products_prices_table(db_handle)
                price = self._get_product_price_aux(db_handle, specification, product_id)
            else:
                raise exception
        return price

    def _get_product_price_aux(self, db_handle, specification, product_id):
        return db_handle.query_select(
            'SELECT price FROM {}_prices WHERE id = ?{}'.format(self.category, self._generate_params_condition()),
            args=[product_id] + specification, only_first_result_needed=True)

    def set_price(self, db_handle, specification=[], price='-1'):
        product_id = self._get_product_id(db_handle)

        if not product_id:
            self._add_item_to_products(db_handle)
            product_id = self._get_product_id(db_handle)

        current_price = self.get_price(db_handle, specification)

        if not current_price:
            set_price_result = db_handle.query_insert_or_update(
                'INSERT INTO {}_prices (id{}, price) VALUES (?{},?)'.format(self.category,
                                                                                self._generate_params_list(),
                                                                            self._generate_argument_list()),
                [product_id] + specification + [price])
        else:
            set_price_result = db_handle.query_insert_or_update(
                'UPDATE {}_prices SET price=? WHERE id=?{}'.format(self.category,
                                                                   self._generate_params_condition()),
                [price, product_id] + specification)

        return set_price_result

    def _add_item_to_products(self, db_handle):
        db_handle.query_insert_or_update(
            'INSERT INTO {} (id, name, description) values(Null,?,Null)'.format(self.category),
            [self.name])

    def _get_product_id(self, db_handle):
        try:
            product_id = self._get_product_id_aux(db_handle)
        except sqlite3.OperationalError as exception:
            if 'no such table' in str(exception):
                self._create_products_table(db_handle)
                product_id = self._get_product_id_aux(db_handle)
            else:
                raise exception
        return product_id

    def _get_product_id_aux(self, db_handle):
        product_id = db_handle.query_select('SELECT id from {} where name=?'.format(self.category), args=[self.name],
                                            only_first_result_needed=True)
        return product_id

    def _create_products_table(self, db_handle):
        db_handle.query_create_table('CREATE TABLE {}(id INTEGER PRIMARY KEY AUTOINCREMENT'.format(self.category) +
                                     ', name varchar(256), description varchar(256))')

    def _create_products_prices_table(self, db_handle):
        db_handle.query_create_table(
            'CREATE TABLE {}_prices(id int{}, price int)'.format(self.category, self._generate_create_table_list()))

    def _generate_params_condition(self):

        res = ''

        if len(self.parameters) > 0:
            res = ' AND {} = ?'.format(self.parameters[0])

        for parameter in self.parameters[1:]:
            res += ' AND {} = ?'.format(parameter)

        return res

    def _generate_create_table_list(self):

        res = ''

        if len(self.parameters) > 0:
            res = ', {} varchar(256)'.format(self.parameters[0])

        for parameter in self.parameters[1:]:
            res += ', {} varchar(256)'.format(parameter)

        return res

    def _generate_params_list(self):
        res = ''

        if len(self.parameters) > 0:
            res = ', {}'.format(self.parameters[0])

        for paramater in self.parameters[1:]:
            res += ', {}'.format(paramater)

        return res

    def _generate_argument_list(self):
        return ',?'*len(self.parameters)


