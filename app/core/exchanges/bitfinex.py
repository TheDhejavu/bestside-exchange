from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
import json
import requests
from app.entity.ticker import Ticker
from app.core.config import (BITFINEX_BASE_URL)
import asyncio


class bitfinex:
    place_trade_url = "https://trading.bitfinex.com/t?type=exchange"

    def __init__(self):
        pass

    async def get_ticker(self, selected_symbols=None):
        url = f"{BITFINEX_BASE_URL}/tickers?symbols={self.__format_symbols_to_bitfinex(selected_symbols)}"

        try:
            response = requests.get(url)
            data = json.loads(response.text)

            return self.__format_resp(data)
        except (ConnectionError, Timeout, TooManyRedirects) as e:
            print(e)

    def __format_symbols_to_bitfinex(self, symbols):
        symbol = ""
        for current_symbol in symbols:
            current_symbol = current_symbol.replace('-', '')
            symbol += f"t{current_symbol},"

        return symbol

    def __format_symbol(self, symbol):
        symbol = symbol.replace('t', '')
        symbol = '-'.join([symbol[:3], symbol[3:6]])

        return symbol

    def __format_resp(self, data):
        resp = []
        for ticker in data:
            resp.append(
                Ticker(ask=ticker[-4],
                       bid=0.0,
                       symbol=self.__format_symbol(ticker[0])).__dict__)

        return {
            "exchange": "BITFINEX",
            "data": resp,
            "url": self.place_trade_url
        }


if __name__ == "__main__":
    b = bitfinex()
    symbols = ["BTC-USD"]
    print(asyncio.run(b.get_ticker(symbols)))
