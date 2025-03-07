import Modal from "../Modal/Modal";
import AddUserForm from "./AddUserForm";

function AddUserTrigger() {
  return (
    <Modal>
      <Modal.Open opens="addUserForm">
        <button className="outline-blue border-rounded cursor-pointer px-4 py-2 hover:border-dark-mainborderhover">
          Dodaj nowego użytkownika
        </button>
      </Modal.Open>

      <Modal.Window name="addUserForm">
        <AddUserForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddUserTrigger;
