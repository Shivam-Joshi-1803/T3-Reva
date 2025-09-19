import { BrowserRouter, Routes, Route } from "react-router-dom";
import DynamicPage from "./pages/DynamicPage";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<DynamicPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
