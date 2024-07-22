import { useParams } from "react-router-dom";
import useForum from "../hooks/useForum";
import useThread from "../hooks/useThread";

import SelectInput from "./SelectInput";
import ThreadPostList from "./ThreadPostList";
import useAuth from "../hooks/useAuth";
import Spinner from "./Spinner";

const searchGroupType = [
  { title: "Search...", value: "search" },
  { title: "Search forums", value: "forums" },
  { title: "Search threads", value: "threads" },
  { title: "Search posts", value: "posts" },
  { title: "Search users", value: "users" },
  { title: "Search all", value: "all" },
];

function ThreadPostBox() {
  const { thread, forumName } = useThread();

  const { forum } = useForum();

  const { authUser } = useAuth();

  if (!thread) {
    return <Spinner />;
  }
  console.log(forum);
  console.log(thread.post);
  return (
    <>
      <div className=" flex pt-3 items-center text-black pl-5 pr-5 pb-2 justify-between ">
        <div>
          <SelectInput
            input={searchGroupType}
            className="w-full px-2 py-1.5 "
          />
        </div>

        <div className="flex justify-center items-center ">
          <div className="h-12 bg-yellow-100 text-black text-xs pl-3 pr-5 rounded-full font-semibold flex justify-between items-center">
            <img
              src={authUser?.coverImage}
              alt="user-avatar1"
              className="w-12 h-12  p-2 rounded-full"
            />
            Hi, {authUser?.userName}!
          </div>
        </div>
      </div>
      <div className="text-tertiary text-right pr-6 hover:text-secondary cursor-pointer text-xs underline">
        Log out
      </div>

      <div className="bg-green-900 w-full rounded-lg pl-3 pr-3 p-1 pb-3 text-white my-2">
        <div className="flex items-center p-2 gap-2">
          <div>
            <img
              src={thread.threadIcon}
              alt={thread.threadTitle}
              className="w-[51px] h-[51px] bg-yellow-100 p-2 rounded-lg"
            />
          </div>
          <div className="flex flex-col pt-2 pl-2 justify-center ">
            <div>Forum Type : {thread.forum.name} </div>
            <div>Room: {thread.threadTitle} </div>
          </div>
        </div>
        {thread.post.length > 0 &&
          thread.post.map((item) => {
            return <ThreadPostList key={item.id} data={item} />;
          })}
      </div>
    </>
  );
}

export default ThreadPostBox;
