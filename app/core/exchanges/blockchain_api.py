
import requests
from app.core.symbols import symbols
BASE_URL = "https://api.blockchain.com/v3/exchange"


class BlockchainAPI:
    def __init__(self, api_secret):
        self.api_secret = api_secret

    def get_ticker(self):
        headers = {}

        response = requests.get(
            f"{BASE_URL}/tickers/", headers=headers)

        return response.json()

    def filter_tickers(self, tickers: dict):
        data = []
        for price in tickers:
            if price["symbol"] in symbols:
                data.append(price)

        return data

    def format_resp(self):
        pass


if __name__ == "__main__":
    b = BlockchainAPI('81f50bbe-8850-47f3-b6f0-72ca222f32bd')
    print(b.filter_tickers(b.get_ticker()))
