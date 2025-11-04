import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
      <ToastContainer position="bottom-center" autoClose={2000} />
    </BrowserRouter>
  );
}

export default App;
