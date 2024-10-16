import React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";

const Transactions = () => {
  const theme = useTheme();

  const { data, isLoading } = useGetTransactionsQuery();
  // console.log(data);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "bookID",
      headerName: "Book ID",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "outstanding",
      headerName: "Outstanding",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      minWidth: 150,
      flex: 1,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSCTIONS" subtitle="List of Transactions" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          initialState={{
            sorting: {
              sortModel: [{ field: "createdAt", sort: "desc" }],
            },
          }}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Transactions;
