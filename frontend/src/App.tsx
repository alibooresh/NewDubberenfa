import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./form/home/Home";
import Login from "./form/login/Login";
import Signup from "./form/signup/Signup";

function App() {
  return (
    <Routes>
      <Route path="/login" Component={Login} />
      <Route path="/signup" Component={Signup} />
      <Route path="/" Component={Home} />
    </Routes>
  );
}

export default App;
