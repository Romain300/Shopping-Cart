import App from "../App";

const routes = [
    {
        path: "/",
        element: <App />,
    },

    {
        path:"/:websitePart",
        element: <App />,
    }
]

export default routes;
