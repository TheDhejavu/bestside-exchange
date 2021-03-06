"""App Setting Entity"""
import typing as t
from pydantic import BaseModel


class Ticker(BaseModel):
    symbol: str
    ask: float
    bid: float
