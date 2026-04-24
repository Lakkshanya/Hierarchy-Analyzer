import React from 'react';

export default function DashboardHeader() {
  return (
    <header className="top-nav">
      <div className="logo-area">
        <div className="icon-box">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3h18v18H3zM9 3v18M15 3v18M3 9h18M3 15h18" />
            <circle cx="12" cy="12" r="3" fill="#6366f1" />
          </svg>
        </div>
        <div>
          <h1>Hierarchy Analyzer</h1>
          <p>Analyze relationships and build hierarchical structures</p>
        </div>
      </div>
    </header>
  );
}
