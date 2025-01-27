import { useParams } from "react-router-dom";

import Container from "react-bootstrap/Container";
import ErrorMsg from "../../components/ErrorMsg/ErrorMsg";

// Styling: Local
import "./ErrorPage.css";

export default function ErrorPage() {
  const params = useParams();

  return (
    <Container fluid className="recommend-page-container">
      <div className="error-page-div">
        <ErrorMsg code={params.errorCode} />
      </div>
    </Container>
  );
}
