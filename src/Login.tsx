import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import { useRef, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UserRole } from "./components/RoleContext"

function Login() {
  const roleRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const { role, setRole } = useContext(UserRole)!

  const onLoginHandler = () => {
    if (roleRef.current?.value === "employee") {
      toast.success("เข้าสู่ระบบสำเร็จ (Employee)")
      setRole("employee")
      navigate("/")
    } else if (roleRef.current?.value === "manager") {
      toast.success("เข้าสู่ระบบสำเร็จ (manager)")
      setRole("manager")
      navigate("/")
    } else {
      toast.error("เข้าสู่ระบบไม่สำเร็จ")
    }
  }

  useEffect(() => {
    if (role !== "") {
      navigate("/")
    }
  })

  return (
    <div>
        <div className="max-w-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-y-3">
            <p className="font-semibold text-lg ">Role :</p>
            <Input type="text" ref={roleRef}/>
            <Button onClick={onLoginHandler}>Login</Button>
        </div>
    </div>
  )
}

export default Login
