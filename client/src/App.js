import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DisplayNews from './components/pages/DisplayNews';
import UserNews from './components/pages/UserNews';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Auth from './components/utils/auth';
import Footer from './components/Footer';

// Construct main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up client to execute the `authLink` middleware prior to making the request to GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route
              path='/'
              element={<DisplayNews />}
            />
            <Route
              path="/login"
              element={<LoginForm />}
            />
            <Route
              path="/signup"
              element={<SignupForm />}
            />
             <Route
              path="/profile"
              element={<UserNews />}
            />
              
            <Route
              path='*'
              element={<h1 className='display-2'>Wrong page!</h1>} />
          </Routes>
        </>
        <Footer />
      </Router>
    </ApolloProvider >
  );
}

export default App;

