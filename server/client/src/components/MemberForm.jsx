import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

const MemberForm = ({ member, isNonMobile, handleFormSubmit }) => {
  // console.log(member);
  const initialValues = {
    name: `${member?.name || ""}`,
    password: `${member?.password || ""}`,
    email: `${member?.email || ""}`,
    phoneNumber: `${member?.phoneNumber || ""}`,
    occupation: `${member?.occupation || ""}`,
    state: `${member?.state || ""}`,
    city: `${member?.city || ""}`,
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
              label="First Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              name="name"
              error={!!touched.name && !!errors.name}
              helperText={touched.name && errors.name}
              sx={{ gridColumn: "span 4" }}
            />

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
              type="text"
              label="Password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={!!touched.password && !!errors.password}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Phone Number"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.phoneNumber}
              name="phoneNumber"
              error={!!touched.phoneNumber && !!errors.phoneNumber}
              helperText={touched.phoneNumber && errors.phoneNumber}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="City"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.city}
              name="city"
              error={!!touched.city && !!errors.city}
              helperText={touched.city && errors.city}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="State"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.state}
              name="state"
              error={!!touched.state && !!errors.state}
              helperText={touched.state && errors.state}
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
const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  password: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .test("len", "Must be exactly 10 characters", (val) => val.length === 10)
    .required("required"),
  city: yup.string().required("required"),
  state: yup.string(),
});
export default MemberForm;
