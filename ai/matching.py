from fastapi import APIRouter
from typing import List
from models import Opportunity, MatchRequest

router = APIRouter()


def skill_overlap_score(user_skills: List[str], opp_skills: List[str]) -> float:
    if not user_skills or not opp_skills:
        return 0.0
    user_set = {s.lower() for s in user_skills}
    opp_set = {s.lower() for s in opp_skills}
    return len(user_set & opp_set) / len(user_set | opp_set)


def location_score(user_location: str, opp_location: str) -> float:
    return 1.0 if user_location.lower() == opp_location.lower() else 0.3


def language_score(user_languages: List[str], opp_language: str) -> float:
    user_langs = {l.lower() for l in user_languages}
    opp_lang = opp_language.lower()
    if opp_lang in user_langs:
        return 1.0
    if opp_lang == "english":
        return 0.7
    return 0.2


def _score(user_skills, user_location, user_languages, opp: Opportunity) -> float:
    weights = {"skills": 0.55, "location": 0.25, "language": 0.20}
    return (
        weights["skills"]   * skill_overlap_score(user_skills, opp.skills) +
        weights["location"] * location_score(user_location, opp.location) +
        weights["language"] * language_score(user_languages, opp.language)
    )


@router.post("/match")
async def match_opportunities(req: MatchRequest):
    scored = []
    for opp in req.opportunities:
        score = _score(req.skills, req.location, req.languages, opp)
        scored.append({**opp.model_dump(), "matchScore": round(score * 100, 1)})
    scored.sort(key=lambda x: x["matchScore"], reverse=True)
    return {"matches": scored}
