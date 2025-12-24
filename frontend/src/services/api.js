const transformSalesData = (data) => {
  return Object.entries(data).map(([region, amount]) => ({
    region,
    amount,
  }));
};

export const get_sales_by_region = async (start_date, end_date) => {
  const response = await fetch(
    `http://127.0.0.1:8000/api/v1/metrics/sales-by-region?start_date=${start_date}&end_date=${end_date}`
  );
  const data = await response.json();
  return transformSalesData(data);
};

export const get_sales_over_time_daily = async (start_date, end_date) => {
  const response = await fetch(
    `http://127.0.0.1:8000/api/v1/metrics/sales-over-time/daily?start_date=${start_date}&end_date=${end_date}`
  );
  const data = await response.json();
  return data;
};

export const get_summary_metrics = async (start_date, end_date) => {
  const response = await fetch(
    `http://127.0.0.1:8000/api/v1/metrics/summary?start_date=${start_date}&end_date=${end_date}`
  );
  const data = await response.json();
  return data;
};
