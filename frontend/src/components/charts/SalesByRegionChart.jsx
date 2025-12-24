import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const SalesByRegionChart = ({ data = [] }) => {
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

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="region" stroke="#64748b" style={{ fontSize: "14px" }} />
        <YAxis
          stroke="#64748b"
          style={{ fontSize: "14px" }}
          tickFormatter={formatCurrency}
        />
        <Tooltip
          formatter={(value) => formatCurrency(value)}
          contentStyle={{
            backgroundColor: "#1e293b",
            border: "1px solid #475569",
            borderRadius: "8px",
            color: "#f1f5f9",
          }}
        />
        <Bar
          dataKey="amount"
          fill="#8884d8"
          radius={[8, 8, 0, 0]}
          name="Sales Amount"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SalesByRegionChart;
