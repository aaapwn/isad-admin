import { useNavigate, Link } from "react-router-dom"
import { UserRole } from "./components/RoleContext"
import { useContext, useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getEmployee } from "./api/employee/function";

const ManageEmployee = () => {
  const { role } = useContext(UserRole)!
  const [ employees, setEmployees ] = useState<any>([])
  const navigate = useNavigate()

    useEffect(() => {
      if (role === "employee") {
          navigate(-1)
          return
      }
      getEmployee().then((data) => {setEmployees(data)})
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
          {employees.map((person:any, index:number) => (
            <TableRow key={index} className="font-semibold text-center">
              <TableCell>{person.id}</TableCell>
              <TableCell>{person.firstName} {person.lastName}</TableCell>
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
