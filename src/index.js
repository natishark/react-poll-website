import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from "./pages/Home";
import CreatePoll from "./pages/CreatePoll";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:page?" element={<Home />} />
        <Route path="/create" element={<CreatePoll />} />
        {/* // <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

