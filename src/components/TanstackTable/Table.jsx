import React, { useState } from "react";
import { data } from "../../assets/TableData";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

const Table = () => {
  const [sortedData, setSorted] = useState([]);
  const [filteredData, setFilteredData] = useState("");
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Full Name",
      columns: [
        {
          header: "First Name",
          accessorKey: "first_name",
        },
        {
          header: "Last Name",
          accessorKey: "last_name",
        },
      ],
    },

    // we can ADD two column values
    // {
    //   header: "Full Name",
    //   accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    // },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Gender",
      accessorKey: "gender",
    },
    {
      header: "Date of Birth",
      accessorKey: "dob",
      cell: (info) => {
        console.log(new Date(info.getValue()));
        return info.getValue();
      },
    },
  ];
  const tableData = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sortedData,
      globalFilter: filteredData,
    },
    onSortingChange: setSorted,
    onGlobalFilterChange: setFilteredData,
  });
  return (
    <>
      {" "}
      <div
        style={{
          display: "flex",
          // gap: "10px",
          width: "100%",
          // padding: "10px 0px",
        }}
      >
        <input
          type="text"
          value={filteredData}
          onChange={(e) => setFilteredData(e.target.value)}
        />
      </div>
      <table>
        <thead>
          {tableData.getHeaderGroups()?.map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers?.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <>
                      {" "}
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        {
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted()]
                      }
                    </>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableData.getRowModel().rows?.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells()?.map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          // gap: "10px",
          width: "100%",
          // padding: "10px 0px",
        }}
      >
        <button onClick={() => tableData.setPageIndex(0)}>First Page</button>
        <button
          disabled={!tableData.getCanPreviousPage()}
          onClick={() => tableData.previousPage()}
        >
          Prev Page
        </button>
        <button
          disabled={!tableData.getCanNextPage()}
          onClick={() => tableData.nextPage()}
        >
          Next Page
        </button>
        <button
          onClick={() => tableData.setPageIndex(tableData.getPageCount() - 1)}
        >
          Last Page
        </button>
      </div>
    </>
  );
};

export default Table;
