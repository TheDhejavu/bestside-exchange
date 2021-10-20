# Bestside-exchange

Best Side Exchange compares Bitcoin and Ethereum prices from multiple exchanges and gives you the best exchange to buy or sell.

## Goals

This includes:

- Prices of Bitcoin and Ethereum from two (any) different exchanges/sources.
- Differentiate buy and sell price clearly
- Recommenddations on where to buy and where to sell.

## Requirements

- Python 3.x
- Docker
- make

## Setup

### Populate .env file with

```
BITSTAMP_BASE_URL="https://www.bitstamp.net/api/v2"
GEMINI_BASE_URL="https://api.gemini.com/v2"
BLOCKCHAIN_DOT_COM_BASE_URL="https://api.blockchain.com/v3/exchange"
BITFINEX_BASE_URL="https://api-pub.bitfinex.com/v2"
```

### Server

#### Start server

```
make server
```

### Web

#### Start web

```
make web
```

### Alternative Using Docker

```
Build start
```
