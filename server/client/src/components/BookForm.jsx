import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

const BookForm = ({ isNonMobile, handleFormSubmit }) => {
  // console.log(handleFormSubmit);
  const initialValues = {
    email: `${""}`,
    bookID: `${""}`,
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={checkoutSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={!!touched.email && !!errors.email}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Book ID"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.bookID}
              name="bookID"
              error={!!touched.bookID && !!errors.bookID}
              helperText={touched.bookID && errors.bookID}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Update
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

const checkoutSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  bookID: yup.number().required("required"),
});
export default BookForm;
