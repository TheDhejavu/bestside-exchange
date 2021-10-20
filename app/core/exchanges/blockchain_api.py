from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
import json
import requests
from app.entity.ticker import Ticker
from app.core.config import (
    BLOCKCHAIN_DOT_COM_BASE_URL
)


class blockchain_api:
    place_trade_url = "https://exchange.blockchain.com/"

    def __init__(self):
        pass

    async def get_ticker(self, selected_symbols=None):
        url = f"{BLOCKCHAIN_DOT_COM_BASE_URL}/tickers/"

        try:
            response = requests.get(url)
            data = json.loads(response.text)

            return self.__format_resp(data, selected_symbols)
        except (ConnectionError, Timeout, TooManyRedirects) as e:
            print(e)

    def __format_resp(self, data, includes=None):
        resp = []
        for ticker in data:
            if includes and ticker["symbol"] not in includes:
                continue

            resp.append(Ticker(
                ask=ticker["price_24h"],
                bid=0.0,
                symbol=ticker["symbol"]
            ).__dict__)

        return {
            "exchange": "BLOCKCHAIN.COM",
            "data": resp,
            "url": self.place_trade_url
        }


if __name__ == "__main__":
    b = blockchain_api()
    print(b.get_ticker(["BTC-USD"]))
