import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Routes from "./Routes";
import { ToastProvider } from "react-toast-notifications";

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_URL}/graphql`,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ToastProvider>
        <Routes />
      </ToastProvider>
    </ApolloProvider>
  );
}

export default App;
