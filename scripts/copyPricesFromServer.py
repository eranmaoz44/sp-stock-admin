import requests

remote_server = 'https://sp-stock-admin.herokuapp.com/'

local_server = 'http://localhost:5000'

models = ['classic_latex', 'prime_latex', 'royalty_hr',
          'supreme_double_visco', 'supreme_double_visco_visco_fabric']

widths = ['80', '90', '120', '140', '160', '180']

lengths = ['190', '200']


def copy_prices(server_from, server_to):
    for model in models:
        for width in widths:
            for length in lengths:
                price_from_server = get_price(length, model, server_from, width)

                result = 'getting price from server {}: {} x {}  ...  =  {}'.format(model, width, length,
                                                                                    price_from_server)

                print(result)

                set_price(server_to, model, width, length, price_from_server)


def set_price(server_to, model, width, length, price_from_server):
    full_post_url = server_to + '/api/mattress/{}'.format(model)
    payload = {'width': width, 'length': length}
    price_json = {'price': price_from_server}
    try:
        post_response = requests.post(full_post_url, params=payload, json=price_json)
    except Exception as ex:
        print('failed.. because ' + str(ex.message))
        exit()
    if post_response.status_code == 200:
        print('pushed to local host succeffuly')
    else:
        print('failed')
        exit()


def get_price(server_from, model, width, length):
    curr_url = server_from + '/api/mattress/{}'.format(model)
    payload = {'width': width, 'length': length}
    response = requests.get(url=curr_url, params=payload)
    price_from_server = response.text
    return int(price_from_server)


def update_prices(server, curr_discount, new_discount):
    for model in models:
        for width in widths:
            for length in lengths:

                old_price = get_price(server, model, width, length)

                new_price = round(old_price * curr_discount / new_discount)

                set_price(server, model, width, length, new_price)

                print('successfully replaced price of model {0}, size {1}/{2}, from {3} to {4}'
                      .format(model, width, length, old_price, new_price))


update_prices(local_server, 0.9, 0.855)

