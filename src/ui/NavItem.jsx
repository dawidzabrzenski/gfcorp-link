import { NavLink } from "react-router-dom";

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className="[&.active]:text-dark-main [&.active]:bg-dark-menuactive [&.active]:hover:bg-dark-menuactivehover hover:bg-dark-menuhover mx-4 flex items-center gap-2 rounded-lg px-4 py-2 transition-all duration-300"
    >
      {children}
    </NavLink>
  );
}

export default NavItem;
