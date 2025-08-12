
import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout.js";
import Login from "./Pages/Auth/Login.js";
import Register from "./Pages/Auth/Register.js";
import Home from "./Pages/Home.js";


function App() {
  return (
<div className="app">
 <Routes>
  <Route  path="/" element={<Layout/>}/>
  <Route  path="/login" element={<Login/>}/>
    <Route  path="/register" element={<Register/>}/>
    <Route path="/home" element={<Home/>}/>
 </Routes>
</div>
  );
}

export default App;
