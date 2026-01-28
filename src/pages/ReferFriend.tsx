
const ReferFriend = () => {
  const referralCode = 'CAPMIND2024';
  const referralLink = `https://capitalmind.in/refer/${referralCode}`;

  const benefits = [
    {
      icon: '🎁',
      title: 'You Get',
      description: '1 month free subscription for each successful referral'
    },
    {
      icon: '👥',
      title: 'Your Friend Gets',
      description: '20% discount on their first subscription'
    },
    {
      icon: '💎',
      title: 'Unlimited Referrals',
      description: 'Refer as many friends as you want, no limits!'
    }
  ];

  const stats = {
    totalReferrals: 5,
    activeReferrals: 3,
    earnedMonths: 3
  };

  return (
    <div className="refer-friend-page">
      <div className="refer-friend-container">
        <h1 className="page-title">Refer a Friend</h1>
        <p className="page-subtitle">Share Capitalmind Premium with your friends and earn rewards</p>

        <div className="referral-stats">
          <div className="stat-card">
            <div className="stat-value">{stats.totalReferrals}</div>
            <div className="stat-label">Total Referrals</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.activeReferrals}</div>
            <div className="stat-label">Active Subscriptions</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.earnedMonths}</div>
            <div className="stat-label">Months Earned</div>
          </div>
        </div>

        <div className="referral-section">
          <h2 className="section-title">Your Referral Link</h2>
          <div className="referral-link-box">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="referral-input"
            />
            <button
              className="copy-button"
              onClick={() => {
                navigator.clipboard.writeText(referralLink).then(() => {
                  alert('Link copied to clipboard!');
                }).catch(err => {
                  console.error('Failed to copy:', err);
                });
              }}
            >
              Copy Link
            </button>
          </div>
          <p className="referral-code-text">Or share your code: <strong>{referralCode}</strong></p>
        </div>

        <div className="benefits-section">
          <h2 className="section-title">How It Works</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferFriend;
