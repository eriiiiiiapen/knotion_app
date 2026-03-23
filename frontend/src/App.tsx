import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import KnowledgeCreate from "./pages/KnowledgeCreate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/knowledge/new" element={<KnowledgeCreate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;