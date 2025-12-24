import { useEffect, useState } from "react";
import KPISummary from "./components/kpi/KPISummary";
import { getSalesByRegion, getSalesOverTimeDaily } from "./services/api";
import { DateFilters } from "./components/common/Filters";
import { Layout } from "./components/common/Layout";
import { Card } from "./components/common/Card";
import SalesByRegionChart from "./components/charts/SalesByRegionChart";
import SalesOverTimeChart from "./components/charts/SalesOverTimeChart";

function App() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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

  return (
    <Layout>
      <DateFilters
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-800">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-slate-600">Loading...</p>
        </div>
      ) : (
        <>
          <KPISummary startDate={startDate} endDate={endDate} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card title="Sales by Region">
              <SalesByRegionChart data={salesData} />
            </Card>
            <Card title="Sales Over Time">
              <SalesOverTimeChart data={salesOverTimeData} />
            </Card>
          </div>
        </>
      )}
    </Layout>
  );
}

export default App;
