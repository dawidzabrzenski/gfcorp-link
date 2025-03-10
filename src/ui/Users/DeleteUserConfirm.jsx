import { useState, useEffect } from "react";
import { ErrorOutlineRounded as Error } from "@mui/icons-material";
import Button from "../Button";

function DeleteUserConfirm({ onCloseModal, userData }) {
  const [deleteLock, setDeleteLock] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(3);

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
        <p>Usunięcie może być nieodwracalne.</p>
      </div>
      <div className="mt-6 flex justify-center gap-2">
        <Button type="button" buttonStyle="border-light" onClick={onCloseModal}>
          Anuluj operację
        </Button>
        <Button
          btnCounter={secondsLeft}
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
