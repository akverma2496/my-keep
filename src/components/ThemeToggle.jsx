import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/slices/themeSlice";
import { Button } from "react-bootstrap";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  return (
    <Button
      variant={theme === "dark" ? "secondary" : "outline-secondary"}
      size="sm"
      onClick={() => dispatch(toggleTheme())}
    >
      {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </Button>
  );
};

export default ThemeToggle;
