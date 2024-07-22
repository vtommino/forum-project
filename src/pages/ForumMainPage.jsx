import ForumInputBox from "../components/ForumInputBox";
import SelectInput from "../components/SelectInput";
import useForum from "../hooks/useForum";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const searchGroupType = [
  { title: "Search...", value: "search" },
  { title: "Search forums", value: "forums" },
  { title: "Search threads", value: "threads" },
  { title: "Search posts", value: "posts" },
  { title: "Search users", value: "users" },
  { title: "Search all", value: "all" },
];

export default function ForumMainPage() {
  const { authUser, logout } = useAuth();
  const navigate = useNavigate();

  const { forum } = useForum();

  const handleLogout = () => {
    console.log("logout");
    logout();
    navigate("/login");
  };

  // useEffect(() => {
  //   if (!authUser) {
  //     navigate("/login");
  //   }
  // }, []);

  return (
    <>
      <div className=" flex pt-3 items-center text-black pl-5 pr-5 pb-2 justify-between ">
        <div>
          <SelectInput
            input={searchGroupType}
            className="w-full px-2 py-1.5 "
          />
        </div>

        <div className="flex justify-center items-center gap-8">
          <div className="text-white hover:text-secondary"></div>
          <div className="h-12 bg-yellow-100 text-black text-xs pl-3 pr-5 rounded-full font-semibold flex justify-between items-center">
            <img
              src={authUser?.coverImage}
              alt="user-image"
              className="w-12 h-12 p-2 rounded-full"
            />
            Hi, {authUser?.userName}!
          </div>
        </div>
      </div>
      <div className="flex gap-3 justify-end text-right text-xs pr-6 pb-2 text-gray-300">
        {authUser?.isAdmin === true ? (
          <div className="flex">
            <button
              className="bg-secondary hover:bg-yellow-600 p-2 rounded-lg text-white hover:text-tertiary"
              onClick={() => navigate("/admin")}
            >
              Admin page
            </button>
          </div>
        ) : null}
        <button
          className="cursor-pointer underline hover:text-secondary"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
      <div className="bg-green-200 rounded-xl px-5 py-3">
        {forum.map((item) => (
          <div key={item.id}>
            <ForumInputBox forumInput={item} />
          </div>
        ))}
      </div>
    </>
  );
}
