import { Suspense } from "react";
import AuthContextProvider from "./contexts/AuthContext";
import Router from "./routes";
import { Slide, ToastContainer } from "react-toastify";
import ForumContextProvider from "./contexts/ForumContext";
import ThreadContextProvider from "./contexts/ThreadContext";

function App() {
  return (
    <>
      <Suspense fallback={<h1>Loading...</h1>}>
        <AuthContextProvider>
          <ForumContextProvider>
            <ThreadContextProvider>
              <Router />
              <ToastContainer
                position="bottom-right"
                autoclose={3000}
                transition={Slide}
              />
            </ThreadContextProvider>
          </ForumContextProvider>
        </AuthContextProvider>
      </Suspense>
    </>
  );
}

export default App;
