import { useContext } from "react"
import { UserContext } from "../../UserContext"
import { Link, Route, Routes } from "react-router-dom";
import { Post } from "./Post";

export const AccountUser = () => {
  const { logoutUser } = useContext(UserContext);
  return (
    <div className="container">
      <Routes>
        <Route path="send-post" element={ <Post /> } />
      </Routes>

      <Link to="/" onClick={logoutUser}>Sair</Link>
    </div>
  )
}