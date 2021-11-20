# Bestside-exchange

Best Side Exchange compares Bitcoin and Ethereum prices from multiple exchanges and gives you the best exchange to buy or sell.

## Demo 👀

#### http://147.182.182.117:3000/

## Screenshot

![Service FLow diagram](/docs/app-screenshot.png)

## Goals

This includes:

- Prices of Bitcoin and Ethereum from different exchanges/sources.
- Differentiate buy and sell prices 
- Recommenddations on where to buy and where to sell.

## Requirements

- Python 3.x
- Docker
- make

## Setup

## Server

### Create .env with

```
BITSTAMP_BASE_URL="https://www.bitstamp.net/api/v2"
GEMINI_BASE_URL="https://api.gemini.com/v2"
BLOCKCHAIN_DOT_COM_BASE_URL="https://api.blockchain.com/v3/exchange"
BITFINEX_BASE_URL="https://api-pub.bitfinex.com/v2"
```

#### Start server

```
make server
```

## Web Frontend

#### Start web

```
make web
```

## Alternative Using Docker (Server & Web)

```
Build start
```

#### Development

##### http://127.0.0.1:3000

#### Demo

##### http://147.182.182.117:3000/
