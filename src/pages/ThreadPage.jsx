import { useParams } from "react-router-dom";
import ThreadPostBox from "../components/ThreadPostBox";
import CreatePostContainer from "../features/createPost/CreatePostContainer";
import useThread from "../hooks/useThread";
import { useEffect } from "react";

export default function ThreadPage() {
  const { threadId } = useParams();
  const { fetchThreadById } = useThread();

  useEffect(() => {
    fetchThreadById(threadId);
  }, []);

  return (
    <div className="bg-green-200 rounded-xl px-5 p-3">
      <div>
        <ThreadPostBox threadId={threadId} />

        <CreatePostContainer />
      </div>
    </div>
  );
}
