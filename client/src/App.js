import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login.js";
import Dashboard from "./components/Dashboard/dash.js";
import SignUp from "./components/SignUp/SignUp";
import Landing from "./components/landing/landing";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "/api",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
