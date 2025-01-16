import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/Home";
import Register from "./pages/Registration";
import ProtectedRoute from "./components/ui/protectedroute";

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
