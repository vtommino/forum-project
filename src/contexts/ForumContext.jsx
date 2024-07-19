import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import forumApi from "../api/forum";
import useAuth from "../hooks/useAuth";

export const ForumContext = createContext();

function ForumContextProvider({ children }) {
  const [forum, setForum] = useState([]);
  const { authUser } = useAuth();

  const fetchAllForum = async () => {
    try {
      const response = await forumApi.getAllForum();
      setForum(response.data.forum);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllForum();
  }, []);

  return (
    <ForumContext.Provider value={{ forum }}>{children}</ForumContext.Provider>
  );
}

export default ForumContextProvider;
