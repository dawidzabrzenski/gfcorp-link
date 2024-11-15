function FormInput({ type, id, placeholder }) {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className="w-3/4 rounded-md border px-2 py-3"
    ></input>
  );
}

export default FormInput;
