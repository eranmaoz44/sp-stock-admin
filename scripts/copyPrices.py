import requests

server = 'http://localhost:5000'

widths = ('width', ['80', '90', '120', '140', '160', '180'])

singular_widths = ('width', ['80', '90'])

lengths = ('length', ['190', '200'])

is_buying_mattress = ('is_buying_mattress', ['true', 'false'])

is_buying_mattress_false = ('is_buying_mattress', ['false'])


is_jewish_bed = ('is_jewish_bed', ['true', 'false'])

is_jewish_bed_false = ('is_jewish_bed', ['false'])

polykal_models = ['polyron_sapot_noar_polykal_one', 'polyron_sapot_noar_polykal_two']
polykal_widths = ('width', [80,90])
polykal_lengths = ('length', [190,200])
polykal_db_name = 'youth_couch'
polykal_spec = ('is_with_mechanism', ['true', 'false'])

mita_vahetzi_models = ['polyron_sapot_noar_half_efroni_shaldag_agmit', 'polyron_sapot_noar_half_huhit_tzufit', 'polyron_sapot_noar_half_dia']
sapot_noar_db_name = 'youth_couch'
mita_vahetzi_spec = ('is_with_mechanism', ['true', 'false'])
mita_vahetzi_widths = ('width', [120, 140])
mita_vahetzi_lengths = ('length', [190,200])

polyron_bed_models = ['polyron_shoam_sapir_inbar', 'polyron_shoam_sapir', 'polyron_turkiz_bareket']
beds_db_name = 'bed'
polyron_bed_widths = ('width', [80,90,120,140,160,180])
polyron_bed_lengths = ('length', [190,200])
polyron_bed_is_buying_mattress = ('is_buying_mattress', ['true', 'false'])
polyron_bed_is_jewish_bed = ('is_jewish_bed', ['true', 'false'])
polyron_bed_base_height = ('head_height', [0])

polyron_bed_models_with_storage = ['polyron_shoam_sapir_inbar', 'polyron_shoam_sapir']

polyron_wood_beds_models = ['polyron_base', 'polyron_gal']
polyron_wood_beds_db_name = 'bed'


def get_price(server_to_apply, product_type, model, specification_json):
    curr_url = server_to_apply + '/api/{0}/{1}'.format(product_type, model)
    response = requests.get(url=curr_url, params=specification_json)
    price_from_server = response.text
    if 'Not Found' in price_from_server:
        price_from_server = None
    else:
        price_from_server = int(price_from_server)
    return price_from_server


def multiply_spec_options(spec_options):
    res = []

    if len(spec_options) > 0:
        smaller_res = multiply_spec_options(spec_options[1:])
        curr_spec_name = spec_options[0][0]
        curr_spec_option = spec_options[0][1]
        for choice in curr_spec_option:
            curr_choice = (curr_spec_name, choice)
            if len(smaller_res) > 0:
                for smaller_choice in smaller_res:
                    res.append(smaller_choice + (curr_choice,))
            else:
                res.append((curr_choice,))
    return res


def get_json_spec_options(spec_options):
    tuple_res = multiply_spec_options(spec_options)
    res = [dict(x) for x in tuple_res]
    return res


def get_beds_spec_options():
    return get_json_spec_options([is_buying_mattress, lengths, widths])


def get_singular_beds_spec_options():
    return get_json_spec_options([is_buying_mattress, lengths, singular_widths])

def get_polykal_spec_options():
    return get_json_spec_options([polykal_widths, polykal_lengths, polykal_spec])

def get_mita_vahetzi_spec_options():
    return get_json_spec_options([mita_vahetzi_widths, mita_vahetzi_lengths, mita_vahetzi_spec])

def get_polyron_beds_spec_options():
    return get_json_spec_options([polyron_bed_widths, polyron_bed_lengths,
                                  polyron_bed_is_buying_mattress, polyron_bed_is_jewish_bed, polyron_bed_base_height])

def get_polyron_wood_beds_spec_options():
    return get_json_spec_options([polyron_bed_widths, polyron_bed_lengths,
                                  polyron_bed_is_buying_mattress, polyron_bed_is_jewish_bed])


