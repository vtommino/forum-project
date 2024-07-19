import { Link } from "react-router-dom";

export default function MenuItem() {
  return (
    <>
      <div className="flex justify-end gap-7 px-12 py-2 text-white">
        <div className=""> About us </div>
        <div className=""> Vendors </div>
        <Link to="/forum">
          <div className=" hover:text-secondary"> Forum </div>
        </Link>
        <div className=""> Contact us </div>
      </div>
    </>
  );
}
