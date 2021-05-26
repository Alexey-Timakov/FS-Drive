import * as React from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import About from "./About";
import Faq from "./FAQ"
import Reg from "./Reg";

function App() {
    return (
        <Router>
            <>
                <Switch>
                    <Route path="/faq" component={Faq}/>
                    <Route path="/about" component={About}/>
                    <Route path="/reg" component={Reg} />
                    <Route path="/" component={Reg}/>
                </Switch>
            </>
        </Router>
    )
}

export default App;