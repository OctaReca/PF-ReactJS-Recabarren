import React, { useContext, useEffect, useState } from "react";
// sidebar context
import { SidebarContext } from "../contexts/SidebarContext";
// cart context
import { CartContext } from "../contexts/CartContext";
// Product context
import { ProductContext } from "../contexts/ProductContext";
// import icons
import { BsBag } from "react-icons/bs";
// import link
import { Link } from "react-router-dom";
// import logo
import Logo from "../img/logo.svg";

const Header = () => {
  // header state
  const [isActive, SetIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);
  const { categories } = useContext(ProductContext);
  // event listener
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? SetIsActive(true) : SetIsActive(false);
    });
  });
  return (
    <header
      className={`${
        isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
      } fixed w-full z-10 transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        {/* Logo */}
        <Link to={"/"}>
          <div>
            <img className="w-[40px]" src={Logo} alt="" />
          </div>
        </Link>
        <nav className="flex items-center">
          <ul className="flex justify-end space-x-6 font-semibold text-lg">
            {categories.map((category) => (
              <li key={category}>
                <Link to={`/category/${category}`}>{category}</Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* cart  */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer flex relative"
        >
          <BsBag className="text-2xl" />
          <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
            {itemAmount}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
