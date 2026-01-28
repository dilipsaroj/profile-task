import { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import navData from '../data/navData.json';
import { generateMockBenchmark } from '../utils/mockBenchmark';
import {
  calculateTrailingReturns,
  getEquityCurve,
  getDrawdownData,
  parseDate
} from '../utils/dataProcessing';
import type { NavData } from '../utils/dataProcessing';

// Generate benchmark data once outside component to avoid recalculation
const portfolioData: NavData[] = navData;
const benchmarkData = generateMockBenchmark(portfolioData);
const startDate = parseDate(portfolioData[0].date);

const Portfolio = () => {
  const [fromDate, setFromDate] = useState('2019-01-01');
  const [toDate, setToDate] = useState('2024-04-24');

  const trailingReturns = useMemo(() => {
    return calculateTrailingReturns(portfolioData, benchmarkData, startDate);
  }, []);

  const equityCurveData = useMemo(() => {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    return getEquityCurve(portfolioData, benchmarkData, from, to);
  }, [fromDate, toDate]);

  const drawdownData = useMemo(() => {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    return getDrawdownData(portfolioData, from, to);
  }, [fromDate, toDate]);

  // Sample data for chart performance - too many points slows down rendering
  const chartEquityData = useMemo(() => {
    if (equityCurveData.length === 0) return [];
    // Limit to ~500 points for smooth rendering
    const step = Math.max(1, Math.floor(equityCurveData.length / 500));
    return equityCurveData
      .filter((_, index) => index % step === 0 || index === equityCurveData.length - 1)
      .map((point) => ({
        date: point.date.split('-').reverse().join('/'),
        portfolio: point.portfolio,
        benchmark: point.benchmark
      }));
  }, [equityCurveData]);

  const chartDrawdownData = useMemo(() => {
    if (drawdownData.length === 0) return [];
    const step = Math.max(1, Math.floor(drawdownData.length / 500));
    return drawdownData
      .filter((_, index) => index % step === 0 || index === drawdownData.length - 1)
      .map((point) => ({
        date: point.date.split('-').reverse().join('/'),
        drawdown: point.drawdown
      }));
  }, [drawdownData]);

  return (
    <div className="portfolio-page">
      <div className="portfolio-container">
        <h1 className="page-title">Portfolios</h1>

        <div className="trailing-returns-section">
          <h2 className="section-title">Trailing Returns</h2>
          <div className="table-container">
            <table className="returns-table">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>YTD</th>
                  <th>1D</th>
                  <th>1W</th>
                  <th>1M</th>
                  <th>3M</th>
                  <th>6M</th>
                  <th>1Y</th>
                  <th>3Y</th>
                  <th>SI</th>
                  <th>DD</th>
                  <th>MAXDD</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="name-cell">{trailingReturns.portfolio.name}</td>
                  <td>{trailingReturns.portfolio.ytd}%</td>
                  <td>{trailingReturns.portfolio.d1}%</td>
                  <td>{trailingReturns.portfolio.w1}%</td>
                  <td>{trailingReturns.portfolio.m1}%</td>
                  <td>{trailingReturns.portfolio.m3}%</td>
                  <td>{trailingReturns.portfolio.m6}%</td>
                  <td>{trailingReturns.portfolio.y1}%</td>
                  <td>{trailingReturns.portfolio.y3}%</td>
                  <td>{trailingReturns.portfolio.si}%</td>
                  <td>{trailingReturns.portfolio.dd}%</td>
                  <td>{trailingReturns.portfolio.maxdd}%</td>
                </tr>
                <tr>
                  <td className="name-cell">{trailingReturns.benchmark.name}</td>
                  <td>{trailingReturns.benchmark.ytd}%</td>
                  <td>{trailingReturns.benchmark.d1}%</td>
                  <td>{trailingReturns.benchmark.w1}%</td>
                  <td>{trailingReturns.benchmark.m1}%</td>
                  <td>{trailingReturns.benchmark.m3}%</td>
                  <td>{trailingReturns.benchmark.m6}%</td>
                  <td>{trailingReturns.benchmark.y1}%</td>
                  <td>{trailingReturns.benchmark.y3}%</td>
                  <td>{trailingReturns.benchmark.si}%</td>
                  <td>{trailingReturns.benchmark.dd}%</td>
                  <td>{trailingReturns.benchmark.maxdd}%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="table-note">Note: Returns above 1 year are annualised.</p>
        </div>

        <div className="equity-curve-section">
          <div className="chart-header">
            <h2 className="section-title">Equity curve</h2>
            <div className="chart-controls">
              <span className="live-indicator">Live since {fromDate}</span>
              <button 
                className="reset-btn"
                onClick={() => {
                  setFromDate('2019-01-01');
                  setToDate('2024-04-24');
                }}
              >
                Reset
              </button>
            </div>
          </div>
          <div className="date-inputs">
            <div className="date-input-group">
              <label>From date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="date-input"
              />
            </div>
            <div className="date-input-group">
              <label>To date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="date-input"
              />
            </div>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartEquityData} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="date"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  interval="preserveStartEnd"
                  stroke="#6b7280"
                />
                <YAxis
                  label={{ value: 'Value', angle: -90, position: 'insideLeft' }}
                  stroke="#6b7280"
                />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="portfolio"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={false}
                  name="Focused"
                />
                <Line
                  type="monotone"
                  dataKey="benchmark"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                  name="NIFTY50"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="drawdown-chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={chartDrawdownData} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="date"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  interval="preserveStartEnd"
                  stroke="#6b7280"
                />
                <YAxis
                  label={{ value: 'Drawdown (%)', angle: -90, position: 'insideLeft' }}
                  domain={[-50, 0]}
                  stroke="#6b7280"
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="drawdown"
                  stroke="#ef4444"
                  fill="#fca5a5"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
