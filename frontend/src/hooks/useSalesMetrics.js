import { useEffect, useState } from "react";
import { getSalesByRegion, getSalesOverTimeDaily } from "../services/api";

export const useSalesMetrics = (startDate, endDate) => {
  const [salesData, setSalesData] = useState([]);
  const [salesOverTimeData, setSalesOverTimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [sales, salesTime] = await Promise.all([
          getSalesByRegion(startDate, endDate),
          getSalesOverTimeDaily(startDate, endDate),
        ]);
        setSalesData(sales);
        setSalesOverTimeData(salesTime);
      } catch (err) {
        setError("Failed to load data. Please try again.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  return {
    salesData,
    salesOverTimeData,
    isLoading,
    error,
  };
};
