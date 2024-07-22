import useAuth from "../hooks/useAuth";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useState } from "react";
import adminApi from "../api/admin";
import Spinner from "../components/Spinner";
import Button from "../components/Button";
import LoveFaceIcon from "../icons/LoveFaceIcon";
import TalkBubbleIcon from "../icons/TalkBubbleIcon";
import postApi from "../api/post";
import { toast } from "react-toastify";
import DustbinIcon from "../icons/DustbinIcon";

const searchGroupType = [
  { title: "Search...", value: "search" },
  { title: "Search forums", value: "forums" },
  { title: "Search threads", value: "threads" },
  { title: "Search posts", value: "posts" },
  { title: "Search users", value: "users" },
  { title: "Search all", value: "all" },
];

export default function AdminPage() {
  const { authUser, logout } = useAuth();

  const navigate = useNavigate();
  const [adminPageInfo, setAdminPageInfo] = useState(null);
  const [forumThreadPostInfo, setForumThreadPostInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [showThread, setShowThread] = useState(false);

  const [postInfo, setPostInfo] = useState([]);
  const [getForumName, setGetForumName] = useState(null);

  // const handleShowThreadBox = (e)=>
  const fetchAdminPageInfo = async () => {
    try {
      const result = await adminApi.getAllForumPageInfo();
      console.log(result);
      setAdminPageInfo(result.data);
      setForumThreadPostInfo(result.data.forumThreadPostInfo);
      setUserInfo(result.data.userInfo);
    } catch (error) {
      navigate("/");
    }
  };
  useEffect(() => {
    fetchAdminPageInfo();
  }, []);

  const handleLogout = () => {
    console.log("logout");
    logout();
    navigate("/login");
  };

  async function approveStatus(userId) {
    try {
      const updateInfo = { userId, approveStatus: "APPROVED" };
      const res = await adminApi.updateUserStatus(updateInfo);
      const updatedUserInfo = res.data;
      let newUserInfo = [...userInfo];
      newUserInfo = newUserInfo.map((user) => {
        if (user.id == updatedUserInfo.id) return updatedUserInfo;
        return user;
      });
      setUserInfo(newUserInfo);
    } catch (error) {
      console.log(error);
    }
  }

  async function disapproveStatus(userId) {
    try {
      const updateInfo = { userId, approveStatus: "DISAPPROVED" };
      const res = await adminApi.updateUserStatus(updateInfo);
      const updatedUserInfo = res.data;
      let newUserInfo = [...userInfo];

      newUserInfo = newUserInfo.map((user) => {
        if (user.id == updatedUserInfo.id) return updatedUserInfo;
        return user;
      });

      setUserInfo(newUserInfo);
    } catch (error) {
      console.log(error);
    }
  }

  function clickShowThread(post, forumName) {
    setPostInfo(post);
    setGetForumName(forumName);
    setShowThread(true);
  }

  async function deletePostByAdmin(id) {
    try {
      console.log(await postApi.deletePost(id));
      // await fetchThreadById(data.threadId);
      let updatedPostList = [...postInfo];
      updatedPostList = updatedPostList.filter((post) => post.id !== id);
      setPostInfo(updatedPostList);
      fetchAdminPageInfo();
      // console.log(forumThreadPostInfo);
      // let updatedInfoAdminPageAfterDelete = forumThreadPostInfo.map(
      //   (forum) => {
      //     const newForum = forum
      //       newForum.thread = forum.thread?.map((thread) => {
      //       if (!thread?.post) return thread;
      //       return thread?.post.filter((post) => post.id !== id);
      //     }),
      //     return newForum;
      //   }
      // );
      // console.log(updatedInfoAdminPageAfterDelete);
      // setForumThreadPostInfo(updatedInfoAdminPageAfterDelete);

      toast.success("The selected post has been deleted.");
    } catch (err) {
      console.log(err);
    }
  }

  if (!adminPageInfo) {
    return <Spinner />;
  }

  return (
    <>
      <div className="bg-green-100">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center bg-tertiary text-white p-4 rounded">
            <div className="flex items-center">
              <select className="bg-green-600 text-white p-2 rounded mr-4">
                <option>Everything</option>
              </select>
              <input
                type="text"
                placeholder="search..."
                className="p-2 rounded bg-white text-black"
              />
            </div>
            {/* <button className="bg-yellow-500 text-white p-2 rounded">
              Add thread
            </button> */}
            <div className="flex items-center">
              <span>
                Hi, Admin - {authUser.firstName} {authUser.lastName}!
              </span>
              <img
                src={authUser?.profileImage}
                alt="Admin"
                className="rounded-full w-8 h-8 ml-2"
              />
            </div>
          </div>
          {/* Forum Box */}
          {forumThreadPostInfo.map((forum) => (
            <div key={forum.id} className="mt-4 p-4 bg-white rounded shadow">
              <h2 className="text-lg font-semibold mb-2">
                Information from {forum.name}
              </h2>
              {forum.thread.map((thread) => {
                let latestPost = "No post yet";
                if (thread.post[thread.post.length - 1]) {
                  latestPost = `Last post by ${
                    thread.post[thread.post.length - 1].user.userName
                  } on ${
                    thread.post[thread.post.length - 1].postUpdatedAt.split(
                      "T"
                    )[0]
                  }`;
                }
                return (
                  // Thread Box
                  <div
                    key={thread.id}
                    className="border p-2 rounded mb-2 hover:bg-slate-100 cursor-pointer"
                    onClick={() => clickShowThread(thread.post, forum.name)}
                  >
                    <h3 className="font-semibold">{thread.threadTitle}</h3>
                    <p>{thread.threadDescription}</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center">
                        <span className="mr-2">🗨️ {thread.post.length}</span>
                        <span className="mr-2">👍 6</span>
                      </div>
                      <span>{latestPost}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

          <div className="mt-4 p-4 bg-red-200 rounded shadow text-red-700">
            Please be cautious and respectful to one another. If users violate
            any rights of others, our website reserves the rights to take down
            the post and comments.
          </div>

          <div className="mt-4  bg-white rounded shadow">
            <h2 className="text-lg font-semibold mb-2">List of Forum Users</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">No.</th>
                  <th className="py-3 px-6 text-left">First Name</th>
                  <th className="py-3 px-6 text-left">Last Name</th>
                  <th className="py-3 px-6 text-left">Resident Type</th>
                  <th className="py-3 px-6 text-left">Building</th>
                  <th className="py-3 px-6 text-left">Room No.</th>
                  <th className="py-3 px-6 text-left">Mobile</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Gender</th>
                  <th className="py-3 px-6 text-left">Reg Date</th>

                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">CRUD</th>
                </tr>
              </thead>
              {userInfo.map((user) => (
                <tbody
                  key={user.id}
                  className="text-gray-600 text-sm font-light"
                >
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{user.id}</td>
                    <td className="py-3 px-6 text-left">{user.firstName}</td>
                    <td className="py-3 px-6 text-left">{user.lastName}</td>
                    <td className="py-3 px-6 text-left">{user.residentType}</td>
                    <td className="py-3 px-6 text-left">{user.building}</td>
                    <td className="py-3 px-6 text-left">{user.roomNumber}</td>
                    <td className="py-3 px-6 text-left">{user.mobile}</td>
                    <td className="py-3 px-6 text-left">{user.email}</td>
                    <td className="py-3 px-6 text-left">{user.gender}</td>
                    <td className="py-3 px-6 text-left">{user.registerAt}</td>

                    <td className="py-3 px-6 text-left">
                      {user.isApproved ? "APPROVED" : "PENDING"}
                    </td>
                    <td className="py-3 px-6 text-left flex gap-2">
                      <Button onClick={() => approveStatus(user.id)}>Y</Button>
                      <Button
                        onClick={() => disapproveStatus(user.id)}
                        bg="red"
                      >
                        N
                      </Button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>

      {/* Modal to thread page with many posts */}

      {showThread && (
        <div className="flex fixed inset-0 bg-black bg-opacity-50 z-30 justify-center items-start pt-20">
          <div className=" bg-green-100 p-6 w-[80%] rounded-xl z-40 overflow-auto max-h-[90%]">
            <div className="flex justify-between items-center mb-4">
              <select className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded focus:outline-none">
                <option>Search forums</option>
              </select>
              <div className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <img
                    src={authUser.profileImage}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-gray-700">
                    Hi, Admin - {authUser.firstName} {authUser.lastName}
                  </span>
                </div>
                <div>
                  <button
                    onClick={() => setShowThread(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    &#10005;
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-green-300 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-white mb-4">
                Forum Type: {getForumName}
              </h2>
              <div className="space-y-4">
                {postInfo.map((post, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded shadow flex justify-between items-center"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-base text-gray-800">
                        {post.postTitle}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {post.postDescription}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 w-[400px] gap-10 ">
                      <div className="flex gap-2 ">
                        <div className="flex items-center space-x-1 text-green-600">
                          <LoveFaceIcon />
                          <span>4</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-600">
                          <TalkBubbleIcon />
                          <span>12</span>
                        </div>
                      </div>
                      <div className="flex gap-2 text-sm ">
                        <div className="flex items-center space-x-1">
                          <img
                            src={post.user.coverImage}
                            alt="Profile Image"
                            className="w-8 h-8 rounded-full"
                          />
                        </div>
                        <div className="flex flex-col text-sm pr-4">
                          <span className="text-gray-600">
                            by: {post.user.userName}
                          </span>

                          <span className="text-gray-400">
                            on: {post.postCreatedAt.split("T")[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex  space-x-2 bg-yellow-100 hover:bg-yellow-200 rounded-full "></div>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => {
                        deletePostByAdmin(post.id);
                      }}
                    >
                      <DustbinIcon />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
