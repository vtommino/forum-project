import { createContext } from "react";
import { useState } from "react";

import threadApi from "../api/thread";

export const ThreadContext = createContext();

function ThreadContextProvider({ children }) {
  const [thread, setThread] = useState(null);
  const [forumName, setForumName] = useState("");
  const [threadInfo, setThreadInfo] = useState({});

  const fetchThreadById = async (id) => {
    try {
      const response = await threadApi.getThreadById(id);
      console.log(response.data);
      setThread(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ThreadContext.Provider
      value={{
        threadInfo,
        setThreadInfo,
        thread,
        fetchThreadById,
        forumName,
        setForumName,
      }}
    >
      {children}
    </ThreadContext.Provider>
  );
}

export default ThreadContextProvider;
