import { useEffect, useState } from "react";
import { getSummaryMetrics } from "../../services/api";
import KPICard from "./KPICard";

const KPISummary = ({ startDate, endDate, data }) => {
  const [summary, setSummary] = useState(data || {});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSummaryMetrics(startDate, endDate);
      setSummary(data);
    };
    fetchData();
  }, [startDate, endDate, data]);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {Object.entries(summary).map(([key, value]) => (
        <KPICard key={key} title={key} value={value} />
      ))}
    </div>
  );
};

export default KPISummary;
