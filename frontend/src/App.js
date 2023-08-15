import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./form/Home";
import Login from "./form/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="login" element={<Login />} />
          <Route path="signUp" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
