import { useState, useEffect } from "react";
import { ErrorOutlineRounded as Error } from "@mui/icons-material";
import Button from "../Button";
import { useDeleteGroup } from "../../features/permissions/useDeleteGroup";

function DeleteUserConfirm({ onCloseModal, groupData }) {
  const [deleteLock, setDeleteLock] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(3);
  const { deleteGroup, pendingDeleteGroup } = useDeleteGroup();

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setDeleteLock(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleDelete = () => {
    deleteGroup(groupData._id);
    onCloseModal();
  };

  return (
    <div className="flex flex-col px-4">
      <div className="flex flex-col items-center rounded-lg bg-dark-lighterbg px-12 pb-8 pt-6">
        <div className="mb-6 text-red-700">
          <Error sx={{ fontSize: "14rem" }} />
        </div>
        <h2 className="mb-2 text-2xl font-bold">Jesteś pewien?</h2>
        <p className="font-light">
          Jesteś pewien że chcesz usunąć grupę {groupData.visibleName}?
        </p>
        <p>
          Usunięcie może być <span className="font-bold">nieodwracalne</span>.
        </p>
      </div>
      <div className="mt-6 flex justify-center gap-2">
        <Button type="button" buttonStyle="border-light" onClick={onCloseModal}>
          Anuluj operację
        </Button>
        <Button
          disabled={pendingDeleteGroup}
          onClick={handleDelete}
          btnCounter={secondsLeft}
          type="button"
          buttonStyle={deleteLock ? "locked" : "warning"}
        >
          Usuń grupę
        </Button>
      </div>
    </div>
  );
}

export default DeleteUserConfirm;
