import { useNavigate } from "react-router-dom";
import useThread from "../hooks/useThread";

function ForumInputThread({ thread, forumName }) {
  const navigate = useNavigate();
  const { fetchThreadById, setForumName } = useThread();

  const handleClick = async () => {
    try {
      console.log(thread);
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
            className="w-[51px] h-[51px] bg-yellow-100 p-2 rounded-lg"
          />
        </div>

        <div
          className="clickable-div bg-yellow-100 grow text-sm p-1 rounded-lg pl-3"
          onClick={handleClick}
        >
          <div className="font-semibold text-green-800 text-large pt-1">
            {thread.threadTitle}
          </div>
          <div className="font-normal text-xs text-gray-700 pb-1">
            {thread.threadDescription}{" "}
          </div>
        </div>

        <div className="h-12 bg-yellow-100  text-black text-xs pl-2 pr-4 rounded-lg flex justify-between items-center">
          <img
            src="/src/images/info-icon-topic.png"
            alt="Vtara-36-logo"
            className="w-8 h-8 bg-white p-2 rounded-lg"
          />
          4
          <img
            src="/src/images/info-icon-user.png"
            alt="Vtara-36-logo"
            className="w-8 h-8 bg-white p-2 rounded-lg"
          />
          12
        </div>
      </div>
    </div>
  );
}

export default ForumInputThread;
