import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import NotificationList from './components/notifications/notificationList'
import AppContext, { initialContext } from './core/context/appContext'
import NotificationContext from './core/context/notificationContext'
import './normalize.css'
import './index.css'
import { BaseNotification } from './components/notifications/useNotificationList'

function Root() {
  const notificationState = useState<BaseNotification[]>([])
  const appContextState = useState<AppContext>(initialContext)

  return (
    <AppContext.Provider value={appContextState}>
      <NotificationContext.Provider value={notificationState}>
        <App />
        <NotificationList />
      </NotificationContext.Provider>
    </AppContext.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
