import React from 'react';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@client/initApollo';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { EmotionCache } from '@emotion/cache';
import '@styles/globals.css';

// Client-side cache, shared for the whole session of the user in the browser.

type CustomAppProps = AppProps & { emotionCache: EmotionCache };

function MyApp({ Component, pageProps }: CustomAppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
          <CssBaseline />
            <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
