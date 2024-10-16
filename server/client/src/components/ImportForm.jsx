import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

const ImportForm = ({ isNonMobile, handleFormSubmit }) => {
  // console.log(handleFormSubmit);
  const initialValues = {
    quantity: `${""}`,
    isbn: `${""}`,
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
              label="ISBN"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.isbn}
              name="isbn"
              error={!!touched.isbn && !!errors.isbn}
              helperText={touched.isbn && errors.isbn}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Quantity"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.quantity}
              name="quantity"
              error={!!touched.quantity && !!errors.quantity}
              helperText={touched.quantity && errors.quantity}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Import
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

const checkoutSchema = yup.object().shape({
  isbn: yup
    .string()
    .required("required")
    .test("no-spaces", "ISBN should not contain spaces", (value) => {
      return !/\s/.test(value);
    })
    .test("len", "Must be exactly 10 digit", (val) => val.length === 10),
  quantity: yup.number().required("required"),
});
export default ImportForm;
