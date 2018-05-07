from pip._vendor import requests

url_to_copy = 'http://sp-stock-admin-sp-stock-admin.a3c1.starter-us-west-1.openshiftapps.com'

url_to_paste = 'http://localhost:5000'

models = ['classic_latex', 'prime_latex', 'royalty_hr', 'royalty_hr_luxury', 'royalty_duflex_latex',
          'supreme_double_visco', 'supreme_double_visco_visco_fabric']

widths = ['80', '90', '120', '140', '160', '180']

lengths = ['190', '200']

for model in models:
    for width in widths:
        for length in lengths:
            curr_url = url_to_copy + '/api/mattress/{}'.format(model)
            payload = {'width': width, 'length': length}
            response = requests.get(url=curr_url, params=payload)
            price_from_server = response.text

            result = 'getting price from server {}: {} x {}  ...  =  {}'.format(model, width, length, price_from_server)

            print(result)

            full_post_url = url_to_paste + '/api/mattress/{}'.format(model)
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
