import { useContext } from "react";
import { ForumContext } from "../contexts/ForumContext";

export default function useForum() {
  return useContext(ForumContext);
}
