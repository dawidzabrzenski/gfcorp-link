import { useState, useEffect } from "react";
import { ErrorOutlineRounded as Error } from "@mui/icons-material";
import Button from "../Button";
import { useDeleteUser } from "../../features/users/useDeleteUser";

function DeleteUserConfirm({ onCloseModal, userData }) {
  const [deleteLock, setDeleteLock] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(3);
  const {
    deleteUser,
    errorDeletingUser,
    pendingDeleteUser,
    isSuccessDeletingUser,
  } = useDeleteUser();

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
    deleteUser(userData.id);
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
          Jesteś pewien że chcesz usunąć użytkownika{" "}
          {userData.firstName + " " + userData.lastName}?
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
          btnCounter={secondsLeft}
          disabled={pendingDeleteUser}
          onClick={handleDelete}
          type="button"
          buttonStyle={deleteLock ? "locked" : "warning"}
        >
          Usuń użytkownika
        </Button>
      </div>
    </div>
  );
}

export default DeleteUserConfirm;
