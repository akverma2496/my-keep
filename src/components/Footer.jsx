import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const Footer = () => {
  const theme = useSelector((state) => state.theme.theme);

  return (
  
  <footer className={`bg-${theme} text-center py-3 mt-auto border-top`}>
    <Container>
      <small className="text-muted">
        © {new Date().getFullYear()} My Keep — Built with ❤️ using React
      </small>
    </Container>
  </footer>
)};

export default Footer;
