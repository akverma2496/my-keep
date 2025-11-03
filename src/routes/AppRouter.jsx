import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Categories from "../pages/Categories";
import NotFound from "../pages/NotFound";
import Notes from "../pages/Notes";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="categories" element={<Categories />} />
      <Route path="categories/:id" element={<Notes />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default AppRouter;
