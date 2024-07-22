import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useThread from "../hooks/useThread";

function CommentBox({ comment }) {
  console.log(comment);
  return (
    <div className="bg-yellow-100 flex w-full h-96 rounded-lg">
      <div className=" flex flex-col gap-2 bg-green-300 w-[150px] pt-4 items-center rounded-l-lg ">
        <div>{comment.user.userName}</div>
        <div>
          <img
            src={comment.user.profileImage}
            alt="coverImage"
            className="w-16 h-16 rounded-full"
          />
        </div>
      </div>
      <div className="pl-4 pt-4">
        <div>{comment.commentMessage}</div>
        <div>
          {comment?.commentImage && (
            <img
              src={comment.commentImage}
              alt="coverImage"
              className="w-auto h-auto"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentBox;
