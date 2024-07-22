import { useNavigate } from "react-router-dom";
import postApi from "../api/post";
import useThread from "../hooks/useThread";
import { toast } from "react-toastify";
import UpdatePostForm from "../features/createPost/UpdatePostForm";
import { useState } from "react";
import PostIcon from "../icons/PostIcon";
import LikeIcon from "../icons/LikeIcon";
import useAuth from "../hooks/useAuth";
import Spinner from "./Spinner";

function ThreadPostList({ data }) {
  const [showEdit, setShowEdit] = useState(false);
  const navigate = useNavigate();
  const { fetchThreadById } = useThread();
  console.log(data);
  const { authUser } = useAuth();
  const handleClick = async () => {
    try {
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

  const handleChangeToPostPage = (id) => {
    navigate(`/forum/thread/post/${id}`);
  };

  if (!authUser) {
    return <Spinner />;
  }
  return (
    <>
      {showEdit && <UpdatePostForm data={data} onSuccess={handleOnSuccess} />}
      <div className="flex w-full justify-between p-2 gap-3">
        <div
          className="bg-white flex w-full flex-col text-black  text-sm p-1 rounded-lg pl-3 hover:bg-gray-200 cursor-pointer"
          onClick={() => handleChangeToPostPage(data.id)}
        >
          <div className="font-semibold">{data.postTitle}</div>
          <div className="text-xs">{data.postDescription}</div>
        </div>
        <div className="h-12 w-[160px] gap-3 bg-white text-black text-xs px-4 rounded-lg flex justify-between items-center">
          <div className="flex items-center gap-2">
            <PostIcon /> {data.comment.length}
          </div>
          <div className="flex items-center gap-2">
            <LikeIcon />
            12
          </div>
        </div>

        <div className="h-12 w-[300px] bg-white text-black text-xs pl-1 pr-3 rounded-lg flex items-center">
          <img
            src={data.user.coverImage}
            alt="user-avatar1"
            className="w-12 h-12 bg-white p-2 rounded-full"
          />

          <div className="flex flex-col text-left">
            <div className="flex">
              <div> by &nbsp;</div>
              <div className="font-semibold text-secondary">
                {data.user.userName}
              </div>
            </div>
            <div className="flex">
              <div> on &nbsp;</div>
              <div>{data.postCreatedAt.slice(0, 10)}</div>
            </div>
          </div>
        </div>

        {authUser.id === data.user.id ? (
          <div className="flex items-center" onClick={handleDeletePost}>
            <small className="underline hover:text-secondary cursor-pointer ">
              delete
            </small>
          </div>
        ) : (
          <div className="flex items-center disabled">
            <small className=" text-tertiary invisible ">delete</small>
          </div>
        )}
        {/* <div onClick={handleEditPost}>
          <img
            src="/src/images/info-icon-edit.png"
            alt="info-icon-edit"
            className="w-11 h-11 p-2 rounded-lg"
          />
        </div> */}
      </div>
    </>
  );
}

export default ThreadPostList;
