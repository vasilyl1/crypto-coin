import React, { useState, useEffect } from 'react';
import {
    Container,
    Card,
    Button,
    Row,
    Col
} from 'react-bootstrap';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';

//import { getMe, deleteBook } from '../utils/API';
import { QUERY_USER } from '../utils/queries';
import { DELETE_NEWS } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeNewsId } from '../utils/localStorage';

const UserNews = () => {
    
    const [savedNewsData, setNewsData] = useState([]);
    const [deleteNews, { error }] = useMutation(DELETE_NEWS); // use to delete news
    const { loading, data } = useQuery(QUERY_USER, { variables: { username: Auth.getProfile().data.username } }); // query user to get saved books
    useEffect(() => {
        const getSavedNewsData = async () => {
            try {
                const savedNews = data.user?.savedNews || []; // get the savednews array data from usequery
                setNewsData(savedNews); // update the state
            } catch (err) {
                console.log(err);
            }
        }
        getSavedNewsData();
    });

    // create function that accepts the book's mongo _id value as param and deletes the book from the database
    const handleDeleteNews = async (newsId) => {
        try {
            const { data } = await deleteNews({
                variables: {
                    username: Auth.getProfile().data.username,
                    bookId: newsId
                },
            });
            // upon success, remove news id from localStorage
            removeNewsId(newsId);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };
    
    return (
        <>
                <>
                    <div fluid className="text-light bg-dark p-5">
                        <Container>
                            <h1>Viewing saved news!</h1>
                        </Container>
                    </div>
                    <Container>
                        <h2 className='pt-5'>
                            {savedNewsData.length
                                ? `Viewing ${savedNewsData.length} saved ${savedNewsData.length === 1 ? 'book' : 'books'}:`
                                : 'You have no saved books!'}
                        </h2>
                        <Row>
                            {savedNewsData.map((news) => {
                                return (
                                    <Col md="4">
                                        <Card key={news.newsId} border='dark'>
                                            {news.image ? <Card.Img src={news.image} alt={`The cover for ${news.title}`} variant='top' /> : null}
                                            <Card.Body>
                                                <Card.Title>{news.title}</Card.Title>
                                                <p className='small'>Authors: {news.authors}</p>
                                                <Card.Text>{news.description}</Card.Text>
                                                <Button className='btn-block btn-danger' onClick={() => handleDeleteNews(news.newsId)}>
                                                    Delete this News Item
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                );
                            })}
                        </Row>
                    </Container>
                </>
        </>

    );

};

export default UserNews;