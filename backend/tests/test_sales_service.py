import sys
import os
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__) + '/..'))

import pytest
import pandas as pd
from models.sales import TotalRevenue
from services.sales_service import load_sales_data, revenue_change_summary

@pytest.fixture
def sales_df():
    # Use the actual sales.csv for integration-like test
    return load_sales_data()

def test_revenue_change_summary_typical_period(sales_df):
    # Test for period 2024-03-01 to 2024-04-30
    start_date = "2024-03-01"
    end_date = "2024-04-30"
    filtered_df = sales_df[(sales_df["date"] >= pd.to_datetime(start_date)) & (sales_df["date"] <= pd.to_datetime(end_date))]
    result = revenue_change_summary(sales_df, filtered_df, start_date, end_date)
    # Manually calculated from sales.csv
    assert isinstance(result, TotalRevenue)
    assert result.current == 4800  # 1500+700+500+800+600+700
    assert result.previous == 2600 # 500+400+300+600+450+350
    assert result.change_percentage is not None
    assert round(result.change_percentage, 2) == round(((4800-2600)/2600)*100, 2)

def test_revenue_change_summary_no_data(sales_df):
    # Test for a period with no sales
    start_date = "2023-01-01"
    end_date = "2023-01-31"
    filtered_df = sales_df[(sales_df["date"] >= pd.to_datetime(start_date)) & (sales_df["date"] <= pd.to_datetime(end_date))]
    result = revenue_change_summary(sales_df, filtered_df, start_date, end_date)
    assert result.current == 0
    assert result.previous == 0 or result.previous is None
    assert result.change_percentage == 0.0 or result.change_percentage is None

def test_revenue_change_summary_partial_period(sales_df):
    # Test for a period with only one sale
    start_date = "2024-01-03"
    end_date = "2024-01-03"
    filtered_df = sales_df[(sales_df["date"] >= pd.to_datetime(start_date)) & (sales_df["date"] <= pd.to_datetime(end_date))]
    result = revenue_change_summary(sales_df, filtered_df, start_date, end_date)
    assert result.current == 500
    assert result.previous == 0 or result.previous is None
    assert result.change_percentage == 0.0 or result.change_percentage is None


def test_revenue_change_summary_no_dates(sales_df):
    # Test with no start_date and no end_date (should use all data)
    filtered_df = sales_df.copy()
    result = revenue_change_summary(sales_df, filtered_df, None, None)
    assert isinstance(result, TotalRevenue)
    # Current revenue is sum of all sales
    assert result.current == sales_df["amount"].sum()
    # Previous revenue should be None (no previous period)
    assert result.previous is None
    assert result.change_percentage is None

def test_revenue_change_summary_only_start_date(sales_df):
    # Test with only start_date (should use all data from start_date to end)
    start_date = "2024-03-01"
    filtered_df = sales_df[sales_df["date"] >= pd.to_datetime(start_date)]
    result = revenue_change_summary(sales_df, filtered_df, start_date, None)
    assert isinstance(result, TotalRevenue)
    # Current revenue is sum from 2024-03-01 onwards
    expected = filtered_df["amount"].sum()
    assert result.current == expected
    # Previous and change_percentage should not be None if start_date is provided
    assert result.previous is not None

def test_revenue_change_summary_only_end_date(sales_df):
    # Test with only end_date (should use all data up to end_date)
    end_date = "2024-04-10"
    filtered_df = sales_df[sales_df["date"] <= pd.to_datetime(end_date)]
    result = revenue_change_summary(sales_df, filtered_df, None, end_date)
    assert isinstance(result, TotalRevenue)
    # Current revenue is sum up to 2024-04-10
    expected = filtered_df["amount"].sum()
    assert result.current == expected
    # Previous and change_percentage should be None if no start_date
    assert result.previous is None
    assert result.change_percentage is None
