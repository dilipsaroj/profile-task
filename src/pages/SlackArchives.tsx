
const SlackArchives = () => {
  const archives = [
    {
      id: 1,
      channel: '#general',
      title: 'Market Update: Q4 2023 Performance',
      preview: 'Our portfolio showed strong performance in Q4, with significant gains in technology and healthcare sectors...',
      date: 'Dec 28, 2023',
      author: 'John Smith',
      replies: 12
    },
    {
      id: 2,
      channel: '#research',
      title: 'New Stock Analysis: Tech Sector',
      preview: 'We\'ve completed our analysis of the tech sector. Key findings include strong growth potential in AI and cloud computing...',
      date: 'Dec 22, 2023',
      author: 'Sarah Johnson',
      replies: 8
    },
    {
      id: 3,
      channel: '#announcements',
      title: 'Portfolio Rebalancing Notice',
      preview: 'We will be rebalancing the portfolio next week. Please review the proposed changes and provide feedback...',
      date: 'Dec 20, 2023',
      author: 'Michael Chen',
      replies: 15
    },
    {
      id: 4,
      channel: '#general',
      title: 'Weekly Market Summary',
      preview: 'This week\'s market summary highlights key movements in major indices and sector performance...',
      date: 'Dec 15, 2023',
      author: 'Emily Davis',
      replies: 5
    },
    {
      id: 5,
      channel: '#research',
      title: 'Economic Outlook for 2024',
      preview: 'Our economic team has prepared a comprehensive outlook for 2024, covering inflation, interest rates, and growth projections...',
      date: 'Dec 10, 2023',
      author: 'David Wilson',
      replies: 20
    }
  ];

  return (
    <div className="slack-archives-page">
      <div className="slack-archives-container">
        <h1 className="page-title">Slack Archives</h1>
        <p className="page-subtitle">Browse archived discussions and insights from our Slack community</p>

        <div className="archives-list">
          {archives.map((archive) => (
            <div key={archive.id} className="archive-item">
              <div className="archive-header">
                <span className="channel-name">{archive.channel}</span>
                <span className="archive-date">{archive.date}</span>
              </div>
              <h3 className="archive-title">{archive.title}</h3>
              <p className="archive-preview">{archive.preview}</p>
              <div className="archive-footer">
                <span className="archive-author">By {archive.author}</span>
                <span className="archive-replies">{archive.replies} replies</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlackArchives;
