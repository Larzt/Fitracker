import React, { useState } from 'react';
import { DashBar } from '../components/Sidebar';
import '../css/display.css';
import { SocialList } from '../components/Social/SocialList';

export const BaseDashboardPage = ({ content }) => {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [isFriendOpen, setIsFriendOpen] = useState(false);

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

      <div className={`display-container ${isNavOpen ? 'open' : 'closed'}`}>
        <div className="display-header">
          <button onClick={toggleNavbar}>
            <i className={`fa-solid fa-bars${navState()}`}></i>
          </button>
          <button
            className={`friend-btn ${isFriendOpen ? 'open' : ''}`}
            onClick={toggleSocialList}
          >
            <i className="fa-solid fa-user-group"></i>
          </button>
        </div>
        <div>{content}</div>
      </div>
    </div>
  );
};
