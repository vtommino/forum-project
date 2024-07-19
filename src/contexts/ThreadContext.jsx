import { createContext } from "react";
import { useState } from "react";

import threadApi from "../api/thread";

export const ThreadContext = createContext();

function ThreadContextProvider({ children }) {
  const [thread, setThread] = useState([]);
  const [forumName, setForumName] = useState("");

  const fetchThreadById = async (id) => {
    try {
      const response = await threadApi.getThreadById(id);
      console.log(response);
      setThread(response.data.thread);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ThreadContext.Provider
      value={{ thread, fetchThreadById, forumName, setForumName }}
    >
      {children}
    </ThreadContext.Provider>
  );
}

export default ThreadContextProvider;
