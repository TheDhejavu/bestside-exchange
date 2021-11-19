import importlib
import asyncio

exchanges = [
    {
        "name": "bitfinex",
        "active": True,
    },
    {
        "name": "blockchain_api",
        "active": True
    },
    {
        "name": "bitstamp",
        "active": True,
    },
    {
        "name": "gemini",
        "active": True
    },
]

symbols = [
    "BTC-USD",
    "ETH-USD",
    "LTC-USD"
]

class CompareExchange:
    def __init__(self):
        self.modules = []
        for exchange in exchanges:
            if exchange["active"]:
                module = importlib.import_module(
                    f'app.core.exchanges.{exchange["name"]}')
                module = getattr(module, exchange["name"])
                self.modules.append(module)

    async def get_tickers(self):
        tasks = []
        for module in self.modules:
            module = module()
            tasks.append(module.get_ticker(symbols))

        results = await asyncio.gather(*tasks)

        return self.__set_best_side(results)

    def __set_best_side(self, data):
        best_sides = self.__construct_best_side(symbols)

        # compare all exchanges
        for tickers in data:
            exchange = tickers["exchange"]
            for ticker in tickers["data"]:
                symbol = ticker["symbol"]
                if symbol in best_sides:

                    if ticker["ask"] != 0.0:
                        if best_sides[symbol]["best_buy_side"][
                                "price"] == None:
                            best_sides[symbol]["best_buy_side"][
                                "exchange"] = exchange
                            best_sides[symbol]["best_buy_side"][
                                "price"] = ticker["ask"]
                        else:
                            if ticker["ask"] < best_sides[symbol][
                                    "best_buy_side"]["price"]:
                                best_sides[symbol]["best_buy_side"][
                                    "exchange"] = exchange
                                best_sides[symbol]["best_buy_side"][
                                    "price"] = ticker["ask"]

                    if ticker["bid"] != 0.0:
                        if best_sides[symbol]["best_sell_side"][
                                "price"] == None:
                            best_sides[symbol]["best_sell_side"][
                                "exchange"] = exchange
                            best_sides[symbol]["best_sell_side"][
                                "price"] = ticker["bid"]
                        else:
                            if ticker["bid"] < best_sides[symbol][
                                    "best_sell_side"]["price"]:
                                best_sides[symbol]["best_sell_side"][
                                    "exchange"] = exchange
                                best_sides[symbol]["best_sell_side"][
                                    "price"] = ticker["bid"]

        return {"exchanges": data, "best_sides": best_sides}

    def __construct_best_side(self, symbols):
        obj = {}
        for symbol in symbols:
            obj[symbol] = {
                "best_buy_side": {
                    "exchange": None,
                    "price": None
                },
                "best_sell_side": {
                    "exchange": None,
                    "price": None
                },
            }

        return obj


if __name__ == "__main__":
    c = CompareExchange()
    print(asyncio.run(c.get_tickers()))
