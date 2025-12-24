from typing import Optional
from fastapi import HTTPException
import pandas as pd
from models.sales import SalesByRegion, DailySales, SalesSummary


def load_sales_data():
    """Load sales data from CSV file (later change into a database)."""
    try: 
        df = pd.read_csv("data/sales.csv", parse_dates=["date"])
        return df
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Sales data file not found")

def filter_sales_data(df: pd.DataFrame, start_date: Optional[str], end_date: Optional[str]) -> pd.DataFrame:
    """Filter sales data by date range."""
    if start_date:
        try:
            df = df[df["date"] >= pd.to_datetime(start_date)]
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid start_date format")
        
    if end_date:
        try:
            df = df[df["date"] <= pd.to_datetime(end_date)]
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid end_date format")
        
    return df

def get_sales_by_region_data(df: pd.DataFrame) -> list[SalesByRegion]:
    """Aggregate sales by region."""
    if df.empty:
        return []
    
    result = df.groupby("region")["amount"].sum().reset_index()
    return result.to_dict(orient="records")

def get_daily_sales_data(df: pd.DataFrame) -> list[DailySales]:
    """Aggregate sales by day."""
    if df.empty:
        return []

    daily_sales = df.groupby(df["date"].dt.date)["amount"].sum().reset_index()
    daily_sales.columns = ["date", "amount"]
    daily_sales["date"] = daily_sales["date"].astype(str)
    return daily_sales.to_dict(orient="records")

def get_sales_summary_data(df: pd.DataFrame) -> SalesSummary:
    """Calculate summary statistics."""
    if df.empty:
        return SalesSummary(
            total_revenue=0,
            total_orders=0,
            top_region=None,
            average_daily_sales=0
        )

    return SalesSummary(
        total_revenue=float(df["amount"].sum()),
        total_orders=int(len(df)),
        top_region=df.groupby("region")["amount"].sum().idxmax(),
        average_daily_sales=float(df.groupby(df["date"].dt.date)["amount"].sum().mean()),
    )
