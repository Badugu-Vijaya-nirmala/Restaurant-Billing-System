import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Menu from "./components/Menu";
import Bill from "./components/Bill";

function App() {
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState(null); // current completed order
  const [ordersList, setOrdersList] = useState([]); // all orders for report

  const completeOrder = (newOrder) => {
    setOrdersList((prev) => [...prev, newOrder]);
    setOrder(newOrder);
    setCart([]); // clear cart after order
  };

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* App Routes */}
        <Route
          path="/menu"
          element={
            <Menu
              cart={cart}
              setCart={setCart}
              setOrder={completeOrder}
            />
          }
        />
        <Route
          path="/bill"
          element={order ? <Bill order={order} /> : <Navigate to="/menu" />}
        />
        

        {/* Redirect any unknown path to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
