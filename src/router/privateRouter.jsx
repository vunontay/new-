import { Navigate } from "react-router-dom";
import { APP_ROUTER } from "../utils/contanst";

function PrivateRouter() {
  return <Navigate to={APP_ROUTER.BLOG}/>;
}

export default PrivateRouter;
