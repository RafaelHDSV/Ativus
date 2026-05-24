import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { VieiraAnalytics } from '@vieira/analytics/react'
import App from './App.tsx'
import './global.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <VieiraAnalytics projectKey="ativus" />
  </StrictMode>
)
