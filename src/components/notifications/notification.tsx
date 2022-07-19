import React from 'react'

interface BaseNotificationProps {
    id: string
    children: JSX.Element
}

function BaseNotification({children, id}: BaseNotificationProps) {

    return (
        <div id={id} className="notification-message">
            {children}
        </div>
    )
}

export default BaseNotification