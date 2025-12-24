const KPICard = ({ title, value }) => {
  const formatTitle = (snakeCase) => {
    return snakeCase
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
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

  const getGradient = (index) => {
    const gradients = [
      "from-indigo-600 to-blue-600",
      "from-purple-600 to-pink-600",
      "from-emerald-600 to-teal-600",
      "from-amber-600 to-orange-600",
    ];
    return gradients[index % gradients.length];
  };

  // Deterministic hash based on title to get consistent gradient
  const getCardIndex = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  const cardIndex = getCardIndex(title);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 hover:shadow-lg hover:border-slate-300 transition-all p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-500 mb-2">
            {formatTitle(title)}
          </p>
          <p className="text-3xl font-bold text-slate-900">
            {formatCurrency(value)}
          </p>
        </div>
        <div
          className={`w-12 h-12 rounded-lg bg-linear-to-br ${getGradient(
            cardIndex
          )} opacity-10`}
        ></div>
      </div>
    </div>
  );
};

export default KPICard;
