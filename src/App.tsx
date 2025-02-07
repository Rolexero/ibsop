import { Suspense } from "react";
import "./App.css";
import { ThemeProvider } from "./providers/Themeprovider";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Suspense
          fallback={
            <div className="m-auto flex h-[600px] items-center justify-center">
              <p>Please wait</p>
            </div>
          }
        >
          <RouterProvider router={router} />
        </Suspense>
        <ToastContainer />
      </ThemeProvider>
    </>
  );
}

export default App;