def set_price(server_to_apply, product_type, model, specification_json, price):
    full_post_url = server_to_apply + '/api/{0}/{1}'.format(product_type, model)
    price_json = {'price': price}
    try:
        post_response = requests.post(full_post_url, params=specification_json, json=price_json)
    except Exception as ex:
        print('failed.. because ' + str(ex))
        exit()
    if post_response.status_code == 200:
        print('pushed to local host succeffuly')
    else:
        print('failed')
        exit()


def transform_singular(price):
    return price


def copy_and_transform(server_to_apply, product_type, spec_options, model_from, model_to, transform_price):
    for option_set in spec_options:
        price_from = get_price(server_to_apply, product_type, model_from, option_set)
        print('from {0} {1} {2}'.format(model_from, option_set, price_from))
        if not price_from:
            print('Price from not found, continuing to the next specifications')
            continue
        price_to_transformed = transform_price(model_from, price_from)
        set_price(server_to_apply, product_type, model_to, option_set, price_to_transformed)
        print('to {0} {1} {2}'.format(model_to, option_set, price_to_transformed))
        print('')


def update_is_jewish_bed_prices_for_polyron_beds():
    for option_set in get_json_spec_options([is_buying_mattress_false, is_jewish_bed_false, lengths, widths]):
        model = 'polyron_shoam_sapir_inbar'
        price_from = get_price(server, 'bed', model, option_set)
        print('from {0} {1} {2}'.format(model, option_set, price_from))
        option_set['is_buying_mattress'] = 'true'
        price_is_buying_mattress = int(price_from * 0.75)
        print('is_buying_mattress {0} {1} {2}'.format(model, option_set, price_is_buying_mattress))
        set_price(server, 'bed', model, option_set, price_is_buying_mattress)
        option_set['is_jewish_bed'] = 'true'
        price_is_buying_is_jewish = int(price_from * 0.75 * 1.3)
        print('is_buying_mattress is_jewish {0} {1} {2}'.format(model, option_set, price_is_buying_is_jewish))
        set_price(server, 'bed', model, option_set, price_is_buying_is_jewish)
        option_set['is_buying_mattress'] = 'false'
        price_is_jewish = int(price_from * 1.3)
        print('is_buying_mattress is_jewish {0} {1} {2}'.format(model, option_set, price_is_jewish))
        set_price(server, 'bed', model, option_set, price_is_jewish)
        print('')


def update_is_jewish_bed_prices_for_polyron_beds_shoam():
    for option_set in get_json_spec_options([is_buying_mattress_false, is_jewish_bed_false, lengths, widths]):
        model = 'polyron_shoam_sapir'
        price_from = get_price(server, 'bed', model, option_set)
        print('from {0} {1} {2}'.format(model, option_set, price_from))
        option_set['is_buying_mattress'] = 'true'
        price_is_buying_mattress = int(price_from * 0.75)
        print('is_buying_mattress {0} {1} {2}'.format(model, option_set, price_is_buying_mattress))
        set_price(server, 'bed', model, option_set, price_is_buying_mattress)
        option_set['is_jewish_bed'] = 'true'
        price_is_buying_is_jewish = int(price_from * 0.75 * 1.3)
        print('is_buying_mattress is_jewish {0} {1} {2}'.format(model, option_set, price_is_buying_is_jewish))
        set_price(server, 'bed', model, option_set, price_is_buying_is_jewish)
        option_set['is_buying_mattress'] = 'false'
        price_is_jewish = int(price_from * 1.3)
        print('is_buying_mattress is_jewish {0} {1} {2}'.format(model, option_set, price_is_jewish))
        set_price(server, 'bed', model, option_set, price_is_jewish)
        print('')


