export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
              📊
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                InsightBoard
              </h1>
              <p className="text-xs text-slate-500">Analytics Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-sm text-slate-600 hover:text-slate-900 transition font-medium">
              Docs
            </button>
            <button className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-100 to-blue-100 text-indigo-600 hover:shadow-md transition font-semibold flex items-center justify-center">
              U
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">{children}</main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/50 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <p className="text-sm text-slate-500">
            © 2025 InsightBoard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
