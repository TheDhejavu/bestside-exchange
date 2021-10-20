from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
import json
import requests
from app.entity.ticker import Ticker
from app.core.config import (
    BITSTAMP_BASE_URL
)


class bitstamp:
    place_trade_url = "https://www.bitstamp.net/"

    def __init__(self):
        pass

    async def get_ticker(self, selected_symbols):
        if selected_symbols == None:
            raise Exception("Symbol is required")

        try:
            data = []
            for symbol in selected_symbols:
                url = f'{BITSTAMP_BASE_URL}/ticker/{self.__format_symbol(symbol)}'
                response = requests.get(url)
                resp = json.loads(response.text)
                resp["symbol"] = symbol
                data.append(resp)

            return self.__format_resp(data)
        except (ConnectionError, Timeout, TooManyRedirects) as e:
            print(e)

    def __format_symbol(self, symbol):
        symbol = symbol.replace('-', '')
        return symbol.lower()

    def __format_resp(self, data):
        resp = []
        for ticker in data:
            # print(ticker)
            resp.append(Ticker(
                ask=ticker["ask"],
                bid=ticker["bid"],
                symbol=ticker["symbol"]
            ).__dict__)

        return {
            "exchange": "BITSTAMP",
            "data": resp,
            "url": self.place_trade_url
        }


if __name__ == "__main__":
    b = bitstamp()
    symbol = ["BTC-USD"]
    print(b.get_ticker(symbol))