def update_is_jewish_bed_prices_for_polyron_beds_turkiz_bareket():
    for option_set in get_json_spec_options([is_buying_mattress_false, is_jewish_bed_false, lengths, widths]):
        model = 'polyron_turkiz_bareket'
        jewish_bed_multiplier = 1.2
        is_buying_bed_discount = 0.75
        price_from = get_price(server, 'bed', model, option_set)
        print('from {0} {1} {2}'.format(model, option_set, price_from))
        option_set['is_buying_mattress'] = 'true'
        price_is_buying_mattress = int(price_from * is_buying_bed_discount)
        print('is_buying_mattress {0} {1} {2}'.format(model, option_set, price_is_buying_mattress))
        set_price(server, 'bed', model, option_set, price_is_buying_mattress)
        option_set['is_jewish_bed'] = 'true'
        price_is_buying_is_jewish = int(price_from * is_buying_bed_discount * jewish_bed_multiplier)
        print('is_buying_mattress is_jewish {0} {1} {2}'.format(model, option_set, price_is_buying_is_jewish))
        set_price(server, 'bed', model, option_set, price_is_buying_is_jewish)
        option_set['is_buying_mattress'] = 'false'
        price_is_jewish = int(price_from * jewish_bed_multiplier)
        print('is_buying_mattress is_jewish {0} {1} {2}'.format(model, option_set, price_is_jewish))
        set_price(server, 'bed', model, option_set, price_is_jewish)
        print('')

def update_is_jewish_bed_prices_for_polyron_beds_base():
    for option_set in get_json_spec_options([is_buying_mattress_false, is_jewish_bed_false, lengths, widths]):
        model = 'polyron_base'
        jewish_bed_multiplier_is_not_buying = 1.3
        jewish_bed_multiplier_is_buying = 1.7
        price_from_is_not_buying_is_not_jewish = get_price(server, 'bed', model, option_set)
        print('from {0} {1} {2}'.format(model, option_set, price_from_is_not_buying_is_not_jewish))
        price_is_not_buying_mattress_is_jewish = int(price_from_is_not_buying_is_not_jewish * jewish_bed_multiplier_is_not_buying)
        option_set['is_jewish_bed'] = 'true'
        print('is_not_buying is_jewish {0} {1} {2}'.format(model, option_set, price_is_not_buying_mattress_is_jewish))
        set_price(server, 'bed', model, option_set, price_is_not_buying_mattress_is_jewish)
        option_set['is_buying_mattress'] = 'true'
        option_set['is_jewish_bed'] = 'false'
        price_from_is_buying_is_not_jewish = get_price(server, 'bed', model, option_set)
        print('from {0} {1} {2}'.format(model, option_set, price_from_is_buying_is_not_jewish))
        price_is_buying_is_jewish = int(price_from_is_buying_is_not_jewish * jewish_bed_multiplier_is_buying)
        option_set['is_jewish_bed'] = 'true'
        print('is_buying is_jewish {0} {1} {2}'.format(model, option_set, price_is_buying_is_jewish))
        set_price(server, 'bed', model, option_set, price_is_buying_is_jewish)

        print('')


def copy_and_transform_bed_prices_singular():
    copy_and_transform(server, 'bed', get_singular_beds_spec_options(), 'sleep_depot_regular_base', 'sleep_depot_regular_base',
                       transform_singular)



def update_is_jewish_bed_prices_for_polyron_beds_gal():
    for option_set in get_json_spec_options([is_buying_mattress_false, is_jewish_bed_false, lengths, widths]):
        model = 'polyron_gal'
        jewish_bed_multiplier_is_not_buying = 1.4
        jewish_bed_multiplier_is_buying = 1.7
        price_from_is_not_buying_is_not_jewish = get_price(server, 'bed', model, option_set)
        print('from {0} {1} {2}'.format(model, option_set, price_from_is_not_buying_is_not_jewish))
        price_is_not_buying_mattress_is_jewish = int(price_from_is_not_buying_is_not_jewish * jewish_bed_multiplier_is_not_buying)
        option_set['is_jewish_bed'] = 'true'
        print('is_not_buying is_jewish {0} {1} {2}'.format(model, option_set, price_is_not_buying_mattress_is_jewish))
        set_price(server, 'bed', model, option_set, price_is_not_buying_mattress_is_jewish)
        option_set['is_buying_mattress'] = 'true'
        option_set['is_jewish_bed'] = 'false'
        price_from_is_buying_is_not_jewish = get_price(server, 'bed', model, option_set)
        print('from {0} {1} {2}'.format(model, option_set, price_from_is_buying_is_not_jewish))
        price_is_buying_is_jewish = int(price_from_is_buying_is_not_jewish * jewish_bed_multiplier_is_buying)
        option_set['is_jewish_bed'] = 'true'
        print('is_buying is_jewish {0} {1} {2}'.format(model, option_set, price_is_buying_is_jewish))
        set_price(server, 'bed', model, option_set, price_is_buying_is_jewish)

        print('')

