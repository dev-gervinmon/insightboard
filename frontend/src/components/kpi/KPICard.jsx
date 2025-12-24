const KPICard = ({ title, value, icon: Icon, trend }) => {
  const formatTitle = (snakeCase) => {
    return snakeCase
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatCurrency = (value) => {
    if (typeof value !== "number") return value;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 mb-2">
            {formatTitle(title)}
          </p>
          <p className="text-3xl font-bold text-slate-900">
            {formatCurrency(value)}
          </p>
          {trend && (
            <p
              className={`text-sm mt-2 ${
                trend > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
            </p>
          )}
        </div>
        {Icon && <Icon className="w-8 h-8 text-slate-400" />}
      </div>
    </div>
  );
};

export default KPICard;
