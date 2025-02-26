import { useState } from "react";

import Table from "../ui/Table";

import { useUsers } from "../features/authentication/useUsers";
import Spinner from "../ui/Loaders/Spinner";
import Modal from "../ui/Modal";

function Users() {
  const { usersData, isPendingUsers } = useUsers();

  return (
    <div className="flex flex-col gap-4">
      {/* <Modal /> */}
      <h2 className="text-3xl font-bold">Użytkownicy</h2>
      {isPendingUsers ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <Table usersData={usersData} />
      )}
    </div>
  );
}

export default Users;
