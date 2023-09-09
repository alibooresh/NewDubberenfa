import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { UserModel } from "../../models/UserModel";
import Header from "../header/Header";

// axios.defaults.xsrfCookieName = "csrftoken";
// axios.defaults.xsrfHeaderName = "X-CSRFToken";
// axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const SignupFormValidationSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  username: yup.string().required("Username name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Enter your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm your password"),
});

function Signup() {
  const [user, setUser] = useState<UserModel>();
  const [currentUser, setCurrentUser] = useState<Boolean>();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupFormValidationSchema,
    onSubmit: (model: UserModel) => {
      console.log(model);

      client
        .post("/dubb/register", model, { headers: headers })
        .then(function (res) {
          client
            .post("/api/login", {
              email: model.email,
              password: model.password,
            })
            .then(function (res) {
              setCurrentUser(true);
              navigate("/home");
            });
        });
    },
  });

  useEffect(() => {
    client
      .get("/dubb/user", { headers: headers })
      .then(function (res) {
        setCurrentUser(true);
        navigate("/home");
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
            Sign Up
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="username"
                  name="username"
                  label="Username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                />
              </Grid>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Password"
                  type="password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
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
                Signup
              </Button>
              <Link style={{ marginLeft: "5px" }} href="/login" variant="body2">
                {"Have an account? Login"}
              </Link>
            </ButtonGroup>
          </form>
        </Box>
      </Container>
    </div>
  );
}
export default Signup;
