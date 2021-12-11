import React, { useMemo, useState, useEffect} from "react";
import './App.css';
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from './Home';
import Portfolio from './Portfolio';
import Research from './Research';
import Graphs from './Graphs';
import NavBar from './NavBar';
import { flushSync } from "react-dom";
import { getByPlaceholderText } from "@testing-library/react";

function App() {

  /** state variables */
  const [ cells, setCells ] = useState([])
  const [ favIndex, setFavIndex ] = useState([]);
  const [ favorite, setFavorite ] = useState(false); // this will need to go with react-table

    /** side effects */
    useEffect(() => {
      getData();
    }, []);
  
  
//     useEffect(() => {
//       /** make a request to the api here*/
//       console.log('FAV INDEX HAS UPDATED', favIndex);

//       updateBackend()

//       flushSync.readFile(.//db)

// fs.readFile("favIndex")

//     }, [favIndex]);

  /** helper functions */
   //Fetch request to retrieve API data

    const updateBackend = async () => {
      console.log('update backend!');
      const url = "http://localhost:6969";
      const resp = await fetch(url, {
        method: "GET",
      })
        .then(res => res.text())
        .then(data => {
          console.log('data from api :)', data);
        })
    }

   const getData = async () => {
    var baseUrl = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"
    var apiKey = "e1026657-301b-4947-9e98-e8982a94dbeb"
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

  const handleClickRow = (id) => {
    const alreadyExist = favIndex.filter((element => {
      return element === parseInt(id)
    }))

    if(alreadyExist.length === 0 ) {
      setFavIndex([...favIndex, parseInt(id)])
    } else {
      // 2
      // [ 1 2, 3, 4, 5]
      const filteredArray = favIndex.filter((element) => {
       return element != id
      })
      setFavIndex(filteredArray);
      // setFavIndex(favIndex.filter(element => element != id));
    }
  }

  // Print an integer with commas as thousands separators
  function thousands_separators(num)
  {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }

  const columns = [
      {
        Header: "Add to Portfolio",
        Cell: (rowData) => {
          return (
            <button style={
              {color: '#f6b87e'}}
              >
              { favIndex.includes(parseInt(rowData.row.original.id)) ? "★" : "☆" }
            </button>
          )
        }
      },
      {
        Header: "#",
        accessor: "cmc_rank", // accessor is the "key" in the data
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ value }) =>  {
          return (
          <b>
          {value}
          </b>
          );
        }
      },
      {
        Header: "Symbol",
        accessor: "symbol"
      },
      {
        Header: "Price",
        accessor: "quote.USD.price",
        Cell: ({ cell: { value } }) => {
          return (
            <>
            ${ thousands_separators((value.toFixed(2))) }
            </>
          );
        }
      },
      {
        Header: "24h %",
        accessor: "quote.USD.percent_change_24h",
        Cell: ({ cell: { value } }) => {
          return (
            <p style={{ color: value > 0 ? "green" : "red" }}>
            { (value.toFixed(2)) }%
            </p>
          );
        }
      },
      {
        Header: "7d %",
        accessor: "quote.USD.percent_change_7d",
        Cell: ({ cell: { value } }) => {
          return (
            <p style={{ color: value > 0 ? "#16c784" : "#ea3943" }}>
            { (value.toFixed(2)) }%
            </p>
          );
        }
      },
      {
        Header: "Market Cap",
        accessor: "quote.USD.market_cap",
        Cell: ({ cell: { value } }) => {
          return (
            <>
            ${ thousands_separators(Math.round(value)) }
            </>
          );
        }
      },
      {
        Header: "Volume(24h)",
        accessor: "quote.USD.volume_24h",
        Cell: ({ cell: { value } }) => {
          return (
            <>
            ${ thousands_separators(Math.round(value)) }
            </>
          );
        }
      },
      {
        Header: "Circulating Supply",
        accessor: "circulating_supply",
        Cell: ({ cell: { value } }) => {
          return (
            <>
            { thousands_separators(Math.round(value)) }
            </>
          );
        }
      },
    ];

  // const data = React.useMemo(() => cells, []);
  const data = cells;

  return (
    <div>
      <Header />
      <NavBar />
      <Switch>
        <Route exact path ="/portfolio">
          <Portfolio columns={columns} data={data} favIndex={favIndex}/>
        </Route>
        <Route exact path ="/research">
          <Research />
        </Route>
        <Route exact path ="/graphs">
          <Graphs />
        </Route>
        <Route exact path ="/">
        <>{cells && <Home 
                      columns={columns} 
                      data={data} 
                      __handleClickRow={handleClickRow} 
                      getHeaderProps={column => ({
                        onClick: () => alert('Header!'),
                      })}
                      getColumnProps={column => ({
                        onClick: () => alert('Column!'),
                      })}
                      getRowProps={row => ({
                        style: {
                          background: row.index % 2 === 0 ? 'rgba(0,0,0,.1)' : 'white',
                        },
                      })}
                      
                      />}</>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
