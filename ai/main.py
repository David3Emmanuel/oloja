from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

import matching
import trust

app = FastAPI(title="Oloja AI Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(matching.router)
app.include_router(trust.router)


@app.get("/health")
async def health():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))
