import { useContext } from "react";
import { ThreadContext } from "../contexts/ThreadContext";

export default function useThread() {
  return useContext(ThreadContext);
}
