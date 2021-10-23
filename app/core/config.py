

import logging
import sys
from typing import List
import os

from loguru import logger
from starlette.config import Config as fetchConfig
from starlette.datastructures import CommaSeparatedStrings

from app.core.logging import InterceptHandler

API_PREFIX = "/api"
print(f"APPLICATION_ENV", os.environ.get("APP_ENV"))
VERSION = "1.0.0"


def config(key, cast=None, default=None):
    if os.environ.get("APP_ENV") == "production" or os.environ.get("APP_ENV") == "development":
        return os.environ.get(key=key, default=default)

    _config = fetchConfig(".env")

    return _config(key, cast=cast, default=default)

DEBUG: bool = config("DEBUG", cast=bool, default=False)


MAX_CONNECTIONS_COUNT: int = config(
    "MAX_CONNECTIONS_COUNT", cast=int, default=10)
MIN_CONNECTIONS_COUNT: int = config(
    "MIN_CONNECTIONS_COUNT", cast=int, default=10)


BITSTAMP_BASE_URL: str = config("BITSTAMP_BASE_URL")
GEMINI_BASE_URL: str = config("GEMINI_BASE_URL")
BLOCKCHAIN_DOT_COM_BASE_URL: str = config("BLOCKCHAIN_DOT_COM_BASE_URL")
BITFINEX_BASE_URL: str = config("BITFINEX_BASE_URL")

PROJECT_NAME: str = config(
    "PROJECT_NAME", default="BestSide Exchange")
ALLOWED_HOSTS: List[str] = config(
    "ALLOWED_HOSTS",
    cast=CommaSeparatedStrings,
    default="",
)

# logging configuration

LOGGING_LEVEL = logging.DEBUG if DEBUG else logging.INFO
LOGGERS = ("uvicorn.asgi", "uvicorn.access")

logging.getLogger().handlers = [InterceptHandler()]
for logger_name in LOGGERS:
    logging_logger = logging.getLogger(logger_name)
    logging_logger.handlers = [InterceptHandler(level=LOGGING_LEVEL)]

logger.configure(handlers=[{"sink": sys.stderr, "level": LOGGING_LEVEL}])
