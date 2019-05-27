import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from "./components/Header";
import Feed from "./components/Feed";
import Profile from "./components/Profile";

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Route path="/" component={Feed} exact/>
                <Route path="/profile" component={Profile} exact/>
            </div>
        </Router>
    );
}

export default App;
