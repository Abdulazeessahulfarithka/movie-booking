
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login.js";
import Register from "./Pages/Auth/Register.js";
import Home from "./Pages/User/Home.js";
import ViewMovie from "./Pages/viewmovie.js"

function App() {
  return (
<div className="app">
 <Routes>
  <Route  path="/" element={<Home/>}/>
  <Route  path="/login" element={<Login/>}/>
  <Route  path="/register" element={<Register/>}/>
    <Route path="/viewmovie/:id" element={<ViewMovie/>} />
 </Routes>
</div>
  );
}

export default App;
