import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import DynamicPage from "./pages/DynamicPage";

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/*" element={<DynamicPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
