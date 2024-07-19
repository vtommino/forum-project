import { useParams } from "react-router-dom";
import useForum from "../hooks/useForum";
import useThread from "../hooks/useThread";

import SelectInput from "./SelectInput";
import ThreadPostList from "./ThreadPostList";

const searchGroupType = [
  { title: "Search...", value: "search" },
  { title: "Search forums", value: "forums" },
  { title: "Search threads", value: "threads" },
  { title: "Search posts", value: "posts" },
  { title: "Search users", value: "users" },
  { title: "Search all", value: "all" },
];

function ThreadPostBox({ threadId }) {
  const { thread, forumName } = useThread();
  // const { forum } = useForum();
  // const forumDetail = forum.find(
  //   (item) => item.thread[0].id === thread[0].threadId
  // );
  // // const { } = useParams()
  // const threadDetail = forumDetail.thread.find(
  //   (item)
  // )
  // console.log(forumDetail);
  // console.log(forum);
  // console.log(thread);

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
          <div className="text-black hover:text-secondary">Log out</div>
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

      <div className="bg-green-900 w-full rounded-lg pl-3 pr-3 pt-1 pb-3 text-white my-3">
        <div className="flex gap-2 pt-2 pl-2 font-semibold ">
          <div>Forum Type : </div> <div> {forumName} </div>
        </div>
        <div className="flex text-sm gap-2 pl-2 pb-1 ">
          <div>Room: </div> <div>{}</div>
        </div>
        {thread.length > 0 &&
          thread.map((item) => <ThreadPostList key={item.id} data={item} />)}
      </div>
    </>
  );
}

export default ThreadPostBox;
