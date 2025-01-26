
import Container from "react-bootstrap/Container";
import ErrorMsg from "../../components/ErrorMsg/ErrorMsg";

export default function ErrorPage() {

  return (
    <Container fluid className="recommend-page-container">
      <div>
        <ErrorMsg />
      </div>
    </Container>
  );
}
