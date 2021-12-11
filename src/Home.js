import React from "react";
import { useTable, useRowSelect } from "react-table";
import { Checkbox } from "./CheckBox";

function Home({columns, data, __handleClickRow}) {

      // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable({
    columns,
    data
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
            <tr {...row.getRowProps()} __handleClickRow={__handleClickRow}  >
              {row.cells.map((cell) => {
                  console.log('cell', cell);
                return (
                  <td {...cell.getCellProps()} style={styles.td} onClick={() => {
                      __handleClickRow(cell.row.original.id)
                  }}>
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

export default Home;