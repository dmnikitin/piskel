import React from 'react';

import './tools-box.scss';

function ToolsBox({ setActiveTool }): React.ReactElement {
  return (
    <div className="tools-box">
      <button data-button={0}> pen </button>
      <button data-button={1}> stroke </button>
    </div>
  );
}

export default ToolsBox;
