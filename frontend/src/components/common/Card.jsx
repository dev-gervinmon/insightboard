export function Card({ title, children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-slate-200 p-6 ${className}`}
    >
      {title && (
        <h2 className="text-lg font-semibold text-slate-900 mb-4">{title}</h2>
      )}
      {children}
    </div>
  );
}
