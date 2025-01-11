import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import UserProvider from './contexts/UserContext.jsx'
import SalaryTaxProvider from './contexts/SalaryTaxContext.jsx'
import './assets/app.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SalaryTaxProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </SalaryTaxProvider>
  </React.StrictMode>
)
