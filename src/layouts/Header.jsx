import { Link } from "react-router-dom";
import vtaraLogo from "../images/Vtara-36-logo.png";
import Dropdown from "./Dropdown";
import Menu from "./Menu";

function Header() {
  return (
    <>
      <div className="text-center top-0 w-full bg-primary text-white flex justify-between items-center pt-3 pb-3 pl-3 pr-10">
        <div>
          <Link to="/login">
            <img src={vtaraLogo} alt="Vtara-36-logo" className="w-20 h-20" />
          </Link>
        </div>
        <div className="flex justify-between items-center gap-14">
          <Menu />
          <Dropdown />
        </div>
      </div>
    </>
  );
}

export default Header;
