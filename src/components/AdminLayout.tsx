import { useContext, useEffect, useState } from "react"
import { UserRole } from "./RoleContext"
import { useNavigate, Outlet, Link } from "react-router-dom"
import toast from "react-hot-toast"

const link = [
  {
    name: "View Table",
    path: "/",
  },
  {
    name: "View Order",
    path: "/view-order",
  },
  {
    name: "Manage Stock",
    path: "/manage-stock"
  },
  {
    name: "Manage Employee",
    path: "/manage-employee"
  }
]

const AdminLayout = () => {
  const [selected, setSelected] = useState<string>("View Table")
  const { role } = useContext(UserRole)!
  const navigate = useNavigate()

  useEffect(() => {
      if (role === "") {
          navigate("/login")
      }
  }, [])

  const onClickLink = (name:string) => {
    if (name === "Manage Employee" && role === "employee") {
      toast.error("คุณไม่สามารถเข้าถึงหน้านี้ได้")
      return
    }
    setSelected(name)
  }
  return (
    <div className="min-h-screen">
      <div className="w-full bg-primary py-3 px-5 flex justify-between fixed top-0 z-50">
        <h1 className="text-3xl font-semibold text-secoundary">{selected}</h1>
        <div className="flex gap-x-5 text-secoundary items-center">
          {
            link.map((item, index) => {
              if (item.name !== selected) {
                return (
                  <Link to={item.path} key={index} onClick={() => onClickLink(item.name)}>{item.name}</Link>
                )
              }
            })
          }
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default AdminLayout
