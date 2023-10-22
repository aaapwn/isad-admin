import { useNavigate } from "react-router-dom"
import { UserRole } from "./components/RoleContext"
import { useContext, useEffect } from "react"

const ManageEmployee = () => {
  const { role } = useContext(UserRole)!
  const navigate = useNavigate()

    useEffect(() => {
      if (role === "employee") {
          navigate(-1)
      }
    }, [])

  return (
    <div>ManageEmployee</div>
  )
}

export default ManageEmployee
