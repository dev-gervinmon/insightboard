from pydantic import BaseModel
from typing import Optional


class SalesByRegion(BaseModel):
    region: str
    amount: float

class DailySales(BaseModel):
    date: str
    amount: float

class TotalRevenue(BaseModel):
    current: float
    previous: Optional[float]
    change_percentage: Optional[float]

class SalesSummary(BaseModel):
    total_revenue: TotalRevenue
    total_orders: int
    top_region: Optional[str]
    average_daily_sales: float
