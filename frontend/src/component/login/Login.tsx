import { Box, Button, ButtonGroup, Container, Grid, Link, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Header from "../header/Header";
import { UserModel } from "../../models/UserModel";
import * as yup from "yup";

// axios.defaults.xsrfCookieName = "csrftoken";
// axios.defaults.xsrfHeaderName = "X-CSRFToken";
// axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});
const headers = {
  'Content-Type': 'application/json',
  "Accept": "application/json"
};

const LoginFormValidationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Enter your password"),
});

function Login() {
  const [user, setUser] = useState<UserModel>();
  const [currentUser, setCurrentUser] = useState<Boolean  >();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema:LoginFormValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      
      client.post("/dubb/login", values, { headers: headers }).then((respose) => {
        console.log(respose);
      });
    },
  });

  useEffect(() => {
    client
      .get("/dubb/user", { headers: headers })
      .then(function (res) {
        setCurrentUser(true);
      })
      .catch(function (error) {
        setCurrentUser(false);
      });
  }, []);


  return (
    <div>
      <Header isLoggedIn={!currentUser} />
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
            </Grid>
            <ButtonGroup fullWidth style={{ marginTop: "10px" }}>
              <Button
                size="medium"
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                Submit
              </Button>
              <Link
                style={{ marginLeft: "5px" }}
                href="/signup"
                variant="body2"
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </ButtonGroup>
          </form>
        </Box>
      </Container>
    </div>
  );
}
export default Login;
