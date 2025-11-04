import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Categories from "../pages/Categories";
import Notes from "../pages/Notes";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/ProtectedRoute";
import { Navigate } from "react-router-dom";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Layout />}>

      {/* Default redirect */}
      <Route index element={<Navigate to="/categories" replace />} />

      {/* Public routes */}
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="categories" element={<Categories />} />
        <Route path="categories/:id" element={<Notes />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default AppRouter;
