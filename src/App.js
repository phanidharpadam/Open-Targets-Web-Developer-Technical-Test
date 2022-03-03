import React from "react";
import { client } from "./ApolloClient/client";
import { ApolloProvider } from "@apollo/client";
import TableView from "./components/TableView";

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <TableView />
      </div>
    </ApolloProvider>
  );
}

export default App;
