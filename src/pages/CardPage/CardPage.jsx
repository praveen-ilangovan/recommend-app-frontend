// React
import { useContext } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

// Components: Project
import Container from "react-bootstrap/Container";

// Components: Local
import CardDetail from "../../components/CardDetail/CardDetail";
import CardComposer from "../../components/CardComposer/CardComposer";

// Styling: Local
import "./CardPage.css";

import ProtectedPage from "../ProtectedPage/ProtectedPage";
import { useGetCard } from "../../rqhooks/useGetCard";
import { UserContext } from "../../storage/context/UserContext";

export default function CardPage() {
  const { user } = useContext(UserContext);
  const params = useParams();
  const [editMode, setEditMode] = useState(false);

  let card = {};
  let editable = false;

  // ReactQuery
  const { data, isSuccess } = useGetCard(params.cardId);

  if (isSuccess) {
    card = data?.data?.card;

    // Only editable if the owner of the card is the signed in user.
    if (data?.data?.board.owner_id == user.userId) {
      editable = true;
    }
  }

  return (
    <ProtectedPage redirectUponError={ false }>
      <Container fluid className="recommend-page-container">
        <div
          className={editMode ? "card-page-hide-component" : "card-page-div"}
        >
          <CardDetail {...card} editable={editable} onEdit={() => setEditMode(true)} />
        </div>

        {Object.keys(card).length && editable ? (
          <div
            className={editMode ? "card-page-div" : "card-page-hide-component"}
          >
            <CardComposer
              card={card}
              onSave={() => setEditMode(false)}
              onCancel={() => setEditMode(false)}
              mode="edit"
            />
          </div>
        ) : (
          <></>
        )}
      </Container>
    </ProtectedPage>
  );
}
