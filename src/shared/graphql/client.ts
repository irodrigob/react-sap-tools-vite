import { ApolloClient, InMemoryCache, NormalizedCacheObject,HttpLink } from "@apollo/client";

let apolloClient:ApolloClient<NormalizedCacheObject>;

function createIsomorphLink() {   
 
  return new HttpLink({
    uri:
      import.meta.env.VITE_GOOGLE_CLIENT_ID === "production"
        ? "https://react-sap-tools-server.vercel.app/api/graphql"
        : "http://localhost:3001/api/graphql",
    credentials: "same-origin",
  });
}

function createApolloClient() {
  return new ApolloClient({
    link: createIsomorphLink(),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo() {
  const _apolloClient = apolloClient ?? createApolloClient();
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}
