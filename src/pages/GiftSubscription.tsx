
const GiftSubscription = () => {
  const plans = [
    {
      id: 1,
      name: '1 Month',
      price: 999,
      savings: null
    },
    {
      id: 2,
      name: '3 Months',
      price: 2499,
      savings: 'Save 17%'
    },
    {
      id: 3,
      name: '6 Months',
      price: 4499,
      savings: 'Save 25%'
    },
    {
      id: 4,
      name: '1 Year',
      price: 7999,
      savings: 'Save 33%',
      popular: true
    }
  ];

  return (
    <div className="gift-subscription-page">
      <div className="gift-subscription-container">
        <h1 className="page-title">Gift a Subscription</h1>
        <p className="page-subtitle">Give the gift of premium financial insights to someone special</p>

        <div className="gift-plans">
          {plans.map((plan) => (
            <div key={plan.id} className={`plan-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-price">
                <span className="currency">₹</span>
                <span className="amount">{plan.price.toLocaleString()}</span>
              </div>
              {plan.savings && (
                <div className="plan-savings">{plan.savings}</div>
              )}
              <button 
                className="gift-button"
                onClick={() => {
                  console.log('Gifting plan:', plan.name);
                }}
              >
                Gift Now
              </button>
            </div>
          ))}
        </div>

        <div className="gift-info">
          <h2 className="section-title">How It Works</h2>
          <div className="info-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Choose a Plan</h4>
                <p>Select the subscription duration you want to gift</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Enter Recipient Details</h4>
                <p>Provide the email address of the person you're gifting to</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Send the Gift</h4>
                <p>We'll send them a beautiful gift email with instructions to redeem</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftSubscription;
