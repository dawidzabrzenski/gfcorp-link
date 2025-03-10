import Modal from "../Modal/Modal";
import DeleteUserConfirm from "./DeleteUserConfirm";
import { DeleteRounded as TrashBin } from "@mui/icons-material";

function DeleteUserTrigger({ data }) {
  return (
    <Modal>
      <Modal.Open opens="deleteUserConfirm">
        <button className="rounded bg-dark-lighterbg px-2 py-1 text-white transition-all">
          <TrashBin fontSize="very-small" />
        </button>
      </Modal.Open>

      <Modal.Window name="deleteUserConfirm">
        <DeleteUserConfirm userData={data} />
      </Modal.Window>
    </Modal>
  );
}

export default DeleteUserTrigger;
