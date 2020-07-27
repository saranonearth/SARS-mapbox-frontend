import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home.jsx";
import Track from "./components/Track";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Track} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
