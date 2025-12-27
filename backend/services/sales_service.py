from typing import Optional
import pandas as pd
from data.loader import SalesDataError
from models.sales import SalesByRegion, DailySales, SalesSummary, TotalRevenue


def revenue_change_summary(
    df: pd.DataFrame, filtered_df: pd.DataFrame, start_date: Optional[str], end_date: Optional[str]
) -> TotalRevenue:
    """Calculate revenue change summary."""
    if df.empty:
        return TotalRevenue(current=0, previous=None, change_percentage=None)
    
    current_revenue = filtered_df["amount"].sum()

    if start_date is None:
        return TotalRevenue(current=current_revenue, previous=None, change_percentage=None)

    start_ts = pd.to_datetime(start_date)
    end_ts = pd.to_datetime(end_date) if end_date else max(filtered_df["date"]) if not filtered_df.empty else None

    period_length = (end_ts - start_ts).days + 1
    previous_end = start_ts - pd.Timedelta(days=1)
    previous_start = previous_end - pd.Timedelta(days=period_length - 1)

    previous_df = (
        df[(df["date"] >= previous_start) & (df["date"] <= previous_end)]
    )

    previous_revenue = previous_df["amount"].sum() if not previous_df.empty else None
    change_percentage = ((current_revenue - previous_revenue) / previous_revenue) * 100 if previous_revenue is not None else None

    return TotalRevenue(
        current=current_revenue,
        previous=previous_revenue,
        change_percentage=change_percentage
    )

def filter_sales_data(
    df: pd.DataFrame, start_date: Optional[pd.Timestamp], end_date: Optional[pd.Timestamp]
) -> pd.DataFrame:
    """Filter sales data by date range."""
    if start_date is not None and end_date is not None and start_date > end_date:
        raise SalesDataError("start_date cannot be after end_date.")
    if start_date is not None:
        df = df[df["date"] >= start_date]
    if end_date is not None:
        df = df[df["date"] <= end_date]
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

def get_sales_summary_data(df: pd.DataFrame, total_revenue: TotalRevenue) -> SalesSummary:
    """Calculate summary statistics."""
    if df.empty:
        return SalesSummary(
            total_revenue=total_revenue,
            total_orders=0,
            top_region=None,
            average_daily_sales=0
        )

    return SalesSummary(
        total_revenue=total_revenue,
        total_orders=int(len(df)),
        top_region=df.groupby("region")["amount"].sum().idxmax(),
        average_daily_sales=float(df.groupby(df["date"].dt.date)["amount"].sum().mean()),
    )
