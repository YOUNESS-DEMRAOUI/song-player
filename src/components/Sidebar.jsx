import { links } from "../assets/constants";
import { RiCloseLine } from "react-icons/ri";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";

const NavLinks = ({ handleClick }) => (
  <div>
    {links.map((link) => (
      <NavLink
        key={link.name}
        to={link.to}
        className="flex flex-row justify-start items-center py-5 text-sm font-medium text-gray-400 hover:text-cyan-400"
        onClick={() => handleClick && handleClick()}
      >
        <link.icon className="w-6 h-6 mr-2" />
        {link.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] px-4 bg-black ">
        <div className="relative -top-7">
          <img src={"/src/assets/logo.png"} alt="logo" className="absolute" />
        </div>
        <div className="mt-32 z-0">
          <NavLinks />
        </div>
      </div>
      <div className="absolute md:hidden block top-6 right-3">
        {mobileMenuOpen ? (
          <RiCloseLine
            className="w-6 h-6 text-white mr-2"
            onClick={() => setMobileMenuOpen(false)}
          />
        ) : (
          <HiOutlineMenu
            className="w-6 h-6 text-white mr-2"
            onClick={() => setMobileMenuOpen(true)}
          />
        )}
      </div>
      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-black to-[#111111] backdrop-blur-lg z-10 px-6 md:hidden smooth-transition ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <div className="">
          <img src={"/src/assets/logo.png"} alt="logo" className="w-44 h-auto" />
        </div>
        <div className="-mt-7">
          <NavLinks handleClick={() => setMobileMenuOpen(false)} />
        </div>
      </div>
    </>
  );
};
export default Sidebar;
