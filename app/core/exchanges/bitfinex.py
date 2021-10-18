
import requests
BASE_URL = "https://api-pub.bitfinex.com/v2"


class Bitfinex:
    def __init__(self):
        pass

    def get_ticker(self, symbol):
        headers = {}

        response = requests.get(
            f"{BASE_URL}/tickers?symbols={symbol}", headers=headers)

        return response.json()


if __name__ == "__main__":
    b = Bitfinex()
    symbol = "tBTCUSD,tETHUSD,"
    print(b.get_ticker(symbol))
