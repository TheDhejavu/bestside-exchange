import importlib

exchanges = [
    "bitfinex",
    "blockchain_api",
    "bitstamp",
    "gemini"
]

symbols = [
    "BTC-USD",
    "ETH-USD",
]


class CompareExchange:
    def __init__(self):
        self.modules = []
        for v in exchanges:
            module = importlib.import_module(f'app.core.exchanges.{v}')
            module = getattr(module, v)
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
