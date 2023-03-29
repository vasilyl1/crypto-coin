import React, { useState, useEffect } from "react";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";

import Auth from "../utils/auth";
import { useMutation, useQuery } from '@apollo/client';
import { SAVE_NEWS } from '../utils/mutations';
import { newsSupplier } from "../utils/NewsSupplier";
import { saveNewsIds, getSavedNewsIds } from "../utils/localStorage";

const DisplayNews = () => {
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
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for News</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a news"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className="pt-5">
          {searchedNews.length
            ? `Viewing ${searchedNews.length} results:`
            : "Search for a book to begin"}
        </h2>
        <Row>
          {searchedNews.map((news) => {
            return (
              <Col md="4">
                <Card key={news.bookId} border="dark">
                  {news.image ? (
                    <Card.Img
                      src={news.image}
                      alt={`The cover for ${news.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{news.title}</Card.Title>
                    <p className="small">Authors: {news.authors}</p>
                    <Card.Text>{news.description}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedNewsIds?.some(
                          (savedBookId) => savedBookId === news.bookId
                        )}
                        className="btn-block btn-info"
                        onClick={() => handleSaveNews(news.bookId)}
                      >
                        {savedNewsIds?.some(
                          (savedBookId) => savedBookId === news.bookId
                        )
                          ? "This news has already been saved"
                          : "Save this News"}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default DisplayNews;
