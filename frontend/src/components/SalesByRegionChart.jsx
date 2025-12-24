import { useEffect, useState } from "react";
import { get_sales_by_region } from "../services/api";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const SalesByRegionChart = ({ startDate, endDate, data }) => {
  const [salesData, setSalesData] = useState(data || []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await get_sales_by_region(startDate, endDate);
      setSalesData(data);
    };
    fetchData();
  }, [startDate, endDate, data]);

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        data={salesData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="region" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SalesByRegionChart;
