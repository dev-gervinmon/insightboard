const API_BASE_URL = "http://127.0.0.1:8000/api/v1";
const REQUEST_TIMEOUT = 10000; // 10 seconds

const fetchAPI = async (endpoint, params = {}) => {
  try {
    const url = new URL(`${API_BASE_URL}/${endpoint}`);

    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, value);
    });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const response = await fetch(url.toString(), {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error.message);
    throw error;
  }
};

export const getSalesByRegion = async (startDate, endDate) => {
  return fetchAPI("metrics/sales-by-region", {
    start_date: startDate,
    end_date: endDate,
  });
};

export const getSalesOverTimeDaily = async (startDate, endDate) => {
  return fetchAPI("metrics/sales-over-time/daily", {
    start_date: startDate,
    end_date: endDate,
  });
};

export const getSalesOverTimeMonthly = async (startDate, endDate) => {
  return fetchAPI("metrics/sales-over-time/monthly", {
    start_date: startDate,
    end_date: endDate,
  });
};

export const getSummaryMetrics = async (startDate, endDate) => {
  return fetchAPI("metrics/summary", {
    start_date: startDate,
    end_date: endDate,
  });
};
