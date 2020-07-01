import React from 'react';
import Canvas from './components/canvas/canvas';
import ToolsBox from './components/toolsbox/tools-box';
import './App.scss';

function App(): React.ReactElement {
  return (
    <div className="App">
      <Canvas />
      <ToolsBox />
    </div>
  );
}

export default App;
