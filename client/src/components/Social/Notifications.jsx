import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { markNotificationsRequest } from '../../api/auth';

export const NotificationList = ({ isNotificationOpen: isNotiOpen }) => {
  const { notifications, updateNotificationStatus } = useAuth();
  const notificationList = Array.isArray(notifications)
    ? notifications
    : [notifications];

  const handleMarkAsRead = async (index) => {
    try {
      await markNotificationsRequest(index);
      updateNotificationStatus(index);
    } catch (error) {
      console.error('Error al marcar la notificación como leída:', error);
    }
  };

  return (
    <div className={`noti-list ${isNotiOpen ? 'open' : 'closed'}`}>
      {notificationList.length > 0 ? (
        <ul className="noti-msg">
          {notificationList.map((noti, index) => {
            // const pathFile = `/public/uploads/${noti}.png`;
            // console.log(pathFile);

            return (
              <li key={index}>
                {/* <img src={pathFile} alt={`Notification ${index}`} /> */}
                <p>{noti.message}</p>
                <button
                  onClick={() => handleMarkAsRead(index)}
                  disabled={noti.isRead} // Deshabilitar botón si ya está leído
                >
                  Mark as Read
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No notifications</p>
      )}
    </div>
  );
};
