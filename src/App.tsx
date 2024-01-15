import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { ThemeProvider, createTheme } from '@mui/material';
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

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#DF5151',
    },
    secondary: {
      main: '#51dfdf',
    },
    background: {
      default: '#ffebee',
      paper: '#ffcdd2',
    },
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Pokedex client={client} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
