import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const SalesOverTimeChart = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[500px] text-slate-500">
        No data available
      </div>
    );
  }

  const formatCurrency = (value) => {
    return `$${(value / 1000).toFixed(1)}K`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="date"
          stroke="#64748b"
          style={{ fontSize: "14px" }}
          tickFormatter={formatDate}
        />
        <YAxis
          stroke="#64748b"
          tickFormatter={formatCurrency}
          style={{ fontSize: "14px" }}
        />
        <Tooltip
          formatter={(value) => formatCurrency(value)}
          labelFormatter={(label) => formatDate(label)}
          contentStyle={{
            backgroundColor: "#1e293b",
            border: "1px solid #475569",
            borderRadius: "8px",
            color: "#f1f5f9",
          }}
        />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#3b82f6"
          strokeWidth={3}
          dot={{ fill: "#3b82f6", r: 4 }}
          activeDot={{ r: 6 }}
          name="Sales"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SalesOverTimeChart;
