import { useState } from "react";
import Input from "../components/Input";
import LocationIcon from "../icons/LocationIcon";
import AddImageIcon from "../icons/AddImageIcon";
import PlayVideoIcon from "../icons/PlayVideoIcon";
import Button from "../components/Button";

export default function PostPage() {
  const initialInput = {
    userId: "",
    threadId: "",
    postTitle: "",
    postDescription: "",
    postVideoLink: "",
    postMapLink: "",
  };
  const [input, setInput] = useState(initialInput);

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-green-200 p-8 rounded-lg">
      <div className="flex justify-end pr-3 items-center">
        <div>Hi Supachai!</div>
        <div>
          <img
            src="/src/images/user-avatar1.png"
            alt="info-icon-location"
            className="w-12 h-12 p-2 rounded-lg"
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
      <div className="flex bg-[#5A4D0C] rounded-t-lg p-3 gap-10">
        <div className="flex flex-col gap-3 text-white pl-2">
          <div>Forum Type</div>
          <div>Topic Name</div>
        </div>
        <div>
          <div className="flex flex-col gap-2">
            <div className="text-white pl-2">Resident Forum</div>
            <div>
              <Input
                type
                name="postTitle"
                placeholder="Put your topic here"
                onChange={handleChangeInput}
              ></Input>
            </div>
          </div>
        </div>
      </div>
      {/* Post comment box below */}
      <div className="flex flex-between p-3 bg-yellow-100 text-black rounded-md">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="pl-1 w-32">Username123 </div>
            <img
              src="/src/images/user-avatar1.png"
              alt="info-icon-location"
              className="w-20 h-20 p-2 rounded-lg"
            />
          </div>
        </div>

        <div className="w-full pr-4">
          <div className="flex justify-end ">
            <div className=" flex items-center pb-2 gap-1 ">
              <LocationIcon />
              <PlayVideoIcon />
              <AddImageIcon />
            </div>
          </div>
          <div className="w-full">
            <textarea
              className="w-full h-[200px] border p-3 border-secondary rounded-lg"
              name="postDescription"
              onChange={handleChangeInput}
            ></textarea>
            <div className="flex justify-end pb-3 pt-2">
              <Button bg="yellow">Post</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
