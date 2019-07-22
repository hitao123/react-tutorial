import React from 'react';
import VideoCompo from './component/videoComo';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>直播</h1>
        {/* localhost 记得改成 本机 ip */}
        <VideoCompo url="http://localhost:7002/live/test.m3u8" />
      </header>
    </div>
  );
}

export default App;
