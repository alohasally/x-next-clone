"use client";

import React, { useEffect, useState } from "react";

export default function News() {
  const [news, setNews] = useState([]);
  const [articleNum, setArticleNum] = useState(3);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
        );
        const data = await res.json();
        setNews(data.articles);
        console.log("data.articles", data.articles);
      } catch (error) {
        console.error("Error fetching news", error);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="bg-gray-100 flex flex-col items-start p-3 rounded-lg gap-3">
      <h1 className="text-2xl font-bold">Whats happening</h1>
      {news.slice(0, articleNum).map((article, index) => (
        <a href={article.url} target="_blank" className="cursor-pointer w-fit ">
          <div
            key={article}
            className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded-lg transition duration-200"
          >
            <div className="flex flex-col items-start">
              <h6 className="text-sm font-bold">{article.title}</h6>
              <p className="text-gray-500 text-xs font-semibold">
                {article.source.name}
              </p>
            </div>
            <img
              src={
                article.urlToImage
                  ? article.urlToImage
                  : "https://via.placeholder.com/150"
              }
              alt={article.title.slice(0, 4)}
              width={70}
              className="rounded-lg bg-gray-100"
            />
          </div>
        </a>
      ))}
      <button
        onClick={() => {
          setArticleNum(articleNum + 3);
        }}
        className="w-full text-blue-400 hover:text-blue-600 text-left px-3 text-sm"
      >
        Load more
      </button>
    </div>
  );
}
