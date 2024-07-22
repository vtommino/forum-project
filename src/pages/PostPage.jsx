import { useState } from "react";
import LocationIcon from "../icons/LocationIcon";
import AddImageIcon from "../icons/AddImageIcon";
import PlayVideoIcon from "../icons/PlayVideoIcon";
import Button from "../components/Button";
import { useRef } from "react";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import postApi from "../api/post";
import useAuth from "../hooks/useAuth";
import commentApi from "../api/comment";
import { toast } from "react-toastify";
import CommentBox from "../components/CommentBox";

const initialInput = {
  commentMessage: "",
  commentMapLink: "",
  commentVideoLink: "",
};

export default function PostPage() {
  const [openCommentPostBox, setOpenCommentPostBox] = useState(false);
  const [openGoogleMap, setOpenGoogleMap] = useState(false);
  const [openYoutubeInput, setOpenYoutubeInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openImageUpload, setOpenImageUpload] = useState(false);
  const [input, setInput] = useState(initialInput);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [postInfo, setPostInfo] = useState(null);
  const [imageInsert, setImageInsert] = useState(null);
  const { authUser } = useAuth();

  const { postId } = useParams();

  const fileEl = useRef();

  const fetchPostInfo = async () => {
    try {
      const res = await postApi.getPost(postId);
      setPostInfo(res.data);
      console.log(res.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchPostInfo();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);

      reader.readAsDataURL(file);
    }
  };

  const handleImageInsert = () => {
    setImageInsert(imageFile);
    setOpenImageUpload(false);
    setImage(null); // Reset the image state correctly
    setImageFile(null); // Reset the imageFile state correctly
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const formData = new FormData();

      formData.append("postId", postInfo.id);
      formData.append("commentMapLink", input.commentMapLink);
      formData.append("commentMessage", input.commentMessage);
      formData.append("commentVideoLink", input.commentVideoLink);
      if (imageInsert) {
        formData.append("commentImage", imageInsert);
      }

      const response = await commentApi.createComment(formData);

      fetchPostInfo();

      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      toast.success("Your comment has been created.");
      setOpenCommentPostBox(false);
      setImageInsert(null);
      setImageFile(null);
      setInput(initialInput);
      setImage(null);
      setOpenGoogleMap(null);
      setOpenYoutubeInput(null);
      setOpenImageUpload(null);
      setIsLoading(false);
    }
  };

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleCommentPostBox = () => {
    setOpenCommentPostBox(false);
    setImageInsert(null);
    setImageFile(null);
    setImage(null);
    setOpenGoogleMap(null);
    setOpenYoutubeInput(null);
    setOpenImageUpload(null);
  };

  const handleImageUploadBox = () => {
    setOpenImageUpload(false);
    setImageFile(null);
    setImage(null);

    onSuccess();
    toast.success("Your comment is successfully created.");
    console.log(response);
  };
  if (!postInfo || !authUser) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {isLoading ? <Spinner /> : null}
      <div>
        {/* Main Post Page */}
        <div>
          <div className=" text-sm flex justify-end pr-3 items-center text-tertiary">
            <div className="flex items-center font-semibold bg-yellow-100  pl-6 pr-3  rounded-full">
              <div className="flex">Hi, {authUser.userName}!</div>
              <div>
                <img
                  src={authUser.coverImage}
                  alt="coverImage"
                  className="w-12 h-12 p-2 rounded-full"
                />
              </div>
            </div>
          </div>
          {/* Top brown tab */}
          <div className="pt-3 pb-1">
            <div className="flex justify-end font-semibold items-center w-auto h-auto rounded-lg text-white p-3 pl-6 ">
              <Button
                bg="white"
                color="drkgreen"
                onClick={() => setOpenCommentPostBox(true)}
              >
                + Write comment in this post
              </Button>
            </div>
          </div>
          {/* Second Dark Brown Tab  */}
          <div className="flex w-auto justify-around bg-[#5A4D0C] rounded-t-lg p-3 gap-10">
            <div className="flex w-64 flex-col gap-3 justify-center text-white pl-2 font-semibold">
              <div>Forum Type :</div>
              <div>Topic Name :</div>
            </div>

            <div className="w-full flex flex-col items-start gap-2 justify-center">
              <div className="text-white">{postInfo.thread.forum.name}</div>
              <div className="mr-5 text-white">
                {postInfo.thread.threadTitle}
              </div>
            </div>

            <div className="w-full flex flex-col pr-2 items-end gap-2 text-white">
              <div>12 Likes | {postInfo.comment.length} comments</div>
              <div>
                Post created on: {postInfo.postCreatedAt.slice(0, 10)},{" "}
                {postInfo.postCreatedAt.slice(11, 19)}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-between  bg-yellow-100 text-black rounded-b-lg">
          <div className="flex justify-between">
            <div className="flex flex-col items-center pl-1 p-2 py-4 w-[150px] rounded-bl-lg bg-tertiary">
              <div className=" text-white font-semibold">
                {postInfo.user.userName}{" "}
              </div>
              <img
                src={postInfo.user.coverImage}
                alt="info-icon-location"
                className="w-20 h-20 p-2 rounded-full"
              />
            </div>
          </div>
          <div className="w-full pr-4 pl-4">
            <div className="w-full pt-4">
              <div>{postInfo.postDescription}</div>
            </div>
          </div>
        </div>

        {/* First-level Modal - Post Comment */}

        {openCommentPostBox && (
          <div className="fixed inset-0 my-12 mx-14 bg-green-100 border-green-800 border-4 p-6 rounded-lg overflow-auto max-h-[80vh]">
            <div className="flex justify-end">
              <button onClick={handleCommentPostBox}>&#10005;</button>
            </div>
            <div className="flex justify-end pr-3 items-center">
              <div>Hi {authUser.userName}!</div>
              <div>
                <img
                  src={authUser.coverImage}
                  alt="info-icon-location"
                  className="w-12 h-12 p-2 rounded-full"
                />
              </div>
            </div>
            {/* Top brown tab */}
            <div className="pb-5">
              <div className="bg-secondary w-auto h-[40px] rounded-lg text-white p-2 pl-4 ">
                Question Topics from Residents
              </div>
            </div>
            {/* Second Dark Brown Tab  */}
            <div className="flex  bg-[#5A4D0C] rounded-t-lg p-3 gap-10">
              <div className="flex w-36 flex-col gap-3 text-white pl-2">
                <div>Forum Type</div>
                <div>Topic Name</div>
              </div>
              <div className="w-full">
                <div className="flex flex-col w-full gap-2">
                  <div className="text-white ">
                    {postInfo.thread.forum.name}
                  </div>
                  <div className="mr-5 text-white">
                    {postInfo.thread.threadTitle}
                  </div>
                </div>
              </div>
            </div>
            {/* Post comment box below */}
            <div className="flex flex-between p-3 bg-white text-black rounded-md">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <div className="pl-1 w-36-">{postInfo.user.userName}</div>
                  <img
                    src={postInfo.user.coverImage}
                    alt="info-icon-location"
                    className="w-20 h-20 p-2 rounded-full"
                  />
                </div>
              </div>

              <div className="w-full pr-4 pl-4">
                <div className="flex justify-end ">
                  <div className=" flex items-center pb-2 gap-1 ">
                    <button onClick={() => setOpenGoogleMap(true)}>
                      <LocationIcon />
                    </button>
                    <button onClick={() => setOpenYoutubeInput(true)}>
                      <PlayVideoIcon />
                    </button>
                    <button onClick={() => setOpenImageUpload(true)}>
                      <AddImageIcon />
                    </button>
                  </div>
                </div>
                <div className="w-full">
                  <textarea
                    className="w-full h-[200px] border p-3 border-secondary rounded-lg"
                    name="commentMessage"
                    value={input.commentMessage}
                    onChange={handleChangeInput}
                  ></textarea>
                  {imageInsert && (
                    <small className="text-tertiary flex">
                      Image
                      <div className="text-secondary">
                        &nbsp; &lt;{imageInsert.name}&gt; &nbsp;
                      </div>
                      has been inserted in this post!
                    </small>
                  )}
                  <div className="flex justify-end pt-5 pb-3">
                    <Button bg="yellow" onClick={handleSubmit}>
                      Confirm
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Modal for Google Map URL Input */}
      {openGoogleMap && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-40 z-30 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 z-40 max-w-lg w-full">
            <div className="flex justify-between items-start ">
              <div className="flex">
                <div className="flex mt-0 justify-center">
                  <LocationIcon />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-tertiary  font-semibold text-lg ml-1">
                    Indicate the location by using Google Maps
                  </h2>
                  <p className="text-sm text-gray-600 mb-6 ml-1">
                    You must use URL generated from Google Maps only
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpenGoogleMap(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &#10005;
              </button>
            </div>
            <div className="mb-1">
              <label
                htmlFor="googleMapUrl"
                className="block ml-2 text-base font-medium text-gray-700"
              >
                Google Map URL
              </label>
              <input
                id="googleMapUrl"
                name="commentMapLink"
                type="text"
                value={input.commentMapLink}
                onChange={handleChangeInput}
                className="mt-1 block w-full px-3 py-2 border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-base"
                placeholder="Put your Google Map URL here"
              />
            </div>
            <p className="text-sm text-gray-500 mb-6 ml-2">
              Location can be uploaded one at a time.
            </p>
            <div className="flex justify-end space-x-3">
              <Button
                onClick={() => setOpenGoogleMap(false)}
                bg="green"
                color="white"
              >
                Cancel
              </Button>
              <Button bg="yellow" color="white">
                Insert
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Modal for Youtube URL Input */}
      {openYoutubeInput && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-40 z-30 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 z-40 max-w-lg w-full">
            <div className="flex justify-between items-start ">
              <div className="flex">
                <div className="flex mt-0 justify-center">
                  <PlayVideoIcon />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-tertiary  font-semibold text-lg ml-1">
                    Upload the YouTube video
                  </h2>
                  <p className="text-sm text-gray-600 mb-6 ml-1">
                    You must use URL generated from Google Maps only
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpenYoutubeInput(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &#10005;
              </button>
            </div>
            <div className="mb-1">
              <label
                htmlFor="googleMapUrl"
                className="block ml-2 text-base font-medium text-gray-700"
              >
                YouTube Video URL
              </label>
              <input
                id="googleMapUrl"
                type="text"
                name="commentVideoLink"
                value={input.commentVideoLink}
                onChange={handleChangeInput}
                className="mt-1 block w-full px-3 py-2 border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-base"
                placeholder="Put your Google Map URL here"
              />
            </div>
            <p className="text-sm text-gray-500 mb-6 ml-2">
              Youtube video URL can be uploaded one at a time.
            </p>
            <div className="flex justify-end space-x-3">
              <Button
                onClick={() => setOpenYoutubeInput(false)}
                bg="green"
                color="white"
              >
                Cancel
              </Button>
              <Button bg="yellow" color="white">
                Insert
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Image Upload*/}
      <input
        className="hidden"
        type="file"
        ref={fileEl}
        onChange={handleImageChange}
      />
      {openImageUpload && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-40 z-30 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 z-40 max-w-lg w-full">
            <div className="flex justify-between items-start ">
              <div className="flex">
                <div className="flex mt-0 justify-center">
                  <AddImageIcon />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-tertiary  font-semibold text-lg ml-1">
                    Upload the image
                  </h2>
                  <p className="text-sm text-gray-600 mb-6 ml-1">
                    The image must be jpg or png format only.
                  </p>
                </div>
              </div>
              <button
                onClick={handleImageUploadBox}
                className="text-gray-500 hover:text-gray-700"
              >
                &#10005;
              </button>
            </div>
            <div
              className="border-secondary p-6 border-dashed border flex flex-col items-center justify-center"
              onClick={() => fileEl.current.click()}
            >
              {image && (
                <div
                  className="flex flex-col justify-center items-center"
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "140px",
                    height: "140px",
                  }}
                ></div>
              )}

              {!image && (
                <>
                  <div>
                    <img
                      src="/src/images/info-icon-drag-drop.png"
                      alt="info-icon-drag-drop"
                      className="w-28 h-28 p-2 rounded-lg"
                    />
                  </div>

                  <div className="flex gap-2 text-secondary text-base">
                    <div>Drop your picture here or</div>
                    <div>click</div>
                    <div>to upload.</div>
                  </div>
                </>
              )}
            </div>

            <p className="pt-2 text-sm text-gray-500 mb-6 ml-2">
              *Image can be uploaded one at a time.
            </p>
            <div className="flex justify-end space-x-3">
              <Button onClick={handleImageUploadBox} bg="green" color="white">
                Cancel
              </Button>
              <Button onClick={handleImageInsert} bg="yellow" color="white">
                Insert
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4 pt-4">
        {postInfo.comment.map((comment) => (
          <CommentBox key={comment.id} comment={comment} />
        ))}
      </div>
    </>
  );
}
