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

- Python 3.9+
- Node.js 18+
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
API documentation: `http://127.0.0.1:8000/docs`

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

## API Documentation

### Metrics Endpoints

All endpoints support optional date filtering with `start_date` and `end_date` query parameters (format: `YYYY-MM-DD`).

**GET `/api/v1/metrics/sales-by-region`**

- Returns sales aggregated by region
- Response: `SalesByRegion[]`

**GET `/api/v1/metrics/sales-over-time/daily`**

- Returns daily sales trends
- Response: `DailySales[]`

**GET `/api/v1/metrics/summary`**

- Returns summary statistics (total revenue, order count, top region, average daily sales)
- Response: `SalesSummary`

### Example Requests

```bash
# Get sales by region for last 30 days
curl "http://localhost:8000/api/v1/metrics/sales-by-region?start_date=2024-11-24&end_date=2024-12-24"

# Get daily sales trends
curl "http://localhost:8000/api/v1/metrics/sales-over-time/daily"

# Get summary metrics
curl "http://localhost:8000/api/v1/metrics/summary"
```

## Architecture & Best Practices

### Backend

✅ **Clean Code**

- Separated concerns (routes, services, models)
- Reusable service functions
- Proper error handling with HTTP exceptions
- Type hints with Pydantic models
- Logging for debugging

✅ **Future-Proof**

- Service layer abstraction makes database migration easy
- No business logic in routes
- Configurable data source (CSV → Database)

### Frontend

✅ **React Best Practices**

- Custom hooks for logic reuse (`useSalesMetrics`)
- Component composition and separation of concerns
- Presentational vs Container components
- Proper state management
- Error boundaries and error handling
- Loading states with spinners

✅ **Code Quality**

- ESLint configuration
- Proper import organization
- Pure functions (no side effects in render)
- Deterministic styling

✅ **Performance**

- Parallel API calls with `Promise.all()`
- Efficient re-renders
- Lazy loading with async components
- Optimized bundle with Vite

## Styling & Design System

### Color Palette

- **Primary**: Indigo/Blue (professional, trustworthy)
- **Secondary**: Slate Grays (clean backgrounds)
- **Accent**: Emerald, Purple, Amber (gradients for visual variety)
- **Semantic**: Red (errors), Green (success)

### Components

All components follow the established design system:

- Rounded corners (`rounded-xl`)
- Subtle shadows with hover effects
- Gradient accents for visual interest
- Professional typography with Inter font
- Responsive grid layouts

## Development

### Running Both Servers

**Terminal 1 - Backend:**

```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
uvicorn main:app --reload
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

### Making Changes

- **Backend**: Changes automatically reload with `--reload` flag
- **Frontend**: Changes automatically reload with Vite HMR

### Environment Variables

Create a `.env` file in the frontend root:

```env
VITE_API_URL=http://127.0.0.1:8000/api/v1
```

## Building for Production

### Backend

Using Gunicorn:

```bash
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

Or using uvicorn directly:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Frontend

```bash
npm run build
```

Output will be in the `dist/` directory.

## Testing & Linting

### Backend

```bash
# Install test dependencies
pip install pytest pytest-cov

# Run tests
pytest
```

### Frontend

```bash
# Lint
npm run lint

# Format code
npm run format
```

## Troubleshooting

### CORS Issues

If you get CORS errors, ensure the backend has CORS middleware configured:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Tailwind CSS Not Working

Ensure your `src/index.css` has:

```css
@import "tailwindcss";
```

And restart the dev server after changes to `tailwind.config.js`.

### Port Already in Use

Change the ports:

```bash
# Backend on different port
uvicorn main:app --reload --port 8001

# Frontend on different port
npm run dev -- --port 5174
```

## Next Steps & Future Improvements

- [ ] Add user authentication (Stack Auth)
- [ ] Implement database layer (PostgreSQL)
- [ ] Add more chart types (pie, heatmap, etc.)
- [ ] Export data to CSV/PDF
- [ ] Real-time data updates with WebSockets
- [ ] Advanced filtering and search
- [ ] User preferences and saved views
- [ ] Email notifications
- [ ] Deployment guides (Docker, Vercel, Render)

## License

MIT
