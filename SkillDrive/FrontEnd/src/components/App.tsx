import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import About from "./About/About";
import CarComponent from "./CarComponent/CarComponent";
import NoScript from "./Common/NoScript";
import Faq from "./FAQ/FAQ"
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import MainPagesWrapper from "./MainPage/MainPagesWrapper";
import Reg from "./Reg/Reg";

function App() {
  return (
    <>
      <Router>
        <Header />
        <NoScript />
        <Switch>
          <Route exact path="/" component={MainPagesWrapper} />
          <Route exact path="/faq" component={Faq} />
          <Route exact path="/about" component={About} />
          <Route exact path="/reg" component={Reg} />
          <Route exact path="/cars" component={MainPagesWrapper} />
          <Route exact path="/cars/:id" component={CarComponent} />
        </Switch>
        <Footer />
      </Router>
    </>
  )
}

export default App;