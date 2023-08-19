import { Container, TextField } from "@mui/material";
import Header from "../../component/header/Header";

export default function Login() {
  return (
    <>
      <Header />
      <Container >
        <form>
          <TextField type="text" />
          <TextField type="password" />
        </form>
      </Container>
    </>
  );
}
