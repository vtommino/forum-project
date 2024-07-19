import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import useThread from "../../hooks/useThread";
import postApi from "../../api/post";
import { useRef } from "react";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

function CreatePostForm({ onSuccess }) {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); //ShowInClientSite
  const [imageFile, setImageFile] = useState(null); //toBackEnd
  const [isLoading, setIsLoading] = useState(false);

  const { thread, fetchThreadById } = useThread();

  const fileEl = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const formData = new FormData();

      formData.append("threadId", thread[0].threadId);
      formData.append("postTitle", topic);
      formData.append("postDescription", content);
      if (imageFile) {
        formData.append("postImage", imageFile);
      }

      const response = await postApi.createPost(formData);
      await fetchThreadById(thread[0].threadId);

      onSuccess();
      toast.success("Your post has been created.");
      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? <Spinner /> : null}
      <input
        className="hidden"
        type="file"
        ref={fileEl}
        onChange={handleImageChange}
      />
      <form className="flex flex-col gap-4">
        <div className="flex flex-col p-1 gap-2">
          <div className="flex flex-col gap-2 bg-tertiary text-white rounded-xl p-5 ">
            <div className="flex gap-32">
              <div>Forum / Thread</div>

              <div>
                Juristic / &nbsp; Rules & Regulations &nbsp;&#40;Thread
                Name&#41;
              </div>
            </div>
            <div className="flex gap-32 items-center">
              <div>Your post topic</div>
              <div className="text-black">
                <Input
                  placeholder="Write your topic here!"
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center font-semibold">
            <div className="flex items-center gap-2 pl-3 text-lg">
              <img
                src="/src/images/user-avatar1.png"
                alt="user-avatar1"
                className="w-12 h-12 p-2 rounded-lg"
              />
              User1234
            </div>
            <div className="flex">
              <img
                src="/src/images/info-icon-location.png"
                alt="info-icon-location"
                className="w-12 h-12 p-2 rounded-lg"
              />
              <img
                src="/src/images/info-icon-add-video.png"
                alt="info-icon-add-video"
                className="w-12 h-12 p-2 rounded-lg"
              />
              <img
                src="/src/images/info-icon-add-image.png"
                alt="info-icon-add-image"
                className="w-12 h-12 p-2 rounded-lg"
              />
            </div>
          </div>
          <div className="flex flex-col bg-white border border-yellow-500 rounded-xl gap-1 p-8">
            <div className="flex items-center gap-5">
              <div>
                <img
                  src="/src/images/info-icon-image.png"
                  alt="info-icon-image"
                  className="w-20 h-20 p-2 rounded-lg"
                />
              </div>
              <div className="flex flex-col ">
                <div className="font-bold text-2xl">Upload the image</div>
                <div>
                  Image must not exceed 100KB and must be the size of 400 x 400
                  px.
                </div>
              </div>
            </div>
            <div
              onClick={() => fileEl.current.click()}
              className="flex flex-col justify-center items-center p-10 border-2 border-yellow-600 "
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

                  <div className="flex gap-2 text-secondary text-xl">
                    <div>Drop your picture here or</div>
                    <div>click</div>
                    <div>to upload.</div>
                  </div>
                </>
              )}
            </div>
            <div className="pt-1">
              &#42; Image can be uploaded one at a time.
            </div>
            <div className="flex justify-end pt-3 text-xl gap-3">
              <Button bg="yellow">Confirm</Button>
              <Button bg="white" color="drkgreen">
                Cancel
              </Button>
            </div>
          </div>
          <textarea
            className="p-4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="flex justify-end text-xl pt-2">
          <Button onClick={handleSubmit}>Create post</Button>
        </div>
      </form>
    </>
  );
}

export default CreatePostForm;
