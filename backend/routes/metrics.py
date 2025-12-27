from fastapi import APIRouter
from models.sales import SalesByRegion, DailySales, SalesSummary
from services.sales_service import (
    load_sales_data,
    filter_sales_data,
    get_sales_by_region_data,
    get_daily_sales_data,
    get_sales_summary_data,
    revenue_change_summary,
)

router = APIRouter(prefix="/metrics", tags=["metrics"])

@router.get("/sales-by-region", response_model=list[SalesByRegion])
def get_sales_by_region(start_date: str | None = None, end_date: str | None = None) -> list[SalesByRegion]:
    df = load_sales_data()
    df = filter_sales_data(df, start_date, end_date)
    return get_sales_by_region_data(df)

@router.get("/sales-over-time/daily", response_model=list[DailySales])
def get_sales_over_time_daily(start_date: str | None = None, end_date: str | None = None) -> list[DailySales]:
    df = load_sales_data()
    df = filter_sales_data(df, start_date, end_date)
    return get_daily_sales_data(df)

@router.get("/summary", response_model=SalesSummary)
def get_sales_summary(start_date: str | None = None, end_date: str | None = None) -> SalesSummary:
    df = load_sales_data()
    filtered_df = filter_sales_data(df, start_date, end_date)
    total_revenue = revenue_change_summary(df, filtered_df, start_date, end_date)
    return get_sales_summary_data(filtered_df, total_revenue)