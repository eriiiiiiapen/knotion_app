import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import KnowledgeCreate from "./pages/KnowledgeCreate";
import KnowledgeList from "./pages/KnowledgeList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/knowledge" element={<KnowledgeList />} />
        <Route path="/knowledge/new" element={<KnowledgeCreate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;