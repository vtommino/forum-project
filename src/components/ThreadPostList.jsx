import { useNavigate } from "react-router-dom";
import postApi from "../api/post";
import useThread from "../hooks/useThread";
import { toast } from "react-toastify";
import UpdatePostForm from "../features/createPost/UpdatePostForm";
import { useState } from "react";

function ThreadPostList({ data }) {
  const [showEdit, setShowEdit] = useState(false);
  const navigate = useNavigate();
  const { fetchThreadById } = useThread();

  const handleClick = async () => {
    try {
      console.log(data);

      navigate("/forum/thread/post");
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnSuccess = () => {
    setShowEdit(false);
  };

  const handleDeletePost = async () => {
    try {
      console.log(await postApi.deletePost(data.id));
      await fetchThreadById(data.threadId);

      toast.success("The selected post has been deleted.");
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditPost = async () => {
    try {
      setShowEdit(true);
    } catch (err) {}
  };

  return (
    <>
      {showEdit && <UpdatePostForm data={data} onSuccess={handleOnSuccess} />}
      <div className="flex w-full justify-between p-2 gap-3">
        <div>
          <img
            src="https://www.svgrepo.com/show/400583/pages.svg"
            alt="post-discussion"
            className="w-12 h-12 bg-white p-2 rounded-lg"
          />
        </div>
        <div className="bg-white text-black grow text-sm p-1 rounded-lg pl-3">
          <div className="font-semibold">{data.postTitle}</div>
          <div className="text-xs">{data.postDescription}</div>
        </div>
        <div className="h-12 bg-white text-black text-xs pl-2 pr-4 rounded-lg flex justify-between items-center">
          <img
            src="/src/images/info-icon-speech.png"
            alt="info-icon-speech"
            className="w-9 h-9 bg-white p-2 rounded-lg"
          />
          4
          <img
            src="/src/images/info-icon-like.png"
            alt="info-icon-like"
            className="w-8 h-8 bg-white p-2 rounded-lg"
          />
          12
        </div>

        <div className="h-12 bg-white text-black text-xs pl-1 pr-3 rounded-lg flex justify-between items-center">
          <img
            src="/src/images/user-avatar1.png"
            alt="user-avatar1"
            className="w-12 h-12 bg-white p-2 rounded-lg"
          />
          <div>
            <div className="flex">
              <div>Posted by:</div>
              <div>{data.user.userName}</div>
            </div>
            <div className="flex">
              <div>Date:</div>
              <div>{data.postCreatedAt.slice(0, 10)}</div>
            </div>
          </div>
        </div>
        <div onClick={handleDeletePost}>
          <img
            src="/src/images/info-icon-trash.png"
            alt="info-icon-trash"
            className="w-11 h-11 p-2 rounded-lg"
          />
        </div>
        <div onClick={handleEditPost}>
          <img
            src="/src/images/info-icon-edit.png"
            alt="info-icon-edit"
            className="w-11 h-11 p-2 rounded-lg"
          />
        </div>
      </div>
    </>
  );
}

export default ThreadPostList;
