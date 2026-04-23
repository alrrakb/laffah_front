import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import logo from "../../public/logo_removeBac.png";
function Header() {
  return (
    <div className="container flex justify-between items-center p-2 mb-5">
      <Link className="flex items-center gap-1" to="/">
        <img src={logo} className="w-[30px] h-[40px]" alt="this logo" />
        <span className="">سر اللفة</span>
      </Link>
      <div className="font-bold flex gap-4 items-center">
        <Link to="/Products" className="block">
          جميع الاطباق
        </Link>
        <Link to="/offers" className="block font-bold text-2xl">
          الخصومات
        </Link>
        <Link to="/About">من نحن</Link>
      </div>
      <Link to="/cart">
        <FontAwesomeIcon icon="fa-solid fa-cart-shopping" className="" />
      </Link>
    </div>
  );
}

export default Header;
