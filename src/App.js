import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Splash from './splash';
import NewSpaceCwForm from './components/NewSpaceCwForm';
import DeleteSpaceCwForm from './components/DeleteSpaceCwForm';

function App() {
  return (
    <Router>
      <div id="main-div">
        <Splash />
        <Routes>
          <Route exact path="/newSpaceCw" element={<NewSpaceCwForm />} />
          <Route exact path="/deleteSpaceCw" element={<DeleteSpaceCwForm />} />
          {/* More routes here if needed */}
          <Route component={() => <div>404 Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
