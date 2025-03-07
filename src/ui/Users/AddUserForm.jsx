import FormRow from "../FormRow";

function AddUserForm({ onCloseModal }) {
  return (
    <div className="flex w-[55vw] flex-col gap-4">
      <h2 className="text-xl font-bold">Dodaj nowego użytkownika</h2>

      <form className="flex flex-col gap-4">
        <div className="flex w-full gap-12">
          <div className="w-1/2 space-y-2">
            <label className="text-dark-sec">Email</label>
            <input
              type="email"
              id="email"
              placeholder="twójmail@gfcorp.pl"
              className={`outline-blue border-rounded w-full bg-dark-darkbg px-3 py-2 placeholder:text-dark-placeholder hover:border-dark-mainborderhover`}
            />
          </div>
          <div className="w-1/2 space-y-2">
            <label className="text-dark-sec">Hasło</label>
            <input
              type="password"
              id="password"
              autoComplete="new-password"
              placeholder="••••••"
              className={`outline-blue border-rounded w-full bg-dark-darkbg px-3 py-2 placeholder:text-dark-placeholder hover:border-dark-mainborderhover`}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-dark-sec">Rola</label>
          <select className="border-rounded w-1/3 bg-dark-darkbg px-3 py-3">
            <option value="admin">Admin</option>
            <option value="user">Użytkownik</option>
          </select>
        </div>
      </form>

      <div className="flex gap-2">
        <button className="outline-red border-rounded w-fit px-4 py-2 text-white hover:border-dark-mainborderhover">
          Dodaj użytkownika
        </button>
        <button
          onClick={onCloseModal}
          className="outline-red border-rounded w-fit bg-red-600 px-4 py-2 text-white hover:border-red-900 hover:bg-red-500"
        >
          Zamknij
        </button>
      </div>
    </div>
  );
}

export default AddUserForm;
