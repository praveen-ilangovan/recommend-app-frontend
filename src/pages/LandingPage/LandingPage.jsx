// React
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// Components: Project
import Container from "react-bootstrap/Container";

// Components: Local
import BoardPreview from "../../components/BoardPreview/BoardPreview";
import ProtectedPage from "../ProtectedPage/ProtectedPage";

// Hooks
import { AuthContext } from "../../store/AuthContext";
import { getMe } from "../../api/app";

import { ROUTE } from "../../constants";

export default function LandingPage() {
  const { auth } = useContext(AuthContext);
  const redirect = useNavigate();
  let boards = [];

  const {
    data: meData,
    isSuccess
  } = useQuery({
    queryKey: ["me", auth.userId],
    queryFn: async () => {
      const data = await getMe();
      console.log("Me data :", data);
      return data;
    },
    onError() {
      console.log("re-route")
      redirect(ROUTE.LOGIN);
    },
    retry: 0,
    refetchIntervalInBackground: false,
    // Stop loading and fetching until it is invalidated.
  });

  if (isSuccess) {
    if (meData?.data?.boards) {
      for (const board of meData?.data?.boards || {}) {
        boards.push(
          <BoardPreview
            key={board.id}
            boardId={board.id}
            boardName={board.name}
          />,
        );
      }
    }
  }

  return (
    <ProtectedPage>
      <Container fluid className="recommend-page-container">
        <div>
          {auth.userFirstname ? (
            <h1>Hi, {auth.userFirstname}</h1>
          ) : (
            <h1>Loading..</h1>
          )}
          {boards}
        </div>
      </Container>
    </ProtectedPage>
  );
}
