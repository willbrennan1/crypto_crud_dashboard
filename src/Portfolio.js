import React from "react";
import Home from "./Home";
import { useTable, useRowSelect } from "react-table";

function Portfolio(props) {

    const {data, columns, favIndex} = props;

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


    // Adding the react-table code down here!
     // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable({
    columns,
    data,
  },
  );

  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  const styles = {
    thead: {
      backgroundColor: "blue"
    },
    td: {
      padding: "10px",
      border: "dotted 1px black"
    }
  };






    const BULLSHIT = (
        <div>
            Seth and Will Coding Session!
        </div>
    )

    return (
        <div>
    <table {...getTableProps()}>
      <thead style={styles.thead}>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} style={styles.td}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
    )






  }
  
  export default Portfolio;
