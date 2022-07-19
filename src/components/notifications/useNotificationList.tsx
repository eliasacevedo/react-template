import { useContext } from "react"

export interface BaseNotification {
    id: string,
    children: JSX.Element,
    autoclose: boolean
}

const maxNotificationOnScreen = 3
const maxSecondsNotificationOnScreen = 3
let actualIntervalId = 0

function addNotification(setState: React.Dispatch<React.SetStateAction<BaseNotification[]>>) {
    return (notification: BaseNotification) => {
        setState(previousState => {
            const updatedNotifications = [...previousState, notification]
            if (actualIntervalId == 0 && previousState.length > 0 && previousState[0].autoclose) {
                actualIntervalId = setIntervalRemoveTopNotification(setState)
            }
            return updatedNotifications
        })
    }
}

function removeNotification(setState: React.Dispatch<React.SetStateAction<BaseNotification[]>>) {
    return (notificationIndex: number) => {
        setState(pr => {
            const newState = [...pr]
            newState.splice(notificationIndex, 1)

            if (newState.length == 0) {
                clearInterval(actualIntervalId)
                actualIntervalId = 0
            }

            return newState
        })
    }
}

function removeTopNotification(setState: React.Dispatch<React.SetStateAction<BaseNotification[]>>) {
    return () => removeNotification(setState)(0)
}

function getMaxSlice(notifications: BaseNotification[]): number {
    if (notifications.length === 0) {
        return 0
    }

    if (notifications.length > maxNotificationOnScreen) { 
        return maxNotificationOnScreen
    }

    return notifications.length
}

function setIntervalRemoveTopNotification(setState: React.Dispatch<React.SetStateAction<BaseNotification[]>>): number {
    return setInterval(() => {
        removeTopNotification(setState)()
    }, maxSecondsNotificationOnScreen * 1000)
}

function onBlurNotification(notifications: BaseNotification[] = [], setState: React.Dispatch<React.SetStateAction<BaseNotification[]>>) {
    return () => {
        if (notifications[0] && !notifications[0].autoclose) {
            return
        }
        actualIntervalId = setIntervalRemoveTopNotification(setState)
    }
}

function onHoverNotification() {
    clearInterval(actualIntervalId)
}

export default function useNotificationList(context: React.Context<[BaseNotification[], React.Dispatch<React.SetStateAction<BaseNotification[]>>]>) {
    const [notifications, setNotifications] = useContext(context)
    console.log(notifications)
    return {
        notifications: notifications,
        maxNotificationOnScreen: maxNotificationOnScreen,
        maxSlice: getMaxSlice(notifications),
        addNotification: addNotification(setNotifications),
        removeNotification: removeNotification(setNotifications),
        removeTopNotification: removeTopNotification(setNotifications),
        onHoverNotification: onHoverNotification,
        onBlurNotification: onBlurNotification(notifications, setNotifications),
    }
}