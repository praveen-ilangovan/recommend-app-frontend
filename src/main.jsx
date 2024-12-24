import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Import bootstrap stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';

// Fonts
import './fonts/magenta-rose/MagentaRose.ttf';
import './fonts/macondo-swash-caps/MacondoSwashCaps-Regular.ttf';

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
