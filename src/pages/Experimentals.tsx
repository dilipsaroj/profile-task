
const Experimentals = () => {
  const experiments = [
    {
      id: 1,
      title: 'AI-Powered Portfolio Analysis',
      description: 'Experimental feature using machine learning to analyze portfolio performance and predict trends.',
      status: 'In Testing',
      date: 'Jan 15, 2024'
    },
    {
      id: 2,
      title: 'Real-time Market Sentiment Tracker',
      description: 'Track market sentiment in real-time using social media and news analysis.',
      status: 'Beta',
      date: 'Dec 20, 2023'
    },
    {
      id: 3,
      title: 'Advanced Risk Calculator',
      description: 'Calculate portfolio risk using advanced statistical models and Monte Carlo simulations.',
      status: 'In Testing',
      date: 'Nov 10, 2023'
    },
    {
      id: 4,
      title: 'Custom Alert System',
      description: 'Set up custom alerts for specific market conditions, price movements, and portfolio changes.',
      status: 'Beta',
      date: 'Oct 5, 2023'
    }
  ];

  return (
    <div className="experimentals-page">
      <div className="experimentals-container">
        <h1 className="page-title">Experimentals</h1>
        <p className="page-subtitle">Try out our latest experimental features and provide feedback</p>

        <div className="experiments-grid">
          {experiments.map((experiment) => (
            <div key={experiment.id} className="experiment-card">
              <div className="experiment-header">
                <h3>{experiment.title}</h3>
                <span className={`status-badge ${experiment.status.toLowerCase().replace(' ', '-')}`}>
                  {experiment.status}
                </span>
              </div>
              <p className="experiment-description">{experiment.description}</p>
              <div className="experiment-footer">
                <span className="experiment-date">Added: {experiment.date}</span>
                <button 
                  className="try-button"
                  onClick={() => {
                    console.log('Trying experiment:', experiment.title);
                  }}
                >
                  Try Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experimentals;
