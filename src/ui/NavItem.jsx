import { NavLink } from "react-router-dom";

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className="hover:bg-maincolor [&.active]:bg-maincolor flex items-center gap-4 rounded-lg py-4 pl-8 text-sm font-medium text-stone-800 transition-all duration-200 hover:text-white [&.active]:font-bold [&.active]:text-stone-50"
    >
      {children}
    </NavLink>
  );
}

export default NavItem;
