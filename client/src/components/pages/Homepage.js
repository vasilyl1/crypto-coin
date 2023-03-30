import React, { useState, useEffect } from "react";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";

import { useQuery } from '@apollo/client';
import { QUERY_NEWS } from '../utils/queries';
import { newsSupplier } from "../utils/NewsSupplier";

const Homepage = () => {
  // create state for holding returned searched news data
  const [searchedNews, setSearchedNews] = useState([]);

  const { loading, data } = useQuery(QUERY_NEWS, {subscription: 'free' });

  useEffect(() => {
    // update the state with searched news from database
    const getFreeNewsData = async () => {
      try {
        const news = data;
        setSearchedNews(news); // update the state
      } catch (err) {
        console.log(err);
      }
    }
    getFreeNewsData();
  });

  return (
    <>
      <Container>
        <h5 className="pt-5">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="25" height="25"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 7L13 15L9 11L3 17M21 7H15M21 7V13" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
          &nbsp;
          Trending articles
        </h5>
        {loading ? (
          <div>Loading...</div>
        ) : (
        <Row>
          newsId: news.id,
          authors: news.volumeInfo.authors || ["No author to display"],
          title: news.volumeInfo.title,
          description: news.volumeInfo.description,
          image: news.volumeInfo.imageLinks?.thumbnail || "",
          {searchedNews.map((news) => {
            return (

              <div class="card mb-3" style={{ maxWidth: '540px' }}>
                <div class="row g-0">
                  <div class="col-md-8">
                    <div className="card-body">
                      <p className="mb-1"> {news.authors} </p>
                      <h5 className="card-title" style={{ display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '20ch' }}>{news.title}</h5>
                      <br />
                      <p className="card-text" style={{ display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '60ch' }}>{news.description}</p>

                      <p className="card-text"><small className="text-body-secondary">March 28 &#x2022; 4 min read &#x2022; Bitcoin</small></p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-plus" viewBox="0 0 16 16">
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                        <path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z" />
                      </svg>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <img src={news.image} className="img-fluid rounded-start" alt="{book.title + 'cover'}" />
                  </div>
                </div>
              </div>
            );
          })}
        </Row>
        )}
      </Container>
    </>
  );


};

export default Homepage;
