import React, { useState } from "react";
import "./App.css";
import axios from "axios";

import Error from "../Error/Error";

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isOnline, setIsOnline] = useState(false);

    axios.get("https://mymeteo.mvetois.fr/api/").then(() => {
        setIsOnline(true);
        setIsLoading(false);
    }).catch(() => {
        setIsOnline(false);
        setIsLoading(false);
    });
    if (isLoading) {
        return (
            <div className="loader"></div>
        );
    }
    return (<>
        {isLoading ? <div className="loader"></div> : !isOnline ? <Error /> :
            <div className="App">
                <header className="App-header">
                    <p>Edit <code>src/App/App.tsx</code> and save to reload.</p>
                    <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer" >Learn React</a>
                </header>
            </div>
        }
    </>);
}

export default App;

