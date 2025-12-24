import { useEffect, useState } from "react";
import SalesByRegionChart from "./components/SalesByRegionChart";
import SalesOverTimeChart from "./components/SalesOverTimeChart";
import { get_sales_by_region, get_sales_over_time_daily } from "./services/api";
import KPISummary from "./components/kpi/KPISummary";

function App() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [salesData, setSalesData] = useState([]);
  const [salesOverTimeData, setSalesOverTimeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const salesData = await get_sales_by_region(startDate, endDate);
      const salesOverTimeData = await get_sales_over_time_daily(
        startDate,
        endDate
      );
      setSalesData(salesData);
      setSalesOverTimeData(salesOverTimeData);
    };
    fetchData();
  }, [startDate, endDate]);

  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <h1>InsightBoard Frontend</h1>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <KPISummary startDate={startDate} endDate={endDate} />

      <SalesByRegionChart
        startDate={startDate}
        endDate={endDate}
        data={salesData}
      />
      <SalesOverTimeChart
        startDate={startDate}
        endDate={endDate}
        data={salesOverTimeData}
      />
    </div>
  );
}

export default App;
