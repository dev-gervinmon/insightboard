from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from data.loader import load_sales_data
from routes.metrics import router as metrics_router

app = FastAPI(title="InsightBoard Backend", version="1.0.0")

load_sales_data()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(metrics_router, prefix="/api/v1")

@app.get("/")
def health_check():
    return {"status": "ok"}