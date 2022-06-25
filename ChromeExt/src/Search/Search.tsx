import react, { useState, ChangeEvent } from "react";
import axios from "axios";

const Search = () => {
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState({});
    const [errorDisplay, setErrorDisplay] = useState(false);

    const searchFrominput = () => {
        axios.get("https://mymeteo.mvetois.fr/api/cities/find?param=" + input.toLowerCase().replace(/\s/g, '')).then(res => {
            setSearch(res.data);
            setIsLoading(false);
            setErrorDisplay(false);
        }).catch(() => {
            setErrorDisplay(true);
        }
        );
    }
    return (<>
        <div className="App">
            <header className="App-header">
                <p>Choix de la ville</p>
                <input type="text" id="name" name="name" required value={input} onChange={(e : ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}/>
                <button onClick={() => searchFrominput()}>Rechercher</button>
                {errorDisplay ? <p style={{color: "#FF0000"}}>Ville inconnue</p> : null}
            </header>
        </div>
    </>);
}
export default Search;