import CardEditForm from "../../components/CardEditForm/CardEditForm";
import ProtectedPage from "../ProtectedPage/ProtectedPage";

export default function CardEditPage() {
  return (
    <ProtectedPage>
      <CardEditForm />
    </ProtectedPage>
  );
}
