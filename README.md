# InsightBoard

A modern, production-ready SaaS analytics dashboard for visualizing sales metrics and insights. Built with FastAPI and React, featuring a polished UI, responsive design, and clean architecture.

## Tech Stack

- **Backend**: FastAPI (Python) - REST API with error handling
- **Frontend**: React 19 + Vite + Tailwind CSS v4 + Recharts
- **Styling**: Tailwind CSS with modern gradients and animations
- **Database**: CSV (easily upgradeable to PostgreSQL/MongoDB)

## Key Features

✨ **Modern UI/UX**

- SaaS-ready design with indigo/blue color scheme
- Responsive grid layouts (mobile, tablet, desktop)
- Smooth animations and transitions
- Professional cards with hover effects
- Sticky navigation header

📊 **Analytics Dashboard**

- KPI summary cards with gradient accents
- Sales by region bar chart
- Sales over time line chart
- Quick date presets (7, 30, 90 days)
- Loading and error states

🏗️ **Clean Architecture**

- Custom React hooks for data fetching
- Separated concerns with component composition
- Reusable UI components
- Type-safe API client
- Proper error handling

## Project Structure

```
insightboard/
├── backend/
│   ├── main.py                 # FastAPI app entry point
│   ├── requirements.txt         # Python dependencies
│   ├── routes/
│   │   ├── __init__.py
│   │   └── metrics.py          # Metrics endpoints
│   ├── services/
│   │   └── sales_service.py    # Business logic
│   ├── models/
│   │   └── sales.py            # Pydantic models
│   └── data/
│       └── sales.csv           # Sample data
├── frontend/
│   ├── src/
│   │   ├── App.jsx             # Main app component
│   │   ├── main.jsx            # Entry point
│   │   ├── index.css           # Global styles
│   │   ├── components/
│   │   │   ├── common/         # Shared components
│   │   │   │   ├── Layout.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Filters.jsx
│   │   │   │   ├── ErrorAlert.jsx
│   │   │   │   └── LoadingSpinner.jsx
│   │   │   ├── charts/         # Chart components
│   │   │   │   ├── SalesByRegionChart.jsx
│   │   │   │   └── SalesOverTimeChart.jsx
│   │   │   ├── kpi/            # KPI components
│   │   │   │   ├── KPICard.jsx
│   │   │   │   └── KPISummary.jsx
│   │   │   └── DashboardContent.jsx
│   │   ├── hooks/
│   │   │   └── useSalesMetrics.js    # Custom data hook
│   │   └── services/
│   │       └── api.js          # API client
│   ├── tailwind.config.js      # Tailwind configuration
│   ├── postcss.config.js       # PostCSS configuration
│   ├── vite.config.js          # Vite configuration
│   ├── package.json            # npm dependencies
│   └── index.html              # HTML template
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- Git

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create and activate a virtual environment:

```bash
python -m venv venv
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Run the development server:

```bash
uvicorn main:app --reload
```

The backend will be available at `http://127.0.0.1:8000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## API Endpoints

- `GET /` - Health check
- `GET /metrics/sales-by-region` - Sales metrics by region
- `GET /metrics/sales-over-time/daily` - Daily sales trends

## Features

- 📊 Sales by Region visualization
- 📈 Sales Over Time tracking
- 📅 Date range filtering
- 🎨 Interactive charts with Recharts

## Development

### Making changes

- Backend changes automatically reload with `--reload` flag
- Frontend changes automatically reload with Vite HMR

### Building for production

**Backend:**

```bash
# Use a production ASGI server
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

**Frontend:**

```bash
npm run build
```

## License

MIT
