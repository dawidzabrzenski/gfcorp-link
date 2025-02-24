function Button({ children, type, disabled }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className="outline-blue w-full rounded-lg bg-dark-main px-3 py-3 font-medium text-dark-darkbg transition-all duration-300 hover:bg-dark-mainhover"
    >
      {children}
    </button>
  );
}

export default Button;
