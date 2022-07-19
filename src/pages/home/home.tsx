import React, { useContext } from "react"
import useNotificationList, { BaseNotification } from "../../components/notifications/useNotificationList"
import NotificationContext from "../../core/context/notificationContext"
let num = 0
function addNotificationTest(addFunction: (notification: BaseNotification) => void) {
    const n: BaseNotification = {
        autoclose: true,
        children: <div key={++num}>Test notification {num}</div>,
        id: `${num}`
    }
    addFunction(n)
}

function HomePage() {
    const {addNotification} = useNotificationList(NotificationContext)
    
    return (
        <>
            <div>Home</div>
            <button className="btn" onClick={
                ()=> addNotificationTest(addNotification)
            }>Notification</button>
        </>
    )
}

export default HomePage