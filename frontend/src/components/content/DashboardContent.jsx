import SalesByRegionChart from "../charts/SalesByRegionChart";
import SalesOverTimeChart from "../charts/SalesOverTimeChart";
import { Card } from "../common/Card";
import KPISummary from "../kpi/KPISummary";

function BarChartIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  );
}

function LineChartIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </svg>
  );
}

export function DashboardContent({
  startDate,
  endDate,
  salesData,
  salesOverTimeData,
}) {
  return (
    <>
      <KPISummary startDate={startDate} endDate={endDate} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card title="Sales by Region" icon={BarChartIcon}>
          <SalesByRegionChart data={salesData} />
        </Card>
        <Card title="Sales Over Time" icon={LineChartIcon}>
          <SalesOverTimeChart data={salesOverTimeData} />
        </Card>
      </div>
    </>
  );
}
