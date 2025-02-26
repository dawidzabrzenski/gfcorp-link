import Spinner from "../ui/Loaders/Spinner";
import UserTable from "../ui/Tables/UserTable";

import Modal from "../ui/Modal";

import { useUsers } from "../features/authentication/useUsers";

function Users() {
  const { isPendingUsers } = useUsers();

  return (
    <div className="flex flex-col gap-4">
      {/* <Modal>
        <Modal.Open opens="delete">
          <button>Test</button>
        </Modal.Open>

        <Modal.Window name="delete">
          <div>Texxxst</div>
        </Modal.Window>
      </Modal> */}
      <h2 className="text-3xl font-bold">Użytkownicy</h2>
      {isPendingUsers ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <UserTable />
      )}
    </div>
  );
}

export default Users;
