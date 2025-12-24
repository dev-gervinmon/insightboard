from pydantic import BaseModel
from typing import Optional


class SalesByRegion(BaseModel):
    region: str
    amount: float

class DailySales(BaseModel):
    date: str
    amount: float

class SalesSummary(BaseModel):
    total_revenue: float
    total_orders: int
    top_region: Optional[str]
    average_daily_sales: float
