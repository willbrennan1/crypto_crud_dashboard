import React, { useMemo, useState, useEffect} from "react";
import './App.css';
import { Route, Switch } from "react-router-dom";
import Home from './Home';
import Portfolio from './Portfolio';
import Research from './Research';
import Graphs from './Graphs';
import NavBar from './NavBar';

function App() {

   //Setting state for API data
   const [cells, setCells] = useState([])

   var baseUrl = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"
   var apiKey = "e1026657-301b-4947-9e98-e8982a94dbeb"

   //Fetch request to retrieve API data
   const getData = async () => {
    const resp = await fetch(baseUrl, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'X-CMC_PRO_API_KEY': apiKey,
      }
    })
    .then(response => response.json())
    .then(obj => {

      let coinsData = obj.data;
      setCells(coinsData)
    })
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Rank",
        accessor: "cmc_rank" // accessor is the "key" in the data
      },
      {
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "Symbol",
        accessor: "symbol"
      }
    ],
    []
  );

  useEffect(() => {
    getData();
  }, []);

  const data = React.useMemo(() => cells, []);

  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path ="/portfolio">
          <Portfolio />
        </Route>
        <Route exact path ="/research">
          <Research />
        </Route>
        <Route exact path ="/graphs">
          <Graphs />
        </Route>
        <Route exact path ="/">
        <>{cells && <Home columns={columns} data={data} />}</>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
