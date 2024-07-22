import { useNavigate } from "react-router-dom";
import useThread from "../hooks/useThread";
import PostIcon from "../icons/PostIcon";
import GroupPeopleIcon from "../icons/GroupPeopleIcon";

function ForumInputThread({ thread, forumName }) {
  const navigate = useNavigate();
  const { fetchThreadById, setForumName, setThreadInfo } = useThread();

  const handleClick = async () => {
    try {
      console.log(thread);
      setThreadInfo(thread);
      setForumName(forumName);
      navigate(`/forum/thread/${thread.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex w-full">
      <div className="bg-green-700 rounded-lg  flex w-full justify-between p-2 gap-3">
        <div className="clickable-div" onClick={handleClick}>
          <img
            src={thread.threadIcon}
            alt={thread.threadTitle}
            className="w-[51px] h-14 bg-yellow-50 p-2 rounded-lg"
          />
        </div>

        <div
          className="clickable-div h-14 hover:bg-yellow-100 bg-yellow-50 grow text-sm p-1 rounded-lg pl-3"
          onClick={handleClick}
        >
          <div className="font-semibold text-green-800 text-large pt-1">
            {thread.threadTitle}
          </div>
          <div className="font-normal textrf-xs text-gray-700 pb-1">
            {thread.threadDescription}{" "}
          </div>
        </div>

        <div className="h-14 bg-yellow-50 gap-2 text-black text-xs pl-3 pr-4 rounded-lg flex justify-between items-center">
          <PostIcon className="w-5 h-5" />
          4
          <GroupPeopleIcon />
          12
        </div>
      </div>
    </div>
  );
}

export default ForumInputThread;
