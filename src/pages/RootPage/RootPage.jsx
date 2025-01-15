// React
import { Outlet } from "react-router-dom";

// Components: Project
import Container from "react-bootstrap/Container";

// Components: Local
import RecommendNavBar from "../../components/RecommendNavBar/RecommendNavBar";

export default function RootPage() {
  return (
    <Container fluid className="recommend-root-container">
      <RecommendNavBar isLoggedIn={false} />

      <main>
        <Outlet />
      </main>
    </Container>
  );
}
