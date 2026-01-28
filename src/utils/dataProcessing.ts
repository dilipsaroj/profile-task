export type NavData = {
  date: string;
  nav: number;
};

export type TrailingReturns = {
  name: string;
  ytd: number;
  d1: number;
  w1: number;
  m1: number;
  m3: number;
  m6: number;
  y1: number;
  y3: number;
  si: number;
  dd: number;
  maxdd: number;
};

export type EquityPoint = {
  date: string;
  portfolio: number;
  benchmark: number;
};

export type DrawdownPoint = {
  date: string;
  drawdown: number;
};

// Parse date from DD-MM-YYYY format
export const parseDate = (dateStr: string): Date => {
  const parts = dateStr.split('-');
  if (parts.length !== 3) {
    console.warn('Invalid date format:', dateStr);
    return new Date();
  }
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  return new Date(year, month - 1, day);
};

// Format date to YYYY-MM-DD for display
export const formatDateForInput = (dateStr: string): string => {
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
};

// Calculate trailing returns
export const calculateTrailingReturns = (
  data: NavData[],
  benchmarkData: NavData[],
  startDate: Date
): { portfolio: TrailingReturns; benchmark: TrailingReturns } => {
  const today = new Date();
  const todayIndex = data.length - 1;
  const todayNav = data[todayIndex].nav;
  const benchmarkIndex = benchmarkData.length - 1;
  const todayBenchmark = benchmarkData[benchmarkIndex]?.nav || 0;

  // Helper function to calculate returns for a given period
  const getReturn = (days: number): { portfolio: number; benchmark: number } => {
    const targetDate = new Date(today);
    targetDate.setDate(targetDate.getDate() - days);
    
    const portfolioIndex = data.findIndex(d => {
      const dDate = parseDate(d.date);
      return dDate >= targetDate;
    });
    const benchIndex = benchmarkData.findIndex(d => {
      const dDate = parseDate(d.date);
      return dDate >= targetDate;
    });

    if (portfolioIndex === -1 || benchIndex === -1) return { portfolio: 0, benchmark: 0 };

    const portfolioReturn = ((todayNav - data[portfolioIndex].nav) / data[portfolioIndex].nav) * 100;
    const benchmarkReturn = ((todayBenchmark - benchmarkData[benchIndex].nav) / benchmarkData[benchIndex].nav) * 100;

    return { portfolio: portfolioReturn, benchmark: benchmarkReturn };
  };

  // YTD
  const ytdDate = new Date(today.getFullYear(), 0, 1);
  const ytdPortfolioIndex = data.findIndex(d => parseDate(d.date) >= ytdDate);
  const ytdBenchmarkIndex = benchmarkData.findIndex(d => parseDate(d.date) >= ytdDate);
  const ytdPortfolio = ytdPortfolioIndex !== -1 ? ((todayNav - data[ytdPortfolioIndex].nav) / data[ytdPortfolioIndex].nav) * 100 : 0;
  const ytdBenchmark = ytdBenchmarkIndex !== -1 ? ((todayBenchmark - benchmarkData[ytdBenchmarkIndex].nav) / benchmarkData[ytdBenchmarkIndex].nav) * 100 : 0;

  // Period returns
  const d1 = getReturn(1);
  const w1 = getReturn(7);
  const m1 = getReturn(30);
  const m3 = getReturn(90);
  const m6 = getReturn(180);
  const y1 = getReturn(365);
  const y3 = getReturn(1095);

  // Since Inception
  const siPortfolio = ((todayNav - data[0].nav) / data[0].nav) * 100;
  const siBenchmark = ((todayBenchmark - benchmarkData[0].nav) / benchmarkData[0].nav) * 100;

  // Annualize returns > 1 year
  const annualize = (returnPercent: number, days: number): number => {
    if (days < 365) return returnPercent;
    const years = days / 365;
    return (Math.pow(1 + returnPercent / 100, 1 / years) - 1) * 100;
  };

  // Drawdown
  const portfolioDrawdown = calculateCurrentDrawdown(data);
  const benchmarkDrawdown = calculateCurrentDrawdown(benchmarkData);

  // Max Drawdown
  const portfolioMaxDD = calculateMaxDrawdown(data);
  const benchmarkMaxDD = calculateMaxDrawdown(benchmarkData);

  return {
    portfolio: {
      name: 'Focused',
      ytd: parseFloat(ytdPortfolio.toFixed(1)),
      d1: parseFloat(d1.portfolio.toFixed(1)),
      w1: parseFloat(w1.portfolio.toFixed(1)),
      m1: parseFloat(m1.portfolio.toFixed(1)),
      m3: parseFloat(m3.portfolio.toFixed(1)),
      m6: parseFloat(m6.portfolio.toFixed(1)),
      y1: parseFloat(annualize(y1.portfolio, 365).toFixed(1)),
      y3: parseFloat(annualize(y3.portfolio, 1095).toFixed(1)),
      si: parseFloat(annualize(siPortfolio, (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)).toFixed(1)),
      dd: parseFloat(portfolioDrawdown.toFixed(1)),
      maxdd: parseFloat(portfolioMaxDD.toFixed(1))
    },
    benchmark: {
      name: 'NIFTY50',
      ytd: parseFloat(ytdBenchmark.toFixed(1)),
      d1: parseFloat(d1.benchmark.toFixed(1)),
      w1: parseFloat(w1.benchmark.toFixed(1)),
      m1: parseFloat(m1.benchmark.toFixed(1)),
      m3: parseFloat(m3.benchmark.toFixed(1)),
      m6: parseFloat(m6.benchmark.toFixed(1)),
      y1: parseFloat(annualize(y1.benchmark, 365).toFixed(1)),
      y3: parseFloat(annualize(y3.benchmark, 1095).toFixed(1)),
      si: parseFloat(annualize(siBenchmark, (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)).toFixed(1)),
      dd: parseFloat(benchmarkDrawdown.toFixed(1)),
      maxdd: parseFloat(benchmarkMaxDD.toFixed(1))
    }
  };
};