def update_polyron_beds_prices_jewish_is_buying_combinations():
    for model in polyron_bed_models:
        for option_set in get_json_spec_options([is_buying_mattress_false, is_jewish_bed_false, lengths, widths]):
            option_set['head_height'] = 0
            price_from = get_price(server, 'bed', model, option_set)
            print('from {0} {1} {2}'.format(model, option_set, price_from))
            if model == 'polyron_shoam_sapir':
                price_from = price_from - 300
                print('Model is Shoam/Turkiz with Klapa, removing 300 from price --> {0}'.format(price_from))
            option_set['is_buying_mattress'] = 'true'
            price_is_buying_mattress = int(price_from * 0.75)
            print('is_buying_mattress {0} {1} {2}'.format(model, option_set, price_is_buying_mattress))
            set_price(server, 'bed', model, option_set, price_is_buying_mattress)
            option_set['is_jewish_bed'] = 'true'
            if model == 'polyron_turkiz_bareket':
                jewish_bed_multiplier = 1.2
                print('Turkiz/Bareket bed without storage, jewish bed multiplier = {0}'.format(jewish_bed_multiplier))
            else:
                jewish_bed_multiplier = 1.3
                print('Inbar/Shoam bed with storage, jewish bed multiplier = {0}'.format(jewish_bed_multiplier))
            price_is_buying_is_jewish = int(price_from * 0.75 * jewish_bed_multiplier)
            print('is_buying_mattress is_jewish {0} {1} {2}'.format(model, option_set, price_is_buying_is_jewish))
            set_price(server, 'bed', model, option_set, price_is_buying_is_jewish)
            option_set['is_buying_mattress'] = 'false'
            price_is_jewish = int(price_from * jewish_bed_multiplier)
            print('is_jewish {0} {1} {2}'.format(model, option_set, price_is_jewish))
            set_price(server, 'bed', model, option_set, price_is_jewish)
            print('')



#update_is_jewish_bed_prices_for_polyron_beds_gal()

def update_polykal_prices():
    for model in polykal_models:
        copy_and_transform(server, polykal_db_name, get_polykal_spec_options(), model,
                           model,
                           lambda x: round(x*1.075))

def update_mita_vahetzi_prices():
    for model in mita_vahetzi_models:
        copy_and_transform(server, sapot_noar_db_name, get_mita_vahetzi_spec_options(), model,
                           model,
                           lambda x: round(x*1.075))

def update_polyron_beds_prices():
    for model in polyron_bed_models:
        copy_and_transform(server, beds_db_name, get_polyron_beds_spec_options(), model,
                           model,
                           polyron_bed_price_increase)

def update_polyron_beds_price_with_storage():
    for model in polyron_bed_models_with_storage:
        copy_and_transform(server, beds_db_name, get_polyron_beds_spec_options(), model,
                           model,
                           polyron_bed_price_increase)

def polyron_bed_price_increase(model, price):
    if model == 'polyron_shoam_sapir':
        price = price - 300 # remove klapa from price calculation
    price = round(price * 1.075)
    return price




def polyron_wood_beds_price_increase():
    for model in polyron_wood_beds_models:
        copy_and_transform(server, polyron_wood_beds_db_name, get_polyron_wood_beds_spec_options(), model, model, polyron_bed_price_increase)

polyron_wood_beds_price_increase()