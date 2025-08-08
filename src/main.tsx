import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.scss';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


// 48:30 setted up grids styling for the page