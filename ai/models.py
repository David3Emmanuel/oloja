from pydantic import BaseModel
from typing import List, Optional


class Opportunity(BaseModel):
    id: str
    title: str
    skills: List[str]
    location: str
    language: str
    pay: float
    payFrequency: Optional[str] = None
    distance: Optional[str] = None
    duration: Optional[str] = None
    category: str
    postedBy: str


class MatchRequest(BaseModel):
    skills: List[str]
    location: str
    languages: List[str]
    opportunities: List[Opportunity]


class Transaction(BaseModel):
    amount: float
    type: str    # "credit" | "debit"
    date: str    # ISO string
    status: str  # "successful" | "failed" | "pending"


class TrustRequest(BaseModel):
    transactions: List[Transaction]
