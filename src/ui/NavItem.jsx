import { NavLink } from "react-router-dom";
import { ArrowDropDownRounded as Arrow } from "@mui/icons-material";
import { useState } from "react";

function NavItem({ to, children, submenu }) {
  const [submenuExpanded, setSubmenuExpanded] = useState(false);

  if (!to && submenu)
    return (
      <div className="flex cursor-pointer flex-col">
        <div className="menu-el" onClick={() => setSubmenuExpanded((r) => !r)}>
          {children}
          <Arrow
            fontSize="medium"
            sx={{
              marginLeft: "auto",
              transform: submenuExpanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease-in-out",
            }}
          />
        </div>

        <div
          className={`bg-dark-lightbg flex flex-col gap-2 overflow-hidden rounded-lg pl-6 transition-all duration-300 ${
            submenuExpanded
              ? "mt-2 max-h-[500px] py-2 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          {submenu.map((el, index) => (
            <NavItem key={index} to={el.link}>
              {el?.icon}
              {el?.name}
            </NavItem>
          ))}
        </div>
      </div>
    );

  return (
    <NavLink
      to={to}
      className="mx-4 flex items-center gap-2 rounded-lg px-4 py-2 transition-all duration-300 hover:bg-dark-menuhover [&.active]:bg-dark-menuactive [&.active]:text-dark-main [&.active]:hover:bg-dark-menuactivehover"
    >
      {children}
    </NavLink>
  );
}

export default NavItem;
