import { useState } from "react";

export function DateFilters({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePreset = (days) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);

    onStartDateChange(start.toISOString().split("T")[0]);
    onEndDateChange(end.toISOString().split("T")[0]);
  };

  const formatDateDisplay = (dateString) => {
    if (!dateString) return "Select date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const clearFilters = () => {
    onStartDateChange("");
    onEndDateChange("");
  };

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
          <p className="text-sm text-slate-500">Refine your data view</p>
        </div>
        {(startDate || endDate) && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Filter Card */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            {startDate && (
              <p className="text-xs text-slate-500 mt-1">
                {formatDateDisplay(startDate)}
              </p>
            )}
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            {endDate && (
              <p className="text-xs text-slate-500 mt-1">
                {formatDateDisplay(endDate)}
              </p>
            )}
          </div>

          {/* Quick Presets */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Quick Presets
            </label>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-left flex items-center justify-between"
            >
              <span>Select preset</span>
              <span
                className={`text-slate-400 transition ${
                  isExpanded ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {/* Preset Dropdown */}
            {isExpanded && (
              <div className="absolute mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
                <button
                  onClick={() => {
                    handlePreset(7);
                    setIsExpanded(false);
                  }}
                  className="block w-full text-left px-4 py-2.5 hover:bg-blue-50 text-slate-900 text-sm border-b border-slate-100"
                >
                  Last 7 days
                </button>
                <button
                  onClick={() => {
                    handlePreset(30);
                    setIsExpanded(false);
                  }}
                  className="block w-full text-left px-4 py-2.5 hover:bg-blue-50 text-slate-900 text-sm border-b border-slate-100"
                >
                  Last 30 days
                </button>
                <button
                  onClick={() => {
                    handlePreset(90);
                    setIsExpanded(false);
                  }}
                  className="block w-full text-left px-4 py-2.5 hover:bg-blue-50 text-slate-900 text-sm"
                >
                  Last 90 days
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {(startDate || endDate) && (
          <div className="border-t border-slate-200 pt-4">
            <p className="text-sm text-slate-600">
              <span className="font-medium">Active filters:</span>{" "}
              {startDate && `From ${formatDateDisplay(startDate)}`}
              {startDate && endDate && " to "}
              {endDate && `to ${formatDateDisplay(endDate)}`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
