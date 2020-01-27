import requests

server = 'http://localhost:5000'

widths = ('width', ['80', '90', '120', '140', '160', '180'])

lengths = ('length', ['190', '200'])

is_buying_mattress = ('is_buying_mattress', ['true', 'false'])

is_jewish_bed = ('is_jewish_bed', ['true', 'false'])

def get_price(server, product_type, model, specification_json):
    curr_url = server + '/api/{0}/{1}'.format(product_type, model)
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
    return get_json_spec_options([is_jewish_bed, is_buying_mattress, lengths, widths])


def copy_and_transform(server, product_type, spec_options, model_from, model_to, transform_func):
    for option_set in spec_options:
        price_from = get_price(server, product_type, model_from, option_set)
        print('{0} {1}'.format(option_set, price_from))

def transform_func(price):
    return price

def copy_and_transform_bed_prices():
    copy_and_transform(server, 'bed', get_beds_spec_options(), 'sleep_depot_regular_base', 'sleep_depot_regular_base_framed', transform_func)

copy_and_transform_bed_prices()

def set_price(server, product_type, model, specification_json, price):
    full_post_url = server + '/api/{0}/{1}'.format(product_type, model)
    price_json = {'price': price}
    try:
        post_response = requests.post(full_post_url, params=specification_json, json=price_json)
    except Exception as ex:
        print('failed.. because ' + str(ex.message))
        exit()
    if post_response.status_code == 200:
        print('pushed to local host succeffuly')
    else:
        print('failed')
        exit()

