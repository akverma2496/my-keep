import { Container } from "react-bootstrap";

const Footer = () => (
  <footer className="bg-light text-center py-3 mt-auto border-top">
    <Container>
      <small className="text-muted">
        © {new Date().getFullYear()} My Keep — Built with ❤️ using React
      </small>
    </Container>
  </footer>
);

export default Footer;
