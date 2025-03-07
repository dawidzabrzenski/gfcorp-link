import Spinner from "../ui/Loaders/Spinner";
import UsersComponent from "../ui/UsersComponent";

import { useUsers } from "../features/authentication/useUsers";

function Users() {
  const { isPendingUsers } = useUsers();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold">Użytkownicy</h2>
      {isPendingUsers ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <UsersComponent />
      )}
    </div>
  );
}

export default Users;
