import React, { useState } from 'react';

export default function Sidebar({ onAnalyze, loading, stats }) {
  const [input, setInput] = useState("");

  return (
    <aside className="sidebar">
      <div className="glass-card panel">
        <h2 className="panel-title">1. Enter Relationships</h2>
        <p className="panel-hint">Enter relationships in the format 'A-&gt;B' separated by comas</p>

        <textarea
          className="input-field"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="A->B, A->C, B->D..."
        />

        <button
          className="analyze-btn"
          onClick={() => onAnalyze(input)}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Hierarchy"}
        </button>

        <div className="example-text">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '5px' }}>
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
          Example: A-&gt;B, B-&gt;C, A-&gt;D
        </div>
      </div>

      <div className="glass-card panel stats-panel">
        <div className="panel-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
          </svg>
          <h2 className="panel-title">Input Statistics</h2>
        </div>

        <div className="stat-row">
          <span>Total Entries</span>
          <span className="badge blue">{stats?.total_entries || 0}</span>
        </div>
        <div className="stat-row">
          <span>Valid Format</span>
          <span className="badge green">{stats?.valid_format || 0}</span>
        </div>
        <div className="stat-row">
          <span>Invalid Format</span>
          <span className="badge red">{stats?.invalid_format || 0}</span>
        </div>
        <div className="stat-row">
          <span>Duplicates</span>
          <span className="badge orange">{stats?.duplicates || 0}</span>
        </div>
      </div>
    </aside>
  );
}
