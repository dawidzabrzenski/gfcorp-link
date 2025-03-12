import Modal from "../Modal/Modal";
import EditGroupForm from "./EditGroupForm";

import { Edit } from "@mui/icons-material";

function EditGroupTrigger({ data }) {
  return (
    <Modal>
      <Modal.Open opens="editGroupForm">
        <button className="rounded bg-dark-lighterbg px-2 py-1 text-white transition-all">
          <Edit fontSize="very-small" />
        </button>
      </Modal.Open>

      <Modal.Window name="editGroupForm">
        <EditGroupForm groupData={data} />
      </Modal.Window>
    </Modal>
  );
}

export default EditGroupTrigger;
