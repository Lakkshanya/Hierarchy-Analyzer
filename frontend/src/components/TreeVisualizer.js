import React from 'react';

const TreeNode = ({ label, children }) => {
  const childEntries = Object.entries(children);
  
  return (
    <div className="v-tree-node">
      <div className="node-circle">{label}</div>
      {childEntries.length > 0 && (
        <div className="node-children">
          {childEntries.map(([childLabel, grandChildren]) => (
            <TreeNode key={childLabel} label={childLabel} children={grandChildren} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function TreeVisualizer({ tree, root }) {
  return (
    <div className="v-tree-container">
      <TreeNode label={root} children={tree} />
    </div>
  );
}
