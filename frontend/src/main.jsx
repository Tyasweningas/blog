import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './root.jsx'
import './styles/index.css'
import { AuthProvider } from './context/auth-context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Root />
    </AuthProvider>
  </React.StrictMode>,
)
