import React, { useState, useEffect } from "react";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";

import { useQuery } from '@apollo/client';
import { QUERY_NEWS, QUERY_USER } from '../utils/queries';
import { newsSupplier, coinData } from "../utils/NewsSupplier";

const Homepage = () => {

  const { loading, error, data } = useQuery(QUERY_NEWS, { variables: { subscription: 'free' } });


  // fetch the market data
  const [coinData, getMarket] = useState([]); // state to keep the API data 
  const [coinDataLoadig, updLoading] = useState(true); // state to indicate when the API data is loading -used for conditional rendering


  useEffect(() => {
    const abc = async () => {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin`);
        const data = await response?.json();
        updLoading(false); // change the flag that async loading completed
        getMarket(data); // change the state with the loaded data
      } catch (err) {
        console.error(err);
      };
    };
    abc();
  }, []);

  return (
    <>
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img src="hero.png" className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold lh-1 mb-3">Cryptocurrency made easy</h1>
            <p className="lead">Discover stories, thinking, and expertise from renowned experts on cryptocurrency.</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <a href="#news-feed" type="button" className="btn btn-outline-secondary btn-lg px-4">Start reading </a>
            </div>
          </div>
        </div>
      </div>

      <Container id="news-feed">
        <h5 className="pt-5">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="25" height="25"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 7L13 15L9 11L3 17M21 7H15M21 7V13" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
          &nbsp;
          Trending articles
        </h5>

        {coinDataLoadig ? (<div>Loading...</div>) :
          (<>

            <div>
              {coinData?.map((c) =>
                <>
                  <img src={c.image} />
                  {c.symbol} {c.name}
                  {c.market_cap} {c.total_volume}
                  {c.high_24h} {c.low_24h} {c.price_change_24h}
                </>
              )}
            </div>
          </>)}

        <Row>
          {/* newsId: news.id,
          authors: news.volumeInfo.authors || ["No author to display"],
          title: news.volumeInfo.title,
          description: news.volumeInfo.description,
          image: news.volumeInfo.imageLinks?.thumbnail || "", */}
          {loading ? (<div>Loading...</div>) :
            (<>
              {data.getNews.map((news) => {
                return (
                  <>
                    <div class="card mb-3" style={{ maxWidth: '540px' }}>
                      <div class="row g-0">
                        <div class="col-md-8">
                          <div className="card-body">
                            {/* <p className="mb-1"> {news.username} </p> */}
                            <h5 className="card-title" style={{ display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '20ch' }}>{news.source.title}</h5>
                            <br />
                            <p className="card-text" style={{ display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '60ch' }}>{news.date}</p>

                            <p className="card-text"><small className="text-body-secondary">{news.date} &#x2022; { } min read &#x2022; Bitcoin</small></p>
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

                  </>
                );
              })}
            </>)}
        </Row >
        <br />
        <hr />
      </Container >

    </>
  );


};

export default Homepage;
