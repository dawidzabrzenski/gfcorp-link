import Table from "../ui/Table";

import { getUsers } from "../services/apiUser";
import { useUsers } from "../features/authentication/useUsers";

function Users() {
  const { usersData, isPendingUsers } = useUsers();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold">Użytkownicy</h2>
      {isPendingUsers ? <p>Loading</p> : <Table usersData={usersData} />}
    </div>
  );
}

export default Users;
