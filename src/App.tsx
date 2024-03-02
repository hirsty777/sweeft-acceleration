import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import ContextProvider from "./context/Context";


function App() {
  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  );
}

export default App;
