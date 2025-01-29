// React
import { useParams } from "react-router-dom";

import ProtectedPage from "../ProtectedPage/ProtectedPage";
import CardView from "../../components/CardView/CardView";

export default function CardPage() {
  const params = useParams();

  return (
    <ProtectedPage redirectUponError={ false }>
      <CardView cardId={params.cardId} />
    </ProtectedPage>
  );
}
