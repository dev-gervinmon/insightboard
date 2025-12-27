import pandas as pd

# Custom exception for business logic errors
class SalesDataError(Exception):
    pass

_sales_df: pd.DataFrame | None = None

def load_sales_data() -> None:
    """Load sales data from CSV file (later change into a database)."""
    global _sales_df
    try:
        _sales_df = pd.read_csv("data/sales.csv", parse_dates=["date"])
    except Exception as e:
        raise SalesDataError(f"Failed to load sales data: {e}")
    
def get_sales_data() -> pd.DataFrame:
    """Get the loaded sales data."""
    if _sales_df is None:
        return SalesDataError("Sales data not loaded")
    return _sales_df