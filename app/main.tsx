import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './app.css'
import { BrowserRouter } from 'react-router-dom'

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
) 