import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TranslateProvider } from './context/TranslateContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TranslateProvider>
      <App />
    </TranslateProvider>
  </StrictMode>,
)
