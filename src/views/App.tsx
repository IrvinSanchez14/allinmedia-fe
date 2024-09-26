import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListTask from './ListTask/ListTask';
import CreateTask from './CreateTask/CreateTask';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={ListTask} />
        <Route path="/create-task" Component={CreateTask} />
        <Route path="/update-task/:id" Component={CreateTask} />
      </Routes>
    </Router>
  );
}

export default App;
