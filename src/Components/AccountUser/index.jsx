import { useContext } from "react"
import { UserContext } from "../../UserContext"
import { Link } from "react-router-dom";

export const AccountUser = () => {
  const { logoutUser } = useContext(UserContext);
  return (
    <div>
      <h1>Bem vindo de volta!</h1>

      <Link to="/" onClick={logoutUser}>Sair</Link>
    </div>
  )
}