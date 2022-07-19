/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import { BaseNotification } from "../../components/notifications/useNotificationList";
const NotificationContext = React.createContext<[
    BaseNotification[], 
    React.Dispatch<React.SetStateAction<BaseNotification[]>>
]>([[], () => {}]);

export default NotificationContext