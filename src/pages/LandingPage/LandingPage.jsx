
// Components: Local
import ProtectedPage from "../ProtectedPage/ProtectedPage";
import HomePage from "../HomePage/HomePage";

export default function LandingPage() {
  return (
    <ProtectedPage redirectUponError={true}>
      <HomePage />
    </ProtectedPage>
  );
}
