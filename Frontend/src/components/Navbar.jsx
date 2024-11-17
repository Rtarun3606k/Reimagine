import { appleImg, bagImg, searchImg } from "../utils";
import { navLists } from "../constants";
import { NavLink, Link } from "react-router-dom";
import { color } from "three/examples/jsm/nodes/Nodes.js";

const Navbar = () => {
  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
      <nav className="flex w-full screen-max-width z-50">
        <a href="/">
          <img src={appleImg} alt="Apple" width={14} height={18} />
        </a>

        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((nav) => (
            <NavLink
              key={nav}
              className={({ isActive }) =>
                isActive
                  ? "text-white px-5 text-sm cursor-pointer hover:text-gray transition-all z-50"
                  : "px-5 text-sm cursor-pointer text-gray hover:text-white transition-all z-50"
              }
              to={nav.link}
            >
              {nav.name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-7 max-sm:justify-end max-sm:flex-1">
          <Link to="/profile">
            {" "}
            <img
              src="../assets/images/profile.png"
              alt="search"
              width={25}
              height={25}
            />
          </Link>
          <img src={bagImg} alt="bag" width={18} height={18} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
