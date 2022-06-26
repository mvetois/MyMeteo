import React, { useState } from "react";
import "./App.css";
import axios from "axios";

import Error from "../Error/Error";
import Search from "../Search/Search";

import { backendUrl } from "../utils";

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isOnline, setIsOnline] = useState(false);

    axios.get(backendUrl + "/api/").then(() => {
        setIsOnline(true);
        setIsLoading(false);
    }).catch(() => {
        setIsOnline(false);
        setIsLoading(false);
    });
    return (isLoading ? <div className="loader"></div> : !isOnline ? <Error /> : <Search />);
}

export default App;

