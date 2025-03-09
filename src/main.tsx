// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './css/index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <BrowserRouter basename="/react-movie-tutorial/">
    <App />
  </BrowserRouter>
  // </StrictMode>,
)
