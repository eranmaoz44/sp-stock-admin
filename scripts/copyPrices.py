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


def get_price(server_to_apply, product_type, model, specification_json):
    curr_url = server_to_apply + '/api/{0}/{1}'.format(product_type, model)
    response = requests.get(url=curr_url, params=specification_json)
    price_from_server = response.text
    return int(price_from_server)


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
        price_to_transformed = transform_price(price_from)
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


#update_is_jewish_bed_prices_for_polyron_beds_gal()

def update_polykal_prices():
    for model in polykal_models:
        copy_and_transform(server, polykal_db_name, get_polykal_spec_options(), model,
                           model,
                           lambda x: round(x*1.075))

update_polykal_prices()