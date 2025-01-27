
// Components: Local
import BoardPreview from "../../components/BoardPreview/BoardPreview";

import { useGetLoggedInUserData } from "../../rqhooks/useGetLoggedInUserData";

export default function BoardList() {
  let boards = [];

  const { data: meData, isSuccess } = useGetLoggedInUserData();

  if (isSuccess) {
    if (meData?.boards) {
      for (const board of meData?.boards || {}) {
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
    <div>
      {boards}
    </div>
  );
}
