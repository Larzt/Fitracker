import React, { useState } from 'react';
import { DashBar } from '../components/Sidebar';
import '../css/display.css';
import { FriendList } from '../components/Social/FriendList';

export const BaseDashboardPage = ({ content }) => {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [isFriendOpen, setIsFriendOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleFriendList = () => {
    setIsFriendOpen(!isFriendOpen);
  };

  const navState = () => (isNavOpen ? '-staggered' : '');

  return (
    <div className="dashboard">
      <DashBar isOpen={isNavOpen} />
      <FriendList isFriendOpen={isFriendOpen} />

      <div className={`display-container ${isNavOpen ? 'open' : 'closed'}`}>
        <div className="display-header">
          <button onClick={toggleNavbar}>
            <i className={`fa-solid fa-bars${navState()}`}></i>
          </button>
          <button
            className={`friend-btn ${isFriendOpen ? 'open' : ''}`}
            onClick={toggleFriendList}
          >
            <i className="fa-solid fa-user-group"></i>
          </button>
        </div>
        <div>{content}</div>
      </div>
    </div>
  );
};
