import { useEffect, useState } from "react";
import { getSummaryMetrics } from "../../services/api";
import KPICard from "./KPICard";

const KPISummary = ({ startDate, endDate }) => {
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getSummaryMetrics(startDate, endDate);
        setSummary(data);
      } catch (err) {
        setError("Failed to load summary metrics");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, [startDate, endDate]);

  if (isLoading) {
    return <div className="text-slate-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!summary) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KPICard title="Total Revenue" value={summary.total_revenue} />
      <KPICard title="Total Orders" value={summary.total_orders} />
      <KPICard title="Top Region" value={summary.top_region || "N/A"} />
      <KPICard
        title="Average Daily Sales"
        value={summary.average_daily_sales}
      />
    </div>
  );
};

export default KPISummary;
