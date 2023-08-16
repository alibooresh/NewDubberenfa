import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function Login() {
  return (
    <>
      <div className="App">
        <center>
          <h1>Register a new account</h1>
          <Formik>
            {({ isSubmitting }) => (
              <Form>
                <Field
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                />
                <ErrorMessage name="username" component="div" />

                <Field
                  type="password"
                  name="password"
                  placeholder="Enter password"
                />
                <ErrorMessage name="password" component="div" />
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </center>
      </div>
    </>
  );
}
