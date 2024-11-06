import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ModifyLaboratory } from "./Laboratory/modify-laboratory/CreateLaboratory";
import LaboratoryTable from "./Laboratory/laboratoryTable";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LaboratoryTable />} />
        <Route path="/create" element={<ModifyLaboratory />} />
      </Routes>
    </Router>
  );
}

export default App;
