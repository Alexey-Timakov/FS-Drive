import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import About from "./About/About";
import CarComponent from "./CarComponent/CarComponent";
import Faq from "./FAQ/FAQ"
import MainPagesWrapper from "./MainPage/MainPagesWrapper";
import Reg from "./Reg/Reg";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={MainPagesWrapper} />
          <Route path="/faq" component={Faq} />
          <Route path="/about" component={About} />
          <Route path="/reg" component={Reg} />
          <Route path="/car/:id" component={CarComponent} />
        </Switch>
      </Router>
    </>
  )
}

export default App;