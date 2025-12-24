import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { get_sales_over_time_daily } from "../services/api";

const SalesOverTimeChart = ({ startDate, endDate, data }) => {
  const [salesOverTime, setSalesOverTime] = useState(data || []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await get_sales_over_time_daily(startDate, endDate);
      setSalesOverTime(data);
    };
    fetchData();
  }, [startDate, endDate]);

  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart
        data={salesOverTime}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="amount" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SalesOverTimeChart;
