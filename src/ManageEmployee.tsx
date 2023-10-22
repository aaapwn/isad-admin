import { useNavigate, Link } from "react-router-dom"
import { UserRole } from "./components/RoleContext"
import { useContext, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Employee {
  id: number;
  firstname: string;
  lastname: string;
  age: number;
  tel: string;
}

const employees: Employee[] = [
  {
    id: 1,
    firstname: "Siwakorn",
    lastname: "Somjit",
    age: 20,
    tel: "0123456789"
  },
  {
    id: 2,
    firstname: "Puwit",
    lastname: "Nunpan",
    age: 20,
    tel: "0123456789"
  },
]
const ManageEmployee = () => {
  const { role } = useContext(UserRole)!
  const navigate = useNavigate()

    useEffect(() => {
      if (role === "employee") {
          navigate(-1)
      }
    }, [])

  return (
    <div>
      <Table className="mt-20 max-w-4xl mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead>รหัสพนักงาน</TableHead>
            <TableHead>ชื่อ-นามสกุล</TableHead>
            <TableHead>เบอร์โทรศัพท์</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((person, index) => (
            <TableRow key={index} className="font-semibold text-center">
              <TableCell>{person.id}</TableCell>
              <TableCell>{person.firstname} {person.lastname}</TableCell>
              <TableCell>{person.tel}</TableCell>
              <TableCell><Link to={`/manage-employee/${person.id}`} className="underline">View</Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ManageEmployee
