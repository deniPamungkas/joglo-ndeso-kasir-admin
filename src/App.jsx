import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Products from "./pages/products";
import Dashboard from "./pages/dashboard";
import Sales from "./pages/sales";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/login";
import Home from "./pages/home";
import Playstation from "./pages/playstation";
import Pesanan from "./pages/pesanan";
import Invoice from "./pages/invoice";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="w-full relative">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/playstation" element={<Playstation />} />
            <Route path="/pesanan" element={<Pesanan />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/admin" element={<Layout />}>
              <Route path="" element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="sales" element={<Sales />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
