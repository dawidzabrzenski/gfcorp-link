import { useState, useEffect } from "react";
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
    <div className="flex w-[65vw] flex-col">
      <h2 className="text-2xl font-bold">
        Jesteś pewien, że chcesz usunąć użytkownika{" "}
        {userData.firstName + " " + userData.lastName}?
      </h2>
      <p className="font-light">Usunięcie może być nieodwracalne</p>
      <div className="mt-4 flex justify-center gap-2">
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
