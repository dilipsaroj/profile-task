import type { NavData } from './dataProcessing';

// Generate mock NIFTY50 data - simulates benchmark performance
export const generateMockBenchmark = (portfolioData: NavData[]): NavData[] => {
  if (!portfolioData || portfolioData.length === 0) {
    return [];
  }
  
  const startValue = 100;
  const portfolioStartNav = portfolioData[0].nav;
  
  return portfolioData.map((item, idx) => {
    const portfolioReturn = (item.nav - portfolioStartNav) / portfolioStartNav;
    // Benchmark typically underperforms portfolio by ~35%
    // Adding slight variation based on index to make it more realistic
    const variation = 1 + (idx % 100) / 10000; // tiny variation
    const benchmarkReturn = portfolioReturn * 0.65 * variation;
    const benchmarkValue = startValue * (1 + benchmarkReturn);
    
    return {
      date: item.date,
      nav: Number(benchmarkValue.toFixed(4))
    };
  });
};
