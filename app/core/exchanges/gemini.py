from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
import json
import requests
BASE_URL = "https://api.gemini.com"


class Gemini:
    def __init__(self):
        pass

    def get_ticker(self, symbol):
        url = f'{BASE_URL}/v2/ticker/{symbol}'

        try:
            response = requests.get(url)
            data = json.loads(response.text)
            return data
        except (ConnectionError, Timeout, TooManyRedirects) as e:
            print(e)

    def orders(self, symbol):
        url = f'{BASE_URL}/v1/book/{symbol}'

        try:
            response = requests.get(url)
            data = json.loads(response.text)
            return data
        except (ConnectionError, Timeout, TooManyRedirects) as e:
            print(e)

    def format_resp(self):
        pass


if __name__ == "__main__":
    b = Gemini()
    symbol = "btcusd"
    print(b.orders(symbol))
