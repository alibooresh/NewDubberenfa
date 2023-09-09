import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./form/home/Home";
import Login from "./component/login/Login";
import Signup from "./component/signup/Signup";

function App() {
  return (
    <Routes>
      <Route path="/login"  element={<Login/>} />
      <Route path="/signup" Component={Signup} />
      <Route path="/" Component={Home} />
    </Routes>
  );
}

export default App;
