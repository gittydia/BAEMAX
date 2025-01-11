import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/guests/Login"
import Register from "./pages/guests/Register"
import Dashboard from "./pages/user/Dashboard"
import Income from "./pages/user/Income"
import Expense from "./pages/user/Expense"
import EmergencyFund from "./pages/user/EmergencyFund"
import TaxCalculator from "./pages/user/TaxCalculator"
import Settings from "./pages/user/Settings"
import Layout from "./pages/Layout"
import Wallet from "./pages/user/Wallet"
import GuestRoutes from "./routes/GuestRoutes"
import AuthRoutes from "./routes/AuthRoutes"
import Home from "./pages/guests/Home"

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>

          <Route element={<AuthRoutes/>}>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/income" element={<Income/>}/>
            <Route path="/expense" element={<Expense/>}/>
            <Route path="/wallet" element={<Wallet/>}/>
            <Route path="/emergency-fund" element={<EmergencyFund/>}/>
            <Route path="/tax-calculator" element={<TaxCalculator/>}/>
            <Route path="/settings" element={<Settings/>}/>
          </Route>

          <Route element={<GuestRoutes/>}>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>  
  )
}

export default App
