import { Link } from "react-router-dom";

function Button({ type = "primary", children }) {
  if (type === "primary")
    return (
      <Link to="add">
        <button className="rounded-md bg-maincolor px-6 py-2 text-stone-50">
          {children}
        </button>
      </Link>
    );
}

export default Button;
