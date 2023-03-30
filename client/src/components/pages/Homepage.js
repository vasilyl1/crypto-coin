import React, { useState, useEffect } from "react";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";

import Auth from "../utils/auth";
import { useMutation, useQuery } from '@apollo/client';
import { SAVE_NEWS } from '../utils/mutations';
import { newsSupplier } from "../utils/NewsSupplier";
import { saveNewsIds, getSavedNewsIds } from "../utils/localStorage";

const Homepage = () => {
  // create state for holding returned google api data
  const [searchedNews, setSearchedNews] = useState([]);
  // create state for holding search field data
  const [searchInput, setSearchInput] = useState("");

  // create state to hold saved bookId values
  const [savedNewsIds, setSavedNewsIds] = useState(getSavedNewsIds());

  // access to DB - mutations and queries
  const [saveNews, { error }] = useMutation(SAVE_NEWS);


  // set up useEffect hook to save `savedBookIds` list to localStorage and DB on component unmount
  useEffect(() => {

    return () => saveNewsIds(savedNewsIds);
  });

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await newsSupplier(searchInput);

      if (!response.ok) {
        throw new Error("Could not perform the search!");
      }

      const { items } = await response.json();

      const newsData = items.map((news) => ({
        newsId: news.id,
        authors: news.volumeInfo.authors || ["No author to display"],
        title: news.volumeInfo.title,
        description: news.volumeInfo.description,
        image: news.volumeInfo.imageLinks?.thumbnail || "",
      }));

      setSearchedNews(newsData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // function to handle saving a book to database
  const handleSaveNews = async (newsId) => {
    // find the book in `searchedBooks` state by the matching id
    const newsToSave = searchedNews.find((news) => news.newsId === newsId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) return false;

    try {
      const { data } = await saveNews({
        variables: {
          username: Auth.getProfile().data.username,
          authors: newsToSave.authors,
          description: newsToSave.description,
          bookId: newsToSave.bookId,
          image: newsToSave.image,
          link: newsToSave.link,
          title: newsToSave.title
        }
      });
      if (!data) throw new Error("Could not save book to DB");

      // if book successfully saves to user's account, save book id to state
      setSavedNewsIds([...savedNewsIds, newsToSave.newsId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Container>
        <h5 className="pt-5">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="25" height="25"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 7L13 15L9 11L3 17M21 7H15M21 7V13" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
          &nbsp;
          Trending articles
        </h5>
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
      </Container>
    </>
  );


};

export default Homepage;
