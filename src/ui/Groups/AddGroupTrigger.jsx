import Modal from "../Modal/Modal";
import AddGroupForm from "./AddGroupForm";

function AddGroupTrigger() {
  return (
    <Modal>
      <Modal.Open opens="addGroupForm">
        <button className="outline-blue border-rounded cursor-pointer px-4 py-2 hover:border-dark-mainborderhover">
          Dodaj nową grupę
        </button>
      </Modal.Open>

      <Modal.Window name="addGroupForm">
        <AddGroupForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddGroupTrigger;
