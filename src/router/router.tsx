import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main";
import History from "../pages/History";

const router = createBrowserRouter([
    {
        path:"/",
        element:<Main />
    },
    {
        path:"/history",
        element:<History />
    }
])

export default router