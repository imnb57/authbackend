import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/Home";
import Register from "./pages/Registration";
import ProtectedRoute from "./components/ui/protectedroute";
import 'quill/dist/quill.snow.css';  // For the Snow theme
import 'quill/dist/quill.bubble.css'; // For the Bubble theme (optional)


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path ='/register' element={<Register />} />
        <Route
          path="/home"
          element={<ProtectedRoute><HomePage/></ProtectedRoute>}
        />
      </Routes>
    </Router>
  );
}
