import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import './App.css';
import Pokedex from './components/Pokedex';

const link = new HttpLink({
  uri: 'https://beta.pokeapi.co/graphql/v1beta',
  fetchOptions: {
    mode: 'cors'
  }
});

const client = new ApolloClient({
  uri: 'https://beta.pokeapi.co/graphql/v1beta',
  link: link,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className="App">

      <ApolloProvider client={client}>
        <Pokedex client={client} />
      </ApolloProvider>
    </div>
  );
}

export default App;
