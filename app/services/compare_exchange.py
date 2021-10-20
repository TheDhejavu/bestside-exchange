import importlib

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
    }
]

symbols = [
    "BTC-USD",
    "ETH-USD",
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
        data = []
        for module in self.modules:
            module = module()
            value = await module.get_ticker(symbols)
            data.append(value)

        return data

    def __set_best_buy_side():
        pass

    def __set_best_sell_side():
        pass


if __name__ == "__main__":
    c = CompareExchange()
    print(c.get_tickers())
