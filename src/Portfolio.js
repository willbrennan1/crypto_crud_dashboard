import React from "react";
import Home from "./Home";
import { useTable, useRowSelect } from "react-table";

function Portfolio(props) {

    const {data, favIndex} = props;
    console.log('<Portfolio />');
    console.log('data', data);
    console.log('favIndex', favIndex);



    const PORTFOLIO_TABLE = (
        <table>
            {data.map(element => {
                const id = element.id;
                const shouldInclude = favIndex.includes(id);
                if (shouldInclude) {
                    return (
                        <tr>
                            <td>
                                {element.cmc_rank}
                            </td>
                            <td>
                                {element.name}
                            </td>
                        </tr>
                    )
                } else {
                    return null;
                }
            })}
        </table>
    )

    const BULLSHIT = (
        <div>
            Seth and Will Coding Session!
        </div>
    )

    return (
        <>
            {PORTFOLIO_TABLE}
            {BULLSHIT}
        </>
    )






  }
  
  export default Portfolio;
