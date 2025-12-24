export function Card({ title, children, className = "", icon: Icon }) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-slate-200/60 hover:shadow-md hover:border-slate-300 transition-all p-6 ${className}`}
    >
      {title && (
        <div className="flex items-center gap-3 mb-6">
          {Icon && (
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-100 to-blue-100 flex items-center justify-center text-indigo-600">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        </div>
      )}
      {children}
    </div>
  );
}
