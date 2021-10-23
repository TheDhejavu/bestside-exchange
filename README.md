# Bestside-exchange

Best Side Exchange compares Bitcoin and Ethereum prices from multiple exchanges and gives you the best exchange to buy or sell.

## Demo 😊

#### http://147.182.182.117:3000/

## Screenshot

![Service FLow diagram](/docs/app-screenshot.png)

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

## Server

### Populate Root .env with

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

#### Populate frontend/ .env with

```
REACT_APP_WEBSOCKET_URL="ws://127.0.0.1:8000/ws"
```

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

## Questionnaire:

### Are there any sub-optimal choices( or short cuts taken due to limited time ) in your implementation?

Nothing

### Is any part of it over-designed? ( It is fine to over-design to showcase your skills as long as you are clear about it)

Nothing

### If you have to scale your solution to 100 users/second traffic what changes would you make, if any?

Nothing

### What are some other enhancements you would have made, if you had more time to do this implementation

Durrrrh
