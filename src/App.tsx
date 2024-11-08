import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ModifyLaboratory } from "./Laboratory/modify-laboratory/modify-laboratory";
import LaboratoryTable from "./Laboratory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LaboratoryTable />} />
        <Route path="/create" element={<ModifyLaboratory />} />
        <Route path="/edit/:id" element={<ModifyLaboratory />} />
      </Routes>
    </Router>
  );
}

export default App;
