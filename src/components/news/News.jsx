import React, { useState, useEffect } from "react";
import Style from "./news.module.scss";
import {doFetch} from "../../helpers/helper";

export default function News() {
  const [news, setNews] = useState([]);

  const getNews = async () => {
    const url = "https://api.mediehuset.net/bakeonline/news";
    const res = await doFetch(url);
    setNews(res);
  };
  useEffect(() => {
    getNews();
  }, []);

  console.log(news);

  return (
    <section>
      <article>
        <h2>Vi skaber lækkert brød</h2>
        <p>lorem5</p>
      </article>

      <div className={Style.newGrid}>
        {news.items &&
          news.items.map((item, i) => {
            if (i < 3) {
              return (
                <div key={item.id}>
                  <img src={item.image} alt={item.title} />
                  <h4>{item.title} </h4>
                  <p>{item.teaser.substring(0, 30) + "..."} </p>
                </div>
              );
            } else {
              return null;
            }
          })}
      </div>
    </section>
  );
}
