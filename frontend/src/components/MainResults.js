import React from 'react';
import TreeVisualizer from './TreeVisualizer';
import CycleVisualizer from './CycleVisualizer';

export default function MainResults({ data, error, loading }) {
  if (loading) return <div className="loader">Analyzing hierarchies...</div>;
  if (!data && !error) return (
    <div className="empty-state">
      <div className="empty-icon">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3 }}>
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      </div>
      <h2>Ready for Analysis</h2>
      <p>Enter your node relationships in the sidebar to visualize the hierarchy.</p>
    </div>
  );

  return (
    <div className="results-wrapper">
      <section className="hierarchy-section">
        <h2 className="section-title">Hierarchy Results</h2>
        <div className="hierarchy-grid">
          {data?.hierarchies.map((item, i) => (
            <div key={i} className="glass-card result-card">
              <div className="res-header">
                <div className="res-meta">
                  <span className="icon">
                    {item.has_cycle ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="m13 10 6-1 1 6-1 1-6-1-1-6Z" /><path d="M10 14h.01" /><path d="m5 16 1-1" /><path d="m16 4 1 1" /><path d="m19 10 1-1" /></svg>
                    )}
                  </span>
                  <span className="res-label">{item.has_cycle ? "Cycle Detected" : `Tree ${i + 1}`}</span>
                </div>
              </div>

              <div className="res-info">
                <span className="info-item">Root: <strong>{item.root}</strong></span>
                {!item.has_cycle && <span className="depth-badge">Depth: {item.depth}</span>}
                {item.has_cycle && <span className="cycle-badge">Has Cycle</span>}
              </div>

              <div className="visualization-area">
                {item.has_cycle ? (
                  <CycleVisualizer nodes={item.nodes} root={item.root} />
                ) : (
                  <TreeVisualizer tree={item.tree[item.root]} root={item.root} />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="bottom-grid">
        <section className="glass-card error-panel">
          <div className="panel-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
            <h3 className="sub-title">Invalid Entries</h3>
          </div>
          <ul className="entry-list">
            {data?.invalid_entries.map((e, i) => <li key={i} className="error-item">{e}</li>)}
            {data?.invalid_entries.length === 0 && <li className="dim">None detected</li>}
          </ul>
        </section>

        <section className="glass-card error-panel">
          <div className="panel-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z" /><path d="M12 11h.01" /><path d="M12 16h.01" /><path d="M8 11h.01" /><path d="M8 16h.01" /><path d="M16 11h.01" /><path d="M16 16h.01" /></svg>
            <h3 className="sub-title">Duplicate Edges</h3>
          </div>
          <ul className="entry-list">
            {data?.duplicate_edges.map((e, i) => <li key={i} className="warn-item">{e}</li>)}
            {data?.duplicate_edges.length === 0 && <li className="dim">None detected</li>}
          </ul>
        </section>
      </div>

      <section className="summary-section">
        <div className="panel-header" style={{ marginBottom: '15px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2"><path d="M3 3h18v18H3z" /><path d="M3 9h18" /><path d="M3 15h18" /><path d="M9 3v18" /><path d="M15 3v18" /></svg>
          <h3 className="sub-title">Summary</h3>
        </div>
        <div className="summary-grid">
          <div className="glass-card summary-box">
            <span className="lbl">Total Trees</span>
            <span className="val blue">{data?.summary.total_trees}</span>
          </div>
          <div className="glass-card summary-box">
            <span className="lbl">Total Cycles</span>
            <span className="val red">{data?.summary.total_cycles}</span>
          </div>
          <div className="glass-card summary-box">
            <span className="lbl">Largest Tree Root</span>
            <span className="val green">{data?.summary.largest_tree_root || 'N/A'}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
