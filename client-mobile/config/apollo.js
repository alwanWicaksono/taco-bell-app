import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://taco-bell-orchestrator.herokuapp.com/",
  cache: new InMemoryCache(),
});

export default client;