from fastapi import APIRouter
import pandas as pd

router = APIRouter(prefix="/metrics", tags=["metrics"])

@router.get("/sales-by-region")
def get_sales_by_region(start_date: str | None = None, end_date: str | None = None):
    df = pd.read_csv("data/sales.csv")
    df["date"] = pd.to_datetime(df["date"])
    
    if start_date:
        df = df[df["date"] >= pd.to_datetime(start_date)]
        print(df)
    if end_date:
        df = df[df["date"] <= pd.to_datetime(end_date)]

    sales_by_region = (df.groupby("region")["amount"].sum().to_dict())
    return sales_by_region

@router.get("/sales-over-time/daily")
def get_sales_over_time_daily(start_date: str | None = None, end_date: str | None = None):
    df = pd.read_csv("data/sales.csv", parse_dates=["date"])
    df["date"] = pd.to_datetime(df["date"])
    if start_date:
        df = df[df["date"] >= pd.to_datetime(start_date)]
    if end_date:
        df = df[df["date"] <= pd.to_datetime(end_date)]

    daily_sales = df.groupby(df["date"].dt.date)["amount"].sum().reset_index().to_dict(orient="records")
    return daily_sales