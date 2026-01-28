# Portfolio Management App

A React + TypeScript application for portfolio management company built with Vite.

## Features

- **Home Page**: Collection of blog posts with info cards
- **Portfolio Page**: 
  - Trailing Returns table (YTD, 1D, 1W, 1M, 3M, 6M, 1Y, 3Y, SI, DD, MAXDD)
  - Equity curve chart (green for portfolio, blue for benchmark)
  - Drawdown chart (red/pink area)
- **Fixed Sidebar Navigation**: Left sidebar with navigation menu

## Installation

```bash
npm install
```

## Running the App

```bash
npm run dev
```

The app will open at http://localhost:5173

## Build for Production

```bash
npm run build
```

## Data Source

The app uses historical NAV data from the CSV file converted to JSON format (2,199 records from 2015-2024).

## Technologies

- React 19
- TypeScript
- Vite
- React Router
- Recharts
