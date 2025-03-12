import Modal from "../Modal/Modal";
import DeleteGroupConfirm from "./DeleteGroupConfirm";

import { DeleteRounded as TrashBin } from "@mui/icons-material";

function DeleteGroupTrigger({ data }) {
  return (
    <Modal>
      <Modal.Open opens="editGroupForm">
        <button className="rounded bg-dark-lighterbg px-2 py-1 text-white transition-all">
          <TrashBin fontSize="very-small" />
        </button>
      </Modal.Open>

      <Modal.Window name="editGroupForm">
        <DeleteGroupConfirm groupData={data} />
      </Modal.Window>
    </Modal>
  );
}

export default DeleteGroupTrigger;