// Calculate current drawdown
export const calculateCurrentDrawdown = (data: NavData[]): number => {
  if (data.length === 0) return 0;
  let peak = data[0].nav;
  let currentNav = data[data.length - 1].nav;

  for (let i = 0; i < data.length; i++) {
    if (data[i].nav > peak) {
      peak = data[i].nav;
    }
  }

  return ((currentNav - peak) / peak) * 100;
};

// Calculate max drawdown
export const calculateMaxDrawdown = (data: NavData[]): number => {
  if (data.length === 0) return 0;
  let peak = data[0].nav;
  let maxDD = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i].nav > peak) {
      peak = data[i].nav;
    }
    const drawdown = ((data[i].nav - peak) / peak) * 100;
    if (drawdown < maxDD) {
      maxDD = drawdown;
    }
  }

  return maxDD;
};

// Get equity curve data
export const getEquityCurve = (
  portfolioData: NavData[],
  benchmarkData: NavData[],
  fromDate: Date,
  toDate: Date
): EquityPoint[] => {
  const filtered = portfolioData.filter(d => {
    const date = parseDate(d.date);
    return date >= fromDate && date <= toDate;
  });

  return filtered.map((item, index) => {
    const date = parseDate(item.date);
    const benchmarkItem = benchmarkData.find(b => {
      const bDate = parseDate(b.date);
      return bDate.getTime() === date.getTime();
    });

    // Normalize to 100 at start
    const startNav = portfolioData[0].nav;
    const portfolioValue = (item.nav / startNav) * 100;
    const benchmarkValue = benchmarkItem ? (benchmarkItem.nav / benchmarkData[0].nav) * 100 : 100;

    return {
      date: item.date,
      portfolio: parseFloat(portfolioValue.toFixed(2)),
      benchmark: parseFloat(benchmarkValue.toFixed(2))
    };
  });
};

// Get drawdown data
export const getDrawdownData = (
  data: NavData[],
  fromDate: Date,
  toDate: Date
): DrawdownPoint[] => {
  const filtered = data.filter(d => {
    const date = parseDate(d.date);
    return date >= fromDate && date <= toDate;
  });

  let peak = filtered[0]?.nav || 0;
  const drawdowns: DrawdownPoint[] = [];

  filtered.forEach((item) => {
    if (item.nav > peak) {
      peak = item.nav;
    }
    const drawdown = ((item.nav - peak) / peak) * 100;
    drawdowns.push({
      date: item.date,
      drawdown: parseFloat(drawdown.toFixed(2))
    });
  });

  return drawdowns;
};
