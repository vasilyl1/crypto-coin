import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/pages/Homepage';
import UserNews from './components/pages/UserNews';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Auth from './components/utils/auth';
import PersonalNotes from './components/pages/PersonalNotes';
import Footer from './components/Footer';
import About from './components/pages/About';
import PageNotFound from './components/pages/PageNotFound';
import CurrencySearch from './components/pages/currencySearch';

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
              element={<Homepage />}
            />
            <Route
              path="/about"
              element={<About />}
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
              path="/saved"
              element={<PersonalNotes />}
            />
            <Route
              path="/currencySearch"
              element={<CurrencySearch />}
            />
            <Route
              path='*'
              element={<PageNotFound />} />
          </Routes>
        </>
        <Footer />
      </Router>
    </ApolloProvider >
  );
}

export default App;

