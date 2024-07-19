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
  const handleLogout = () => {
    console.log("logout");
    logout();
    navigate("/login");
  };
  const { forum } = useForum();
  console.log(authUser);
  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className=" flex pt-3 items-center text-black pl-5 pr-5 pb-3 justify-between ">
        <div>
          <SelectInput
            input={searchGroupType}
            className="w-full px-2 py-1.5 "
          />
        </div>

        <div className="flex justify-center items-center gap-8">
          <div
            className="text-white hover:text-secondary"
            onClick={handleLogout}
          >
            Log out
          </div>
          <div className="h-12 bg-white text-black text-xs pl-3 pr-5 rounded-lg flex justify-between items-center">
            <img
              src="/src/images/user-avatar1.png"
              alt="user-avatar1"
              className="w-12 h-12 bg-white p-2 rounded-lg"
            />
            Hi, user2323
          </div>
        </div>
      </div>
      <div className="bg-green-200 rounded-xl px-5 py-3">
        {forum.map((item, index) => (
          <div>
            <ForumInputBox forumInput={item} key={index} />
          </div>
        ))}
      </div>
    </>
  );
}
