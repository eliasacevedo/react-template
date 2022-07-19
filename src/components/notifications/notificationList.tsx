import React from 'react'
import useNotificationList from "./useNotificationList"
import './styles.scss'
import NotificationContext from '../../core/context/notificationContext'
function NotificationList() {
    const { 
        notifications, 
        maxSlice, 
        onHoverNotification, 
        onBlurNotification,
        removeNotification 
    } = useNotificationList(NotificationContext)
    return (
        <div 
            className="notification-list" 
            onMouseEnter={onHoverNotification} 
            onMouseLeave={onBlurNotification}>
        {
            notifications.slice(0, maxSlice).map(
                (e, i) => <div key={e.id} onClick={() => removeNotification(i)}>{e.children}</div>
            )
        }
        </div>
    )
}

export default NotificationList