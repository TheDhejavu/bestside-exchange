from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
import json
import requests
BASE_URL = "https://api.kraken.com/0/public"


class Kraken:
    def __init__(self):
        pass

    def get_ticker(self, symbol):
        url = f'{BASE_URL}/Ticker?pair={symbol}'

        try:
            response = requests.get(url)
            data = json.loads(response.text)
            return data
        except (ConnectionError, Timeout, TooManyRedirects) as e:
            print(e)

    def format_resp(self):
        pass


if __name__ == "__main__":
    b = Kraken()
    symbol = "BTCUSD,ETHUSD"
    print(b.get_ticker(symbol))
