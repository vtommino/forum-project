import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import bgImage from "../images/forum-bg.png";

export default function MainContainer() {
  return (
    <>
      <Header />
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="bg-cover px-10 py-5 min-h-lvh"
      >
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
