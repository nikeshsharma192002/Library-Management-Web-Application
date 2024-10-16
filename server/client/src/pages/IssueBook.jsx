import { Box } from "@mui/material";
import React, { useState } from "react";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useIssueBookMutation } from "state/api";
import BookForm from "components/BookForm";

const IssueBook = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [issueBook] = useIssueBookMutation();

  const [alertMessage, setAlertMessage] = useState("");
  const handleFormSubmit = async (values) => {
    try {
      const response = await issueBook(values);
      if (response.data.success) {
        setAlertMessage(response.data.message);
      } else {
        setAlertMessage("Failed to Issue book: " + response.data.message);
      }
    } catch (error) {
      console.error("Error in issusing book:", error);
      setAlertMessage("An error occurred while issuing the book.");
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween sx={{ m: "2vh 0" }}>
        <Header title="ISSUE BOOKS" subtitle="Issue books to members" />
      </FlexBetween>
      {alertMessage && <div className="alert">{alertMessage}</div>}
      <BookForm isNonMobile={isNonMobile} handleFormSubmit={handleFormSubmit} />
    </Box>
  );
};

export default IssueBook;
