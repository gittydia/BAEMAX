import { useContext } from "react"
import { UserContext } from "@/contexts/UserContext"
import { Navigate, Outlet } from "react-router-dom";

function GuestRoutes() {
  const {user} = useContext(UserContext);

  return user === null ? <Outlet/> : <Navigate to="/dashboard"/>
}

export default GuestRoutes;
