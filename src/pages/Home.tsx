
const Home = () => {
  const blogPosts = [
    {
      date: 'Apr 18, 2024',
      title: 'CM Fixed Income: Exiting Banking & PSU to Add a New Gilt Fund',
      excerpt: 'We are increasing the duration of our Fixed Income portfolio to reflect the macro conditions and take advantage of higher rates by increasing Gilt funds.'
    },
    {
      date: 'Apr 05, 2024',
      title: 'Craftsman Automation: Poised for Growth Amid Temporary Headwinds',
      excerpt: 'Craftsman Automation excels at making precise parts for cars and machines. Despite facing headwinds, the company shows resilience and focuses on growth and innovation.'
    },
    {
      date: 'Apr 03, 2024',
      title: 'The Focused Way of Investing: Our Four-Quadrant Strategy and FY24 Review',
      excerpt: 'Our Capitalmind Focused portfolio gained 42%, outperforming Nifty\'s 29%. Equity investing is a rollercoaster, and we review our four-quadrant strategy.'
    },
    {
      date: 'Mar 27, 2024',
      title: 'A Small CAD for India, Yet Again',
      excerpt: 'India\'s Current Account Deficit of $10 bn in Dec 2023 is less than previous levels. We question why net of gold.'
    },
    {
      date: 'Mar 25, 2024',
      title: 'Poonawalla Fincorp: One right step at a time',
      excerpt: 'Exploring winning patterns in investing, specifically when a big company acquires and revives a struggling one.'
    },
    {
      date: 'Mar 18, 2024',
      title: 'CM Focused: Reducing our allocation to smallcaps & increasing cash',
      excerpt: 'Increased volatility in mid and small-cap sectors due to regulatory actions has led us to reduce smallcap allocation and increase cash.'
    }
  ];

  return (
    <div className="home-page">
      <div className="home-container">
        <h1 className="page-title">Home</h1>

        <div className="info-cards">
          <div className="info-card">
            <div className="card-header">
              <h3>Get started</h3>
              <span className="external-link">↗</span>
            </div>
            <p>Read our getting started guide to get the most out of your Capitalmind subscription.</p>
          </div>

          <div className="info-card">
            <div className="card-header">
              <h3>Community</h3>
              <span className="external-link">↗</span>
            </div>
            <p>Join the conversation on our exclusive community on Slack for Capitalmind Premium subscribers</p>
          </div>

          <div className="info-card">
            <div className="card-header">
              <h3>Visit website</h3>
              <span className="external-link">↗</span>
            </div>
            <p>Keep up with our latest content on our website</p>
          </div>
        </div>

        <div className="latest-posts">
          <h2 className="section-title">Latest Posts</h2>
          <div className="posts-list">
            {blogPosts.map((post, index) => (
              <article key={index} className="post-item">
                <div className="post-date">{post.date}</div>
                <h3 className="post-title">{post.title}</h3>
                <p className="post-excerpt">{post.excerpt}</p>
                <a href="#" className="post-link">Read full post</a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
