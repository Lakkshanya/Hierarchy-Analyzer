import React from 'react';

export default function CycleVisualizer({ nodes, root }) {
  // Simple circular visualization using SVG or just CSS rotated elements
  // We'll use CSS positioning for simplicity and "uniqueness"
  const total = nodes.length;
  const radius = 60; // radius in px

  return (
    <div className="v-cycle-container" style={{ height: '200px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg className="cycle-svg" width="160" height="160" style={{ position: 'absolute' }}>
        <circle cx="80" cy="80" r={radius} stroke="rgba(239, 68, 68, 0.3)" strokeWidth="2" fill="none" strokeDasharray="5,5" />
      </svg>
      {nodes.map((node, i) => {
        const angle = (i / total) * 360 * (Math.PI / 180);
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        
        return (
          <div 
            key={node} 
            className={`node-circle ${node === root ? 'root-cycle' : ''}`}
            style={{ 
              position: 'absolute', 
              transform: `translate(${x}px, ${y}px)`,
              borderColor: 'var(--accent-red)'
            }}
          >
            {node}
          </div>
        );
      })}
      
      {/* Arrows indicating cycle */}
      <svg width="200" height="200" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="var(--accent-red)" />
          </marker>
        </defs>
        {nodes.map((_, i) => {
           const nextIdx = (i + 1) % total;
           const startAngle = (i / total) * 360 * (Math.PI / 180);
           const endAngle = (nextIdx / total) * 360 * (Math.PI / 180);
           
           // Slightly offset to avoid overlapping nodes
           const r = radius;
           const x1 = 100 + r * Math.cos(startAngle + 0.2);
           const y1 = 100 + r * Math.sin(startAngle + 0.2);
           const x2 = 100 + r * Math.cos(endAngle - 0.2);
           const y2 = 100 + r * Math.sin(endAngle - 0.2);

           return (
             <path 
               key={i} 
               d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`} 
               stroke="rgba(239, 68, 68, 0.5)" 
               strokeWidth="1.5" 
               fill="none" 
               markerEnd="url(#arrowhead)" 
             />
           );
        })}
      </svg>
    </div>
  );
}
