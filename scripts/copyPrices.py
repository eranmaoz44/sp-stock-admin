import requests

server = 'http://localhost:5000'

widths = ('width', ['80', '90', '120', '140', '160', '180'])

singular_widths = ('width', ['80', '90'])

lengths = ('length', ['190', '200'])

is_buying_mattress = ('is_buying_mattress', ['true', 'false'])


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


def copy_and_transform_bed_prices_singular():
    copy_and_transform(server, 'bed', get_singular_beds_spec_options(), 'sleep_depot_regular_base', 'sleep_depot_regular_base',
                       transform_singular)


copy_and_transform_bed_prices_singular()
