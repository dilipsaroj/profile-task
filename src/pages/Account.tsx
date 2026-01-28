
const Account = () => {
  const user = {
    name: 'Rajesh Nair',
    email: 'rajesh.nair@example.com',
    phone: '+91 98765 43210',
    memberSince: 'Jan 15, 2023',
    subscription: {
      plan: 'Capitalmind Premium 1 Year',
      status: 'Active',
      validTill: 'Apr 19, 2025',
      autoRenew: true
    },
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      weeklyDigest: true
    }
  };

  return (
    <div className="account-page">
      <div className="account-container">
        <h1 className="page-title">Account</h1>
        <p className="page-subtitle">Manage your account settings and preferences</p>

        <div className="account-sections">
          <div className="account-section">
            <h2 className="section-title">Profile Information</h2>
            <div className="profile-card">
              <div className="profile-header">
                <div className="profile-avatar">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="profile-info">
                  <h3 className="profile-name">{user.name}</h3>
                  <p className="profile-email">{user.email}</p>
                </div>
              </div>
              <div className="profile-details">
                <div className="detail-item">
                  <span className="detail-label">Phone</span>
                  <span className="detail-value">{user.phone}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Member Since</span>
                  <span className="detail-value">{user.memberSince}</span>
                </div>
              </div>
              <button 
                className="edit-button"
                onClick={() => {
                  alert('Edit profile feature coming soon!');
                }}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
