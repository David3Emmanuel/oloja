from fastapi import APIRouter
from typing import List
from datetime import datetime
import numpy as np
from models import Transaction, TrustRequest

router = APIRouter()


def compute_trust_score(transactions: List[Transaction]) -> dict:
    if not transactions:
        return {
            "score": 0,
            "tier": "Bronze",
            "breakdown": {"reason": "No transaction history"},
            "unlocks": [],
        }

    successful = [t for t in transactions if t.status == "successful"]
    credits = [t for t in successful if t.type == "credit"]

    # Volume — caps at 50 completed transactions
    volume_score = min(len(successful) / 50, 1.0)

    # Consistency — low variance in credit amounts = predictable income
    if len(credits) > 1:
        amounts = [t.amount for t in credits]
        cv = np.std(amounts) / (np.mean(amounts) + 1)
        consistency_score = float(max(0, 1 - cv))
    else:
        consistency_score = 0.3

    # Recency — last successful txn within 30 days
    if successful:
        try:
            latest = max(
                datetime.fromisoformat(t.date.replace("Z", "")) for t in successful
            )
            days_since = (datetime.now() - latest).days
            recency_score = max(0, 1 - (days_since / 30))
        except Exception:
            recency_score = 0.5
    else:
        recency_score = 0.0

    # Reliability — successful vs total
    reliability_score = len(successful) / len(transactions)

    weights = {"volume": 0.25, "consistency": 0.30, "recency": 0.25, "reliability": 0.20}
    raw = (
        weights["volume"]      * volume_score +
        weights["consistency"] * consistency_score +
        weights["recency"]     * recency_score +
        weights["reliability"] * reliability_score
    )

    final_score = round(raw * 100)

    unlocks = []
    if final_score >= 20: unlocks.append("Digital wallet")
    if final_score >= 40: unlocks.append("Savings account")
    if final_score >= 60: unlocks.append("Micro-credit (up to ₦50,000)")
    if final_score >= 80: unlocks.append("Insurance products")

    tier = "Bronze" if final_score < 40 else "Silver" if final_score < 70 else "Gold"

    return {
        "score": final_score,
        "tier": tier,
        "breakdown": {
            "volume": round(volume_score * 100, 1),
            "consistency": round(consistency_score * 100, 1),
            "recency": round(recency_score * 100, 1),
            "reliability": round(reliability_score * 100, 1),
        },
        "unlocks": unlocks,
    }


@router.post("/trust-score")
async def trust_score(req: TrustRequest):
    return compute_trust_score(req.transactions)
