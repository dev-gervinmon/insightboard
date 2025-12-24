import { useState } from "react";
import { Layout } from "./components/common/Layout";
import { DateFilters } from "./components/common/Filters";
import { ErrorAlert } from "./components/common/ErrorAlert";
import { LoadingSpinner } from "./components/common/LoadingSpinner";
import { DashboardContent } from "./components/content/DashboardContent";
import { useSalesMetrics } from "./hooks/useSalesMetrics";

function App() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { salesData, salesOverTimeData, isLoading, error } = useSalesMetrics(
    startDate,
    endDate
  );

  return (
    <Layout>
      <DateFilters
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />

      {error && <ErrorAlert message={error} />}

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <DashboardContent
          startDate={startDate}
          endDate={endDate}
          salesData={salesData}
          salesOverTimeData={salesOverTimeData}
        />
      )}
    </Layout>
  );
}

export default App;
