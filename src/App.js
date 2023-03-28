import React, { useState, useEffect } from "react";

const App = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [expandedNews, setExpandedNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/121003.json?print=pretty`
      );
      console.log(response);
      setNews(response);
      setLoading(false);
    };

    fetchNews();
  }, [page]);

  const handleNewsClick = (newsItem) => {
    setExpandedNews(newsItem);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <h1>Latest News</h1>
      <div key={news.url}>
        <h2 onClick={() => handleNewsClick(news)}>{news.title}</h2>
        {expandedNews && expandedNews.url === news.url && (
          <div>
            <p>{expandedNews.description}</p>
            <a href={expandedNews.url} target="_blank" rel="noreferrer">
              Read More
            </a>
          </div>
        )}
      </div>
      {loading && <p>Loading...</p>}
      {!loading && news.length < 100 && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
};

export default App;
