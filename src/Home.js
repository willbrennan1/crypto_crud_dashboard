import React from "react";
import styled from 'styled-components'
import { useTable } from "react-table";

function Home({columns, data, __handleClickRow, getHeaderProps, getColumnProps, getRowProps, getCellProps }) {

  // Create a default prop getter
const defaultPropGetter = () => ({})

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

  const Styles = styled.div`
  table {
        width: 100%;
        height: 100%;
        border-collapse: collapse;
        box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.08);
      }
      thead {
        height: 64px;
        background: #fff;
      }
      thead th {
        font-size: 14px;
        color: black;
        text-align: left;
        padding: 0 30px;
        font-family: Inter, -apple-system, BlinkMacSystemFont, "segoe ui", Roboto, Helvetica, Arial, sans-serif;
      }
      tr {
        height: 64px;
        border-bottom: 1px solid #eff2f5;
        font-family: Inter, -apple-system, BlinkMacSystemFont, "segoe ui", Roboto, Helvetica, Arial, sans-serif;
        font-size: 14px;
        text-align: left;
        font-weight: 500;
        background: #fff;
        
      }
      tr td {
        padding: 0 30px;
        border-bottom: 1px solid #3c1742;
        border-color: #eff2f5;
      }
      tr:hover {
        background-color: rgb(248,250,253);
      }

      @media only screen and (max-width: 992px) {
        table {
          white-space: nowrap;
        }
      }
`



  return (
    <Styles>
    <div>
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps([
                {
                className: column.className,
                style: column.style,
                },
                getColumnProps(column),
                getHeaderProps(column),
              ])}
              >{column.render("Header")}
              </th>
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
                return (
                  <td {...cell.getCellProps()} 
                  onClick={() => {
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
  </Styles>
  )
}

export default Home;