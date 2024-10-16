import { Box } from "@mui/material";
import React, { useState } from "react";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useImportBookMutation } from "state/api";
import ImportForm from "components/ImportForm";

const Import = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [addMember] = useImportBookMutation();
  const [alertMessage, setAlertMessage] = useState("");
  const handleFormSubmit = async (values) => {
    try {
      const response = await addMember(values);
      if (response.data.success) {
        setAlertMessage(response.data.message);
      } else {
        setAlertMessage("Failed to Import book: " + response.data.message);
      }
    } catch (error) {
      console.error("Error importing book:", error);
      setAlertMessage("An error occurred while importing the book.");
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween sx={{ m: "2vh 0" }}>
        <Header title="IMPORT BOOKS" subtitle="Import new books" />
      </FlexBetween>
      {alertMessage && <div className="alert">{alertMessage}</div>}
      <ImportForm
        isNonMobile={isNonMobile}
        handleFormSubmit={handleFormSubmit}
      />
    </Box>
  );
};

export default Import;
