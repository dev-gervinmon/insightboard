# InsightBoard

A full-stack dashboard application for visualizing sales metrics and analytics.

## Tech Stack

- **Backend**: FastAPI (Python)
- **Frontend**: React + Vite + Recharts
- **Database**: CSV (easily upgradeable to PostgreSQL/MongoDB)

## Project Structure

```
insightboard/
├── backend/           # FastAPI server
│   ├── main.py       # App entry point
│   ├── requirements.txt
│   ├── routes/       # API routes
│   └── data/         # Data files
├── frontend/         # React application
│   ├── src/          # React components
│   ├── package.json
│   └── vite.config.js
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
