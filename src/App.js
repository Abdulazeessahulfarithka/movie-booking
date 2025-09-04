
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login.js";
import Register from "./Pages/Auth/Register.js";
import Home from "./Pages/User/Home.js";
import ViewMovie from "./Pages/viewmovie.js"
import Movies from "./Pages/Movies.js";
import BookTicket from "./Pages/bookticket.js";
import Payment from "./Pages/payment.js";
import Profile from "./Pages/profile.js";
import Orders from "./Pages/order.js";

function App() {
  return (
<div className="app">
 <Routes>
  <Route  path="/" element={<Home/>}/>
  <Route  path="/login" element={<Login/>}/>
  <Route  path="/register" element={<Register/>}/>
    <Route path="/viewmovie/:id" element={<ViewMovie/>} />
    <Route path="/movie" element={<Movies/>} />
    <Route path="/bookticket/:id" element={<BookTicket/>} />
    <Route path="/payment" element={<Payment/>} />


  {/* Users Route */}
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        

 </Routes>
</div>
  );
}

export default App;
