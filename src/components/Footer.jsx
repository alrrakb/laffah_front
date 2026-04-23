import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import logo from "../../public/logo_removeBac.png";
function Footer() {
  return (
    <div className="container flex justify-between items-center p-2 mt-10">
      {/* <div className="socials flex gap-3 mx-3">
        <Link to="">
          <FontAwesomeIcon icon="fa-brands fa-facebook" />
        </Link>
        <Link to="">
          <FontAwesomeIcon icon="fa-brands fa-x-twitter" />
        </Link>
        <Link to="">
          <FontAwesomeIcon icon="fa-brands fa-snapchat" />
        </Link>
        <Link to="">
          <FontAwesomeIcon icon="fa-brands fa-instagram" />
        </Link>
      </div> */}
      <div className=" flex items-center gap-0.5 mx-3">
        <FontAwesomeIcon icon="fa-regular fa-copyright" />
        <div>جميع الحقوق محفوظة ل سر اللفة | {new Date().getFullYear()} </div>
      </div>
      <img className="w-[30px] h-[40px]" src={logo} alt="" />
    </div>
  );
}

export default Footer;
