export function ErrorAlert({ message }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-800 flex items-center gap-3">
      <span className="text-lg">⚠️</span>
      <div>
        <p className="font-semibold">Error loading data</p>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}
