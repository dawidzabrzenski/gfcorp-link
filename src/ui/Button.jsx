function Button({ type = "primary", children }) {
  if (type === "primary")
    return (
      <div>
        <button className="rounded-md bg-maincolor px-6 py-2 text-stone-50">
          {children}
        </button>
      </div>
    );
}

export default Button;
