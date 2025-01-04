import React, { useState } from 'react';
import { DashBar } from '../components/Sidebar';
import '../css/display.css';
import { SocialList } from '../components/Social/SocialList';
import { NotificationList } from '../components/Social/Notifications';
import { useAuth } from '../context/AuthContext';

export const BaseDashboardPage = ({ content }) => {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [isFriendOpen, setIsFriendOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const { notifications } = useAuth(); // Aquí asumimos que tienes esta función en el contexto

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleSocialList = () => {
    setIsFriendOpen(!isFriendOpen);
  };

  const navState = () => (isNavOpen ? '-staggered' : '');

  return (
    <div className="dashboard">
      <DashBar isOpen={isNavOpen} />
      <SocialList isFriendOpen={isFriendOpen} />
      <NotificationList isNotificationOpen={isNotificationOpen} />

      <div className={`display-container ${isNavOpen ? 'open' : 'closed'}`}>
        <div className="display-header">
          <button onClick={toggleNavbar}>
            <i className={`fa-solid fa-bars${navState()}`}></i>
          </button>
          <div className="display-container-social">
            {/* MESSAGES INBOX */}
            <button
              className={`noti-btn ${isNotificationOpen ? 'open' : ''}`}
              onClick={toggleNotifications}
            >
              <i className="fa-solid fa-inbox"></i>
              {notifications.length > 0 && <span className="noti-badge"></span>}
            </button>

            {/* FRIEND LIST */}
            <button
              className={`friend-btn ${isFriendOpen ? 'open' : ''}`}
              onClick={toggleSocialList}
            >
              <i className="fa-solid fa-user-group"></i>
            </button>
          </div>
        </div>
        <div>{content}</div>
      </div>
    </div>
  );
};
