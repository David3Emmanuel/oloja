# Oloja

AI-powered gig matching and financial identity platform for informal workers in Nigeria. Built for Squadco Hackathon 3.0, Challenge 02.

## What it does

- Onboards informal workers with a digital identity and Squad virtual account
- Matches them to gig opportunities using Claude AI (semantic skill understanding)
- Builds a Trust Score from their transaction history that unlocks financial products (savings, credit, insurance)
- Processes payments and wallet operations through the Squad API

## Architecture

```
Frontend (React Native Web)
        │
        ▼
NestJS Backend  :3001  ──────────► Squad API (sandbox)
        │
        └── AI embedded in-process (no separate service)
            ├── Claude claude-haiku-4-5 — semantic job matching
            └── Algorithmic trust score — transaction math
```

The AI runs inside NestJS as injected services (`AiModule`). There is no separate AI server at runtime.

## Repo structure

```
oloja/
├── backend/          NestJS API server
│   └── src/
│       ├── ai/       Matching + trust score services
│       ├── squad/    Squad API integration
│       ├── users/    Onboarding
│       ├── opportunities/  Job matching
│       └── trust/    Trust score endpoint
└── frontend/         NextJS Web app
```

## Getting started

### Backend

```bash
cd backend
pnpm install
cp .env.example .env   # fill in your keys
pnpm dev               # http://localhost:3001
```

**Required env vars:**

| Variable            | Description                                |
| ------------------- | ------------------------------------------ |
| `PORT`              | Server port (default `3001`)               |
| `SQUAD_SECRET_KEY`  | Squad sandbox key — starts with `test_sk_` |
| `SQUAD_BASE_URL`    | `https://sandbox-api-d.squadco.com`        |
| `ANTHROPIC_API_KEY` | Claude API key — starts with `sk-ant-`     |

Get your Squad key at **dashboard.squadco.com → Settings → API Keys**.  
Get your Anthropic key at **console.anthropic.com**.

If `ANTHROPIC_API_KEY` is missing or Claude is unavailable, matching falls back to Jaccard similarity automatically — the endpoint never errors.

### Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

### API docs

Swagger UI is served at `http://localhost:3001/docs` when the backend is running.

## Key endpoints

| Method | Path                                | Description                           |
| ------ | ----------------------------------- | ------------------------------------- |
| `POST` | `/api/users/onboard`                | Register user, create virtual account |
| `GET`  | `/api/opportunities/match`          | AI-ranked job opportunities           |
| `GET`  | `/api/trust/:accountNumber`         | Trust score + tier + unlocks          |
| `GET`  | `/api/squad/balance/:accountNumber` | Wallet balance                        |
| `POST` | `/api/squad/transfer`               | Initiate transfer                     |

### Match query params

```
GET /api/opportunities/match?skills=plumbing,tiling&location=Lagos&languages=english,yoruba
```

### Trust score response

```json
{
  "score": 72,
  "tier": "Silver",
  "breakdown": {
    "volume": 80,
    "consistency": 65,
    "recency": 90,
    "reliability": 100
  },
  "unlocks": [
    "Digital wallet",
    "Savings account",
    "Micro-credit (up to ₦50,000)"
  ]
}
```

Tiers: **Bronze** (0–39) · **Silver** (40–69) · **Gold** (70–100)

## Trust score algorithm

Weighted average of four components, each 0–100:

| Component   | Weight | How                                |
| ----------- | ------ | ---------------------------------- |
| Volume      | 25%    | Completed transactions, caps at 50 |
| Consistency | 30%    | Inverse CV of credit amounts       |
| Recency     | 25%    | Exponential decay — `e^(-days/30)` |
| Reliability | 20%    | Successful / total transactions    |

A growth bonus (+0–10 pts) is added when credit volume in the last 30 days exceeds the prior 30 days. Cold-start baseline is 15 for accounts with no history.
