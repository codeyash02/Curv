import { useMemo } from 'react';
import { IncomingMessage, ServerResponse } from 'http';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

const API_URL = process.env.NEXT_PUBLIC_GRAPHQL;
console.log(API_URL,"asdasdas")

let apolloClient: any;

export type ResolverContext = {
  req?: IncomingMessage;
  res?: ServerResponse;
};

// function parseCookies(_context: any, options = {}) {
//   return cookie.parse(document.cookie, options);
// }

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map((graphqlError) => {
      // const { message, locations, path } = graphqlError;
      try {
        // Sentry.captureMessage(message);
      } catch (err) {
        console.log('err', err);
      }
      return graphqlError;
    });
  }
  if (networkError) {
    try {
      // Sentry.captureException(networkError);
    } catch (err) {
      console.log('err', err);
    }
  }
  // prepared for logging
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        listOpenTournaments: {
          keyArgs: ['filter'],
          merge(existing = [], incoming = [], { args }) {
            if (args && !args.offset) {
              return incoming;
            }

            if (existing.length === 0) {
              return incoming;
            }
            return {
              __typename: 'TournamentsConnection',
              total: incoming.total,
              nodes: [...existing.nodes, ...incoming.nodes],
            };
          },
        },
        listPastTournaments: {
          keyArgs: ['filter'],
          merge(existing = [], incoming = [], { args }) {
            if (args && !args.offset) {
              return incoming;
            }

            if (existing.length === 0) {
              return incoming;
            }
            return {
              __typename: 'TournamentsConnection',
              total: incoming.total,
              nodes: [...existing.nodes, ...incoming.nodes],
            };
          },
        },
        listUsers: {
          keyArgs: ['filter'],
          merge(existing = [], incoming = [], { args }) {
            if (args && !args.offset) {
              return incoming;
            }

            if (existing.length === 0) {
              return incoming;
            }
            return {
              __typename: 'UsersConnection',
              total: incoming.total,
              nodes: [...existing.nodes, ...incoming.nodes],
            };
          },
        },
        getRaceHorses: {
          keyArgs: ['raceId', 'settled'],
        },
      },
    },
  },
});

const authLink = setContext(async (_, { headers }) => {
  const token:any = '';

  return {
    headers: {
      ...headers,
      authorization: token ? token.token : '',
    },
  };
});

const httpLink = new HttpLink({
  uri: API_URL,
  credentials: 'same-origin',
});

function createApolloClient(context?: ResolverContext) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.concat(errorLink, authLink.concat(httpLink)),
    cache,
  });
}

export function initializeApollo(
  initialState: NormalizedCacheObject | null = null,
  context?: ResolverContext,
): ApolloClient<NormalizedCacheObject> {
  const apolloClientInitialized = apolloClient ?? createApolloClient(context);

  if (initialState) {
    const existingCache = apolloClientInitialized.extract();

    apolloClientInitialized.cache.restore({
      ...existingCache,
      ...initialState,
    });
  }

  if (typeof window === 'undefined') return apolloClientInitialized;

  if (!apolloClient) apolloClient = apolloClientInitialized;

  return apolloClientInitialized;
}

export function useApollo(
  initialState: NormalizedCacheObject | null,
): ApolloClient<NormalizedCacheObject> {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
