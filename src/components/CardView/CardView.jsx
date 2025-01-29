// React
import { useContext } from "react";
import { useState } from "react";

// Components: Project
import Container from "react-bootstrap/Container";

// Components: Local
import CardDetail from "../../components/CardDetail/CardDetail";
import CardComposer from "../../components/CardComposer/CardComposer";

// Styling: Local
import "./CardView.css";

import { useGetCard } from "../../rqhooks/useGetCard";
import { UserContext } from "../../storage/context/UserContext";

export default function CardView({cardId}) {
  const { user } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);

  let card = {};
  let editable = false;

  // ReactQuery
  const { data, isSuccess } = useGetCard(cardId);
  if (isSuccess) {
    card = data?.data?.card;

    // Check if the board is private and the current user is its owner.
    // If not, throw access denied

    // Only editable if the owner of the card is the signed in user.
    if (data?.data?.board.owner_id == user.userId) {
      editable = true;
    }
  }

  return (
    <Container fluid className="recommend-page-container">
      <div
        className={editMode ? "card-view-hide-component" : "card-view-div"}
      >
        <CardDetail {...card} editable={editable} onEdit={() => setEditMode(true)} />
      </div>

      {Object.keys(card).length && editable ? (
        <div
          className={editMode ? "card-view-div" : "card-view-hide-component"}
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
  );
}
